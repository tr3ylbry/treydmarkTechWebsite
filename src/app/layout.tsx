import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Treydmark Tech | Modern Websites, Branding & SEO",
  description:
    "Treydmark Tech helps small and medium-sized businesses build sharper websites, a stronger brand, and a clean digital foundation that will turn visitors into customers.",
  metadataBase: new URL("https://treydmarktech.com"),
  openGraph: {
    title: "Treydmark Tech | Modern Websites, Branding & SEO",
    description:
      "Modern websites, brand refinement, SEO foundations, and digital systems for small and medium-sized businesses.",
    type: "website",
    locale: "en_US",
    siteName: "Treydmark Tech",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#e8bca6" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
