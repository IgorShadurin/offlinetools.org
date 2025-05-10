import { Container } from "@/components/ui/container";
import { ToolArticle, ToolArticlesList } from "@/components/tool-articles-list";
import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Globe, Laptop, Wifi, WifiOff, CloudOff } from "lucide-react";

/**
 * Metadata for the Online vs Offline JSON Tools page
 */
export const metadata: Metadata = {
  title: "Online vs Offline JSON Tools | Offline Tools",
  description:
    "Comparing the benefits and tradeoffs between online and offline JSON formatting tools"
};

/**
 * Articles related to online vs offline JSON tools
 */
const jsonFormatterArticles: ToolArticle[] = [];

/**
 * Online vs Offline JSON Tools page component
 */
export default function JsonFormatterOnlineOfflinePage() {
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
                <li aria-current="page">Online vs Offline JSON Tools</li>
              </ol>
            </nav>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">Online vs Offline JSON Tools</h1>
          </div>
        </div>

        <Card className="mb-8 overflow-hidden border-2">
          <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 pb-2">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Globe className="text-emerald-500" size={24} />
              Choosing Between Online and Offline JSON Tools
            </CardTitle>
            <CardDescription>Understanding the advantages and limitations of each approach</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="mt-1 text-emerald-600 dark:text-emerald-400 shrink-0">
                    <Wifi size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Online Tool Benefits</h3>
                    <p className="text-sm text-muted-foreground">
                      Advantages of web-based JSON formatters, including accessibility from any device, no installation requirements, and automatic updates to the latest features.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1 text-emerald-600 dark:text-emerald-400 shrink-0">
                    <Laptop size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Offline Tool Advantages</h3>
                    <p className="text-sm text-muted-foreground">
                      Benefits of desktop and locally-installed JSON formatters, such as data privacy, operation without internet connectivity, and often superior performance with large files.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="mt-1 text-teal-600 dark:text-teal-500 shrink-0">
                    <WifiOff size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Connectivity Considerations</h3>
                    <p className="text-sm text-muted-foreground">
                      How network reliability affects tool selection, workflow implications of internet dependencies, and strategies for working in environments with limited connectivity.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1 text-teal-600 dark:text-teal-500 shrink-0">
                    <CloudOff size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Security and Privacy</h3>
                    <p className="text-sm text-muted-foreground">
                      Data security implications when choosing between online and offline tools, especially for sensitive or confidential JSON data processing tasks.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-md bg-muted p-4 text-sm">
              <div className="flex items-center gap-2 font-medium">
                <Globe size={16} className="text-emerald-500" />
                <span>Selection Guidance:</span>
              </div>
              <p className="mt-1 text-muted-foreground">
                Consider a hybrid approach—using online tools for quick, accessible formatting of non-sensitive data while keeping offline tools available for private information or when working in environments without reliable internet access.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <ToolArticlesList toolName="JSON Formatter" toolSlug="json-formatter" articles={jsonFormatterArticles} />
    </Container>
  );
} 