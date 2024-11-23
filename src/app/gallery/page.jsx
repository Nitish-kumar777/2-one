"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function GalleryPage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch("/api/videos");
        const data = await res.json();
        if (data.success) {
          setVideos(data.videos);
        } else {
          alert("Failed to fetch videos: " + data.error);
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) return <p>Loading videos...</p>;

  return (
    <div>
      <h1>Video Gallery</h1>
      {videos.length === 0 && <p>No videos found.</p>}
      <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
        {videos.map((video) => (
          <div key={video.id} style={{ textAlign: "center" }}>
            <img
              src={video.thumbnailUrl}
              alt={`Thumbnail of ${video.title}`}
              style={{ cursor: "pointer", width: "100%", borderRadius: "8px" }}
              onClick={() => router.push(`/video/${video.title}`)}
            />
            <p>{video.title}</p> {/* Display title */}
          </div>
        ))}
      </div>
    </div>
  );
}
