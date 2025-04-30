import JsonFormatter from "./JsonFormatter"
import { StructuredData } from "@/components/structured-data"
import { generateMetadata, toolDescriptions, toolTitles } from "@/lib/metadata"

export const metadata = generateMetadata({
  title: toolTitles.jsonFormatter.base,
  description: toolDescriptions.jsonFormatter,
  openGraph: {
    title: toolTitles.jsonFormatter.extended,
    description: toolDescriptions.jsonFormatter,
  },
  twitter: {
    title: toolTitles.jsonFormatter.extended,
    description: toolDescriptions.jsonFormatter,
  }
})

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