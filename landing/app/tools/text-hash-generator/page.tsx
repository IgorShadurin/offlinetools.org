import TextHashGenerator from "./TextHashGenerator"
import { StructuredData } from "@/components/structured-data"
import { generateMetadata, toolDescriptions, toolTitles } from "@/lib/metadata"

export const metadata = generateMetadata({
  title: toolTitles.textHashGenerator.base,
  description: toolDescriptions.textHashGenerator,
  openGraph: {
    title: toolTitles.textHashGenerator.extended,
    description: toolDescriptions.textHashGenerator,
  },
  twitter: {
    title: toolTitles.textHashGenerator.extended,
    description: toolDescriptions.textHashGenerator,
  }
})

export default function TextHashGeneratorPage() {
  return (
    <>
      <StructuredData 
        type="tool" 
        toolName={toolTitles.textHashGenerator.base}
        toolDescription={toolDescriptions.textHashGenerator}
        toolUrl="/tools/text-hash-generator"
        toolCategory="DeveloperTool"
      />
      <TextHashGenerator />
    </>
  )
} 