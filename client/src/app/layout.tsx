import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Oleksandra | Fullstack Developer Portfolio",
  description:
    "Premium interactive portfolio of Oleksandra, a beginner fullstack developer from Ukraine.",
  keywords: [
    "fullstack developer",
    "portfolio",
    "React",
    "Next.js",
    "Node.js",
    "Express",
    "MongoDB",
    "Laravel",
    "PHP",
    "Flutter"
  ],
  openGraph: {
    title: "Oleksandra | Fullstack Developer Portfolio",
    description: "Beginner fullstack developer from Ukraine building modern web and mobile experiences.",
    type: "website"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#07090f"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
