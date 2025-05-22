import PersonGenerator from "./PersonGenerator";
import { StructuredData } from "@/components/structured-data";
import { generateMetadata, toolDescriptions, toolTitles } from "@/lib/metadata";

export const metadata = generateMetadata({
  title: "Person Generator",
  description: "Generate realistic person data with customizable fields in multiple formats.",
  openGraph: {
    title: "Person Generator - Create Realistic Person Data",
    description: "Generate realistic person data with customizable fields in multiple formats.",
  },
  twitter: {
    title: "Person Generator - Create Realistic Person Data",
    description: "Generate realistic person data with customizable fields in multiple formats.",
  },
});

export default function PersonGeneratorPage() {
  return (
    <>
      <StructuredData
        type="tool"
        toolName="Person Generator"
        toolDescription="Generate realistic person data with customizable fields in multiple formats."
        toolUrl="/tools/person-generator"
        toolCategory="DeveloperTool"
      />
      <PersonGenerator />
    </>
  );
}
