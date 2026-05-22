"use client";

import { FormEvent, useMemo, useState } from "react";
import type { ThumbnailResponse } from "@/lib/youtube";
import { extractVideoId } from "@/lib/youtube";

type Status = "idle" | "loading" | "ready" | "error";

export default function HomePage() {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [thumbnail, setThumbnail] = useState<ThumbnailResponse | null>(null);

  const videoId = useMemo(() => extractVideoId(url), [url]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setThumbnail(null);

    if (!videoId) {
      setStatus("error");
      setMessage("Please enter a valid YouTube video URL.");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch(`/api/thumbnail?url=${encodeURIComponent(url)}`);
      const data = (await response.json()) as ThumbnailResponse | { error: string };

      if (!response.ok || "error" in data) {
        throw new Error("error" in data ? data.error : "Unable to get thumbnail.");
      }

      setThumbnail(data);
      setStatus("ready");
      setMessage(`Showing ${data.quality}.`);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to get thumbnail.");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl">
        <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
            YouTube Thumbnail Downloader
          </h1>
          <p className="mt-3 text-base text-gray-600">
            Paste a YouTube video URL to get the highest quality thumbnail available.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row">
          <label htmlFor="youtube-url" className="sr-only">
            YouTube URL
          </label>
          <input
            id="youtube-url"
            type="text"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className="min-h-12 flex-1 rounded-md border border-gray-300 px-4 text-gray-950 outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="min-h-12 rounded-md bg-gray-950 px-5 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-500"
          >
            {status === "loading" ? "Loading..." : "Get Thumbnail"}
          </button>
        </form>

        {message ? (
          <p
            className={`mt-4 text-sm ${
              status === "error" ? "text-red-600" : "text-gray-600"
            }`}
            role={status === "error" ? "alert" : "status"}
          >
            {message}
          </p>
        ) : null}

        {thumbnail ? (
          <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-4">
            <img
              src={thumbnail.thumbnailUrl}
              alt="YouTube thumbnail preview"
              className="aspect-video w-full rounded-md border border-gray-200 bg-gray-100 object-cover"
            />

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={thumbnail.downloadUrl}
                className="inline-flex min-h-11 items-center justify-center rounded-md bg-gray-950 px-5 font-semibold text-white transition hover:bg-gray-800"
                download
              >
                Download Thumbnail
              </a>
            </div>

            <div className="mt-4">
              <label htmlFor="direct-link" className="mb-2 block text-sm font-medium text-gray-700">
                Direct image link
              </label>
              <input
                id="direct-link"
                value={thumbnail.thumbnailUrl}
                readOnly
                onFocus={(event) => event.currentTarget.select()}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-3 text-sm text-gray-700"
              />
            </div>
          </div>
        ) : null}
        </section>
        <p className="mt-4 text-center text-sm text-gray-500">Made by Ash</p>
      </div>
    </main>
  );
}
