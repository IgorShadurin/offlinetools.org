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
    if (typeof window !== 'undefined') {
      try {
        const storedTools = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedTools) {
          setTools(JSON.parse(storedTools));
        }
      } catch (error) {
        console.error('Error reading from localStorage:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
        setIsLoading(false);
    }
  }, []);

  const saveTools = useCallback((updatedTools: RecentTool[]) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTools));
      } catch (error) {
        console.error('Error writing to localStorage:', error);
      }
    }
  }, []);

  const addTool = useCallback((tool: RecentTool) => {
    if (typeof window === 'undefined') return;

    setTools(prevTools => {
      const filteredTools = prevTools.filter(t => t.url !== tool.url);
      const updatedTools = [tool, ...filteredTools].slice(0, MAX_RECENT_TOOLS);
      saveTools(updatedTools);
      return updatedTools;
    });
  }, [saveTools]);

  const clearTools = useCallback(() => {
    if (typeof window === 'undefined') return;

    setTools([]);
    saveTools([]); // Clears it from localStorage by saving an empty array
  }, [saveTools]);

  return { tools, addTool, clearTools, isLoading };
};
