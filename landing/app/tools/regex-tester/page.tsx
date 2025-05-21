import RegexTester from "./RegexTester";
import { StructuredData } from "@/components/structured-data";
import { generateMetadata, toolDescriptions, toolTitles } from "@/lib/metadata";

export const metadata = generateMetadata({
  title: toolTitles.regexTester.base,
  description: toolDescriptions.regexTester,
  openGraph: {
    title: toolTitles.regexTester.extended,
    description: toolDescriptions.regexTester,
  },
  twitter: {
    title: toolTitles.regexTester.extended,
    description: toolDescriptions.regexTester,
  },
});

export default function RegexTesterPage() {
  return (
    <>
      <StructuredData
        type="tool"
        toolName="Regex Tester"
        toolDescription="Test and debug regular expressions with visual match highlighting and support for various regex flags. Process data locally with no server communication."
        toolUrl="/tools/regex-tester"
        toolCategory="DeveloperTool"
      />
      <RegexTester />
    </>
  );
}
