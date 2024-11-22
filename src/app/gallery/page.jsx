'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function VideoGallery() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  // Fetch videos on mount
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch('/api/videos');
        if (!res.ok) throw new Error('Failed to fetch videos');
        const data = await res.json();
        setVideos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) return <p>Loading videos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Video Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {videos.map((video) => (
          <div
            key={video.id}
            className="video-item cursor-pointer border rounded-lg p-2 hover:shadow-lg"
            onClick={() => router.push(`/video/${encodeURIComponent(video.id)}`)} // Navigate to video page
          >
            <img
              src={video.thumbnailUrl}
              alt={video.title}
              className="w-full h-48 object-cover rounded-md"
            />
            <p className="mt-2 text-center font-semibold">{video.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
