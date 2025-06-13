import QrCodeTool from "./QrCodeTool";
import { StructuredData } from "@/components/structured-data";
import { generateMetadata, toolDescriptions, toolTitles } from "@/lib/metadata";

export const metadata = generateMetadata({
  title: toolTitles.qrCode.base,
  description: toolDescriptions.qrCode,
  openGraph: {
    title: toolTitles.qrCode.extended,
    description: toolDescriptions.qrCode,
  },
  twitter: {
    title: toolTitles.qrCode.extended,
    description: toolDescriptions.qrCode,
  },
});

export default function QrCodePage() {
  return (
    <>
      <StructuredData
        type="tool"
        toolName="QR Code Tool"
        toolDescription="Generate QR codes from text or decode them from uploaded images."
        toolUrl="/tools/qr-code"
        toolCategory="DeveloperTool"
      />
      <QrCodeTool />
    </>
  );
}
