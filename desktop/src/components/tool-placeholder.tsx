import React from 'react'
import { LockKeyhole } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Textarea } from './ui/textarea'
import { cn } from '../lib/utils'

/**
 * Tool Placeholder component props
 */
interface ToolPlaceholderProps {
  title: string
  variant?: 'placeholder' | 'premium'
  className?: string
}

/**
 * Tool Placeholder component for dummy tools
 * @param props - Tool Placeholder component props
 * @returns Tool Placeholder component
 */
export function ToolPlaceholder({ title, variant = 'placeholder', className }: ToolPlaceholderProps) {
  if (variant === 'premium') {
    return (
      <Card className={cn("shadow-none border-0", className)}>
        <CardHeader className="pb-2 border-b">
          <CardTitle className="text-xl flex items-center gap-2">
            <LockKeyhole className="h-5 w-5 text-muted-foreground" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <Textarea
            value="This tool is available for premium users only."
            readOnly
            className="font-mono h-[140px] resize-none border-muted mt-4"
          />
        </CardContent>
      </Card>
    )
  }

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
