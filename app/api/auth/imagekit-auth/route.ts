import { getUploadAuthParams } from "@imagekit/next/server";

export async function GET() {
  try {
    // (Optional) Add authentication check here
    // e.g., verify session if needed

    const authenticationParams = getUploadAuthParams({
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string, // Never expose this
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
    });

    return Response.json({
      ...authenticationParams,
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    });
  } catch (error) {
    return Response.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}