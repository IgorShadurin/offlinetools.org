import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { ElementType } from "react";

/**
 * Feature item component for displaying individual product features
 */
export function FeatureItem({
  title,
  description,
  icon,
  className,
  children,
  ...props
}: {
  title: string;
  description: string;
  icon: ElementType;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) {
  const IconComponent = icon;
  return (
    <div className={cn("flex flex-col items-center md:items-start text-center md:text-left", className)} {...props}>
      <div className="mb-4 rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
        <IconComponent className="h-12 w-12 object-contain" />
      </div>
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
      {children}
    </div>
  );
}
