'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function VideoPage({ params }) {
  const { id } = params;
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await fetch(`/api/videos/${encodeURIComponent(id)}`);
        const data = await res.json();
        setVideo(data);
      } catch (error) {
        console.error('Error fetching video:', error);
      }
    };

    fetchVideo();
  }, [id]);

  if (!video) return <p>Loading video...</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">{video.title}</h1>
      <video controls className="w-full rounded-lg">
        <source src={video.videoUrl} type="video/mp4" />
      </video>
    </div>
  );
}
