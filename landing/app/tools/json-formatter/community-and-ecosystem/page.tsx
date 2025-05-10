import { Container } from "@/components/ui/container";
import { ToolArticle, ToolArticlesList } from "@/components/tool-articles-list";
import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, GitMerge, MessageSquare, GraduationCap, Heart } from "lucide-react";

/**
 * Metadata for the JSON Formatter Community and Ecosystem page
 */
export const metadata: Metadata = {
  title: "JSON Formatter Community and Ecosystem | Offline Tools",
  description:
    "Building and nurturing open source communities around JSON formatter tools and standards"
};

/**
 * Articles related to JSON Formatter community and ecosystem
 */
const jsonFormatterArticles: ToolArticle[] = [];

/**
 * JSON Formatter Community and Ecosystem page component
 */
export default function JsonFormatterCommunityPage() {
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
                <li aria-current="page">Community and Ecosystem</li>
              </ol>
            </nav>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">JSON Formatter Community and Ecosystem</h1>
          </div>
        </div>

        <Card className="mb-8 overflow-hidden border-2">
          <CardHeader className="bg-gradient-to-r from-green-50 to-lime-50 dark:from-green-950/30 dark:to-lime-950/30 pb-2">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Users className="text-green-500" size={24} />
              Building JSON Tool Communities
            </CardTitle>
            <CardDescription>Collaborative development and knowledge sharing in the JSON ecosystem</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="mt-1 text-green-600 dark:text-green-400 shrink-0">
                    <GitMerge size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Open Source Collaboration</h3>
                    <p className="text-sm text-muted-foreground">
                      How community-driven development powers innovation in JSON formatting tools through shared code, transparent processes, and collaborative problem-solving.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1 text-green-600 dark:text-green-400 shrink-0">
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Community Forums</h3>
                    <p className="text-sm text-muted-foreground">
                      The role of discussion spaces, developer communities, and social platforms in shaping tool development and providing support for JSON formatter users.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="mt-1 text-lime-600 dark:text-lime-500 shrink-0">
                    <GraduationCap size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Knowledge Sharing</h3>
                    <p className="text-sm text-muted-foreground">
                      Community-created documentation, tutorials, and educational resources that help users master JSON formatting concepts and tool capabilities.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1 text-lime-600 dark:text-lime-500 shrink-0">
                    <Heart size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Ecosystem Growth</h3>
                    <p className="text-sm text-muted-foreground">
                      How JSON formatting tools fit into the broader data ecosystem, connecting with related technologies and communities to create comprehensive toolchains.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-md bg-muted p-4 text-sm">
              <div className="flex items-center gap-2 font-medium">
                <Users size={16} className="text-green-500" />
                <span>Community Impact:</span>
              </div>
              <p className="mt-1 text-muted-foreground">
                The growth of open source JSON tools exemplifies how community collaboration can lead to robust, feature-rich applications that evolve rapidly through contributions from users with diverse needs and backgrounds.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <ToolArticlesList toolName="JSON Formatter" toolSlug="json-formatter" articles={jsonFormatterArticles} />
    </Container>
  );
} 