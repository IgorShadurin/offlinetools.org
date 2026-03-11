import { readdirSync } from "node:fs";
import path from "node:path";

export interface ArticleLink {
  toolName: string;
  toolSlug: string;
  slug: string;
  title: string;
  urlPath: string;
}

const TOOL_NAMES: Record<string, string> = {
  "binary-base64-codec": "Binary Base64 Codec",
  "json-formatter": "JSON Formatter",
};

function getArticlesRoot() {
  return path.join(process.cwd(), "app", "a");
}

function formatArticleTitle(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function getArticleLinks(): ArticleLink[] {
  const articlesRoot = getArticlesRoot();

  return readdirSync(articlesRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .sort((a, b) => a.name.localeCompare(b.name))
    .flatMap((toolEntry) => {
      const toolSlug = toolEntry.name;
      const toolName = TOOL_NAMES[toolSlug] ?? formatArticleTitle(toolSlug);
      const toolPath = path.join(articlesRoot, toolSlug);

      return readdirSync(toolPath, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((articleEntry) => ({
          toolName,
          toolSlug,
          slug: articleEntry.name,
          title: formatArticleTitle(articleEntry.name),
          urlPath: `/a/${toolSlug}/${articleEntry.name}`,
        }));
    });
}

export function getArticlesByTool() {
  const groupedArticles = new Map<
    string,
    {
      tool: string;
      slug: string;
      articles: Array<{
        title: string;
        slug: string;
      }>;
    }
  >();

  for (const article of getArticleLinks()) {
    const group = groupedArticles.get(article.toolSlug);

    if (group) {
      group.articles.push({
        title: article.title,
        slug: article.slug,
      });
      continue;
    }

    groupedArticles.set(article.toolSlug, {
      tool: article.toolName,
      slug: article.toolSlug,
      articles: [
        {
          title: article.title,
          slug: article.slug,
        },
      ],
    });
  }

  return Array.from(groupedArticles.values());
}
