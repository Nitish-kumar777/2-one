export default async function VideoPage({ params }) {
  const { id } = params;

  // Fetch video details from relative API route
  const res = await fetch(`/api/videos`);
  const data = await res.json();

  if (!data.success) return notFound();

  // Find the video by ID
  const video = data.videos.find((v) => v.id === id);
  if (!video) return notFound();

  return (
    <div>
      <h1>{video.id}</h1>
      <video
        controls
        autoPlay
        src={video.videoUrl}
        style={{ width: "100%", borderRadius: "8px" }}
      />
    </div>
  );
}
