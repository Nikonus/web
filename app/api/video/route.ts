
import { connectToDatabase } from "@/lib/db";
import Video, { IVideo } from "@/model/video.model";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { generateVideoMeta } from "@/lib/gemini";


export async function GET() {
  try {
    try {
        await connectToDatabase();
        const videos = await Video.find().sort({ createdAt: -1 }).lean();
        if (!videos|| videos.length === 0) {
            return NextResponse.json({ error: "No videos found" }, { status: 404 });
        }
        return NextResponse.json(videos);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch videos" }, { status: 500 });
    }

  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const body: IVideo = await request.json();

    if (!body.title || !body.description || !body.videoUrl) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

   const videoData = {
  ...body,
  thumbnailUrl:
    body.thumbnailUrl ||
    "https://ik.imagekit.io/fjgmko3fdz/default-thumbnail.jpg",

  aiDescription: body.aiDescription ?? null,
  tags: body.tags ?? [],

  transformations: {
    crop: body.transformations?.crop ?? { x: 0, y: 0, width: 1280, height: 720 },
    resize: body.transformations?.resize ?? { width: 1280, height: 720 },
    rotate: body.transformations?.rotate ?? 0,
  },
};

    const newVideo = await Video.create(videoData);

    // ⭐⭐ THIS IS THE MISSING PART ⭐⭐
    revalidatePath("/dashboard/videos");
    revalidatePath("/dashboard");

    return NextResponse.json(newVideo, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}