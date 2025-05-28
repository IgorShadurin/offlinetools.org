"use client"; // Required for hooks like useEffect and accessing window object

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { generateMetadata } from "@/lib/metadata";
import { useRecentlyVisitedTools } from "@/lib/hooks/useRecentlyVisitedTools"; // Import the hook
import { useEffect } from "react"; // Import useEffect
import { usePathname } from 'next/navigation'; // To get current path

// export const metadata = generateMetadata({ // Commenting out for now as generateMetadata might not be client compatible
//   title: {
//     default: "Online Developer Tools",
//     template: "%s | OfflineTools",
//   },
//   description:
//     "Browse our collection of free, privacy-focused developer tools for JSON formatting, encoding, hashing, and more. All tools process data locally for enhanced security.",
//   openGraph: {
//     title: "Developer Tools Collection | OfflineTools",
//     description:
//       "Browse our collection of free, privacy-focused developer tools for JSON formatting, encoding, hashing, and more.",
//   },
//   twitter: {
//     title: "Developer Tools Collection | OfflineTools",
//     description:
//       "Browse our collection of free, privacy-focused developer tools for JSON formatting, encoding, hashing, and more.",
//   },
// });

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  const { addTool } = useRecentlyVisitedTools();
  const pathname = usePathname();

  useEffect(() => {
    // Ensure this runs only on the client side and pathname is available
    if (typeof window !== 'undefined' && pathname) {
      // Attempt to get a more specific title if possible.
      // For now, document.title should provide a reasonable default.
      // We might need a more robust way if titles are not set quickly enough
      // or if a more specific title than the page title is needed.
      const title = document.title.replace(" | OfflineTools", ""); // Clean up title
      
      // Only add if it's a tool page (e.g. /tools/json-formatter)
      // and not the main /tools page
      if (pathname.startsWith("/tools/") && pathname !== "/tools/") {
        addTool({ title, url: pathname });
      }
    }
  }, [pathname, addTool]); // Rerun effect if pathname or addTool changes

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
