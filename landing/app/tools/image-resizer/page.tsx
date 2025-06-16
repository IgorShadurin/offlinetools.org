import ImageResizer from "./ImageResizer";
import { StructuredData } from "@/components/structured-data";
import { generateMetadata, toolDescriptions, toolTitles } from "@/lib/metadata";

export const metadata = generateMetadata({
  title: toolTitles.imageResizer.base,
  description: toolDescriptions.imageResizer,
  openGraph: {
    title: toolTitles.imageResizer.extended,
    description: toolDescriptions.imageResizer,
  },
  twitter: {
    title: toolTitles.imageResizer.extended,
    description: toolDescriptions.imageResizer,
  },
});

export default function ImageResizerPage() {
  return (
    <>
      <StructuredData
        type="tool"
        toolName="Image Resizer"
        toolDescription="Resize images directly in your browser with optional aspect ratio preservation."
        toolUrl="/tools/image-resizer"
        toolCategory="DeveloperTool"
      />
      <ImageResizer />
    </>
  );
}
