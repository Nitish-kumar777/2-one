import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: "dzjzkjsiq",
  api_key: "619215599177211",
  api_secret: "jgSItJGT8rUlEGl6E9c4Kd1frlY",
});

export async function GET(req, { params }) {
  const { id } = params; // Get video ID from URL params
  
  try {
    // Fetch a specific video from Cloudinary by its public ID
    const resource = await cloudinary.api.resource(id); // Use 'id' directly as the public_id
    
    const video = {
      id: resource.public_id,
      title: resource.public_id.split('/').pop(), // Extract title from public ID
      thumbnailUrl: cloudinary.url(resource.public_id, { format: 'jpg' }), // Thumbnail URL
      videoUrl: resource.secure_url, // Video URL
      uploadDate: resource.created_at, // Upload date
    };

    return new Response(JSON.stringify(video), { status: 200 });
  } catch (error) {
    console.error('Cloudinary API Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch video' }), { status: 500 });
  }
}
