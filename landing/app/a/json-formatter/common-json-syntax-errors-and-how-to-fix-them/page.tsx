import type { Metadata } from "next";

/**
 * Metadata for JSON formatter article
 */
export const metadata: Metadata = {
  title: "Common JSON Syntax Errors and How to Fix Them | Offline Tools",
  description: "Learn about common JSON syntax errors and how to fix them with our JSON formatter tool",
};

/**
 * Article page component for JSON formatter article
 */
export default function JsonFormatterArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Common JSON Syntax Errors and How to Fix Them</h1>
      <div className="space-y-4">
        <p>
          Hello world! This is an article about common JSON syntax errors and how to fix them.
        </p>
        <p>
          More content will be added to this article in the future.
        </p>
      </div>
    </>
  );
} 