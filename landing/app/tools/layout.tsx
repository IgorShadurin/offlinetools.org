"use client"; // Required for hooks like useEffect and accessing window object

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { generateMetadata } from "@/lib/metadata"; // Ensure this is the correct path if it was changed
import { useRecentlyVisitedTools } from "@/lib/hooks/useRecentlyVisitedTools";
import { useEffect } from "react";
import { usePathname } from 'next/navigation';

// Restore the metadata export
export const metadata = generateMetadata({
  title: {
    default: "Online Developer Tools",
    template: "%s | OfflineTools",
  },
  description:
    "Browse our collection of free, privacy-focused developer tools for JSON formatting, encoding, hashing, and more. All tools process data locally for enhanced security.",
  openGraph: {
    title: "Developer Tools Collection | OfflineTools",
    description:
      "Browse our collection of free, privacy-focused developer tools for JSON formatting, encoding, hashing, and more.",
  },
  twitter: {
    title: "Developer Tools Collection | OfflineTools",
    description:
      "Browse our collection of free, privacy-focused developer tools for JSON formatting, encoding, hashing, and more.",
  },
});

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  const { addTool } = useRecentlyVisitedTools();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined' && pathname) {
      const title = document.title.replace(" | OfflineTools", "");
      if (pathname.startsWith("/tools/") && pathname !== "/tools/") {
        addTool({ title, url: pathname });
      }
    }
  }, [pathname, addTool]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
