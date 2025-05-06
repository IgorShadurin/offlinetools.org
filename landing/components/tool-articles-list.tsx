import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Interface for article data
 */
export interface ToolArticle {
  title: string;
  description: string;
  slug: string;
  date?: string;
}

/**
 * Props for ToolArticlesList component
 */
export interface ToolArticlesListProps {
  toolName: string;
  toolSlug: string;
  articles: ToolArticle[];
}

/**
 * A reusable component that displays a list of articles for a specific tool
 */
export function ToolArticlesList({ toolName, toolSlug, articles }: ToolArticlesListProps) {
  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No articles available for {toolName} yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight">{toolName} Articles</h2>
        <p className="text-muted-foreground">
          Learn more about how to use {toolName} effectively.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Card key={article.slug} className="overflow-hidden transition-all hover:shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">
                <Link 
                  href={`/a/${toolSlug}/${article.slug}`} 
                  className="hover:text-primary transition-colors"
                >
                  {article.title}
                </Link>
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                1 min read
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-2">{article.description}</p>
              <Link 
                href={`/a/${toolSlug}/${article.slug}`}
                className="text-sm font-medium text-primary hover:underline mt-4 inline-block"
              >
                Read more →
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="text-center pt-4">
        <Link 
          href="/a" 
          className="text-sm font-medium text-primary hover:underline"
        >
          View all articles →
        </Link>
      </div>
    </div>
  );
} 