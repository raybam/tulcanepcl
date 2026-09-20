import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const router = Router();
const prisma = new PrismaClient();
const AUTH_SECRET = process.env.AUTH_SECRET || "tulcan_energy_ep_secure_admin_jwt_secret_key_2024";

function createSessionToken(user: any, expiresInDays = 7): string {
  const expiresAt = Date.now() + expiresInDays * 24 * 60 * 60 * 1000;
  const payload = JSON.stringify({ ...user, exp: expiresAt });
  const base64Payload = Buffer.from(payload).toString("base64url");
  const signature = crypto.createHmac("sha256", AUTH_SECRET).update(base64Payload).digest("base64url");
  return `${base64Payload}.${signature}`;
}

function verifySessionToken(token: string): any | null {
  if (!token || typeof token !== "string") return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [base64Payload, signature] = parts;
  const expectedSignature = crypto.createHmac("sha256", AUTH_SECRET).update(base64Payload).digest("base64url");
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
    return null;
  }
  try {
    const data = JSON.parse(Buffer.from(base64Payload, "base64url").toString("utf8"));
    if (data.exp && Date.now() > data.exp) return null;
    return { id: data.id, email: data.email, name: data.name, role: data.role };
  } catch {
    return null;
  }
}

// POST /api/auth/login
router.post("/auth/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const user = await prisma.adminUser.findUnique({ where: { email: cleanEmail } });

    if (!user) {
      return res.status(401).json({ error: "Invalid email address or password" });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: "Invalid email address or password" });
    }

    const sessionUser = { id: user.id, email: user.email, name: user.name, role: user.role };
    const token = createSessionToken(sessionUser);

    return res.json({
      success: true,
      user: sessionUser,
      token,
    });
  } catch (error: any) {
    console.error("Backend auth error:", error);
    return res.status(500).json({ error: error.message || "Authentication failed" });
  }
});

// POST /api/auth/logout
router.post("/auth/logout", (_req: Request, res: Response) => {
  return res.json({ success: true, message: "Logged out successfully" });
});

// GET /api/auth/session
router.get("/auth/session", (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.json({ authenticated: false, user: null });
  }

  const token = authHeader.substring(7);
  const user = verifySessionToken(token);
  if (!user) {
    return res.json({ authenticated: false, user: null });
  }

  return res.json({ authenticated: true, user });
});

export default router;
