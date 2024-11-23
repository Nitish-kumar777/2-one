'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function VideoPage() {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  const { id } = router.query; // Capture the dynamic ID from the URL

  useEffect(() => {
    if (!id) return; // Don't run until we have the ID
    const fetchVideo = async () => {
      try {
        const res = await fetch(`/api/videos/id/${id}`);
        if (!res.ok) throw new Error('Failed to fetch video');
        const data = await res.json();
        setVideo(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id]);

  if (loading) return <p>Loading video...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!video) return <p>Video not found</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">{video.title}</h1>
      <div className="flex justify-center mb-4">
        <video
          src={video.videoUrl}
          controls
          className="w-full md:w-2/3 h-auto"
        ></video>
      </div>
      <p>{video.uploadDate}</p>
    </div>
  );
}
