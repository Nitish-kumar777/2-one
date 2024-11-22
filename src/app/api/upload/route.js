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

    // Validation
    if (!videoData || !title) {
      return new Response(JSON.stringify({ error: 'Video data and title are required.' }), { status: 400 });
    }

    // Step 1: Upload the video to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(videoData, {
      resource_type: 'video',
      folder: '18+anime', // Specify folder
      public_id: title,   // Use title as public ID
    });

    // Step 2: Upload the thumbnail if provided
    let thumbnailUrl;
    if (thumbnailData) {
      const thumbnailResponse = await cloudinary.uploader.upload(thumbnailData, {
        resource_type: 'image',
        folder: '18+anime', // Same folder
        public_id: `${title}_thumbnail`, // Append '_thumbnail' to title
      });
      thumbnailUrl = thumbnailResponse.secure_url;
    }

    // Response
    return new Response(
      JSON.stringify({
        url: uploadResponse.secure_url,
        public_id: uploadResponse.public_id,
        thumbnailUrl,
        previewUrl: `${uploadResponse.secure_url}#t=0,${previewDuration}`, // Video preview
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Cloudinary Upload Error:', error.message);
    return new Response(
      JSON.stringify({ error: 'Failed to upload video. Please try again.' }),
      { status: 500 }
    );
  }
}
