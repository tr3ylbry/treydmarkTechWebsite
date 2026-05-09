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
    "Treydmark Tech helps small and medium-sized businesses modernize their websites, strengthen their brand, improve SEO, and generate more customer inquiries.",
  metadataBase: new URL("https://treydmarktech.com"),
  openGraph: {
    title: "Treydmark Tech | Modern Websites, Branding & SEO",
    description:
      "Modern websites, brand refinement, SEO foundations, and digital systems for small and medium-sized businesses.",
    type: "website",
    locale: "en_US",
    siteName: "Treydmark Tech",
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
