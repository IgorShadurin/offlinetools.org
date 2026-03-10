import { Container } from "@/components/ui/container";
import { ToolArticle, ToolArticlesList } from "@/components/tool-articles-list";
import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle, AlertTriangle, Code, RefreshCw, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Metadata for the JSON Formatter Error Handling page
 */
export const metadata: Metadata = {
  title: "JSON Formatter Error Handling | Offline Tools",
  description: "Learn how to handle and fix errors in your JSON data using our JSON Formatter tool",
};

/**
 * Articles related to JSON Formatter
 */
const jsonFormatterArticles: ToolArticle[] = [
  {
    title: "Common JSON Syntax Errors and How to Fix Them",
    description: "Learn about the most common JSON syntax errors and how to identify and fix them quickly.",
    slug: "common-json-syntax-errors-and-how-to-fix-them",
  },
  {
    title: "Why Your JSON Formatter Shows a Red Error Message: Troubleshooting Guide",
    description:
      "Understand why JSON formatters display red error messages and how to effectively troubleshoot common JSON syntax issues.",
    slug: "why-your-json-formatter-shows-a-red-error-message-troubleshooting-guide",
  },
  {
    title: "Handling Trailing Commas in JSON - A Formatter's Approach",
    description:
      "Learn how to properly handle trailing commas in JSON, why they cause errors, and techniques to manage them in development and production.",
    slug: "handling-trailing-commas-in-json-a-formatters-approach",
  },
  {
    title: "Unexpected End of JSON Input: Causes and Fixes",
    description:
      "Learn what causes the 'Unexpected end of JSON input' error and discover practical solutions to fix this common JSON parsing problem.",
    slug: "unexpected-end-of-json-input-causes-and-fixes",
  },
  {
    title: "Resolving Unicode Character Issues in JSON Documents",
    description:
      "Learn how to identify, troubleshoot, and fix Unicode character problems in your JSON data for error-free parsing and display.",
    slug: "resolving-unicode-character-issues-in-json-documents",
  },
  {
    title: "Line Number References in JSON Error Messages: Why They Matter",
    description:
      "Learn why line number references in JSON error messages are crucial for efficient debugging and how to use them to quickly fix syntax errors.",
    slug: "line-number-references-in-json-error-messages-why-they-matter",
  },
  {
    title: "When Good JSON Goes Bad: Recovering Corrupted JSON Files",
    description:
      "Learn effective strategies and techniques for recovering corrupted JSON files and salvaging valuable data from damaged JSON documents.",
    slug: "when-good-json-goes-bad-recovering-corrupted-json-files",
  },
  {
    title: "Key-Value Pair Errors in JSON Formatting",
    description:
      "Learn about common key-value pair errors in JSON documents and effective strategies to identify and resolve these formatting issues.",
    slug: "key-value-pair-errors-in-json-formatting",
  },
  {
    title: "Malformed JSON in API Responses: Handling Strategies",
    description:
      "Develop robust strategies for handling malformed JSON in API responses to prevent errors and improve application reliability.",
    slug: "malformed-json-in-api-responses-handling-strategies",
  },
  {
    title: "The Impact of White Space on JSON Validation",
    description:
      "Understand how white space affects JSON validation and learn best practices for handling white space in your JSON documents.",
    slug: "the-impact-of-white-space-on-json-validation",
  },
  {
    title: "Numerical Value Errors in JSON: Decimal Points and Scientific Notation",
    description:
      "Learn how to properly format numerical values in JSON to avoid common errors with decimal points, scientific notation, and other number formats.",
    slug: "numerical-value-errors-in-json-decimal-points-and-scientific-notation",
  },
  {
    title: "Reserved Words as Keys in JSON: Why They Cause Problems",
    description:
      "Explore the complications that arise when using reserved words as keys in JSON and learn strategies to avoid these problems.",
    slug: "reserved-words-as-keys-in-json-why-they-cause-problems",
  },
  {
    title: "Handling Comments in JSON (Even Though They're Not Supported)",
    description:
      "Discover techniques for working with comments in JSON despite the format not officially supporting them, and learn alternative approaches.",
    slug: "handling-comments-in-json-even-though-theyre-not-supported",
  },
  {
    title: "Duplicate Keys in JSON: Detection and Resolution Strategies",
    description:
      "Learn how to identify duplicate keys in JSON documents and implement effective strategies to resolve these issues for valid JSON data.",
    slug: "duplicate-keys-in-json-detection-and-resolution-strategies",
  },
  {
    title: "JSON Schema Validation Errors and Their Meaning",
    description:
      "Learn how to interpret JSON Schema validation errors, understand their meaning, and fix common schema validation issues efficiently.",
    slug: "json-schema-validation-errors-and-their-meaning",
  },
  {
    title: "Error Handling When Converting Between JSON and Other Formats",
    description:
      "Learn effective strategies for handling errors when converting between JSON and other data formats, including XML, CSV, and YAML.",
    slug: "error-handling-when-converting-between-json-and-other-formats",
  },
  {
    title: "Handling Special Characters in JSON Strings",
    description:
      "Learn best practices for correctly escaping and handling special characters in JSON strings to prevent parsing errors.",
    slug: "handling-special-characters-in-json-strings",
  },
  {
    title: "Case Sensitivity Issues in JSON Formatting",
    description:
      "Learn about case sensitivity challenges in JSON formatting and validation, and how to avoid common pitfalls in property naming.",
    slug: "case-sensitivity-issues-in-json-formatting",
  },
  {
    title: "Handling Forbidden Characters in JSON Property Names",
    description:
      "Discover which characters are forbidden in JSON property names, why they cause problems, and how to work around these limitations.",
    slug: "handling-forbidden-characters-in-json-property-names",
  },
  {
    title: "Deep Nesting Errors: When Your JSON Is Too Complex",
    description:
      "Learn how to identify, prevent, and resolve errors caused by excessively nested JSON structures that exceed parser capabilities.",
    slug: "deep-nesting-errors-when-your-json-is-too-complex",
  },
  {
    title: "Line Break Problems in Multi-line JSON Strings",
    description:
      "Understand how to properly handle line breaks in JSON strings to avoid parsing errors and ensure compatibility across different systems.",
    slug: "line-break-problems-in-multi-line-json-strings",
  },
  {
    title: "Handling Incomplete JSON Data Streams",
    description:
      "Learn effective strategies to handle incomplete JSON data streams and maintain data integrity in your applications.",
    slug: "handling-incomplete-json-data-streams",
  },
  {
    title: "Timeout Errors When Formatting Extremely Large JSON Files",
    description:
      "Learn strategies to overcome timeout errors when formatting extremely large JSON files and optimize your JSON processing workflow.",
    slug: "timeout-errors-when-formatting-extremely-large-json-files",
  },
];

