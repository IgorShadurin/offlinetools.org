import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Textarea } from './ui/textarea'
import { cn } from '../lib/utils'

/**
 * Tool Placeholder component props
 */
interface ToolPlaceholderProps {
  title: string
  className?: string
}

/**
 * Tool Placeholder component for dummy tools
 * @param props - Tool Placeholder component props
 * @returns Tool Placeholder component
 */
export function ToolPlaceholder({ title, className }: ToolPlaceholderProps) {
  return (
    <Card className={cn("shadow-none border-0", className)}>
      <CardHeader className="pb-2 border-b">
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <Textarea
          placeholder="This tool is not implemented yet"
          readOnly
          className="font-mono h-[400px] resize-none border-muted mt-4"
        />
      </CardContent>
    </Card>
  )
} 