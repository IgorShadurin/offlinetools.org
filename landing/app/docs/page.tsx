import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { PageLayout } from "@/components/page-layout";
import Link from "next/link";

export const metadata = {
  title: "Documentation | Offline Tools",
  description: "Official documentation for Offline Tools platform and utilities.",
};

export default function DocsPage() {
  return (
    <PageLayout>
      <Container className="py-12 md:py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Documentation</h1>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Comprehensive guides and references for all Offline Tools features
          </p>
        </div>
        
        <div className="mx-auto max-w-5xl mt-10 md:mt-16 grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>Everything you need to know to get started with Offline Tools</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Documentation is being prepared and will be available soon.</p>
              <Button asChild variant="outline">
                <Link href="/contact">Contact Support</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>FAQ</CardTitle>
              <CardDescription>Answers to frequently asked questions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Have a question? Check our FAQ section for quick answers.</p>
              <Button asChild variant="outline">
                <Link href="/faq">View FAQs</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </Container>
    </PageLayout>
  );
} 