/**
 * JSON Formatter Error Handling page component
 */
export default function JsonFormatterErrorHandlingPage() {
  return (
    <Container className="py-10">
      <div className="mb-10">
        <div className="mb-4 flex items-center">
          <div className="flex-1">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/" className="hover:text-foreground">
                    Home
                  </Link>
                </li>
                <li>
                  <span>/</span>
                </li>
                <li>
                  <Link href="/tools" className="hover:text-foreground">
                    Tools
                  </Link>
                </li>
                <li>
                  <span>/</span>
                </li>
                <li>
                  <Link href="/tools/json-formatter" className="hover:text-foreground">
                    JSON Formatter
                  </Link>
                </li>
                <li>
                  <span>/</span>
                </li>
                <li aria-current="page">Error Handling</li>
              </ol>
            </nav>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">JSON Formatter Error Handling</h1>
          </div>
        </div>

        <Card className="mb-8 overflow-hidden border-2">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 pb-2">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <AlertTriangle className="text-amber-500" size={24} />
              Smart JSON Error Detection
            </CardTitle>
            <CardDescription>Find and fix JSON syntax errors instantly</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="mt-1 text-blue-600 dark:text-blue-400 shrink-0">
                    <Code size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Instant Error Highlighting</h3>
                    <p className="text-sm text-muted-foreground">
                      Our JSON Formatter automatically detects and highlights syntax errors in your code. Even small
                      syntax mistakes can cause validation failures.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1 text-blue-600 dark:text-blue-400 shrink-0">
                    <AlertTriangle size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Common Issues Detection</h3>
                    <p className="text-sm text-muted-foreground">
                      Identify missing brackets, incorrect quotes, comma problems, and other common issues instantly
                      with helpful error messages.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="mt-1 text-green-600 dark:text-green-500 shrink-0">
                    <RefreshCw size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">One-Click Fixes</h3>
                    <p className="text-sm text-muted-foreground">
                      Simply paste your JSON text into the formatter, and the tool will automatically highlight errors
                      and provide context about what&apos;s wrong.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1 text-green-600 dark:text-green-500 shrink-0">
                    <CheckCircle size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Clean Export</h3>
                    <p className="text-sm text-muted-foreground">
                      Fix formatting issues with one click and export clean, valid JSON for your applications.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-md bg-muted p-4 text-sm">
              <div className="flex items-center gap-2 font-medium">
                <AlertTriangle size={16} className="text-amber-500" />
                <span>Pro Tip:</span>
              </div>
              <p className="mt-1 text-muted-foreground">
                To quickly identify JSON errors, look for red underlines in the formatter. Hover over highlighted
                sections to see detailed error explanations.
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/download">
                  <Download className="mr-2" /> Download Desktop App
                </Link>
              </Button>

              <Button asChild variant="outline" className="w-full sm:w-auto">
                <Link href="/tools/json-formatter" className="flex items-center">
                  <ExternalLink className="mr-2 h-4 w-4" /> Try Online Tool
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <ToolArticlesList toolName="JSON Formatter" toolSlug="json-formatter" articles={jsonFormatterArticles} />
    </Container>
  );
}
