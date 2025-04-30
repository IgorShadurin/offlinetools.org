"use client";

import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { PageLayout } from "@/components/page-layout";
import { useEffect } from "react";

/**
 * Custom 404 Not Found page
 * Provides helpful navigation, information about offline tools, and links to popular tools
 */
export default function NotFound() {
  // Track 404 page view
  useEffect(() => {
    // Log 404 occurrence to analytics
    try {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "404_error", {
          page_location: window.location.href,
          page_path: window.location.pathname
        });
      }
    } catch {
      // Silent error handling for analytics
    }
  }, []);

  return (
    <PageLayout>
      <Container className="flex flex-col items-center justify-center py-20 text-center">
        <div className="space-y-4 mb-8">
          <h1 className="text-7xl font-bold text-primary">404</h1>
          <h2 className="text-2xl sm:text-3xl font-semibold">Page Not Found</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            We couldn&apos;t find the page you&apos;re looking for. It might have been moved, deleted, or never existed.
          </p>
        </div>

        {/* Prominent home page link */}
        <div className="mb-10">
          <Button asChild size="lg" className="text-lg px-8">
            <Link href="/">Go to Home Page</Link>
          </Button>
        </div>

        {/* Information about offline tools */}
        <div className="bg-muted/50 p-6 rounded-lg mb-10 max-w-2xl">
          <h3 className="text-xl font-medium mb-3">Why Use Offline Tools?</h3>
          <div className="text-left space-y-3">
            <p>
              Using offline tools on your PC offers significant advantages over online alternatives:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Enhanced Privacy:</strong> Your data never leaves your computer, keeping sensitive information secure.</li>
              <li><strong>Improved Security:</strong> No risk of data interception or exposure through internet transmission.</li>
              <li><strong>Better Performance:</strong> Work without internet latency or connection issues.</li>
              <li><strong>Always Available:</strong> Access your tools anytime, even without internet connectivity.</li>
              <li><strong>No Usage Limits:</strong> Process data without size restrictions or API rate limits.</li>
            </ul>
            <p className="mt-4">
              Download our desktop application to access all tools offline, directly on your computer.
            </p>
            <div className="mt-4 flex justify-center">
              <Button asChild variant="secondary">
                <Link href="/download">Download Desktop App</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Popular tools section */}
        <div className="space-y-4 mb-10">
          <h3 className="text-xl font-medium">Popular Tools</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <Button asChild variant="outline" className="w-full">
              <Link href="/tools/json-formatter">JSON Formatter</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/tools/base64-codec">Base64 Codec</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/tools/url-encoder">URL Encoder</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/tools/text-hash-generator">Hash Generator</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/tools/file-generator">File Generator</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/tools/file-hash-compare">File Hash Compare</Link>
            </Button>
          </div>
        </div>

        {/* Navigation help */}
        <div className="space-y-4">
          <h3 className="text-xl font-medium">Site Navigation</h3>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild variant="secondary">
              <Link href="/tools">All Tools</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/docs">Documentation</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/faq">FAQ</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </Container>
    </PageLayout>
  );
} 