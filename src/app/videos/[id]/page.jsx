'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function VideoPage() {
  const { id } = useParams(); // Get the video ID from the URL
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await fetch(`/api/videos/${encodeURIComponent(id)}`);
        if (!response.ok) throw new Error('Failed to fetch video details');
        const data = await response.json();
        setVideo(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchVideo();
    }
  }, [id]);

  if (loading) return <p>Loading video...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>{video.title}</h1>
      <video controls>
        <source src={video.videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <p>Uploaded on: {new Date(video.uploadDate).toLocaleDateString()}</p>
    </div>
  );
}
