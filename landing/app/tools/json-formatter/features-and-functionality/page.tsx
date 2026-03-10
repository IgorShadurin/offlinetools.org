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
    title: "Batch Processing Multiple JSON Files in Desktop Formatters",
    description:
      "Learn how to efficiently process and format multiple JSON files in bulk using desktop tools and techniques.",
    slug: "batch-processing-multiple-json-files-in-desktop-formatters",
  },
  {
    title: "Collapsible Tree Views in JSON Formatters: UX Best Practices",
    description:
      "Learn UX best practices for implementing collapsible tree views in JSON formatters to enhance data navigation and visualization",
    slug: "collapsible-tree-views-in-json-formatters-ux-best-practices",
  },
  {
    title: "Converting Between JSON and CSV: Integrated Formatter Features",
    description:
      "Explore how integrated online formatters simplify the conversion between JSON and CSV data formats, covering common features and challenges.",
    slug: "converting-between-json-and-csv-integrated-formatter-features",
  },
  {
    title: "Converting Between JSON and YAML in Hybrid Formatters",
    description:
      "Learn how to effortlessly convert data between JSON and YAML formats using hybrid online and offline tools, understanding the process and common considerations.",
    slug: "converting-between-json-and-yaml-in-hybrid-formatters",
  },
  {
    title: "Copy-to-Clipboard Functionality in JSON Formatters",
    description:
      "Explore how smart copy-to-clipboard features improve workflow efficiency and data sharing in JSON formatter tools",
    slug: "copy-to-clipboard-functionality-in-json-formatters",
  },
  {
    title: "Custom Indentation Options in JSON Formatting Tools",
    description:
      "Discover how custom indentation options enhance JSON readability and meet diverse formatting standards and preferences",
    slug: "custom-indentation-options-in-json-formatting-tools",
  },
  {
    title: "Custom Templates for JSON Output Formatting",
    description:
      "Learn how to use custom templates or transformation methods to tailor JSON output to specific needs, selecting fields, renaming keys, and restructuring data.",
    slug: "custom-templates-for-json-output-formatting",
  },
  {
    title: "Formatting Large JSON Files: Pagination and Performance",
    description:
      "Learn effective techniques like pagination and optimization strategies for efficiently formatting and handling large JSON datasets without performance issues.",
    slug: "formatting-large-json-files-pagination-and-performance",
  },
  {
    title: "Handling JSON Lines Format in Specialized Formatters",
    description:
      "Learn about the JSON Lines (NDJSON) format, how it differs from standard JSON, and how specialized formatters are designed to handle it efficiently.",
    slug: "handling-json-lines-format-in-specialized-formatters",
  },
  {
    title: "Implementing Tabs for Multiple JSON Documents",
    description: "Learn how to implement a tabbed interface to manage and view multiple JSON documents simultaneously.",
    slug: "implementing-tabs-for-multiple-json-documents",
  },
  {
    title: "JSON Quoting Styles and Formatting Preferences",
    description:
      "Explore the strict quoting rules of standard JSON (always double quotes) and common formatting preferences like indentation. Learn about JSON5 and how consistent formatting improves readability and maintainability.",
    slug: "json-quoting-styles-and-formatting-preferences",
  },
  {
    title: "Keyboard Shortcuts for Efficient JSON Formatting",
    description:
      "Learn how keyboard shortcuts can dramatically improve efficiency when working with JSON formatting tools",
    slug: "keyboard-shortcuts-for-efficient-json-formatting",
  },
  {
    title: "Real-time Formatting vs. On-Demand Processing",
    description:
      "Explore the differences between real-time formatting/processing and on-demand processing, understanding their pros, cons, and ideal use cases.",
    slug: "real-time-formatting-vs-on-demand-processing",
  },
  {
    title: "Undo/Redo Functionality in JSON Editors",
    description:
      "Explore the importance and implementation of undo/redo functionality in JSON editors, enhancing productivity and reducing errors.",
    slug: "undo-redo-functionality-in-json-editors",
  },
  {
    title: "URL/API Endpoint Testing Features in JSON Tools",
    description:
      "Explore how JSON tools incorporate features for testing URL and API endpoints, enhancing data processing workflows.",
    slug: "url-api-endpoint-testing-features-in-json-tools",
  },
  {
    title: "Vertical vs. Horizontal Space Optimization in JSON Views",
    description:
      "Explore the trade-offs between vertical (pretty-printed) and horizontal (compact) JSON views for readability and efficiency.",
    slug: "vertical-vs-horizontal-space-optimization-in-json-views",
  },
  {
    title: "Visual JSON Editors: Beyond Text-Based Formatting",
    description:
      "Explore the world of visual JSON editors and how they simplify working with complex JSON data compared to traditional text-based tools.",
    slug: "visual-json-editors-beyond-text-based-formatting",
  },
  {
    title: "Visualizing JSON as Graphs and Charts",
    description:
      "Explore how to transform and visualize JSON data into insightful graphs and charts to better understand its structure and content.",
    slug: "visualizing-json-as-graphs-and-charts",
  },
  {
    title: "Working with Comments in JSON5-Compatible Formatters",
    description:
      "Learn how to effectively use comments in JSON5 formatters and understand the benefits of adding comments to your data structures.",
    slug: "working-with-comments-in-json5-compatible-formatters",
  },
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
