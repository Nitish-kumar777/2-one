import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: "dzjzkjsiq",
  api_key: "619215599177211",
  api_secret: "jgSItJGT8rUlEGl6E9c4Kd1frlY",
});

export async function GET(req) {
  try {
    // Fetch resources from Cloudinary
    const { resources } = await cloudinary.search
      .expression('folder:18+anime-videos/*') // Folder path
      .sort_by('created_at', 'desc') // Sort by most recent
      .max_results(100) // Limit results
      .execute();

    // Map the results to a structured response
    const videos = resources.map((resource) => ({
      id: resource.public_id,
      title: resource.public_id.split('/').pop(), // Extract title from public ID
      thumbnailUrl: cloudinary.url(resource.public_id, { format: 'jpg' }), // Thumbnail
      videoUrl: resource.secure_url, // Video URL
      uploadDate: resource.created_at, // Upload date
    }));

    return new Response(JSON.stringify(videos), { status: 200 });
  } catch (error) {
    console.error('Cloudinary API Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch videos' }), { status: 500 });
  }
}
