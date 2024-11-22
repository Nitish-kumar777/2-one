'use client';

import { useState, useEffect } from 'react';

export default function VideoDetail({ params }) {
  const { id } = params;
  const [video, setVideo] = useState(null);

  useEffect(() => {
    fetch(`/api/videos/${id}`)
      .then((res) => res.json())
      .then(setVideo);
  }, [id]);

  if (!video) return <p>Loading...</p>;

  return (
    <div>
      <h1>{video.title}</h1>
      <video controls src={video.videoUrl} />
      <p>Uploaded on: {new Date(video.uploadDate).toLocaleDateString()}</p>
    </div>
  );
}
