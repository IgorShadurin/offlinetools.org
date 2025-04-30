import Base64Codec from "./Base64Codec"
import { StructuredData } from "@/components/structured-data"

export const metadata = {
  title: "Base64 Encoder/Decoder",
  description: "Convert text to Base64 or decode Base64 to plaintext with URL-safe option.",
}

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