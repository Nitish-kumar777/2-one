import { notFound } from "next/navigation";

export default async function VideoPage({ params }) {
  const { title } = params; // Extract the video title from the URL

  // Fetch video details from the API
  const res = await fetch(`/api/videos`);
  const data = await res.json();

  if (!data.success) return notFound();

  // Find the video by title
  const video = data.videos.find((v) => v.title === decodeURIComponent(title));
  if (!video) return notFound();

  return (
    <div>
      <h1>{video.title}</h1> {/* Show video title */}
      <video
        controls
        autoPlay
        src={video.videoUrl}
        style={{ width: "100%", borderRadius: "8px" }}
      />
    </div>
  );
}
