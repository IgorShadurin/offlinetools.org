import { cn } from "@/lib/utils";
import React from "react";

/**
 * Section component for content organization with optional heading
 */
export function Section({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <section className={cn("py-12 md:py-16 lg:py-20", className)} {...props} />;
}

/**
 * Section heading component with main title and optional description
 */
export function SectionHeading({
  title,
  description,
  className,
  ...props
}: {
  title: string;
  description?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mb-8 md:mb-12 text-center", className)} {...props}>
      <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-3">{title}</h2>
      {description && <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{description}</p>}
    </div>
  );
}
