import { Container } from "@/components/ui/container";
import { ToolArticle, ToolArticlesList } from "@/components/tool-articles-list";
import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart2, LineChart, Scale, Layers, PieChart } from "lucide-react";

/**
 * Metadata for the JSON Formatter Comparative Analysis page
 */
export const metadata: Metadata = {
  title: "JSON Formatter Comparative Analysis | Offline Tools",
  description:
    "Compare different JSON formatters across platforms, features, and performance characteristics"
};

/**
 * Articles related to JSON Formatter comparative analysis
 */
const jsonFormatterArticles: ToolArticle[] = [];

/**
 * JSON Formatter Comparative Analysis page component
 */
export default function JsonFormatterComparativePage() {
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
                <li aria-current="page">Comparative Analysis</li>
              </ol>
            </nav>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">JSON Formatter Comparative Analysis</h1>
          </div>
        </div>

        <Card className="mb-8 overflow-hidden border-2">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30 pb-2">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <BarChart2 className="text-purple-500" size={24} />
              Comparing JSON Formatters
            </CardTitle>
            <CardDescription>Objective analysis of tools across platforms and use cases</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="mt-1 text-purple-600 dark:text-purple-400 shrink-0">
                    <Scale size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Feature Comparison</h3>
                    <p className="text-sm text-muted-foreground">
                      Evaluating JSON formatter tools based on their feature sets, including syntax highlighting, validation, tree views, search capabilities, and export options.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1 text-purple-600 dark:text-purple-400 shrink-0">
                    <LineChart size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Performance Metrics</h3>
                    <p className="text-sm text-muted-foreground">
                      Benchmarking formatters on processing speed, memory usage, and file size limitations when handling small, medium, and large JSON documents.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="mt-1 text-indigo-600 dark:text-indigo-500 shrink-0">
                    <Layers size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Platform Comparison</h3>
                    <p className="text-sm text-muted-foreground">
                      Analyzing formatters across web browsers, desktop applications, IDE plugins, and command-line tools to identify strengths and limitations in each environment.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1 text-indigo-600 dark:text-indigo-500 shrink-0">
                    <PieChart size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">User Experience Analysis</h3>
                    <p className="text-sm text-muted-foreground">
                      Evaluating JSON formatters based on usability metrics like learning curve, interface design, accessibility, and workflow integration.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-md bg-muted p-4 text-sm">
              <div className="flex items-center gap-2 font-medium">
                <BarChart2 size={16} className="text-purple-500" />
                <span>Comparison Methodology:</span>
              </div>
              <p className="mt-1 text-muted-foreground">
                Our comparative analyses use standardized test cases and real-world scenarios to provide objective measurements, supplemented by qualitative assessments from users with different experience levels.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <ToolArticlesList toolName="JSON Formatter" toolSlug="json-formatter" articles={jsonFormatterArticles} />
    </Container>
  );
} 