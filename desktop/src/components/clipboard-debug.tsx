import React, { useEffect, useState } from 'react';

/**
 * Interface for clipboard content information
 */
interface ClipboardContent {
  hasText: boolean;
  hasHtml: boolean;
  hasImage: boolean;
  formats: string[];
  text?: string;
}

/**
 * Props for the ClipboardDebug component
 */
interface ClipboardDebugProps {
  isVisible?: boolean;
}

/**
 * Component that displays debug information about the clipboard
 * @param {ClipboardDebugProps} props - Component props
 * @returns {React.ReactNode} ClipboardDebug component
 */
export const ClipboardDebug: React.FC<ClipboardDebugProps> = ({ isVisible = false }) => {
  const [clipboardContent, setClipboardContent] = useState<ClipboardContent>({
    hasText: false,
    hasHtml: false,
    hasImage: false,
    formats: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Refreshes clipboard content information
   */
  const refreshClipboardInfo = async () => {
    if (!window.electron?.clipboard) {
      setError('Electron clipboard API not available');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      // Get clipboard content information
      const content = await window.electron.clipboard.hasContent();
      const formats = await window.electron.clipboard.availableFormats();
      
      // Get text content if available
      let text = '';
      if (content.hasText) {
        text = await window.electron.clipboard.readText();
        // Truncate text for display
        if (text.length > 500) {
          text = text.substring(0, 500) + '...';
        }
      }
      
      setClipboardContent({
        ...content,
        formats,
        text,
      });
    } catch (error) {
      setError(`Error getting clipboard info: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setLoading(false);
    }
  };

  // Initial load and periodic refresh
  useEffect(() => {
    if (!isVisible) return;
    
    // Load clipboard info initially
    refreshClipboardInfo();
    
    // Set up interval to refresh clipboard info every 2 seconds
    const intervalId = setInterval(refreshClipboardInfo, 2000);
    
    // Clean up interval on unmount
    return () => {
      clearInterval(intervalId);
    };
  }, [isVisible]);

  // Don't render anything if not visible
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 right-0 p-4 bg-gray-800 text-white text-xs rounded-tl-lg max-w-md max-h-80 overflow-auto opacity-90">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold">Clipboard Debug</h3>
        <button 
          onClick={refreshClipboardInfo}
          className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Refresh'}
        </button>
      </div>
      
      {error && (
        <div className="text-red-400 mb-2">{error}</div>
      )}
      
      <div className="mb-2">
        <div><strong>Content types:</strong></div>
        <ul className="list-disc list-inside">
          <li>Text: {clipboardContent.hasText ? 'Yes' : 'No'}</li>
          <li>HTML: {clipboardContent.hasHtml ? 'Yes' : 'No'}</li>
          <li>Image: {clipboardContent.hasImage ? 'Yes' : 'No'}</li>
        </ul>
      </div>
      
      <div className="mb-2">
        <div><strong>Available formats:</strong></div>
        {clipboardContent.formats.length > 0 ? (
          <ul className="list-disc list-inside">
            {clipboardContent.formats.map((format, index) => (
              <li key={index}>{format}</li>
            ))}
          </ul>
        ) : (
          <div className="italic">No formats available</div>
        )}
      </div>
      
      {clipboardContent.hasText && clipboardContent.text && (
        <div>
          <div><strong>Text content:</strong></div>
          <pre className="bg-gray-700 p-2 rounded mt-1 overflow-x-auto">
            {clipboardContent.text}
          </pre>
        </div>
      )}
    </div>
  );
};

export default ClipboardDebug; 