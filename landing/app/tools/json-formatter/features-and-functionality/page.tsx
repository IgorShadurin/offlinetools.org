import { Container } from "@/components/ui/container";
import { ToolArticle, ToolArticlesList } from "@/components/tool-articles-list";
import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Code, Layers, Sparkles, FileText, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Metadata for the JSON Formatter Features and Functionality page
 */
export const metadata: Metadata = {
  title: "JSON Formatter Features and Functionality | Offline Tools",
  description:
    "Explore the powerful features and functionality of our JSON Formatter tool for easy data formatting and validation",
};

/**
 * Articles related to JSON Formatter features and functionality
 */
const jsonFormatterArticles: ToolArticle[] = [
  {
    title: "Dark Mode in JSON Formatters: Implementation and Benefits",
    description:
      "Explore the benefits of dark mode in JSON formatters, implementation techniques, and how it improves developer experience.",
    slug: "dark-mode-in-json-formatters-implementation-and-benefits",
  },
  {
    title: "Collapsible Tree Views in JSON Formatters: UX Best Practices",
    description:
      "Learn UX best practices for implementing collapsible tree views in JSON formatters to enhance data navigation and visualization.",
    slug: "collapsible-tree-views-in-json-formatters-ux-best-practices",
  },
  {
    title: "Search Functionality in JSON Formatters: Finding Needles in Haystacks",
    description:
      "Learn how effective search capabilities in JSON formatters help navigate and analyze complex data structures efficiently.",
    slug: "search-functionality-in-json-formatters-finding-needles-in-haystacks",
  },
  {
    title: "JSON Path Query Support in Advanced Formatters",
    description:
      "Learn how JSON Path query support in advanced formatters enables powerful data extraction and manipulation capabilities for developers.",
    slug: "json-path-query-support-in-advanced-formatters",
  },
  {
    title: "Syntax Highlighting Techniques in JSON Formatters",
    description:
      "Explore how modern JSON formatters implement syntax highlighting to improve readability, error detection, and data visualization.",
    slug: "syntax-highlighting-techniques-in-json-formatters",
  },
  {
    title: "Custom Indentation Options in JSON Formatting Tools",
    description:
      "Discover how custom indentation options enhance JSON readability and meet diverse formatting standards and preferences.",
    slug: "custom-indentation-options-in-json-formatting-tools",
  },
  {
    title: "Comparing JSON Documents: Diff Functionality in Formatters",
    description:
      "Learn how diff functionality in JSON formatters helps developers compare documents and identify changes with precision.",
    slug: "comparing-json-documents-diff-functionality-in-formatters",
  },
  {
    title: "JSON Beautification vs. Minification: Tools for Both",
    description:
      "Understanding the differences between JSON beautification and minification, and when to use each in your development workflow.",
    slug: "json-beautification-vs-minification-tools-for-both",
  },
  {
    title: "Copy-to-Clipboard Functionality in JSON Formatters",
    description:
      "Explore how smart copy-to-clipboard features improve workflow efficiency and data sharing in JSON formatter tools.",
    slug: "copy-to-clipboard-functionality-in-json-formatters",
  },
  {
    title: "Export Options in JSON Formatters: Beyond Plain Text",
    description:
      "Discover the various export formats and options that modern JSON formatters offer for data interchange and documentation.",
    slug: "export-options-in-json-formatters-beyond-plain-text",
  },
  {
    title: "Keyboard Shortcuts for Efficient JSON Formatting",
    description:
      "Learn how keyboard shortcuts can dramatically improve efficiency when working with JSON formatting tools.",
    slug: "keyboard-shortcuts-for-efficient-json-formatting",
  },
  {
    title: "The Anatomy of a Modern JSON Formatter UI",
    description:
      "Explore the essential components and design principles behind effective JSON formatter user interfaces.",
    slug: "the-anatomy-of-a-modern-json-formatter-ui",
  },
  // More articles can be added here as they are created
];

/**
 * JSON Formatter Features and Functionality page component
 */
export default function JsonFormatterFeaturesPage() {
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
                <li aria-current="page">Features and Functionality</li>
              </ol>
            </nav>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">JSON Formatter Features and Functionality</h1>
          </div>
        </div>

        <Card className="mb-8 overflow-hidden border-2">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 pb-2">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Sparkles className="text-blue-500" size={24} />
              Powerful JSON Formatting
            </CardTitle>
            <CardDescription>Format, validate, and visualize JSON data with ease</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="mt-1 text-blue-600 dark:text-blue-400 shrink-0">
                    <Code size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Smart Formatting</h3>
                    <p className="text-sm text-muted-foreground">
                      Automatically format your JSON with customizable indentation, spacing, and sorting options for a
                      cleaner, more readable structure.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1 text-blue-600 dark:text-blue-400 shrink-0">
                    <Layers size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Tree Visualization</h3>
                    <p className="text-sm text-muted-foreground">
                      View your JSON data as an expandable tree structure that makes navigating complex nested objects
                      and arrays intuitive.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="mt-1 text-green-600 dark:text-green-500 shrink-0">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Advanced Transformations</h3>
                    <p className="text-sm text-muted-foreground">
                      Minify JSON for production, sort keys alphabetically, or convert between JSON and other formats
                      like YAML or XML.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1 text-green-600 dark:text-green-500 shrink-0">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Schema Validation</h3>
                    <p className="text-sm text-muted-foreground">
                      Validate your JSON against schemas to ensure it meets your data requirements and standards.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-md bg-muted p-4 text-sm">
              <div className="flex items-center gap-2 font-medium">
                <Sparkles size={16} className="text-blue-500" />
                <span>Pro Tip:</span>
              </div>
              <p className="mt-1 text-muted-foreground">
                Use keyboard shortcuts (Ctrl+Space or Cmd+Space) to quickly format your JSON. For large files, try the
                tree view mode for better navigation and performance.
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
