import type { Metadata } from "next";
import Link from "next/link";
import { getArticlesByTool } from "@/lib/article-catalog";

/**
 * Metadata for articles index page
 */
export const metadata: Metadata = {
  title: "Articles | Offline Tools",
  description: "Browse all articles about our offline tools and guides",
};

/**
 * Articles index page component
 */
export default function ArticlesPage() {
  const articlesByTool = getArticlesByTool();

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Articles</h1>
      <div className="space-y-8">
        {articlesByTool.map((toolArticles) => (
          <div key={toolArticles.slug} className="space-y-4">
            <h2 className="text-2xl font-semibold">{toolArticles.tool}</h2>
            {toolArticles.articles.length > 0 ? (
              <ul className="space-y-2 list-disc list-inside">
                {toolArticles.articles.map((article) => (
                  <li key={article.slug}>
                    <Link
                      href={`/a/${toolArticles.slug}/${article.slug}`}
                      className="text-blue-600 hover:underline dark:text-blue-400"
                    >
                      {article.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">No articles available yet.</p>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
