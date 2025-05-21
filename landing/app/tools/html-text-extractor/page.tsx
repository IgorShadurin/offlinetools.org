import HtmlTextExtractor from "./HtmlTextExtractor";
import { StructuredData } from "@/components/structured-data";
import { generateMetadata, toolDescriptions, toolTitles } from "@/lib/metadata";

export const metadata = generateMetadata({
  title: "HTML Text Extractor",
  description: "Extract plain text from HTML content with customizable options for handling links, images, and formatting.",
  openGraph: {
    title: "HTML Text Extractor",
    description: "Extract plain text from HTML content with customizable options for handling links, images, and formatting.",
  },
  twitter: {
    title: "HTML Text Extractor",
    description: "Extract plain text from HTML content with customizable options for handling links, images, and formatting.",
  },
});

export default function HtmlTextExtractorPage() {
  return (
    <>
      <StructuredData
        type="tool"
        toolName="HTML Text Extractor"
        toolDescription="Extract plain text from HTML content with customizable options for handling links, images, and formatting."
        toolUrl="/tools/html-text-extractor"
        toolCategory="DeveloperTool"
      />
      <HtmlTextExtractor />
    </>
  );
}
