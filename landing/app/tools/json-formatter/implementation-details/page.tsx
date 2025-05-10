import { Container } from "@/components/ui/container";
import { ToolArticle, ToolArticlesList } from "@/components/tool-articles-list";
import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Code2, Database, Server, Cpu, Braces } from "lucide-react";

/**
 * Metadata for the JSON Formatter Implementation Details page
 */
export const metadata: Metadata = {
  title: "JSON Formatter Implementation Details | Offline Tools",
  description:
    "Dive into the technical aspects of building JSON formatters, from parsing to optimization techniques",
};

/**
 * Articles related to JSON Formatter implementation details
 */
const jsonFormatterArticles: ToolArticle[] = [];

/**
 * JSON Formatter Implementation Details page component
 */
export default function JsonFormatterImplementationPage() {
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
                <li aria-current="page">Implementation Details</li>
              </ol>
            </nav>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">JSON Formatter Implementation Details</h1>
          </div>
        </div>

        <Card className="mb-8 overflow-hidden border-2">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 pb-2">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Code2 className="text-blue-500" size={24} />
              Building Powerful JSON Formatters
            </CardTitle>
            <CardDescription>Technical insights into parser design and implementation</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="mt-1 text-blue-600 dark:text-blue-400 shrink-0">
                    <Braces size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Parser Architecture</h3>
                    <p className="text-sm text-muted-foreground">
                      The foundation of any JSON formatter is its parser, which must accurately tokenize input strings according to the JSON specification while handling edge cases and errors gracefully.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1 text-blue-600 dark:text-blue-400 shrink-0">
                    <Database size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Data Structures</h3>
                    <p className="text-sm text-muted-foreground">
                      Efficient representation of JSON data in memory using appropriate data structures enables fast traversal, manipulation, and formatting operations.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="mt-1 text-cyan-600 dark:text-cyan-500 shrink-0">
                    <Server size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Rendering Engines</h3>
                    <p className="text-sm text-muted-foreground">
                      Formatter rendering engines transform in-memory JSON data structures into visually formatted output with proper indentation, coloring, and interactive elements.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1 text-cyan-600 dark:text-cyan-500 shrink-0">
                    <Cpu size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Performance Considerations</h3>
                    <p className="text-sm text-muted-foreground">
                      Processing large JSON documents requires careful memory management, streaming techniques, and optimization strategies to maintain responsiveness.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-md bg-muted p-4 text-sm">
              <div className="flex items-center gap-2 font-medium">
                <Code2 size={16} className="text-blue-500" />
                <span>Implementation Focus:</span>
              </div>
              <p className="mt-1 text-muted-foreground">
                Modern JSON formatters typically use recursive descent parsers or state machines to handle the JSON grammar, combined with efficient rendering algorithms that balance memory usage with performance.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <ToolArticlesList toolName="JSON Formatter" toolSlug="json-formatter" articles={jsonFormatterArticles} />
    </Container>
  );
} 