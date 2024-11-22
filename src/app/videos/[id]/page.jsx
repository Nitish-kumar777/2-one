'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function VideoPage() {
  const { id } = useParams(); // Get the video ID from the URL
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await fetch(`/api/videos/[id]/${encodeURIComponent(id)}`);
        if (!res.ok) throw new Error('Failed to fetch video details');
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

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">{video.title}</h1>
      <video controls className="w-full rounded-lg">
        <source src={video.videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <p className="mt-4 text-gray-700">Uploaded on: {new Date(video.uploadDate).toLocaleDateString()}</p>
    </div>
  );
}
