import { Container } from "@/components/ui/container";
import { ToolArticle, ToolArticlesList } from "@/components/tool-articles-list";
import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Code, GitBranch, Hash, Terminal, Layers } from "lucide-react";

/**
 * Metadata for the JSON Formatter Programming Language Implementations page
 */
export const metadata: Metadata = {
  title: "JSON Formatter Programming Language Implementations | Offline Tools",
  description:
    "Learn about JSON formatter implementations across different programming languages"
};

/**
 * Articles related to JSON Formatter programming language implementations
 */
const jsonFormatterArticles: ToolArticle[] = [];

/**
 * JSON Formatter Programming Language Implementations page component
 */
export default function JsonFormatterProgrammingLanguagePage() {
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
                <li aria-current="page">Programming Language Implementations</li>
              </ol>
            </nav>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">JSON Formatter Programming Language Implementations</h1>
          </div>
        </div>

        <Card className="mb-8 overflow-hidden border-2">
          <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-950/30 dark:to-cyan-950/30 pb-2">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Code className="text-teal-500" size={24} />
              Cross-Language JSON Processing
            </CardTitle>
            <CardDescription>Exploring implementations across programming ecosystems</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="mt-1 text-teal-600 dark:text-teal-400 shrink-0">
                    <Terminal size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Native Language Libraries</h3>
                    <p className="text-sm text-muted-foreground">
                      Comparing built-in JSON parsing and formatting capabilities across languages such as JavaScript, Python, Java, C#, Go, Rust, and Ruby.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1 text-teal-600 dark:text-teal-400 shrink-0">
                    <Hash size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Implementation Differences</h3>
                    <p className="text-sm text-muted-foreground">
                      Understanding how language-specific features influence JSON formatter implementations, from dynamic typing to strict compilation and memory management.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="mt-1 text-cyan-600 dark:text-cyan-500 shrink-0">
                    <Layers size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Cross-Platform Concerns</h3>
                    <p className="text-sm text-muted-foreground">
                      Addressing challenges in creating consistent JSON formatting behavior across different language environments and operating systems.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1 text-cyan-600 dark:text-cyan-500 shrink-0">
                    <GitBranch size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Popular Libraries</h3>
                    <p className="text-sm text-muted-foreground">
                      Exploring specialized third-party JSON formatting libraries that enhance the capabilities of standard language implementations.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-md bg-muted p-4 text-sm">
              <div className="flex items-center gap-2 font-medium">
                <Code size={16} className="text-teal-500" />
                <span>Language Insight:</span>
              </div>
              <p className="mt-1 text-muted-foreground">
                While JSON originated in JavaScript, many of the most performant JSON parsers and formatters are now implemented in systems languages like Rust and C++, often with bindings available for higher-level languages.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <ToolArticlesList toolName="JSON Formatter" toolSlug="json-formatter" articles={jsonFormatterArticles} />
    </Container>
  );
} 