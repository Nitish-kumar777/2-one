'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function VideoGallery() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/videos')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch videos');
        return res.json();
      })
      .then((data) => {
        setVideos(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading videos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Video Gallery</h1>
      <div className="gallery">
        {videos.map((video) => (
          <div key={video.id} className="video-item">
            <Link href={`/videos/${video.id}`}>
              <img src={video.thumbnailUrl} alt={video.title} />
            </Link>
            <p>{video.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
