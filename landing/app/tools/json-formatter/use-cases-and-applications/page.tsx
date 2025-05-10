import { Container } from "@/components/ui/container";
import { ToolArticle, ToolArticlesList } from "@/components/tool-articles-list";
import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Briefcase, Globe, Code, Building, Database } from "lucide-react";

/**
 * Metadata for the JSON Formatter Use Cases and Applications page
 */
export const metadata: Metadata = {
  title: "JSON Formatter Use Cases and Applications | Offline Tools",
  description:
    "Explore various industry and development scenarios where JSON formatters prove invaluable"
};

/**
 * Articles related to JSON Formatter use cases and applications
 */
const jsonFormatterArticles: ToolArticle[] = [];

/**
 * JSON Formatter Use Cases and Applications page component
 */
export default function JsonFormatterUseCasesPage() {
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
                <li aria-current="page">Use Cases and Applications</li>
              </ol>
            </nav>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">JSON Formatter Use Cases and Applications</h1>
          </div>
        </div>

        <Card className="mb-8 overflow-hidden border-2">
          <CardHeader className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-950/30 dark:to-yellow-950/30 pb-2">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Briefcase className="text-orange-500" size={24} />
              Practical Applications of JSON Formatters
            </CardTitle>
            <CardDescription>Real-world scenarios where formatting tools enhance productivity</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="mt-1 text-orange-600 dark:text-orange-400 shrink-0">
                    <Code size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">API Development</h3>
                    <p className="text-sm text-muted-foreground">
                      JSON formatters are essential for API developers to inspect, debug, and document request and response payloads, ensuring correct data structure and validation.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1 text-orange-600 dark:text-orange-400 shrink-0">
                    <Database size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Data Analysis</h3>
                    <p className="text-sm text-muted-foreground">
                      When working with JSON datasets, formatters help analysts explore and understand data structure, transform between formats, and prepare data for visualization.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="mt-1 text-yellow-600 dark:text-yellow-500 shrink-0">
                    <Building size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Enterprise Integration</h3>
                    <p className="text-sm text-muted-foreground">
                      In enterprise environments, JSON formatters facilitate data exchange between systems, helping integration specialists troubleshoot data mapping and transformation issues.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1 text-yellow-600 dark:text-yellow-500 shrink-0">
                    <Globe size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Web Development</h3>
                    <p className="text-sm text-muted-foreground">
                      Web developers rely on JSON formatters to handle configuration files, localization data, and client-side state management in modern web applications.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-md bg-muted p-4 text-sm">
              <div className="flex items-center gap-2 font-medium">
                <Briefcase size={16} className="text-orange-500" />
                <span>Industry Insight:</span>
              </div>
              <p className="mt-1 text-muted-foreground">
                JSON formatters have become indispensable across industries from finance to healthcare, where data exchange standards increasingly rely on JSON for its simplicity, readability, and cross-platform compatibility.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <ToolArticlesList toolName="JSON Formatter" toolSlug="json-formatter" articles={jsonFormatterArticles} />
    </Container>
  );
} 