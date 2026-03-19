import React, { useMemo, useState } from "react"
import { LockKeyhole } from "lucide-react"
import { cn } from "../lib/utils"

/**
 * Tool type definition
 */
export type Tool = {
  id: string
  name: string
  icon: React.ReactNode
  tier: "free" | "premium" | "internal"
  hidden?: boolean
}

/**
 * Sidebar component props
 */
interface SidebarProps {
  tools: Tool[]
  selectedTool: string
  onSelectTool: (toolId: string) => void
  onLockedToolClick?: (toolId: string) => void
}

/**
 * Sidebar component with a list of tools
 * @param props - Sidebar component props
 * @returns Sidebar component
 */
export function Sidebar({ tools, selectedTool, onSelectTool, onLockedToolClick }: SidebarProps) {
  const [query, setQuery] = useState("")

  const filteredTools = useMemo(() => {
    const lowerQuery = query.toLowerCase()
    if (!lowerQuery) {
      return tools
    }
    return tools.filter((tool) =>
      tool.name.toLowerCase().includes(lowerQuery),
    )
  }, [tools, query])

  return (
    <div className="w-64 border-r border-border bg-card/50 text-card-foreground h-screen overflow-y-auto shrink-0">
      <div className="p-2">
        <label htmlFor="tool-search-sidebar" className="sr-only">
          Search tools
        </label>
        <input
          id="tool-search-sidebar"
          type="text"
          placeholder="Search tools..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="mb-2 h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />
      </div>
      <div className="py-2">
        {filteredTools.map((tool) => {
          const isLocked = tool.tier === "premium"
          return (
            <button
              key={tool.id}
              onClick={() => {
                if (isLocked) {
                  onLockedToolClick?.(tool.id)
                  return
                }
                onSelectTool(tool.id)
              }}
              aria-disabled={isLocked}
              className={cn(
                "flex items-center w-full px-4 py-3 text-sm font-medium transition-colors",
                "whitespace-nowrap overflow-hidden text-ellipsis",
                isLocked
                  ? "text-muted-foreground/70 border-l-2 border-l-transparent cursor-not-allowed opacity-70 bg-transparent"
                  : "hover:bg-muted/50",
                !isLocked && selectedTool === tool.id
                  ? "bg-primary/10 text-primary border-l-2 border-l-primary"
                  : "text-foreground border-l-2 border-l-transparent",
              )}
            >
              <span className="mr-3 flex h-5 w-5 items-center justify-center">
                {tool.icon}
              </span>
              <span className="truncate">{tool.name}</span>
              {isLocked ? (
                <LockKeyhole className="ml-2 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              ) : null}
            </button>
          )
        })}
      </div>
    </div>
  )
}
