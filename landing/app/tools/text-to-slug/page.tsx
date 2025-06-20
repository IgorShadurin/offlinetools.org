import TextToSlug from "./TextToSlug";
import { StructuredData } from "@/components/structured-data";
import { generateMetadata } from "@/lib/metadata";

export const metadata = generateMetadata({
  title: "Text to Slug Converter",
  description: "Convert text to URL-friendly slugs with customizable separators and character handling options.",
  openGraph: {
    title: "Text to Slug Converter",
    description: "Convert text to URL-friendly slugs with customizable separators and character handling options.",
  },
  twitter: {
    title: "Text to Slug Converter",
    description: "Convert text to URL-friendly slugs with customizable separators and character handling options.",
  },
});

export default function TextToSlugPage() {
  return (
    <>
      <StructuredData
        type="tool"
        toolName="Text to Slug Converter"
        toolDescription="Convert text to URL-friendly slugs with customizable separators, case handling, and character processing options for web development and SEO."
        toolUrl="/tools/text-to-slug"
        toolCategory="DeveloperTool"
      />
      <TextToSlug />
    </>
  );
}
