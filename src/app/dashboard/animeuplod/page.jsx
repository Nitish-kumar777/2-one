"use client";

import { useState } from "react";

export default function VideoUploadForm() {
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [title, setTitle] = useState('');
  const [uploading, setUploading] = useState(false);

  const MAX_FILE_SIZE_MB = 700;

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      alert(`Video file size exceeds ${MAX_FILE_SIZE_MB} MB.`);
    } else {
      setVideoFile(file);
    }
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setThumbnailFile(file);
  };

  const handleUpload = async () => {
    if (!videoFile || !thumbnailFile || !title) {
      alert("Please fill all fields!");
      return;
    }

    setUploading(true);

    try {
      // Prepare FormData for API request
      const formData = new FormData();
      formData.append("videoFile", videoFile);
      formData.append("thumbnailFile", thumbnailFile);
      formData.append("title", title);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload");
      }

      const data = await response.json();
      console.log("Upload successful:", data);
      alert("Video and Thumbnail uploaded successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-md mt-4">
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
        onChange={handleVideoChange}
        className="w-full p-2 mb-4 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleThumbnailChange}
        className="w-full p-2 mb-4 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
      />

      <button
        onClick={handleUpload}
        className="w-full py-2 bg-teal-600 text-white font-semibold rounded hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload Video"}
      </button>
    </div>
  );
}
