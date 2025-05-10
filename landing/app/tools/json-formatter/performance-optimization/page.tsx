import { Container } from "@/components/ui/container";
import { ToolArticle, ToolArticlesList } from "@/components/tool-articles-list";
import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Zap, Timer, Gauge, Cpu, MemoryStick } from "lucide-react";

/**
 * Metadata for the JSON Formatter Performance Optimization page
 */
export const metadata: Metadata = {
  title: "JSON Formatter Performance Optimization | Offline Tools",
  description:
    "Techniques for optimizing JSON formatter performance for speed and resource efficiency"
};

/**
 * Articles related to JSON Formatter performance optimization
 */
const jsonFormatterArticles: ToolArticle[] = [];

/**
 * JSON Formatter Performance Optimization page component
 */
export default function JsonFormatterPerformancePage() {
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
                <li aria-current="page">Performance Optimization</li>
              </ol>
            </nav>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">JSON Formatter Performance Optimization</h1>
          </div>
        </div>

        <Card className="mb-8 overflow-hidden border-2">
          <CardHeader className="bg-gradient-to-r from-yellow-50 to-lime-50 dark:from-yellow-950/30 dark:to-lime-950/30 pb-2">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Zap className="text-yellow-500" size={24} />
              Optimizing JSON Processing Speed
            </CardTitle>
            <CardDescription>Techniques for efficient formatting of even the largest JSON datasets</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="mt-1 text-yellow-600 dark:text-yellow-400 shrink-0">
                    <Timer size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Parsing Optimization</h3>
                    <p className="text-sm text-muted-foreground">
                      Implementing efficient tokenization, lazy parsing, and incremental processing to minimize the time required to parse large JSON documents.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1 text-yellow-600 dark:text-yellow-400 shrink-0">
                    <MemoryStick size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Memory Management</h3>
                    <p className="text-sm text-muted-foreground">
                      Techniques for reducing memory consumption including stream processing, chunking large documents, and efficient data structures for representing JSON.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="mt-1 text-lime-600 dark:text-lime-500 shrink-0">
                    <Gauge size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Rendering Performance</h3>
                    <p className="text-sm text-muted-foreground">
                      Optimizing the display of formatted JSON through virtualized rendering, pagination, and on-demand expansion of deeply nested structures.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1 text-lime-600 dark:text-lime-500 shrink-0">
                    <Cpu size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Computational Efficiency</h3>
                    <p className="text-sm text-muted-foreground">
                      Algorithmic improvements to JSON formatting operations, including efficient string handling, worker thread utilization, and compilation to optimized code.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-md bg-muted p-4 text-sm">
              <div className="flex items-center gap-2 font-medium">
                <Zap size={16} className="text-yellow-500" />
                <span>Performance Insight:</span>
              </div>
              <p className="mt-1 text-muted-foreground">
                The performance bottleneck in JSON formatters often shifts depending on document size—for small documents, UI responsiveness dominates, while for large documents, memory efficiency and incremental processing become critical.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <ToolArticlesList toolName="JSON Formatter" toolSlug="json-formatter" articles={jsonFormatterArticles} />
    </Container>
  );
} 