import type { Metadata } from "next";
import "./globals.css";
import MotionSystem from "./motion-system";

export const metadata: Metadata = {
  title: "Alifway Media — Vision in Motion",
  description: "Alifway Media is a premium media production agency shaping cinematic images, post-production and brand narratives.",
  icons: {
    icon: "/assets/alifway_media_dark_purple_monogram_transparent.png",
    apple: "/assets/alifway_media_dark_purple_monogram_transparent.png",
  },
  other: { "codex-preview": "development" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/assets/Alifway Media - Logo new (3).png" as="image" />
        <link rel="preload" href="/assets/alifway_media_white_monogram_transparent.png" as="image" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600&family=Syne:wght@500;600&display=swap" rel="stylesheet" />
      </head>
      <body><MotionSystem />{children}</body>
    </html>
  );
}
