"use client";

import React, { useState } from "react";
import FileUpload from "@/app/components/FileUpload";
import { apiClient } from "@/lib/api-client";

function VideoUploadForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !videoUrl || !thumbnailUrl) {
      setError("Title, video, and thumbnail are required.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await apiClient.createVideo({
        title,
        description,
        videoUrl,
        thumbnailUrl,
      });

      setTitle("");
      setDescription("");
      setVideoUrl(null);
      setThumbnailUrl(null);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to upload video.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto space-y-6 p-6 bg-white shadow rounded"
    >
      <h2 className="text-2xl font-bold">Upload Video</h2>

      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded">
          {error}
        </div>
      )}

      <div>
        <label className="block mb-2 font-medium">Title</label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">Description</label>
        <textarea
          className="w-full border p-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">Upload Video</label>
        <FileUpload
          fileType="video"
          onSuccess={(res: any) => {
            setVideoUrl(res.url);
          }}
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">Upload Thumbnail</label>
        <FileUpload
          fileType="image"
          onSuccess={(res: any) => {
            setThumbnailUrl(res.url);
          }}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? "Uploading..." : "Create Video"}
      </button>
    </form>
  );
}

export default VideoUploadForm;