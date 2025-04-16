import { cn } from "@/lib/utils"
import Image from "next/image"
import React from "react"

/**
 * Feature item component for displaying individual product features
 */
export function FeatureItem({
  title,
  description,
  icon,
  className,
  ...props
}: {
  title: string
  description: string
  icon: string
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-col items-center md:items-start text-center md:text-left",
        className
      )}
      {...props}
    >
      <div className="mb-4 rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
        <Image
          src={icon}
          alt={`${title} icon`}
          width={48}
          height={48}
          className="h-12 w-12 object-contain"
        />
      </div>
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
} 