import React, { useMemo, useState } from "react"
import { LockKeyhole, Moon, Search, Sun } from "lucide-react"
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

export type ThemeMode = "light" | "dark"

/**
 * Sidebar component props
 */
interface SidebarProps {
  tools: Tool[]
  selectedTool: string
  onSelectTool: (toolId: string) => void
  onLockedToolClick?: (toolId: string) => void
  themeMode: ThemeMode
  onThemeModeChange: (mode: ThemeMode) => void
}

/**
 * Sidebar component with a list of tools
 * @param props - Sidebar component props
 * @returns Sidebar component
 */
export function Sidebar({
  tools,
  selectedTool,
  onSelectTool,
  onLockedToolClick,
  themeMode,
  onThemeModeChange,
}: SidebarProps) {
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
    <div className="w-64 border-r border-border/80 bg-background text-card-foreground h-screen overflow-y-auto shrink-0">
      <div className="p-2">
        <div className="mb-2 flex items-center gap-1 overflow-hidden rounded-xl border border-slate-200 bg-slate-100/80 p-0.5 dark:border-slate-600 dark:bg-slate-700/80">
          <button
            type="button"
            onClick={() => onThemeModeChange("light")}
            className={cn(
              "flex h-8 flex-1 items-center justify-center gap-1 rounded-lg px-2 py-1 text-xs font-medium transition-colors",
              themeMode === "light"
                ? "bg-white text-slate-900 shadow-sm dark:bg-slate-500 dark:text-white"
                : "text-slate-600 hover:bg-white/60 dark:text-slate-200 dark:hover:bg-slate-600/70",
            )}
          >
            <Sun className="h-3.5 w-3.5" />
            Light
          </button>
          <button
            type="button"
            onClick={() => onThemeModeChange("dark")}
            className={cn(
              "flex h-8 flex-1 items-center justify-center gap-1 rounded-lg px-2 py-1 text-xs font-medium transition-colors",
              themeMode === "dark"
                ? "bg-white text-slate-900 shadow-sm dark:bg-slate-500 dark:text-white"
                : "text-slate-600 hover:bg-white/60 dark:text-slate-200 dark:hover:bg-slate-600/70",
            )}
          >
            <Moon className="h-3.5 w-3.5" />
            Dark
          </button>
        </div>
        <label htmlFor="tool-search-sidebar" className="sr-only">
          Search tools
        </label>
        <div className="relative mb-1.5">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 dark:text-slate-300" />
          <input
            id="tool-search-sidebar"
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-9 w-full rounded-full border border-slate-200 bg-slate-100/80 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 dark:border-slate-600 dark:bg-slate-700/80 dark:text-slate-100 dark:placeholder:text-slate-300"
          />
        </div>
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
                "flex items-center w-full px-4 py-3 text-left text-sm font-medium transition-colors",
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
              <span className="min-w-0 flex-1 truncate">{tool.name}</span>
              {isLocked ? (
                <LockKeyhole className="ml-3 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              ) : null}
            </button>
          )
        })}
      </div>
    </div>
  )
}
