import React from "react";
import { cn } from "../../lib/utils";

/**
 * Badge component props
 */
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "destructive";
}

/**
 * Badge component for displaying status indicators
 * @param props - Badge component props
 * @returns Badge component
 */
export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2",
        {
          "border-transparent bg-primary text-primary-foreground": variant === "default",
          "border-transparent bg-secondary text-secondary-foreground": variant === "secondary",
          "border-current text-foreground": variant === "outline",
          "border-transparent bg-destructive text-destructive-foreground": variant === "destructive",
        },
        className
      )}
      {...props}
    />
  );
} 