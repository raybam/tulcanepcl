import { Router, Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";

const router = Router();

const cloudName = process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

const isCloudinaryConfigured = Boolean(cloudName && apiKey && apiSecret);

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });
}

router.post("/upload", async (req: Request, res: Response) => {
  try {
    const { fileData, folder = "tulcan_energy/uploads" } = req.body;

    if (!fileData) {
      return res.status(400).json({ error: "No fileData provided" });
    }

    if (isCloudinaryConfigured) {
      const uploadResult = await cloudinary.uploader.upload(fileData, {
        folder,
        resource_type: "auto",
      });

      return res.json({
        success: true,
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
        provider: "cloudinary",
      });
    }

    // If Cloudinary is not configured yet on backend, echo warning or return URL if already an HTTP url
    if (fileData.startsWith("http://") || fileData.startsWith("https://")) {
      return res.json({
        success: true,
        url: fileData,
        provider: "external",
      });
    }

    return res.status(400).json({
      error: "Cloudinary credentials not configured on backend. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET in backend/.env",
    });
  } catch (error: any) {
    console.error("Backend upload error:", error);
    return res.status(500).json({ error: error.message });
  }
});

export default router;
