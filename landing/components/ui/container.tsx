import { cn } from "@/lib/utils";
import React from "react";

/**
 * Container component for layout consistency with responsive padding
 */
export function Container({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mx-auto w-full max-w-screen-xl px-4 md:px-6 lg:px-8", className)} {...props} />;
}
