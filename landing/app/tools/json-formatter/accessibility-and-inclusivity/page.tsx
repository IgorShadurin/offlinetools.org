import { Container } from "@/components/ui/container";
import { ToolArticle, ToolArticlesList } from "@/components/tool-articles-list";
import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accessibility, Eye, MousePointer, Globe, Languages } from "lucide-react";

/**
 * Metadata for the JSON Formatter Accessibility and Inclusivity page
 */
export const metadata: Metadata = {
  title: "JSON Formatter Accessibility and Inclusivity | Offline Tools",
  description:
    "Making JSON tools accessible to users of all abilities through inclusive design practices"
};

/**
 * Articles related to JSON Formatter accessibility and inclusivity
 */
const jsonFormatterArticles: ToolArticle[] = [];

/**
 * JSON Formatter Accessibility and Inclusivity page component
 */
export default function JsonFormatterAccessibilityPage() {
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
                <li aria-current="page">Accessibility and Inclusivity</li>
              </ol>
            </nav>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">JSON Formatter Accessibility and Inclusivity</h1>
          </div>
        </div>

        <Card className="mb-8 overflow-hidden border-2">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 pb-2">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Accessibility className="text-blue-500" size={24} />
              Inclusive JSON Tool Design
            </CardTitle>
            <CardDescription>Creating tools that work for all users regardless of ability or context</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="mt-1 text-blue-600 dark:text-blue-400 shrink-0">
                    <Eye size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Visual Accessibility</h3>
                    <p className="text-sm text-muted-foreground">
                      Designing JSON formatters with appropriate contrast, scalable text, and customizable color schemes to accommodate users with visual impairments.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1 text-blue-600 dark:text-blue-400 shrink-0">
                    <MousePointer size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Keyboard Navigation</h3>
                    <p className="text-sm text-muted-foreground">
                      Implementing comprehensive keyboard controls to allow users with motor disabilities to navigate, edit, and manipulate JSON data without relying on mouse input.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="mt-1 text-indigo-600 dark:text-indigo-500 shrink-0">
                    <Globe size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Screen Reader Support</h3>
                    <p className="text-sm text-muted-foreground">
                      Ensuring JSON formatters provide appropriate ARIA labels, semantic markup, and logical structure to enable effective use with screen readers and other assistive technologies.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1 text-indigo-600 dark:text-indigo-500 shrink-0">
                    <Languages size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Internationalization</h3>
                    <p className="text-sm text-muted-foreground">
                      Creating globally accessible tools through multilingual interfaces, culturally sensitive design, and support for various writing systems and reading directions.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-md bg-muted p-4 text-sm">
              <div className="flex items-center gap-2 font-medium">
                <Accessibility size={16} className="text-blue-500" />
                <span>Accessibility Principle:</span>
              </div>
              <p className="mt-1 text-muted-foreground">
                Accessible JSON tools benefit all users, not just those with disabilities—features like high contrast modes, keyboard shortcuts, and clear error messaging improve the experience for everyone, especially in challenging environments or when using different devices.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <ToolArticlesList toolName="JSON Formatter" toolSlug="json-formatter" articles={jsonFormatterArticles} />
    </Container>
  );
} 