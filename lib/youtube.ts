export type ThumbnailQuality = {
  key: string;
  label: string;
  file: string;
  url: string;
};

export type ThumbnailResponse = {
  videoId: string;
  youtubeUrl: string;
  quality: string;
  thumbnailUrl: string;
  downloadUrl: string;
};

export const QUALITY_DEFS = [
  { key: "maxres", label: "Max Resolution", file: "maxresdefault.jpg" },
  { key: "sd", label: "Standard Definition", file: "sddefault.jpg" },
  { key: "hq", label: "High Quality", file: "hqdefault.jpg" },
  { key: "mq", label: "Medium Quality", file: "mqdefault.jpg" },
  { key: "default", label: "Default", file: "default.jpg" }
] as const;

export function extractVideoId(input: string): string | null {
  const value = input.trim();
  if (!value) return null;

  const direct = value.match(/^[a-zA-Z0-9_-]{11}$/);
  if (direct) return value;

  try {
    const url = new URL(value);
    const host = url.hostname.replace(/^m\./, "").replace(/^www\./, "");

    if (host === "youtu.be") {
      const id = url.pathname.split("/").filter(Boolean)[0];
      return isVideoId(id) ? id : null;
    }

    if (host === "youtube.com" || host.endsWith(".youtube.com")) {
      const fromQuery = url.searchParams.get("v");
      if (isVideoId(fromQuery)) return fromQuery;

      const parts = url.pathname.split("/").filter(Boolean);
      const markers = ["embed", "shorts", "live", "v"];
      const marker = parts.findIndex((part) => markers.includes(part));
      const candidate = marker >= 0 ? parts[marker + 1] : parts[0];
      return isVideoId(candidate) ? candidate : null;
    }
  } catch {
    const match = value.match(/(?:v=|youtu\.be\/|embed\/|shorts\/|live\/)([a-zA-Z0-9_-]{11})/);
    return match?.[1] ?? null;
  }

  return null;
}

export function buildThumbnailUrl(videoId: string, file: string) {
  return `https://img.youtube.com/vi/${videoId}/${file}`;
}

export function buildQualities(videoId: string): ThumbnailQuality[] {
  return QUALITY_DEFS.map((quality) => ({
    ...quality,
    url: buildThumbnailUrl(videoId, quality.file)
  }));
}

export function canonicalYoutubeUrl(videoId: string) {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

function isVideoId(value?: string | null): value is string {
  return Boolean(value && /^[a-zA-Z0-9_-]{11}$/.test(value));
}
