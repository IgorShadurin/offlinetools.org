import JsonFormatter from "./JsonFormatter";
import { StructuredData } from "@/components/structured-data";
import { generateToolMetadata } from "@/lib/metadata";

// Use enhanced tool metadata with comprehensive SEO
export const metadata = generateToolMetadata(
  "jsonFormatter",
  "JSON Formatter - Format and Validate JSON Online",
  "Format, validate, and beautify JSON data with syntax highlighting and error detection. All processing happens locally for enhanced privacy and security. Perfect for developers working with APIs, configuration files, and data structures.",
  "/tools/json-formatter"
);

export default function JsonFormatterPage() {
  return (
    <>
      <StructuredData
        type="tool"
        toolName="JSON Formatter"
        toolDescription="Format, validate, and beautify JSON data with customizable indentation options for better readability and debugging."
        toolUrl="/tools/json-formatter"
        toolCategory="DeveloperTool"
      />
      <JsonFormatter />
    </>
  );
}
