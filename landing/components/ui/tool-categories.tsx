"use client"

import { ReactNode } from "react"
import Link from "next/link"
import { Card } from "./card"
import { cn } from "@/lib/utils"

export interface ToolCategory {
  title: string
  slug: string
  description: string
  icon: ReactNode
  url: string
}

export interface ToolCategoriesProps {
  categories: ToolCategory[]
  baseUrl: string
  className?: string
  columns?: 2 | 3 | 4
}

/**
 * A reusable component for displaying tool categories in a grid layout.
 * Each category is represented as a card with an icon, title, and description.
 */
export function ToolCategories({
  categories,
  baseUrl,
  className,
  columns = 3,
}: ToolCategoriesProps) {
  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  }

  return (
    <div className={cn("w-full", className)}>
      <h2 className="text-2xl font-bold mb-6 text-center">Learn More About This Tool</h2>
      <div className={cn("grid gap-4", gridCols[columns])}>
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`${baseUrl}/${category.slug}`}
            className="block transition-transform hover:scale-[1.02] focus-visible:scale-[1.02]"
          >
            <Card className="h-full overflow-hidden hover:border-primary/50 transition-colors">
              <div className="p-6 flex flex-col h-full">
                <div className="mb-4 text-primary">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                <p className="text-muted-foreground text-sm flex-grow">
                  {category.description}
                </p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
} 