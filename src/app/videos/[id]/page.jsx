import { v2 as cloudinary } from 'cloudinary';

export default async function VideoPage({ params }) {
  const { id } = params;

  // Fetch video details directly from Cloudinary API
  const video = await fetchVideoDetails(id);

  if (!video) {
    return <p>Video not found</p>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">{video.title}</h1>
      <video
        controls
        className="w-full max-w-screen-lg mx-auto rounded-md"
        src={video.videoUrl}
      />
      <p className="mt-4 text-gray-600">Uploaded on: {new Date(video.uploadDate).toLocaleDateString()}</p>
    </div>
  );
}

async function fetchVideoDetails(id) {
  try {
    cloudinary.config({
      cloud_name: "dzjzkjsiq",
      api_key: "619215599177211",
      api_secret: "jgSItJGT8rUlEGl6E9c4Kd1frlY",
    });

    const resource = await cloudinary.api.resource(id, { resource_type: 'video' });

    return {
      id: resource.public_id,
      title: resource.public_id.split('/').pop(),
      videoUrl: resource.secure_url,
      uploadDate: resource.created_at,
    };
  } catch (error) {
    console.error('Failed to fetch video details:', error);
    return null;
  }
}
