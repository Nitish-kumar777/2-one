import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dzjzkjsiq",
  api_key: "619215599177211",
  api_secret: "jgSItJGT8rUlEGl6E9c4Kd1frlY",
});

export async function POST(req) {
  try {
    const formData = await req.formData();
    const videoFile = formData.get("videoFile");
    const thumbnailFile = formData.get("thumbnailFile");
    const title = formData.get("title");

    if (!videoFile || !title) {
      return new Response(JSON.stringify({ error: "Video file and title are required." }), { status: 400 });
    }

    // Check file size limit
    const MAX_FILE_SIZE_MB = 700;
    if (videoFile.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      return new Response(
        JSON.stringify({ error: `Video file size exceeds ${MAX_FILE_SIZE_MB} MB.` }),
        { status: 400 }
      );
    }

    // Upload Video to Cloudinary
    const videoUploadResponse = await cloudinary.uploader.upload(videoFile.path, {
      resource_type: "video",
      folder: "18+anime",
      public_id: title, // Use title as public ID
    });

    // Upload Thumbnail to Cloudinary
    let thumbnailUrl;
    if (thumbnailFile) {
      const thumbnailUploadResponse = await cloudinary.uploader.upload(thumbnailFile.path, {
        resource_type: "image",
        folder: "18+anime",
        public_id: `${title}_thumbnail`, // Append '_thumbnail' to title
      });
      thumbnailUrl = thumbnailUploadResponse.secure_url;
    }

    // Respond with URLs
    return new Response(
      JSON.stringify({
        videoUrl: videoUploadResponse.secure_url,
        thumbnailUrl,
        publicId: videoUploadResponse.public_id,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Cloudinary Upload Error:", error.message);
    return new Response(
      JSON.stringify({ error: "Failed to upload. Please try again." }),
      { status: 500 }
    );
  }
}
