import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    const { videoData, title, thumbnailData, previewDuration = 5 } = await req.json();

    // Step 1: Upload the video to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(videoData, {
      resource_type: 'video',
      folder: 'anime', // Customize as needed
      public_id: title,            // Use title as the public ID
    });

    // Step 2: Upload custom thumbnail, if provided
    let thumbnailUrl;
    if (thumbnailData) {
      const thumbnailResponse = await cloudinary.uploader.upload(thumbnailData, {
        resource_type: 'image',
        folder: 'anime',
        public_id: `${title}_thumbnail`,
      });
      thumbnailUrl = thumbnailResponse.secure_url;
    }

    return new Response(
      JSON.stringify({
        url: uploadResponse.secure_url,
        public_id: uploadResponse.public_id,
        thumbnailUrl,
        previewUrl: `${uploadResponse.secure_url}#t=0,${previewDuration}`,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Upload error:', error);
    return new Response(JSON.stringify({ error: 'Failed to upload video' }), { status: 500 });
  }
}
