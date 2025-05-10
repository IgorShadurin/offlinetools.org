import { Container } from "@/components/ui/container";
import { ToolArticle, ToolArticlesList } from "@/components/tool-articles-list";
import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Shield, Lock, Eye, FileWarning, KeyRound } from "lucide-react";

/**
 * Metadata for the JSON Formatter Security Considerations page
 */
export const metadata: Metadata = {
  title: "JSON Formatter Security Considerations | Offline Tools",
  description:
    "Understand security risks and best practices when working with JSON data and formatters"
};

/**
 * Articles related to JSON Formatter security considerations
 */
const jsonFormatterArticles: ToolArticle[] = [];

/**
 * JSON Formatter Security Considerations page component
 */
export default function JsonFormatterSecurityPage() {
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
                <li aria-current="page">Security Considerations</li>
              </ol>
            </nav>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">JSON Formatter Security Considerations</h1>
          </div>
        </div>

        <Card className="mb-8 overflow-hidden border-2">
          <CardHeader className="bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-950/30 dark:to-rose-950/30 pb-2">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Shield className="text-red-500" size={24} />
              Securing JSON Data Processing
            </CardTitle>
            <CardDescription>Protecting sensitive data and preventing security vulnerabilities</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="mt-1 text-red-600 dark:text-red-400 shrink-0">
                    <FileWarning size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">JSON Injection</h3>
                    <p className="text-sm text-muted-foreground">
                      Understanding how improperly handled JSON can lead to injection attacks, particularly when dynamically evaluating JSON as code or using it in database operations.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1 text-red-600 dark:text-red-400 shrink-0">
                    <Eye size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Data Privacy</h3>
                    <p className="text-sm text-muted-foreground">
                      Best practices for handling sensitive data in JSON, including PII redaction, secure storage, and considerations for online vs. offline formatting tools.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="mt-1 text-rose-600 dark:text-rose-500 shrink-0">
                    <Lock size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Secure Transmission</h3>
                    <p className="text-sm text-muted-foreground">
                      Ensuring JSON data is securely transmitted using proper encryption, HTTPS protocols, and understanding the risks of sharing formatted JSON through insecure channels.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1 text-rose-600 dark:text-rose-500 shrink-0">
                    <KeyRound size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Access Control</h3>
                    <p className="text-sm text-muted-foreground">
                      Implementing proper access controls for JSON data processing tools, especially in enterprise environments where confidential data may be formatted or validated.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-md bg-muted p-4 text-sm">
              <div className="flex items-center gap-2 font-medium">
                <Shield size={16} className="text-red-500" />
                <span>Security Advisory:</span>
              </div>
              <p className="mt-1 text-muted-foreground">
                When using online JSON formatters, be aware that sensitive data may be transmitted to third-party servers. For confidential information, prefer offline tools that process data locally on your device.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <ToolArticlesList toolName="JSON Formatter" toolSlug="json-formatter" articles={jsonFormatterArticles} />
    </Container>
  );
} 