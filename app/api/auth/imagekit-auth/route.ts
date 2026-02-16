import { getUploadAuthParams } from "@imagekit/next/server";

export async function GET() {
  try {
    const authenticationParams = getUploadAuthParams({
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
    });

    return Response.json(authenticationParams);
  } catch (error) {
    return Response.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}