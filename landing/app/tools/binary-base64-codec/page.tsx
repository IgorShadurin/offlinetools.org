import BinaryBase64Codec from "./BinaryBase64Codec";
import { StructuredData } from "@/components/structured-data";
import { generateMetadata, toolDescriptions, toolTitles } from "@/lib/metadata";

export const metadata = generateMetadata({
  title: toolTitles.binaryBase64Codec.base,
  description: toolDescriptions.binaryBase64Codec,
  openGraph: {
    title: toolTitles.binaryBase64Codec.extended,
    description: toolDescriptions.binaryBase64Codec,
  },
  twitter: {
    title: toolTitles.binaryBase64Codec.extended,
    description: toolDescriptions.binaryBase64Codec,
  },
});

export default function BinaryBase64CodecPage() {
  return (
    <>
      <StructuredData
        type="tool"
        toolName="Binary Base64 Encoder/Decoder"
        toolDescription="Convert binary files (images, PDFs, etc.) to Base64 or decode Base64 to binary files with URL-safe option. All processing happens locally on your device."
        toolUrl="/tools/binary-base64-codec"
        toolCategory="DeveloperTool"
      />
      <BinaryBase64Codec />
    </>
  );
}
