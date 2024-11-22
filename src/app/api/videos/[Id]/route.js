import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: "dzjzkjsiq",
  api_key: "619215599177211",
  api_secret: "jgSItJGT8rUlEGl6E9c4Kd1frlY",
});

export async function GET(req, { params }) {
  const { id } = params; // Extract video ID from URL
  try {
    const resource = await cloudinary.api.resource(id); // Fetch video details from Cloudinary

    const video = {
      id: resource.public_id,
      title: resource.public_id.split('/').pop(),
      thumbnailUrl: cloudinary.url(resource.public_id, { format: 'jpg' }),
      videoUrl: resource.secure_url,
      uploadDate: resource.created_at,
    };

    return new Response(JSON.stringify(video), { status: 200 });
  } catch (error) {
    console.error('Cloudinary API Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch video' }), { status: 500 });
  }
}
