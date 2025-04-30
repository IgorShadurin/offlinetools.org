import JsonFormatter from "./JsonFormatter"
import { StructuredData } from "@/components/structured-data"

export const metadata = {
  title: "JSON Formatter",
  description: "Format and beautify your JSON with customizable indentation options.",
}

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
  )
} 