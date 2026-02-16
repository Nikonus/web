import { IVideo } from "@/model/video.model";
import VideoComponent from "@/app/components/VideoComponent";
import Link from "next/link";

interface VideoFeedProps {
  videos?: IVideo[] | null;
}

export default function VideoFeed({ videos }: VideoFeedProps) {
  const safeVideos: IVideo[] = Array.isArray(videos) ? videos : [];

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Video Library
          </h2>
          <p className="text-gray-600 mt-1">
            {safeVideos.length} {safeVideos.length === 1 ? "video" : "videos"} available
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            href="/"
            className="px-4 py-2 rounded-lg border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all flex items-center gap-2 text-gray-700 hover:text-purple-600"
          >
            Home
          </Link>

          <Link
            href="/dashboard/upload"
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold shadow-lg hover:scale-105 transition-all"
          >
            Upload Video
          </Link>
        </div>
      </div>

      {/* Video Grid OR Empty */}
      {safeVideos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {safeVideos.map((video) => (
            <div key={video._id?.toString()} className="group relative">
              <VideoComponent video={video} />
            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
              📭
            </div>

            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              No Videos Yet
            </h3>

            <p className="text-gray-600 mb-8">
              Upload your first video to start building your library.
            </p>

            <Link
              href="/dashboard/upload"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transition-all"
            >
              Upload Your First Video
            </Link>
          </div>
        </div>
      )}

      {/* Stats */}
      {safeVideos.length > 0 && (
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard title="Total Videos" value={safeVideos.length} color="purple" />
          <StatCard title="Total Views" value={calculateTotalViews(safeVideos)} color="blue" />
          <StatCard title="Avg. Views" value={calculateAvgViews(safeVideos)} color="green" />
        </div>
      )}

    </div>
  );
}

/* ---------- helpers ---------- */

function calculateTotalViews(videos: IVideo[]): number {
  return videos.reduce((sum, v) => sum + (v.views ?? 0), 0);
}

function calculateAvgViews(videos: IVideo[]): number {
  if (!videos.length) return 0;
  return Math.round(calculateTotalViews(videos) / videos.length);
}

function StatCard({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: "purple" | "blue" | "green";
}) {
  const colors = {
    purple: "from-purple-50 to-pink-50 border-purple-100",
    blue: "from-blue-50 to-cyan-50 border-blue-100",
    green: "from-green-50 to-emerald-50 border-green-100",
  };

  return (
    <div className={`bg-gradient-to-br ${colors[color]} rounded-xl p-6 border`}>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
      <p className="text-sm text-gray-600">{title}</p>
    </div>
  );
}