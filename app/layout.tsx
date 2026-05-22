import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://youtube-thumbnail-downloader.local"),
  title: {
    default: "YouTube Thumbnail Downloader",
    template: "%s | YouTube Thumbnail Downloader"
  },
  description:
    "Download the highest quality available thumbnail from any YouTube video URL.",
  keywords: [
    "YouTube thumbnail downloader",
    "download YouTube thumbnail",
    "YouTube thumbnail",
    "maxresdefault"
  ],
  openGraph: {
    title: "YouTube Thumbnail Downloader",
    description: "Paste a YouTube URL and download the best available thumbnail.",
    type: "website"
  }
};

export const viewport: Viewport = {
  themeColor: "#f6f7f9",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  );
}
