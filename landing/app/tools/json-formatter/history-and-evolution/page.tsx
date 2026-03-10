import { Container } from "@/components/ui/container";
import { ToolArticle, ToolArticlesList } from "@/components/tool-articles-list";
import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { History, Clock, BookOpen, Archive, GitBranch, Sparkles } from "lucide-react";

/**
 * Metadata for the JSON Formatter History and Evolution page
 */
export const metadata: Metadata = {
  title: "JSON Formatter History and Evolution | Offline Tools",
  description:
    "Explore the fascinating history and evolution of JSON formatters from their early beginnings to modern implementations",
};

/**
 * Articles related to JSON Formatter history and evolution
 */
const jsonFormatterHistoryArticles: ToolArticle[] = [
  {
    title: "The Origin Story of JSON: From JavaScript Object Literals to Universal Format",
    description:
      "Discover how JSON evolved from a JavaScript-specific notation to a language-independent data interchange format that powers the modern web.",
    slug: "the-origin-story-of-json-from-javascript-object-literals-to-universal-format",
  },
  {
    title: "Douglas Crockford and the Birth of JSON Formatting Tools",
    description:
      "Learn about Douglas Crockford's pivotal role in creating JSON and developing the first tools for formatting and validating this revolutionary data format.",
    slug: "douglas-crockford-and-the-birth-of-json-formatting-tools",
  },
  {
    title: "How Chrome DevTools Changed JSON Formatting Forever",
    description:
      "Discover how Google Chrome's developer tools set new standards for integrated JSON visualization and significantly influenced standalone formatters.",
    slug: "how-chrome-devtools-changed-json-formatting-forever",
  },
  {
    title: "The Rivalry Between XML and JSON Visualization Tools",
    description:
      "Explore the competitive dynamics between XML and JSON formatters as JSON grew to dominate web data interchange.",
    slug: "the-rivalry-between-xml-and-json-visualization-tools",
  },
  {
    title: "The Standardization of JSON and Its Effect on Formatting Tools",
    description:
      "How the formalization of JSON as a standard influenced the development of more consistent and interoperable formatting tools.",
    slug: "the-standardization-of-json-and-its-effect-on-formatting-tools",
  },
  {
    title: "The Impact of JavaScript Framework Ecosystems on JSON Tools",
    description:
      "How popular JavaScript frameworks like React, Angular, and Vue influenced the development and integration of JSON formatting tools.",
    slug: "the-impact-of-javascript-framework-ecosystems-on-json-tools",
  },
];

/**
 * JSON Formatter History and Evolution page component
 */
export default function JsonFormatterHistoryPage() {
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
                <li aria-current="page">History and Evolution</li>
              </ol>
            </nav>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">JSON Formatter History and Evolution</h1>
          </div>
        </div>

        <Card className="mb-8 overflow-hidden border-2">
          <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 pb-2">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <History className="text-amber-500" size={24} />
              The Evolution of JSON Formatters
            </CardTitle>
            <CardDescription>From simple text viewers to advanced interactive tools</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="mt-1 text-amber-600 dark:text-amber-400 shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Early Beginnings</h3>
                    <p className="text-sm text-muted-foreground">
                      From Douglas Crockford's introduction of JSON in the early 2000s to the first basic formatters
                      that helped developers make sense of this new data format.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1 text-amber-600 dark:text-amber-400 shrink-0">
                    <BookOpen size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Standardization Era</h3>
                    <p className="text-sm text-muted-foreground">
                      How the formalization of JSON specifications as ECMA-404 and RFC 8259 influenced the development
                      of more consistent and reliable formatting tools.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="mt-1 text-orange-600 dark:text-orange-500 shrink-0">
                    <GitBranch size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Web Integration</h3>
                    <p className="text-sm text-muted-foreground">
                      The shift from desktop utilities to browser-based tools, driven by AJAX technologies and the
                      growing importance of APIs in web development.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1 text-orange-600 dark:text-orange-500 shrink-0">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Modern Features</h3>
                    <p className="text-sm text-muted-foreground">
                      How today's JSON formatters have evolved to include advanced features like schema validation,
                      visual editors, and interactive tree views.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-md bg-muted p-4 text-sm">
              <div className="flex items-center gap-2 font-medium">
                <Archive size={16} className="text-amber-500" />
                <span>Historical Context:</span>
              </div>
              <p className="mt-1 text-muted-foreground">
                JSON's rise to prominence coincided with the growth of web applications and APIs, replacing XML as the
                preferred data interchange format due to its simplicity and JavaScript integration.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <ToolArticlesList toolName="JSON Formatter" toolSlug="json-formatter" articles={jsonFormatterHistoryArticles} />
    </Container>
  );
}
