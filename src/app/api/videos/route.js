import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: "dzjzkjsiq",
  api_key: "619215599177211",
  api_secret: "jgSItJGT8rUlEGl6E9c4Kd1frlY",
});

export async function GET(req) {
  try {
    const { resources } = await cloudinary.search
      .expression('folder:anime-videos/*') // Folder where videos are stored
      .sort_by('created_at', 'desc')
      .max_results(10)
      .execute();

    const videos = resources.map((resource) => ({
      id: resource.public_id,
      title: resource.public_id.split('/').pop(),
      thumbnailUrl: cloudinary.url(resource.public_id, { format: 'jpg' }),
      videoUrl: resource.secure_url,
      uploadDate: resource.created_at,
    }));

    return new Response(JSON.stringify(videos), { status: 200 });
  } catch (error) {
    console.error('Cloudinary API Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch videos' }), { status: 500 });
  }
}
