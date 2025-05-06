import type { Metadata } from "next";
import Link from "next/link";

/**
 * Metadata for articles index page
 */
export const metadata: Metadata = {
  title: "Articles | Offline Tools",
  description: "Browse all articles about our offline tools and guides",
};

/**
 * List of articles organized by tool
 */
const articlesByTool = [
  {
    tool: "JSON Formatter",
    slug: "json-formatter",
    articles: [
      {
        title: "Common JSON Syntax Errors and How to Fix Them",
        slug: "common-json-syntax-errors-and-how-to-fix-them",
      },
    ],
  },
  {
    tool: "Binary Base64 Codec",
    slug: "binary-base64-codec",
    articles: [
      {
        title: "Binary Base64 Codec Article",
        slug: "article-1",
      },
    ],
  },
];

/**
 * Articles index page component
 */
export default function ArticlesPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Articles</h1>
      <div className="space-y-8">
        {articlesByTool.map((toolArticles) => (
          <div key={toolArticles.slug} className="space-y-4">
            <h2 className="text-2xl font-semibold">{toolArticles.tool}</h2>
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
          </div>
        ))}
      </div>
    </>
  );
} 