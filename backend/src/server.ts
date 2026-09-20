import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import adminRoutes from "./routes/admin";
import publicRoutes from "./routes/public";
import uploadRoutes from "./routes/upload";
import authRoutes from "./routes/auth";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all origins or configured frontend URL
const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:3000",
  "http://localhost:3000",
  "http://localhost:3001",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== "production") {
        return callback(null, true);
      }
      return callback(null, true); // Permissive default for hosting flexibility
    },
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Health Check
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({
    status: "healthy",
    service: "Tulcan Energy E&P Backend API",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

// Mount Routes
app.use("/api/admin", adminRoutes);
app.use("/api", publicRoutes);
app.use("/api", uploadRoutes);
app.use("/api", authRoutes);

// 404 Handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handling middleware
app.use((err: any, _req: Request, res: Response, _next: any) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: err.message || "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(`Tulcan Energy Backend API Service`);
  console.log(`Status:  LISTENING on port ${PORT}`);
  console.log(`Health:  http://localhost:${PORT}/api/health`);
  console.log(`Admin:   http://localhost:${PORT}/api/admin/overview`);
  console.log(`=========================================`);
});

export default app;
