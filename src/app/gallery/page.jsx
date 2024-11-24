'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function VideoGallery() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch('/api/videos')
      .then((res) => res.json())
      .then(setVideos);
  }, []);

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
