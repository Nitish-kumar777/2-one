"use client";

import { useState } from "react";

export default function VideoUploadForm() {
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [title, setTitle] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleVideoChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleThumbnailChange = (e) => {
    setThumbnailFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!videoFile || !thumbnailFile || !title) {
      alert("Please fill all fields!");
      return;
    }

    setUploading(true);

    const uploadToCloudinary = async (file, uploadPreset) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "18+anime"); // यहाँ पर अपना preset डालें
      formData.append("folder", "18+anime-videos"); // फोल्डर जहाँ वीडियो सेव होगा

      const res = await fetch("https://api.cloudinary.com/v1_1/dzjzkjsiq/auto/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");
      return await res.json();
    };

    try {
      // Video Upload
      const videoResponse = await uploadToCloudinary(videoFile, "video_upload_preset");

      // Thumbnail Upload
      const thumbnailResponse = await uploadToCloudinary(thumbnailFile, "thumbnail_upload_preset");

      console.log("Video URL:", videoResponse.secure_url);
      console.log("Thumbnail URL:", thumbnailResponse.secure_url);

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
