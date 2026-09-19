import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ALI : Anomali Pengubah Kepribadian — 2D Pixel Story Game",
  description: "Sebuah novel game story pixelated 2D interaktif untuk Ali, berlatar di Kantor, Cafe Little Cave, Tropodo, dan Malang.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
