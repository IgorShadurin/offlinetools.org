import React, { useEffect, useState } from "react";
import { Clipboard, FileTypeIcon, RefreshCwIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Alert, AlertDescription } from "./ui/alert";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import { ClipboardType, Tool, detectClipboardTools } from "../../../shared";

/**
 * Clipboard Detector component props
 */
interface ClipboardDetectorProps {
  className?: string;
  onSelectTool?: (toolId: string) => void;
}

/**
 * Check if the clipboard API is available
 * @returns Whether the clipboard API is available
 */
function isClipboardAvailable(): boolean {
  return !!(window as any).electron && !!(window as any).electron.clipboard;
}

/**
 * Mapping of tool IDs to app's sidebar tool IDs
 */
const TOOL_ID_MAPPING: Record<string, string> = {
  [Tool.JSON_FORMATTER]: "json-formatter",
  [Tool.BASE64_CODEC]: "base64-string",
  [Tool.URL_ENCODER]: "url-encoder",
};

/**
 * List of implemented tools in the desktop app
 */
const IMPLEMENTED_TOOLS = [
  Tool.JSON_FORMATTER,
  Tool.BASE64_CODEC,
  Tool.URL_ENCODER,
];

/**
 * Check if string is valid JSON
 * @param str - String to check
 * @returns Whether the string is valid JSON
 */
function isValidJson(str: string): boolean {
  if (!str) return false;
  try {
    // Try to parse as JSON
    JSON.parse(str);
    // Check if it starts with { or [ to avoid treating simple numbers or booleans as JSON
    const trimmed = str.trim();
    return (trimmed.startsWith('{') && trimmed.endsWith('}')) || 
           (trimmed.startsWith('[') && trimmed.endsWith(']'));
  } catch (e) {
    return false;
  }
}

/**
 * Clipboard Detector component for detecting clipboard content and suggesting tools
 * @param props - Clipboard Detector component props
 * @returns Clipboard Detector component
 */
export function ClipboardDetector({ className, onSelectTool }: ClipboardDetectorProps) {
  const [clipboardContent, setClipboardContent] = useState<string>("");
  const [clipboardType, setClipboardType] = useState<ClipboardType>("string");
  const [suggestedTools, setSuggestedTools] = useState<Tool[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Get the tool name from its ID
   * @param toolId - Tool ID
   * @returns Tool name
   */
  const getToolName = (toolId: string): string => {
    const toolNames: Record<string, string> = {
      [Tool.JSON_FORMATTER]: "JSON Formatter",
      [Tool.BASE64_CODEC]: "Base64 Encoder/Decoder",
      [Tool.BINARY_BASE64_CODEC]: "Binary Base64 Encoder/Decoder",
      [Tool.FILE_HASH_COMPARE]: "File Hash Compare",
      [Tool.TEXT_HASH_GENERATOR]: "Text Hash Generator",
      [Tool.URL_ENCODER]: "URL Encoder/Decoder",
    };
    
    return toolNames[toolId] || toolId;
  };

  /**
   * Handle tool selection and map tool IDs to app's sidebar tool IDs
   * @param toolId - Tool ID from the shared enum
   */
  const handleToolSelect = (toolId: Tool) => {
    const appToolId = TOOL_ID_MAPPING[toolId];
    if (appToolId && onSelectTool) {
      // Set the clipboard content in localStorage so the target tool can use it
      if (clipboardContent && clipboardType === "string") {
        localStorage.setItem('clipboard-content-for-tool', clipboardContent);
      }
      onSelectTool(appToolId);
    }
  };

  /**
   * Read text from clipboard safely with async handling
   * @returns Promise with the clipboard text content
   */
  const readClipboardText = async (): Promise<string> => {
    if (!isClipboardAvailable()) {
      return "";
    }
    
    try {
      // Access the clipboard API through the electron bridge
      const text = await (window as any).electron.clipboard.readText();
      return text || "";
    } catch (error) {
      console.error('Error reading text:', (error as Error).message);
      return "";
    }
  };

  /**
   * Read clipboard content and detect content type and suggested tools
   */
  const readClipboard = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Check if clipboard API is available
      if (!isClipboardAvailable()) {
        throw new Error("Clipboard API not available. Make sure the app is running in Electron environment.");
      }
      
      // Use Electron's clipboard API
      const electronClipboard = (window as any).electron.clipboard;
      let formats: string[] = [];
      let textContent = "";
      
      try {
        // Get available formats - this is async
        formats = await electronClipboard.availableFormats();
        
        // Detect content type from clipboard
        if (formats.includes("image/png")) {
          setClipboardType("photo");
          setClipboardContent("[Image data]");
        } else if (formats.some((format: string) => format.startsWith("video/"))) {
          setClipboardType("video");
          setClipboardContent("[Video data]");
        } else {
          // Read text directly - this is async
          textContent = await readClipboardText();
          setClipboardType("string");
          setClipboardContent(textContent);
        }
      } catch (clipboardError) {
        // Try a fallback approach - just attempt to read text directly
        textContent = await readClipboardText();
        if (textContent) {
          setClipboardType("string");
          setClipboardContent(textContent);
        } else {
          throw new Error(`Clipboard operation failed: ${(clipboardError as Error).message}`);
        }
      }
      
      // Find compatible tools based on updated content values
      const clipboardData = {
        type: clipboardType,
        content: clipboardType === "string" ? textContent : undefined
      };
      
      // Get compatible tools from the detector
      let compatibleTools = detectClipboardTools(clipboardData);
      
      // Filter to only include implemented tools
      compatibleTools = compatibleTools.filter(tool => IMPLEMENTED_TOOLS.includes(tool));
      
      setSuggestedTools(compatibleTools);
    } catch (error) {
      setError(`Failed to read clipboard: ${(error as Error).message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Read clipboard content on component mount
  useEffect(() => {
    readClipboard();
  }, []);

  return (
    <div className={`p-4 h-full flex flex-col ${className}`}>
      <Card className="flex-1 flex flex-col">
        <CardHeader className="pb-3">
          <div className="flex flex-row items-center justify-between">
            <CardTitle>Clipboard Detector</CardTitle>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={readClipboard}
              disabled={isLoading}
              title="Refresh clipboard content"
            >
              <RefreshCwIcon size={16} className={cn("mr-2", isLoading && "animate-spin")} />
              Refresh
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col gap-4">
          {error ? (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : (
            <>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2">
                  <Clipboard size={16} className="opacity-70" />
                  <h3 className="text-sm font-medium">Detected Content Type:</h3>
                  <Badge variant="outline" className="capitalize">
                    {clipboardType}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <h3 className="text-sm font-medium">Content Preview:</h3>
                <div className="border rounded-md p-3 bg-muted/30 font-mono text-sm overflow-auto max-h-[200px]">
                  {clipboardType === "string" ? (
                    clipboardContent ? clipboardContent : <span className="text-muted-foreground italic">No text content</span>
                  ) : (
                    <div className="flex items-center gap-2">
                      <FileTypeIcon size={16} />
                      <span>{clipboardContent}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Suggested Tools:</h3>
                {suggestedTools.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {suggestedTools.map((tool) => (
                      <Button
                        key={tool}
                        variant="outline"
                        className="justify-start text-left h-auto py-3"
                        onClick={() => handleToolSelect(tool)}
                      >
                        <span>{getToolName(tool)}</span>
                      </Button>
                    ))}
                  </div>
                ) : (
                  <div className="text-muted-foreground italic">
                    No tools found for this content type
                  </div>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 