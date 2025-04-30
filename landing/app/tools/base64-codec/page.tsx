import Base64Codec from "./Base64Codec"
import { StructuredData } from "@/components/structured-data"
import { generateMetadata, toolDescriptions, toolTitles } from "@/lib/metadata"

export const metadata = generateMetadata({
  title: toolTitles.base64Codec.base,
  description: toolDescriptions.base64Codec,
  openGraph: {
    title: toolTitles.base64Codec.extended,
    description: toolDescriptions.base64Codec,
  },
  twitter: {
    title: toolTitles.base64Codec.extended,
    description: toolDescriptions.base64Codec,
  }
})

export default function Base64CodecPage() {
  return (
    <>
      <StructuredData 
        type="tool" 
        toolName="Base64 Encoder/Decoder"
        toolDescription="Convert text to Base64 or decode Base64 to plaintext with URL-safe option. Process data directly in your browser with no server communication."
        toolUrl="/tools/base64-codec"
        toolCategory="DeveloperTool"
      />
      <Base64Codec />
    </>
  )
} 