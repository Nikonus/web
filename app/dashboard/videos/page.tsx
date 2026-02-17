import { connectToDatabase } from "@/lib/db";
import Video from "@/model/video.model";
import VideoFeed from "@/app/components/VideoFeed";

export const dynamic = "force-dynamic"; 
// disables static caching

export default async function VideosPage() {
  await connectToDatabase();

  const videos = await Video.find()
    .sort({ createdAt: -1 })
    .lean();

  return <VideoFeed videos={JSON.parse(JSON.stringify(videos))} />;
}