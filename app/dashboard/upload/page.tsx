"use client";

import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/next";
import { useRef, useState } from "react";
import axios from "axios";

interface FileUploadProps {
  onSuccess: (res: unknown) => void;
  onProgress?: (progress: number) => void;
  fileType?: "image" | "video";
}

const FileUpload = ({
  onSuccess,
  onProgress,
  fileType = "image",
}: FileUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const validateFile = (file: File) => {
    if (fileType === "video" && !file.type.startsWith("video/")) {
      setError("Please upload a valid video file");
      return false;
    }

    if (fileType === "image" && !file.type.startsWith("image/")) {
      setError("Please upload a valid image file");
      return false;
    }

    if (file.size > 100 * 1024 * 1024) {
      setError("File size must be less than 100 MB");
      return false;
    }

    return true;
  };

  const authenticator = async () => {
    const { data } = await axios.get("/api/auth/imagekit-auth");
    return data;
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file || !validateFile(file)) return;

    setUploading(true);
    setError(null);

    try {
      const { signature, expire, token } = await authenticator();

      abortControllerRef.current = new AbortController();

      const res = await upload({
        file,
        fileName: file.name,
        publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
        signature,
        expire,
        token,
        abortSignal: abortControllerRef.current.signal,
        onProgress: (event) => {
          if (event.total) {
            const percent = Math.round(
              (event.loaded / event.total) * 100
            );
            onProgress?.(percent);
          }
        },
      });

      onSuccess(res);
    } catch (err: unknown) {
      if (err instanceof ImageKitAbortError) {
        setError("Upload aborted");
      } else if (err instanceof ImageKitInvalidRequestError) {
        setError("Invalid upload request");
      } else if (err instanceof ImageKitUploadNetworkError) {
        setError("Network error during upload");
      } else if (err instanceof ImageKitServerError) {
        setError("Server error during upload");
      } else {
        setError("Upload failed");
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <input
        type="file"
        accept={fileType === "video" ? "video/*" : "image/*"}
        onChange={handleFileChange}
        disabled={uploading}
      />

      {uploading && <span>Uploading...</span>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
};

export default FileUpload;