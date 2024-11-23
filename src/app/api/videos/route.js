import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dzjzkjsiq",
  api_key: "619215599177211",
  api_secret: "jgSItJGT8rUlEGl6E9c4Kd1frlY",
});

export async function GET() {
  try {
    const result = await cloudinary.search
      .expression("folder:all-videos AND resource_type:video")
      .sort_by("public_id", "desc")
      .max_results(20)
      .execute();

    const videos = result.resources.map((resource) => ({
      id: resource.public_id, // Unique ID in Cloudinary
      title: resource.public_id.split("/").pop(), // Extract title from public_id
      videoUrl: resource.secure_url,
      format: resource.format,
      duration: resource.duration,
      created_at: resource.created_at,
      thumbnailUrl: cloudinary.url(resource.public_id, {
        resource_type: "video",
        transformation: [{ width: 300, height: 200, crop: "fill" }],
        format: "jpg",
      }),
    }));

    return new Response(
      JSON.stringify({ success: true, videos }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
