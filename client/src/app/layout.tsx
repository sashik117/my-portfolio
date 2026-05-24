import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fullstack Developer Portfolio",
  description:
    "Premium interactive fullstack developer portfolio with CMS, animations, projects and contact integration.",
  keywords: [
    "fullstack developer",
    "portfolio",
    "React",
    "Next.js",
    "Node.js",
    "Express",
    "MongoDB"
  ],
  openGraph: {
    title: "Fullstack Developer Portfolio",
    description: "Building modern web and mobile experiences.",
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
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
