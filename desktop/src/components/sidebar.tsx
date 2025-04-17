import React from "react"
import { cn } from "../lib/utils"

/**
 * Tool type definition
 */
export type Tool = {
  id: string
  name: string
  icon: React.ReactNode
}

/**
 * Sidebar component props
 */
interface SidebarProps {
  tools: Tool[]
  selectedTool: string
  onSelectTool: (toolId: string) => void
}

/**
 * Sidebar component with a list of tools
 * @param props - Sidebar component props
 * @returns Sidebar component
 */
export function Sidebar({ tools, selectedTool, onSelectTool }: SidebarProps) {
  return (
    <div className="w-64 border-r border-border bg-card/50 text-card-foreground h-screen overflow-y-auto shrink-0">
      <div className="py-2">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => onSelectTool(tool.id)}
            className={cn(
              "flex items-center w-full px-4 py-3 text-sm font-medium transition-colors",
              "hover:bg-muted/50 whitespace-nowrap overflow-hidden text-ellipsis",
              selectedTool === tool.id 
                ? "bg-primary/10 text-primary border-l-2 border-l-primary" 
                : "text-foreground border-l-2 border-l-transparent"
            )}
          >
            <span className="mr-3 flex h-5 w-5 items-center justify-center">
              {tool.icon}
            </span>
            <span className="truncate">{tool.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
} 