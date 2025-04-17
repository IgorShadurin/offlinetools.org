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
          {blogPosts.map((post) => (
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
                  <Link href="#">Read more</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="flex justify-center mt-12">
          <p className="text-center text-muted-foreground">More blog posts coming soon!</p>
        </div>
      </Container>
    </PageLayout>
  );
}

const blogPosts = [
  {
    id: "1",
    title: "Introducing Offline Tools: Privacy-first utilities for everyone",
    excerpt: "Today, we&apos;re excited to announce the official launch of Offline Tools, a platform dedicated to providing high-quality utilities that respect your privacy.",
    date: "2023-09-15"
  },
  {
    id: "2",
    title: "Why Your Data Should Never Leave Your Device",
    excerpt: "In an age of constant data collection, we explore the importance of offline tools and how they can protect your sensitive information.",
    date: "2023-10-02"
  },
  {
    id: "3",
    title: "Upcoming Features and Tools: Q4 2023 Roadmap",
    excerpt: "We&apos;re working on several exciting new tools and improvements. Here&apos;s a preview of what&apos;s coming to Offline Tools in the next few months.",
    date: "2023-10-20"
  },
  {
    id: "4",
    title: "The Hidden Cost of 'Free' Online Tools",
    excerpt: "Most online tools are free to use, but there&apos;s often a hidden cost: your data. We examine the true price of convenience.",
    date: "2023-11-05"
  },
  {
    id: "5",
    title: "How to Secure Your Digital Life in 2024",
    excerpt: "As we approach a new year, here are practical steps you can take to enhance your digital privacy and security.",
    date: "2023-12-12"
  },
  {
    id: "6",
    title: "Community Spotlight: How Users Are Using Offline Tools",
    excerpt: "We showcase some innovative ways our community is using Offline Tools in their personal and professional lives.",
    date: "2024-01-18"
  }
]; 