"use client";

import { useState } from "react";

export default function UploadPage() {
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [title, setTitle] = useState("");
  const [uploading, setUploading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!video || !thumbnail || !title) {
      alert("All fields are required!");
      return;
    }

    // Validate video file size (700MB = 734003200 bytes)
    if (video.size > 734003200) {
      alert("Video size exceeds 700MB.");
      return;
    }

    setUploading(true);

    // Convert files to base64
    const videoBase64 = await toBase64(video);
    const thumbnailBase64 = await toBase64(thumbnail);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          video: videoBase64,
          thumbnail: thumbnailBase64,
          title,
        }),
      });

      const result = await res.json();
      setResponse(result);

      if (result.success) {
        alert("Files uploaded successfully!");
      } else {
        alert("Upload failed: " + result.error);
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  return (
    <div>
      <h1>Upload Video and Thumbnail</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Video (Max: 700MB):</label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
            required
          />
        </div>
        <div>
          <label>Thumbnail:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setThumbnail(e.target.files[0])}
            required
          />
        </div>
        <div>
          <label>Video Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={uploading}>
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {response && response.success && (
        <div>
          <h3>Upload Successful</h3>
          <p>
            <strong>Video URL:</strong>{" "}
            <a href={response.videoUrl} target="_blank" rel="noopener noreferrer">
              {response.videoUrl}
            </a>
          </p>
          <p>
            <strong>Thumbnail URL:</strong>{" "}
            <a href={response.thumbnailUrl} target="_blank" rel="noopener noreferrer">
              {response.thumbnailUrl}
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
