"use client";

import { useRecentlyVisitedTools } from "@/lib/hooks/useRecentlyVisitedTools";
import { useEffect } from "react";
import { usePathname } from 'next/navigation';

export const ToolVisitTracker: React.FC = () => {
  const { addTool } = useRecentlyVisitedTools();
  const pathname = usePathname();

  useEffect(() => {
    // Ensure this runs only on the client side and pathname is available
    if (pathname) { // `typeof window !== 'undefined'` is implicit in client components
      const title = document.title.replace(" | OfflineTools", "").replace("Offline Developer Tools for ", ""); // More robust title cleanup
      
      // Only add if it's a tool page (e.g. /tools/json-formatter)
      // and not the main /tools or /tools/ layout itself.
      // Also ensure title and url are not empty.
      if (pathname.startsWith("/tools/") && pathname !== "/tools/" && title && pathname) {
        addTool({ title, url: pathname });
      }
    }
  }, [pathname, addTool]); // Rerun effect if pathname or addTool changes

  return null; // This component does not render anything visible
};
