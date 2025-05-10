import { Container } from "@/components/ui/container";
import { ToolArticle, ToolArticlesList } from "@/components/tool-articles-list";
import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { GraduationCap, BookOpen, Lightbulb, PenTool, Library } from "lucide-react";

/**
 * Metadata for the JSON Formatter Education and Learning page
 */
export const metadata: Metadata = {
  title: "JSON Formatter Education and Learning | Offline Tools",
  description:
    "Resources and approaches for learning JSON formatting techniques and concepts"
};

/**
 * Articles related to JSON Formatter education and learning
 */
const jsonFormatterArticles: ToolArticle[] = [];

/**
 * JSON Formatter Education and Learning page component
 */
export default function JsonFormatterEducationPage() {
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
                <li aria-current="page">Education and Learning</li>
              </ol>
            </nav>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">JSON Formatter Education and Learning</h1>
          </div>
        </div>

        <Card className="mb-8 overflow-hidden border-2">
          <CardHeader className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 pb-2">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <GraduationCap className="text-amber-500" size={24} />
              Learning JSON Formatting Concepts
            </CardTitle>
            <CardDescription>Educational resources and strategies for mastering JSON</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="mt-1 text-amber-600 dark:text-amber-400 shrink-0">
                    <BookOpen size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Learning Resources</h3>
                    <p className="text-sm text-muted-foreground">
                      Educational materials including tutorials, courses, documentation, and interactive exercises designed to teach JSON concepts from basic to advanced.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1 text-amber-600 dark:text-amber-400 shrink-0">
                    <PenTool size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Practice Environments</h3>
                    <p className="text-sm text-muted-foreground">
                      Sandbox environments, coding challenges, and real-world examples that allow learners to experiment with JSON formatting techniques in a hands-on manner.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="mt-1 text-yellow-600 dark:text-yellow-500 shrink-0">
                    <Lightbulb size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Teaching Approaches</h3>
                    <p className="text-sm text-muted-foreground">
                      Pedagogical strategies for teaching JSON concepts effectively, from visual learning aids to project-based approaches that reinforce understanding.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1 text-yellow-600 dark:text-yellow-500 shrink-0">
                    <Library size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Community Knowledge</h3>
                    <p className="text-sm text-muted-foreground">
                      Leveraging community forums, open source documentation, and collaborative learning platforms to enhance understanding of JSON formatting concepts.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-md bg-muted p-4 text-sm">
              <div className="flex items-center gap-2 font-medium">
                <GraduationCap size={16} className="text-amber-500" />
                <span>Learning Path:</span>
              </div>
              <p className="mt-1 text-muted-foreground">
                For beginners, start with basic JSON syntax and structure before progressing to validation, schema design, and more complex topics like efficient parsing and transformation techniques.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <ToolArticlesList toolName="JSON Formatter" toolSlug="json-formatter" articles={jsonFormatterArticles} />
    </Container>
  );
} 