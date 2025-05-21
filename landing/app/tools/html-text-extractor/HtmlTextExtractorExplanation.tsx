export default function HtmlTextExtractorExplanation() {
  return (
    <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm space-y-6">
      <h2 className="text-2xl font-bold">About HTML Text Extractor</h2>
      
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">Tool Capabilities</h3>
        <p>
          The HTML Text Extractor tool converts HTML content into plain text while preserving the important information and structure. 
          It strips away HTML tags and formatting while giving you control over how specific elements like links and images are handled.
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Extract clean, readable text from any HTML content</li>
          <li>Customize how links are processed (remove, keep text only, or show as markdown)</li>
          <li>Control image handling (remove completely or include alt text)</li>
          <li>Preserve or ignore original newlines from the HTML</li>
          <li>Set maximum line length with automatic wordwrap</li>
        </ul>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">Common Use Cases</h3>
        <ol className="list-decimal pl-6 space-y-3">
          <li>
            <strong>Content Migration</strong>
            <p>Extract clean text from HTML when migrating content between different systems or formats.</p>
          </li>
          <li>
            <strong>Web Scraping</strong>
            <p>Convert scraped HTML content into plain text for analysis, processing, or storage.</p>
          </li>
          <li>
            <strong>Email Template Processing</strong>
            <p>Create plain text versions of HTML email templates for email clients that don't support HTML.</p>
          </li>
          <li>
            <strong>Accessibility Improvements</strong>
            <p>Extract text content from web pages to create more accessible versions or for screen readers.</p>
          </li>
          <li>
            <strong>Content Analysis</strong>
            <p>Remove HTML markup to perform text analysis, keyword extraction, or sentiment analysis on the content.</p>
          </li>
          <li>
            <strong>Data Cleaning</strong>
            <p>Clean up HTML-formatted data from databases or APIs for use in plain text contexts.</p>
          </li>
          <li>
            <strong>Documentation Generation</strong>
            <p>Convert HTML documentation to plain text format for inclusion in README files or command-line help.</p>
          </li>
        </ol>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">Technical Details</h3>
        <p>
          The HTML Text Extractor uses a specialized HTML parsing algorithm that maintains the semantic structure of the content while removing markup.
          It handles various HTML elements differently to preserve their meaning:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Headings are preserved with appropriate spacing</li>
          <li>Lists are formatted with proper indentation and bullets/numbers</li>
          <li>Tables are converted to a readable text format</li>
          <li>Block elements like paragraphs and divs are separated by newlines</li>
          <li>HTML entities are properly decoded to their corresponding characters</li>
        </ul>
        <p className="mt-2">
          The tool processes HTML content entirely in your browser, ensuring your data never leaves your device.
          This makes it suitable for working with sensitive or confidential information.
        </p>
      </div>
    </div>
  );
}
