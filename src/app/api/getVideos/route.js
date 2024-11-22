import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(req) {
  try {
    // Fetch all videos in the "anime" folder
    const { resources } = await cloudinary.search
      .expression('folder:anime/* AND resource_type:video')
      .with_field('context')
      .with_field('tags')
      .max_results(20)  // Adjust max results as needed
      .execute();

    // Process the videos data
    const videos = resources.map((video) => {
      const title = video.public_id.split('/').pop(); // Extract title from public_id

      // Construct the thumbnail URL based on naming convention
      const thumbnailUrl = cloudinary.url(`anime/${title}_thumbnail`, {
        resource_type: 'image',
        secure: true,
      });

      return {
        title,
        url: video.secure_url,
        thumbnailUrl,
        previewUrl: `${video.secure_url}#t=0,5`, // 5-second preview
        public_id: video.public_id,
        format: video.format,
        uploaded_at: video.created_at,
        size: video.bytes,
      };
    });

    return new Response(JSON.stringify(videos), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching videos:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch videos' }), {
      status: 500,
    });
  }
}
