import UuidGenerator from "./UuidGenerator";
import { StructuredData } from "@/components/structured-data";
import { generateMetadata, toolDescriptions, toolTitles } from "@/lib/metadata";

export const metadata = generateMetadata({
  title: toolTitles.uuidGenerator?.base || "UUID Generator",
  description:
    toolDescriptions.uuidGenerator ||
    "Generate universally unique identifiers (UUIDs) in various formats (v1, v4, v5, v6, v7).",
  openGraph: {
    title: toolTitles.uuidGenerator?.extended || "UUID Generator - Create RFC9562 Compliant UUIDs",
    description:
      toolDescriptions.uuidGenerator ||
      "Generate universally unique identifiers (UUIDs) in various formats (v1, v4, v5, v6, v7).",
  },
  twitter: {
    title: toolTitles.uuidGenerator?.extended || "UUID Generator - Create RFC9562 Compliant UUIDs",
    description:
      toolDescriptions.uuidGenerator ||
      "Generate universally unique identifiers (UUIDs) in various formats (v1, v4, v5, v6, v7).",
  },
});

export default function UuidGeneratorPage() {
  return (
    <>
      <StructuredData
        type="tool"
        toolName="UUID Generator"
        toolDescription="Generate universally unique identifiers (UUIDs) in various formats (v1, v4, v5, v6, v7)."
        toolUrl="/tools/uuid-generator"
        toolCategory="DeveloperTool"
      />
      <UuidGenerator />
    </>
  );
}
