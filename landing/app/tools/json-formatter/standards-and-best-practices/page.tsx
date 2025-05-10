import { Container } from "@/components/ui/container";
import { ToolArticle, ToolArticlesList } from "@/components/tool-articles-list";
import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookOpen, CheckCircle, FileText, ScrollText, AlertTriangle } from "lucide-react";

/**
 * Metadata for the JSON Formatter Standards and Best Practices page
 */
export const metadata: Metadata = {
  title: "JSON Formatter Standards and Best Practices | Offline Tools",
  description:
    "Understand official JSON specifications and best practices for working with JSON data"
};

/**
 * Articles related to JSON Formatter standards and best practices
 */
const jsonFormatterArticles: ToolArticle[] = [];

/**
 * JSON Formatter Standards and Best Practices page component
 */
export default function JsonFormatterStandardsPage() {
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
                <li aria-current="page">Standards and Best Practices</li>
              </ol>
            </nav>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">JSON Formatter Standards and Best Practices</h1>
          </div>
        </div>

        <Card className="mb-8 overflow-hidden border-2">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 pb-2">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <BookOpen className="text-green-500" size={24} />
              JSON Standards and Conventions
            </CardTitle>
            <CardDescription>Following established practices for consistent and reliable JSON</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="mt-1 text-green-600 dark:text-green-400 shrink-0">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Official Specifications</h3>
                    <p className="text-sm text-muted-foreground">
                      The JSON format is defined by ECMA-404 (The JSON Data Interchange Syntax) and RFC 8259, establishing its grammar, data types, and structural constraints.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1 text-green-600 dark:text-green-400 shrink-0">
                    <AlertTriangle size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Common Pitfalls</h3>
                    <p className="text-sm text-muted-foreground">
                      Avoiding trailing commas, comments, and unquoted property names in standard JSON, along with understanding Unicode escape sequence limitations and numeric precision issues.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="mt-1 text-emerald-600 dark:text-emerald-500 shrink-0">
                    <CheckCircle size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Style Guidelines</h3>
                    <p className="text-sm text-muted-foreground">
                      Best practices for formatting JSON including consistent indentation, property sorting, and the handling of whitespace to balance readability with file size.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1 text-emerald-600 dark:text-emerald-500 shrink-0">
                    <ScrollText size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Schema Validation</h3>
                    <p className="text-sm text-muted-foreground">
                      Using JSON Schema to validate document structure, enforce data types, and document the expected format of your JSON data.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-md bg-muted p-4 text-sm">
              <div className="flex items-center gap-2 font-medium">
                <BookOpen size={16} className="text-green-500" />
                <span>Specification Note:</span>
              </div>
              <p className="mt-1 text-muted-foreground">
                While JSON is a subset of JavaScript, it has stricter rules—all property names must be double-quoted strings, and only certain literal values are allowed (string, number, object, array, true, false, null).
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <ToolArticlesList toolName="JSON Formatter" toolSlug="json-formatter" articles={jsonFormatterArticles} />
    </Container>
  );
} 