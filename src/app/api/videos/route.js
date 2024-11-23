import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: "dzjzkjsiq",
  api_key: "619215599177211",
  api_secret: "jgSItJGT8rUlEGl6E9c4Kd1frlY",
});

export async function GET(req) {
  try {
    // Fetch resources from the '18+anime-videos' folder
    const { resources } = await cloudinary.search
      .expression('folder:18+anime-videos/*') // Folder path
      .sort_by('created_at', 'desc') // Sort by most recent
      .max_results(10) // Limit results to 10
      .execute();

    // Map Cloudinary resources to a structured response
    const videos = resources.map((resource) => ({
      id: resource.public_id, // Use the public ID as the unique identifier
      title: resource.public_id.split('/').pop(), // Extract title from public ID
      thumbnailUrl: cloudinary.url(resource.public_id, { format: 'jpg' }), // Thumbnail URL
    }));

    return new Response(JSON.stringify(videos), { status: 200 });
  } catch (error) {
    console.error('Cloudinary API Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch videos' }), { status: 500 });
  }
}
