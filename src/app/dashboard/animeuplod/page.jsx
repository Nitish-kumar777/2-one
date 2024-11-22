"use client";

import { useState } from "react";

export default function VideoUploadForm() {
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [title, setTitle] = useState('');
  const [previewDuration, setPreviewDuration] = useState(5);

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleThumbnailChange = (e) => {
    setThumbnailFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!videoFile || !title) return;

    const videoData = await fileToBase64(videoFile);
    const thumbnailData = thumbnailFile ? await fileToBase64(thumbnailFile) : null;

    const response = await fetch('/api/uploadVideo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ videoData, title, thumbnailData, previewDuration }),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Video uploaded successfully");
    } else {
      console.error('Upload error:', data.error);
    }
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-md mt-2">
      <h2 className="text-2xl font-semibold text-white mb-6">Upload Video</h2>
      
      <input
        type="text"
        placeholder="Enter video title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-4 text-black rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
      
      <input
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        className="w-full p-2 mb-4 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
      
      <input
        type="file"
        accept="image/*"
        onChange={handleThumbnailChange}
        className="w-full p-2 mb-4 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
      <p>Preview Duration time in sec</p>
      <input
        type="number"
        placeholder="Preview duration (seconds)"
        value={previewDuration}
        onChange={(e) => setPreviewDuration(Number(e.target.value))}
        className="w-full p-2 mb-4 text-black rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
      
      <button
        onClick={handleUpload}
        className="w-full py-2 bg-teal-600 text-white font-semibold rounded hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
      >
        Upload Video
      </button>
    </div>
  );
}
