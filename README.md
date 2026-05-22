# YouTube Thumbnail Downloader

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-149ECA?style=for-the-badge&logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

A simple, fast, and responsive web app for downloading the highest quality available thumbnail from any YouTube video URL.

<p align="center">
  <a href="#features"><img src="https://img.shields.io/badge/View_Features-111827?style=for-the-badge" alt="View features"></a>
  <a href="#getting-started"><img src="https://img.shields.io/badge/Get_Started-2563EB?style=for-the-badge" alt="Get started"></a>
  <a href="#deployment"><img src="https://img.shields.io/badge/Deploy-16A34A?style=for-the-badge" alt="Deploy"></a>
</p>

## Overview

YouTube Thumbnail Downloader lets users paste a YouTube video URL and instantly fetch the best available thumbnail. If the max resolution thumbnail is unavailable, the app automatically falls back to the next available quality.

The interface is intentionally minimal: one input, one button, one preview, one download action, and one direct image link.

## Features

- Supports standard YouTube links
- Supports `youtu.be` short links
- Supports mobile, Shorts, embed, and live URL formats
- Automatically detects the YouTube video ID
- Fetches the highest available thumbnail
- Falls back when max resolution is unavailable
- Shows a clean thumbnail preview
- Provides a direct download button
- Provides the direct image URL
- Fully responsive layout
- Lightweight and fast

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS

## Getting Started

Clone the repository:

```bash
git clone https://github.com/your-username/youtube-thumbnail-downloader.git
cd youtube-thumbnail-downloader
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the app in your browser:

```text
http://localhost:3000
```

## Available Scripts

```bash
npm run dev
```

Runs the app in development mode.

```bash
npm run build
```

Creates a production build.

```bash
npm start
```

Starts the production server.

```bash
npm run lint
```

Runs lint checks.

```bash
npm run typecheck
```

Runs TypeScript checks.

## API Endpoint

The app includes a simple API endpoint:

```text
GET /api/thumbnail?url=YOUTUBE_URL
```

Example:

```text
/api/thumbnail?url=https://youtu.be/dQw4w9WgXcQ
```

Example response:

```json
{
  "videoId": "dQw4w9WgXcQ",
  "youtubeUrl": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "quality": "Max Resolution",
  "thumbnailUrl": "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
  "downloadUrl": "/api/thumbnail?url=https%3A%2F%2Fyoutu.be%2FdQw4w9WgXcQ&download=1"
}
```

To download the thumbnail:

```text
GET /api/thumbnail?url=YOUTUBE_URL&download=1
```

## Project Structure

```text
app/
  api/
    thumbnail/
      route.ts
  globals.css
  layout.tsx
  page.tsx
lib/
  youtube.ts
public/
package.json
tailwind.config.ts
tsconfig.json
```

## Deployment

The easiest way to deploy this project is with Vercel.

1. Push the project to GitHub.
2. Import the repository on Vercel.
3. Keep the default Next.js settings.
4. Deploy.

No environment variables are required.

## Author

Made by Ash

## License

This project is open for personal and educational use. Add your preferred license before publishing it publicly.
