import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3178";
const title = "Oleksandra | Web, Mobile & Backend Builder";
const description =
  "Premium interactive fullstack portfolio by Oleksandra: React, Next.js, Node.js, Express, Laravel, Flutter, AI integrations, CMS, admin dashboard, and mobile-first UI.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Oleksandra Portfolio",
  title: {
    default: title,
    template: "%s | Oleksandra Portfolio"
  },
  description,
  keywords: [
    "Oleksandra",
    "fullstack developer",
    "junior fullstack developer",
    "web developer Ukraine",
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
  authors: [{ name: "Oleksandra", url: "https://github.com/sashik117" }],
  creator: "Oleksandra",
  publisher: "Oleksandra",
  alternates: {
    canonical: "/",
    languages: {
      "uk-UA": "/",
      "en-US": "/"
    }
  },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "Oleksandra Portfolio",
    locale: "uk_UA",
    alternateLocale: ["en_US"],
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Oleksandra fullstack developer portfolio preview"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.png"]
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  category: "technology"
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
