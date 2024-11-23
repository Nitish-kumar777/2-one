import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
import fs from "fs";
import { tmpdir } from "os";
import { join } from "path";
import { writeFile } from "fs/promises";

// Cloudinary Configuration
cloudinary.config({
  cloud_name: "dzjzkjsiq",
  api_key: "619215599177211",
  api_secret: "jgSItJGT8rUlEGl6E9c4Kd1frlY",
});

async function saveFile(file) {
  const buffer = Buffer.from(await file.arrayBuffer());
  const tempPath = join(tmpdir(), file.name);
  await writeFile(tempPath, buffer);
  return tempPath;
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const videoFile = formData.get("videoFile");
    const thumbnailFile = formData.get("thumbnailFile");
    const title = formData.get("title");

    if (!videoFile || !thumbnailFile || !title) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Save files temporarily
    const videoPath = await saveFile(videoFile);
    const thumbnailPath = await saveFile(thumbnailFile);

    // Upload video in chunks
    const videoUpload = await cloudinary.uploader.upload_large(videoPath, {
      resource_type: "video",
      folder: "old-videos",
      public_id: title,
      chunk_size: 60 * 1024 * 1024, // 60 MB chunks
    });

    // Upload thumbnail
    const thumbnailUpload = await cloudinary.uploader.upload(thumbnailPath, {
      folder: "old-videos/thumbnails",
      public_id: `${title}-thumbnail`,
    });

    // Cleanup temporary files
    fs.unlinkSync(videoPath);
    fs.unlinkSync(thumbnailPath);

    return NextResponse.json({
      message: "Files uploaded successfully",
      videoUrl: videoUpload.secure_url,
      thumbnailUrl: thumbnailUpload.secure_url,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Failed to upload files" }, { status: 500 });
  }
}
