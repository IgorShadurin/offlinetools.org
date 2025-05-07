import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

import { FeedbackProvider } from "@/components/feedback-provider";
import { GoogleAnalytics } from "@/components/google-analytics";
import { StructuredData } from "@/components/structured-data";
import { generateMetadata, viewport } from "@/lib/metadata";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Use the metadata utility for consistent metadata
export const metadata: Metadata = generateMetadata();

// Export viewport configuration
export { viewport };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Improved meta viewport tag with best practices */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=5.0, minimum-scale=1.0, user-scalable=yes"
        />
        {/* Canonical URL to prevent duplicate content issues */}
        <link rel="canonical" href="https://offlinetools.org" />
        {/* Adding cache control directives */}
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <FeedbackProvider>{children}</FeedbackProvider>
        <Analytics />
        <GoogleAnalytics />
        <StructuredData />
      </body>
    </html>
  );
}
