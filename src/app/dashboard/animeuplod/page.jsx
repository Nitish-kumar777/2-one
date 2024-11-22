
"use client";

import { useState } from "react";

export default function VideoUploadForm() {
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [title, setTitle] = useState('');
  const [previewDuration, setPreviewDuration] = useState(5);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleThumbnailChange = (e) => {
    setThumbnailFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!videoFile || !title) {
      alert("Please provide a video file and title.");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Read video file as base64
    const videoData = await readFileAsBase64(videoFile);
    const thumbnailData = thumbnailFile ? await readFileAsBase64(thumbnailFile) : null;

    const payload = {
      videoData,
      title,
      thumbnailData,
      previewDuration,
    };

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/upload", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = Math.round((event.loaded / event.total) * 100);
        setUploadProgress(percentComplete);
      }
    };

    xhr.onload = () => {
      setIsUploading(false);
      if (xhr.status === 200) {
        alert("Video uploaded successfully!");
        resetForm();
      } else {
        alert("Upload failed. Please try again.");
        console.error("Error:", xhr.responseText);
      }
    };

    xhr.onerror = () => {
      setIsUploading(false);
      alert("An error occurred during the upload.");
    };

    xhr.send(JSON.stringify(payload));
  };

  const readFileAsBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const resetForm = () => {
    setTitle('');
    setVideoFile(null);
    setThumbnailFile(null);
    setPreviewDuration(5);
    setUploadProgress(0);
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

      <p className="text-white mb-2">Preview Duration (seconds):</p>
      <input
        type="number"
        placeholder="Preview duration"
        value={previewDuration}
        onChange={(e) => setPreviewDuration(Number(e.target.value))}
        className="w-full p-2 mb-4 text-black rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
      />

      {isUploading && (
        <div className="w-full mb-4 bg-gray-300 rounded">
          <div
            className="h-4 bg-teal-600 rounded"
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
      )}

      <p className="text-white">{isUploading ? `${uploadProgress}% uploaded` : ""}</p>

      <button
        onClick={handleUpload}
        className="w-full py-2 bg-teal-600 text-white font-semibold rounded hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
        disabled={isUploading}
      >
        {isUploading ? "Uploading..." : "Upload Video"}
      </button>
    </div>
  );
}
