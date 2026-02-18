import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Video from "@/model/video.model";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const { id } = params;

    const deleted = await Video.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    revalidatePath("/dashboard/videos");

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("DELETE ERROR:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}