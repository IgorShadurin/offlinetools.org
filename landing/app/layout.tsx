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
  title: "OfflineTools - All-in-one Toolbox for Developers",
  description: "A collection of essential offline developer tools to boost your productivity.",
  metadataBase: new URL("https://offlinetools.org"),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/images/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://offlinetools.org",
    title: "OfflineTools - All-in-one Toolbox for Developers",
    description: "A collection of essential offline developer tools to boost your productivity.",
    siteName: "OfflineTools",
    images: [
      {
        url: "/images/social-preview.png",
        width: 1200,
        height: 630,
        alt: "OfflineTools - All-in-one Toolbox for Developers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OfflineTools - All-in-one Toolbox for Developers",
    description: "A collection of essential offline developer tools to boost your productivity.",
    images: ["/images/social-preview.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
