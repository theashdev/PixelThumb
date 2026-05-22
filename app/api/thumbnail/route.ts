import { NextRequest, NextResponse } from "next/server";
import { buildQualities, canonicalYoutubeUrl, extractVideoId } from "@/lib/youtube";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url") ?? "";
  const shouldDownload = request.nextUrl.searchParams.get("download") === "1";
  const videoId = extractVideoId(url);

  if (!videoId) {
    return NextResponse.json({ error: "A valid YouTube video URL or ID is required." }, { status: 400 });
  }

  const qualities = buildQualities(videoId);
  const best = await findBestThumbnail(qualities);

  if (shouldDownload) {
    const image = await fetch(best.url, { cache: "no-store" });
    if (!image.ok || !image.body) {
      return NextResponse.json({ error: "Thumbnail image is unavailable." }, { status: 404 });
    }
    return new NextResponse(image.body, {
      headers: {
        "Content-Type": image.headers.get("content-type") ?? "image/jpeg",
        "Content-Disposition": `attachment; filename="youtube-thumbnail-${videoId}.jpg"`,
        "Cache-Control": "public, max-age=86400"
      }
    });
  }

  const apiUrl = `/api/thumbnail?url=${encodeURIComponent(url || videoId)}&download=1`;
  return NextResponse.json(
    {
      videoId,
      youtubeUrl: canonicalYoutubeUrl(videoId),
      quality: best.label,
      thumbnailUrl: best.url,
      downloadUrl: apiUrl
    },
    {
      headers: {
        "Cache-Control": "public, max-age=300, stale-while-revalidate=86400"
      }
    }
  );
}

async function findBestThumbnail(qualities: ReturnType<typeof buildQualities>) {
  for (const quality of qualities) {
    if (await isRealThumbnail(quality.url)) return quality;
  }
  return qualities[qualities.length - 1];
}

async function isRealThumbnail(url: string) {
  try {
    const response = await fetch(url, { method: "HEAD", cache: "no-store" });
    const length = Number(response.headers.get("content-length") ?? "0");
    return response.ok && (length === 0 || length > 1000);
  } catch {
    return false;
  }
}
