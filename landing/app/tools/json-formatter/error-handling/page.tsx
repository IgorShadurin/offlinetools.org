import { Container } from "@/components/ui/container";
import { ToolArticle, ToolArticlesList } from "@/components/tool-articles-list";
import { Metadata } from "next";
import Link from "next/link";

/**
 * Metadata for the JSON Formatter Error Handling page
 */
export const metadata: Metadata = {
  title: "JSON Formatter Error Handling | Offline Tools",
  description: "Learn how to handle and fix errors in your JSON data using our JSON Formatter tool",
};

/**
 * Articles related to JSON Formatter
 */
const jsonFormatterArticles: ToolArticle[] = [
  {
    title: "Common JSON Syntax Errors and How to Fix Them",
    description: "Learn about the most common JSON syntax errors and how to identify and fix them quickly.",
    slug: "common-json-syntax-errors-and-how-to-fix-them",
  },
  // More articles can be added here
];

/**
 * JSON Formatter Error Handling page component
 */
export default function JsonFormatterErrorHandlingPage() {
  return (
    <Container className="py-10">
      <div className="mb-10">
        <div className="mb-4 flex items-center">
          <div className="flex-1">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
                <li><Link href="/" className="hover:text-foreground">Home</Link></li>
                <li><span>/</span></li>
                <li><Link href="/tools" className="hover:text-foreground">Tools</Link></li>
                <li><span>/</span></li>
                <li><Link href="/tools/json-formatter" className="hover:text-foreground">JSON Formatter</Link></li>
                <li><span>/</span></li>
                <li aria-current="page">Error Handling</li>
              </ol>
            </nav>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">JSON Formatter Error Handling</h1>
          </div>
        </div>
        <div className="prose dark:prose-invert max-w-none">
          <p>
            This page provides guidance on how to handle common errors when formatting JSON data.
            Our JSON Formatter tool helps you identify and fix syntax errors in your JSON data.
          </p>
          <h2>Common JSON Errors</h2>
          <p>
            JSON syntax can be tricky, especially for beginners. Here are some common errors you might encounter:
          </p>
          <ul>
            <li>Missing or extra commas</li>
            <li>Unclosed brackets or braces</li>
            <li>Using single quotes instead of double quotes</li>
            <li>Trailing commas in arrays or objects</li>
          </ul>
          <p>
            For more detailed explanations and solutions to these errors, check out our articles below.
          </p>
        </div>
      </div>
      
      <ToolArticlesList 
        toolName="JSON Formatter" 
        toolSlug="json-formatter" 
        articles={jsonFormatterArticles} 
      />
    </Container>
  );
} 