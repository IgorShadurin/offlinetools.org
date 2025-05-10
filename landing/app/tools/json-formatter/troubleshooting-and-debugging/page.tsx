import { Container } from "@/components/ui/container";
import { ToolArticle, ToolArticlesList } from "@/components/tool-articles-list";
import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Bug, Search, AlertTriangle, FileSearch, Wrench } from "lucide-react";

/**
 * Metadata for the JSON Formatter Troubleshooting and Debugging page
 */
export const metadata: Metadata = {
  title: "JSON Formatter Troubleshooting and Debugging | Offline Tools",
  description:
    "Advanced techniques for identifying and resolving JSON parsing and formatting issues"
};

/**
 * Articles related to JSON Formatter troubleshooting and debugging
 */
const jsonFormatterArticles: ToolArticle[] = [];

/**
 * JSON Formatter Troubleshooting and Debugging page component
 */
export default function JsonFormatterTroubleshootingPage() {
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
                <li aria-current="page">Troubleshooting and Debugging</li>
              </ol>
            </nav>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">JSON Formatter Troubleshooting and Debugging</h1>
          </div>
        </div>

        <Card className="mb-8 overflow-hidden border-2">
          <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30 pb-2">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Bug className="text-orange-500" size={24} />
              Solving JSON Formatting Problems
            </CardTitle>
            <CardDescription>Advanced techniques for diagnosing and fixing JSON issues</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="mt-1 text-orange-600 dark:text-orange-400 shrink-0">
                    <AlertTriangle size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Common Error Patterns</h3>
                    <p className="text-sm text-muted-foreground">
                      Identifying and resolving frequent JSON syntax issues including unclosed brackets, missing commas, incorrect escaping, and encoding problems.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1 text-orange-600 dark:text-orange-400 shrink-0">
                    <Search size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Diagnostic Techniques</h3>
                    <p className="text-sm text-muted-foreground">
                      Methodical approaches to isolate JSON errors through incremental validation, syntax highlighting, and specialized linting tools.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="mt-1 text-red-600 dark:text-red-500 shrink-0">
                    <FileSearch size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Large File Troubleshooting</h3>
                    <p className="text-sm text-muted-foreground">
                      Specialized techniques for finding and fixing errors in large JSON documents, including streaming parsers and divide-and-conquer approaches.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1 text-red-600 dark:text-red-500 shrink-0">
                    <Wrench size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Recovery Strategies</h3>
                    <p className="text-sm text-muted-foreground">
                      Methods for salvaging and repairing damaged or malformed JSON data, from automated fixers to manual reconstruction techniques.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-md bg-muted p-4 text-sm">
              <div className="flex items-center gap-2 font-medium">
                <Bug size={16} className="text-orange-500" />
                <span>Troubleshooting Tip:</span>
              </div>
              <p className="mt-1 text-muted-foreground">
                When debugging complex JSON errors, try breaking down large documents into smaller chunks and validating them individually—this divide-and-conquer approach often pinpoints issues more effectively than examining the entire file at once.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <ToolArticlesList toolName="JSON Formatter" toolSlug="json-formatter" articles={jsonFormatterArticles} />
    </Container>
  );
} 