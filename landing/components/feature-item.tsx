import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

/**
 * Feature item component for displaying individual product features
 */
export function FeatureItem({
  title,
  description,
  icon,
  href,
  external,
  className,
  children,
  ...props
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  href?: string;
  external?: boolean;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) {
  const Wrapper = ({ children: content }: { children: React.ReactNode }) => {
    if (!href) return <>{content}</>;
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-primary">
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className="transition-colors hover:text-primary">
        {content}
      </Link>
    );
  };

  return (
    <div className={cn("flex flex-col items-center md:items-start text-center md:text-left", className)} {...props}>
      <div className="mb-4 rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
        <Wrapper>
          <span className="h-12 w-12 inline-flex items-center justify-center text-2xl" aria-label={title}>
            {icon}
          </span>
        </Wrapper>
      </div>
      <h3 className="mb-2 text-xl font-semibold">
        <Wrapper>{title}</Wrapper>
      </h3>
      <p className="text-muted-foreground">{description}</p>
      {children}
    </div>
  );
}
