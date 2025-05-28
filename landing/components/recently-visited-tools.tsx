"use client";

import { useRecentlyVisitedTools, RecentTool } from '@/lib/hooks/useRecentlyVisitedTools';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Trash2, History } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const RecentlyVisitedTools: React.FC = () => {
  const { tools, clearTools, isLoading } = useRecentlyVisitedTools();

  if (isLoading) {
    return (
      <div className="mt-8 p-4 border rounded-lg shadow-sm bg-background">
        <p className="text-muted-foreground">Loading recent tools...</p>
      </div>
    );
  }

  if (tools.length === 0) {
    return null;
  }

  const handleClearTools = () => {
    clearTools();
  };

  return (
    <div className="mt-8 p-4 border rounded-lg shadow-sm bg-background">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <History className="w-5 h-5 mr-2 text-primary" />
          Recently Visited Tools
        </h3>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" size="sm" disabled={tools.length === 0}>
              <Trash2 className="w-4 h-4 mr-1" /> Clear All
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action will clear all your recently visited tools. This cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleClearTools}>
                Clear
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <ul className="space-y-2">
        {tools.map((tool) => (
          <li key={tool.url}>
            <Link href={tool.url} className="text-sm text-blue-600 hover:underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
              {tool.title || 'Untitled Tool'}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
