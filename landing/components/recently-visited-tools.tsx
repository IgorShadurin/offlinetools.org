"use client";

import { useRecentlyVisitedTools } from '@/lib/hooks/useRecentlyVisitedTools';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Trash2, History } from 'lucide-react';

export const RecentlyVisitedTools: React.FC = () => {
  const { tools, clearTools, isLoading } = useRecentlyVisitedTools();

  if (isLoading) {
    return null;
  }

  if (tools.length === 0) {
    return null;
  }

  const handleClearToolsWithConfirm = () => {
    if (window.confirm("Are you sure you want to clear all recently visited tools? This action cannot be undone.")) {
      clearTools();
    }
  };

  return (
    <div className="mt-8 p-4 border rounded-lg shadow-sm bg-background">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <History className="w-5 h-5 mr-2 text-primary" />
          Recently Visited Tools
        </h3>
        <Button variant="outline" size="sm" disabled={tools.length === 0} onClick={handleClearToolsWithConfirm}>
          <Trash2 className="w-4 h-4 mr-1" /> Clear All
        </Button>
      </div>
      {/* Horizontal list using flexbox */}
      <div className="flex flex-wrap gap-2"> {/* 'flex-wrap' allows items to wrap to next line if space is tight, 'gap-2' adds space between items */}
        {tools.map((tool) => (
          <Link
            key={tool.url}
            href={tool.url}
            className="inline-block bg-muted hover:bg-muted/80 text-muted-foreground text-sm px-3 py-1 rounded-full transition-colors whitespace-nowrap" // Badge-like styling
          >
            {tool.title || 'Untitled Tool'}
          </Link>
        ))}
      </div>
    </div>
  );
};
