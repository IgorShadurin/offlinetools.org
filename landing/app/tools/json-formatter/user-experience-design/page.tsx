import { Container } from "@/components/ui/container";
import { ToolArticle, ToolArticlesList } from "@/components/tool-articles-list";
import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Smile, Paintbrush, MousePointer, MonitorSmartphone, Palette } from "lucide-react";

/**
 * Metadata for the JSON Formatter User Experience Design page
 */
export const metadata: Metadata = {
  title: "JSON Formatter User Experience Design | Offline Tools",
  description:
    "Design principles and patterns for creating intuitive and effective JSON formatter interfaces"
};

/**
 * Articles related to JSON Formatter user experience design
 */
const jsonFormatterArticles: ToolArticle[] = [];

/**
 * JSON Formatter User Experience Design page component
 */
export default function JsonFormatterUxPage() {
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
                <li aria-current="page">User Experience Design</li>
              </ol>
            </nav>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">JSON Formatter User Experience Design</h1>
          </div>
        </div>

        <Card className="mb-8 overflow-hidden border-2">
          <CardHeader className="bg-gradient-to-r from-pink-50 to-fuchsia-50 dark:from-pink-950/30 dark:to-fuchsia-950/30 pb-2">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Smile className="text-pink-500" size={24} />
              Designing Intuitive JSON Interfaces
            </CardTitle>
            <CardDescription>Creating user-friendly experiences for JSON data interaction</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="mt-1 text-pink-600 dark:text-pink-400 shrink-0">
                    <Paintbrush size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Visual Hierarchy</h3>
                    <p className="text-sm text-muted-foreground">
                      Employing effective visual organization through indentation, color coding, and typography to make JSON structure immediately understandable.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1 text-pink-600 dark:text-pink-400 shrink-0">
                    <MousePointer size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Interaction Design</h3>
                    <p className="text-sm text-muted-foreground">
                      Creating intuitive controls for collapsing/expanding nodes, searching content, and navigating through complex nested structures.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="mt-1 text-fuchsia-600 dark:text-fuchsia-500 shrink-0">
                    <Palette size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Visual Feedback</h3>
                    <p className="text-sm text-muted-foreground">
                      Implementing clear visual cues for validation errors, successful operations, and interactive elements to guide users through the formatting process.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1 text-fuchsia-600 dark:text-fuchsia-500 shrink-0">
                    <MonitorSmartphone size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Responsive Design</h3>
                    <p className="text-sm text-muted-foreground">
                      Designing interfaces that adapt gracefully across device sizes while maintaining usability and feature access on desktop and mobile platforms.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-md bg-muted p-4 text-sm">
              <div className="flex items-center gap-2 font-medium">
                <Smile size={16} className="text-pink-500" />
                <span>Design Principle:</span>
              </div>
              <p className="mt-1 text-muted-foreground">
                The most effective JSON formatter interfaces balance simplicity with power, keeping common actions immediately accessible while making advanced features discoverable through progressive disclosure.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <ToolArticlesList toolName="JSON Formatter" toolSlug="json-formatter" articles={jsonFormatterArticles} />
    </Container>
  );
} 