'use client';

import { useState, useEffect } from 'react';

export default function VideoGallery() {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null); // For modal playback

  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await fetch('/api/videos');
        if (!res.ok) {
          throw new Error(`Failed to fetch videos: ${res.statusText}`);
        }
        const data = await res.json();
        if (data.success) {
          setVideos(data.videos || []);
        } else {
          throw new Error(data.error || "Unknown error");
        }
      } catch (err) {
        console.error("Error fetching videos:", err.message);
        setError("Could not load videos. Please try again later.");
      }
    }

    fetchVideos();
  }, []);

  return (
    <div>
      <h1>Video Gallery</h1>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <div className="gallery">
          {videos.length > 0 ? (
            videos.map((video) => (
              <div key={video.id} className="video-item">
                <div
                  role="button"
                  onClick={() => setSelectedVideo(video)}
                  style={{ cursor: "pointer" }}
                >
                  {video.thumbnailUrl ? (
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title || "Video"}
                      width="300"
                      height="200"
                    />
                  ) : (
                    <p>No thumbnail available</p>
                  )}
                </div>
                <p>{video.title || "Untitled"}</p>
              </div>
            ))
          ) : (
            <p>No videos available</p>
          )}
        </div>
      )}

      {/* Video Playback Modal */}
      {selectedVideo && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setSelectedVideo(null)}>
              &times;
            </span>
            <h2>{selectedVideo.title}</h2>
            <video
              src={selectedVideo.videoUrl}
              controls
              autoPlay
              style={{ width: "100%" }}
            />
          </div>
        </div>
      )}

      {/* Modal Styling */}
      <style jsx>{`
        .gallery {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 16px;
          padding: 16px;
        }

        .video-item {
          text-align: center;
        }

        .video-item img {
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .video-item p {
          margin-top: 8px;
          font-size: 16px;
        }

        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .modal-content {
          background: white;
          padding: 20px;
          border-radius: 8px;
          max-width: 800px;
          width: 90%;
          position: relative;
        }

        .modal-content video {
          border-radius: 8px;
        }

        .close {
          position: absolute;
          top: 10px;
          right: 10px;
          font-size: 24px;
          font-weight: bold;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
