import PasswordGenerator from "./PasswordGenerator";
import { StructuredData } from "@/components/structured-data";
import { generateMetadata, toolDescriptions, toolTitles } from "@/lib/metadata";

export const metadata = generateMetadata({
  title: "Password Generator",
  description: "Generate secure passwords with customizable options for length and character types.",
  openGraph: {
    title: "Password Generator | OfflineTools",
    description: "Generate secure passwords with customizable options for length and character types.",
  },
  twitter: {
    title: "Password Generator | OfflineTools",
    description: "Generate secure passwords with customizable options for length and character types.",
  },
});

export default function PasswordGeneratorPage() {
  return (
    <>
      <StructuredData
        type="tool"
        toolName="Password Generator"
        toolDescription="Generate secure passwords with customizable options for length and character types."
        toolUrl="/tools/password-generator"
        toolCategory="DeveloperTool"
      />
      <PasswordGenerator />
    </>
  );
}
