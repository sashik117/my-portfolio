import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Oleksandra | Web, Mobile & Backend Builder",
  description:
    "Interactive portfolio of Oleksandra, a junior fullstack developer focused on UX, mobile-first interfaces, backend logic, and product thinking.",
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
    title: "Oleksandra | Web, Mobile & Backend Builder",
    description: "Junior fullstack developer building modern web and mobile experiences with clean UI/UX.",
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
