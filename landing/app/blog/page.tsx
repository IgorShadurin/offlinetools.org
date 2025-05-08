import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { PageLayout } from "@/components/page-layout";
import { CalendarIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export const metadata = {
  title: "Blog | Offline Tools",
  description: "Stay updated with the latest news, tutorials, and insights about privacy, security, and Offline Tools.",
};

export default function BlogPage() {
  return (
    <PageLayout>
      <Container className="py-12 md:py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Blog</h1>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Insights, updates, and perspectives from the Offline Tools team
          </p>
        </div>

        <div className="mx-auto max-w-5xl mt-10 md:mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[...blogPosts]
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map((post) => (
              <Card key={post.id} className="flex flex-col">
                <CardHeader className="flex-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <CalendarIcon className="h-4 w-4" />
                    <time dateTime={post.date}>{post.date}</time>
                  </div>
                  <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-3 mt-2">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={post.slug}>Read more</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </div>
      </Container>
    </PageLayout>
  );
}

const blogPosts = [
  {
    id: "1",
    title: "Hash Encode Decode Offline",
    excerpt:
      "Hash encoding and decoding are essential for data verification, security, and integrity. Learn how to work with hashes offline for secure, reliable operations without internet dependency.",
    date: "2025-05-08",
    slug: "/blog/hash-encode-decode-offline",
  },
  {
    id: "2",
    title: "Base64 Decode Offline",
    excerpt:
      "Base64 decoding is essential for working with encoded data in development and web applications. Learn how to decode Base64 strings offline to protect sensitive data and ensure uninterrupted workflows.",
    date: "2025-05-08",
    slug: "/blog/base64-decode-offline",
  },
  {
    id: "3",
    title: "What Developer Tools Can Be Used Offline",
    excerpt:
      "Discover the best offline developer tools that ensure privacy, reliability, and productivity without constant internet connectivity. Compare online solutions with our desktop alternatives.",
    date: "2025-05-07",
    slug: "/blog/what-developer-tools-can-be-used-offline",
  },
  {
    id: "4",
    title: "Jolt Offline JSON Formatter: Process JSON Locally",
    excerpt:
      "Learn why processing JSON data offline provides better security, privacy, and performance. Discover how offline JSON formatters like OfflineTools protect sensitive information and improve workflow.",
    date: "2025-05-07",
    slug: "/blog/jolt-offline-json-formatter",
  },
  {
    id: "5",
    title: "Offline JSON Query Tool",
    excerpt:
      "JSON query tools let you search, filter, and transform JSON data efficiently. But what happens when you're working offline or with sensitive data? Here's why you need offline JSON tools in your developer toolkit.",
    date: "2025-05-07",
    slug: "/blog/offline-json-query-tool",
  },
];
