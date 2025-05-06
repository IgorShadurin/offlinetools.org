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
  {
    title: "Why Your JSON Formatter Shows a Red Error Message: Troubleshooting Guide",
    description: "Understand why JSON formatters display red error messages and how to effectively troubleshoot common JSON syntax issues.",
    slug: "why-your-json-formatter-shows-a-red-error-message-troubleshooting-guide",
  },
  {
    title: "Handling Trailing Commas in JSON - A Formatter's Approach",
    description: "Learn how to properly handle trailing commas in JSON, why they cause errors, and techniques to manage them in development and production.",
    slug: "handling-trailing-commas-in-json-a-formatters-approach",
  },
  {
    title: "Missing Brackets: The Most Common JSON Error and Its Solutions",
    description: "Learn how to identify and fix missing brackets in JSON documents, the most common JSON syntax error faced by developers.",
    slug: "missing-brackets-the-most-common-json-error-and-its-solutions",
  },
  {
    title: "Unexpected End of JSON Input: Causes and Fixes",
    description: "Learn what causes the 'Unexpected end of JSON input' error and discover practical solutions to fix this common JSON parsing problem.",
    slug: "unexpected-end-of-json-input-causes-and-fixes",
  },
  {
    title: "Debugging Invalid JSON: Tools and Techniques",
    description: "Discover essential tools and effective techniques for debugging invalid JSON data and resolving syntax errors efficiently.",
    slug: "debugging-invalid-json-tools-and-techniques",
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