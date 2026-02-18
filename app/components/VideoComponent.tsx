"use client";
import Link from "next/link";
import { IVideo } from "@/model/video.model";
import { apiClient } from "@/lib/api-client";


export default function VideoComponent({ video }: { video: IVideo }) {
  return (
    <div className="card bg-base-100 shadow hover:shadow-lg transition-all duration-300">
      <figure className="relative px-4 pt-4">

  <Link href={`/videos/${video._id}`} className="relative group w-full">
    <div
      className="rounded-xl overflow-hidden relative w-full group"
      style={{ aspectRatio: "9/16" }}
    >
      <img
        src={video.thumbnailUrl}
        alt={video.title}
        className="w-full h-full object-cover group-hover:hidden"
      />

      <video
        src={video.videoUrl}
        className="w-full h-full object-cover hidden group-hover:block"
        controls
        muted
        loop
      />
    </div>
  </Link>

  <button
    onClick={async () => {
      const confirmDelete = confirm("Are you sure you want to delete this video?");
      if (!confirmDelete) return;

      try {
        await apiClient.deleteVideo(video._id as string);
        window.location.reload();
      } catch (err) {
        console.error(err);
      }
    }}
    className="mt-3 text-red-500 text-sm hover:underline"
  >
    Delete
  </button>

</figure>

      <div className="card-body p-4">
        <Link
          href={`/videos/${video._id}`}
          className="hover:opacity-80 transition-opacity"
        >
          <h2 className="card-title text-lg">{video.title}</h2>
        </Link>

        <p className="text-sm text-base-content/70 line-clamp-2">
          {video.description}
        </p>
      </div>
    </div>
  );
}