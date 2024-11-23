import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dne38mnjz",
  api_key: "666795253571512",
  api_secret: "piv15VSKOFBU1YHriJ7YYa7TTww",
});

export async function POST(request) {
  try {
    const { video, thumbnail, title } = await request.json();

    // Upload video
    const videoUpload = await cloudinary.uploader.upload_large(video, {
      folder: "all-videos",
      resource_type: "video",
      public_id: title,
    });

    // Upload thumbnail
    const thumbnailUpload = await cloudinary.uploader.upload(thumbnail, {
      folder: "all-videos",
      public_id: `${title}-thumbnail`,
    });

    return new Response(
      JSON.stringify({
        success: true,
        videoUrl: videoUpload.secure_url,
        thumbnailUrl: thumbnailUpload.secure_url,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
