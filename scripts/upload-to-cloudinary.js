/**
 * Bulk Upload Script: Uploads all local static images to Cloudinary.
 * Run with: node scripts/upload-to-cloudinary.js
 */
const { v2: cloudinary } = require("cloudinary");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const cloudName = process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
  console.error("Missing Cloudinary credentials in .env!");
  console.error("Please add:");
  console.error("CLOUDINARY_CLOUD_NAME=your_cloud_name");
  console.error("CLOUDINARY_API_KEY=your_api_key");
  console.error("CLOUDINARY_API_SECRET=your_api_secret");
  process.exit(1);
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true,
});

const imagesDir = path.join(__dirname, "..", "public", "images");

async function uploadFile(filePath, publicId) {
  console.log(`Uploading ${filePath} -> tulcan_energy/${publicId}...`);
  const result = await cloudinary.uploader.upload(filePath, {
    public_id: publicId,
    folder: "tulcan_energy",
    overwrite: true,
  });
  console.log(`✓ Uploaded: ${result.secure_url}`);
  return result;
}

async function main() {
  if (!fs.existsSync(imagesDir)) {
    console.error("Images directory not found:", imagesDir);
    return;
  }

  const files = fs.readdirSync(imagesDir);
  console.log(`Found ${files.length} images to upload...`);

  for (const file of files) {
    const ext = path.extname(file);
    const baseName = path.basename(file, ext);
    const fullPath = path.join(imagesDir, file);

    try {
      await uploadFile(fullPath, baseName);
    } catch (err) {
      console.error(`Failed to upload ${file}:`, err.message);
    }
  }

  console.log("Images upload complete!");

  const docsDir = path.join(__dirname, "..", "public", "docs");
  if (fs.existsSync(docsDir)) {
    const docFiles = fs.readdirSync(docsDir);
    for (const file of docFiles) {
      const ext = path.extname(file);
      const baseName = path.basename(file, ext);
      const fullPath = path.join(docsDir, file);
      try {
        console.log(`Uploading document ${file}...`);
        const res = await cloudinary.uploader.upload(fullPath, {
          public_id: baseName,
          folder: "tulcan_energy",
          resource_type: "auto",
          overwrite: true,
        });
        console.log(`✓ Uploaded doc: ${res.secure_url}`);
      } catch (err) {
        console.error(`Failed to upload doc ${file}:`, err.message);
      }
    }
  }

  console.log("All static media and docs uploaded to Cloudinary successfully!");
}

main().catch(console.error);
