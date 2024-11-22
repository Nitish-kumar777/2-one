import { v2 as cloudinary } from 'cloudinary';

// Cloudinary configuration
cloudinary.config({
  cloud_name: "dzjzkjsiq",
  api_key: "619215599177211",
  api_secret: "jgSItJGT8rUlEGl6E9c4Kd1frlY",
});

export async function POST(req) {
  try {
    const { videoData, title, thumbnailData, previewDuration = 5 } = await req.json();

    // Step 1: Upload the video to Cloudinary into the folder '18+anime'
    const uploadResponse = await cloudinary.uploader.upload(videoData, {
      resource_type: 'video',
      folder: '18+anime',  // Specify the folder
      public_id: title,    // Use title as the public ID
    });

    // Step 2: Upload custom thumbnail to the same folder, if provided
    let thumbnailUrl;
    if (thumbnailData) {
      const thumbnailResponse = await cloudinary.uploader.upload(thumbnailData, {
        resource_type: 'image',
        folder: '18+anime', // Specify the same folder
        public_id: `${title}_thumbnail`, // Append '_thumbnail' to the public ID
      });
      thumbnailUrl = thumbnailResponse.secure_url;
    }

    // Response with uploaded file URLs
    return new Response(
      JSON.stringify({
        url: uploadResponse.secure_url,
        public_id: uploadResponse.public_id,
        thumbnailUrl,
        previewUrl: `${uploadResponse.secure_url}#t=0,${previewDuration}`, // Generate video preview URL
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Upload error:', error);
    return new Response(JSON.stringify({ error: 'Failed to upload video' }), { status: 500 });
  }
}
