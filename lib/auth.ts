import crypto from "crypto";

const AUTH_SECRET = process.env.AUTH_SECRET || "tulcan_energy_ep_secure_admin_jwt_secret_key_2024";

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

/**
 * Creates a signed, tamper-proof session token with expiry timestamp
 */
export function createSessionToken(user: SessionUser, expiresInDays = 7): string {
  const expiresAt = Date.now() + expiresInDays * 24 * 60 * 60 * 1000;
  const payload = JSON.stringify({
    ...user,
    exp: expiresAt,
  });

  const base64Payload = Buffer.from(payload).toString("base64url");
  const signature = crypto
    .createHmac("sha256", AUTH_SECRET)
    .update(base64Payload)
    .digest("base64url");

  return `${base64Payload}.${signature}`;
}

/**
 * Verifies and decodes a signed session token
 */
export function verifySessionToken(token: string): SessionUser | null {
  if (!token || typeof token !== "string") return null;

  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const [base64Payload, signature] = parts;

  const expectedSignature = crypto
    .createHmac("sha256", AUTH_SECRET)
    .update(base64Payload)
    .digest("base64url");

  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
    return null;
  }

  try {
    const payloadJson = Buffer.from(base64Payload, "base64url").toString("utf8");
    const data = JSON.parse(payloadJson);

    if (data.exp && Date.now() > data.exp) {
      return null; // Expired
    }

    return {
      id: data.id,
      email: data.email,
      name: data.name,
      role: data.role,
    };
  } catch {
    return null;
  }
}
