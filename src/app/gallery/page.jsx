'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function VideoGallery() {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await fetch('/api/videos');
        if (!res.ok) {
          throw new Error(`Failed to fetch videos: ${res.statusText}`);
        }
        const data = await res.json();
        if (data.success) {
          setVideos(data.videos || []);
        } else {
          throw new Error(data.error || "Unknown error");
        }
      } catch (err) {
        console.error("Error fetching videos:", err.message);
        setError("Could not load videos. Please try again later.");
      }
    }

    fetchVideos();
  }, []);

  return (
    <div>
      <h1>Video Gallery</h1>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <div className="gallery">
          {videos.length > 0 ? (
            videos.map((video) => (
              <div key={video.id} className="video-item">
                <Link href={`/videos/${video.id}`}>
                  <a>
                    {video.thumbnailUrl ? (
                      <img
                        src={video.thumbnailUrl}
                        alt={video.title || "Video"}
                        width="300"
                        height="200"
                      />
                    ) : (
                      <p>No thumbnail available</p>
                    )}
                  </a>
                </Link>
                <p>{video.title || "Untitled"}</p>
              </div>
            ))
          ) : (
            <p>No videos available</p>
          )}
        </div>
      )}
    </div>
  );
}
