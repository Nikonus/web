import { NextResponse } from "next/server";
import { generateVideoMeta } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const { title } = await req.json();
console.log("TITLE RECEIVED:", title);

    if (!title) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    const aiData = await generateVideoMeta(title);

    return NextResponse.json(aiData);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "AI generation failed" },
      { status: 500 }
    );
  }
}