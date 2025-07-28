import Base64Codec from "./Base64Codec";
import { StructuredData } from "@/components/structured-data";
import { generateToolMetadata } from "@/lib/metadata";

// Use enhanced tool metadata with comprehensive SEO
export const metadata = generateToolMetadata(
  "base64Codec",
  "Base64 Encoder/Decoder - Convert Text to Base64 Online",
  "Convert text to Base64 or decode Base64 to plaintext with URL-safe option. Securely process data in your browser without server communication. Essential for web developers handling encoded data and API authentication.",
  "/tools/base64-codec"
);

export default function Base64CodecPage() {
  return (
    <>
      <StructuredData
        type="tool"
        toolName="Base64 Encoder/Decoder"
        toolDescription="Convert text to Base64 or decode Base64 to plaintext with URL-safe option and privacy-first processing."
        toolUrl="/tools/base64-codec"
        toolCategory="DeveloperTool"
      />
      <Base64Codec />
    </>
  );
}
