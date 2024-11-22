import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  try {
    const { resources } = await cloudinary.search
      .expression('folder:anime-videos/*')
      .sort_by('created_at', 'desc')
      .max_results(10)
      .execute();

    const videos = resources.map((resource) => ({
      id: resource.public_id,
      title: resource.folder.split('/').pop(),
      thumbnailUrl: resource.secure_url,
      videoUrl: resource.secure_url,
      uploadDate: resource.created_at,
    }));

    return new Response(JSON.stringify(videos), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
