import { useState, useEffect, useCallback } from 'react';

const MAX_RECENT_TOOLS = 10;
const LOCAL_STORAGE_KEY = 'recentlyVisitedTools';

export interface RecentTool {
  title: string;
  url: string;
}

interface UseRecentlyVisitedTools {
  tools: RecentTool[];
  addTool: (tool: RecentTool) => void;
  clearTools: () => void;
  isLoading: boolean;
}

export const useRecentlyVisitedTools = (): UseRecentlyVisitedTools => {
  const [tools, setTools] = useState<RecentTool[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Ensure this only runs on the client-side
    if (typeof window !== 'undefined') {
      try {
        const storedTools = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedTools) {
          setTools(JSON.parse(storedTools));
        }
      } catch (error) {
        console.error('Error reading from localStorage:', error);
        // Optionally, clear localStorage if it's corrupted
        // localStorage.removeItem(LOCAL_STORAGE_KEY);
      } finally {
        setIsLoading(false);
      }
    } else {
        // Still set loading to false if window is not defined (e.g. SSR)
        setIsLoading(false);
    }
  }, []);

  const saveTools = useCallback((updatedTools: RecentTool[]) => {
    // Ensure this only runs on the client-side
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTools));
      } catch (error) {
        console.error('Error writing to localStorage:', error);
      }
    }
  }, []);

  const addTool = useCallback((tool: RecentTool) => {
    if (typeof window === 'undefined') return; // Don't run on server

    setTools(prevTools => {
      // Remove any existing tool with the same URL to avoid duplicates and move it to the top
      const filteredTools = prevTools.filter(t => t.url !== tool.url);
      const updatedTools = [tool, ...filteredTools].slice(0, MAX_RECENT_TOOLS);
      saveTools(updatedTools);
      return updatedTools;
    });
  }, [saveTools]);

  const clearTools = useCallback(() => {
    if (typeof window === 'undefined') return; // Don't run on server

    setTools([]);
    saveTools([]);
  }, [saveTools]);

  return { tools, addTool, clearTools, isLoading };
};
