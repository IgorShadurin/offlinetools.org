"use client"

import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { FeatureItem } from "@/components/feature-item"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { Section } from "@/components/ui/section"
import { Download } from "lucide-react"
import Link from "next/link"
import { StructuredData } from "@/components/structured-data"
import { onlineTools } from "@/components/online-tools-grid"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Add specific home page structured data */}
        <StructuredData type="home" />
        
        {/* Hero Section */}
        <section className="relative py-20 md:py-28">
          <Container className="flex flex-col items-center text-center">
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">
              All-in-one Toolbox for Developers
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground mb-8 md:mb-10">
              A collection of essential offline developer tools to boost your productivity. Available for macOS, Windows, and Linux.
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <Button 
                size="lg" 
                className="text-base py-2.5 px-5 font-medium"
                asChild
              >
                <Link href="/download" className="flex items-center gap-2">
                  <Download className="h-5 w-5" /> Download Now
                </Link>
              </Button>
            </div>
            <div className="mt-12 md:mt-16 relative w-full max-w-5xl aspect-[16/9] rounded-lg overflow-hidden border bg-background/50 shadow-xl">
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                <p className="text-muted-foreground">App Screenshot Placeholder</p>
              </div>
            </div>
          </Container>
        </section>

        {/* Features Section */}
        <Section id="features" className="bg-gray-50 dark:bg-gray-900/50">
          <Container>
            <h2 className="text-3xl font-bold text-center mb-4">🧰 What&apos;s in the box?</h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
              OfflineTools provides powerful utilities for developers in a single, well-designed desktop application.
              All tools are also available online for free use in your browser.
            </p>
            <div className="grid gap-8 md:grid-cols-3">
              {onlineTools.map((tool, index) => (
                <FeatureItem
                  key={index}
                  title={tool.title}
                  description={tool.description}
                  icon="/images/placeholder.svg"
                >
                  <div className="mt-4">
                    <Button variant="link" asChild className="h-auto p-0">
                      <Link href={tool.path}>
                        Try online →
                      </Link>
                    </Button>
                  </div>
                </FeatureItem>
              ))}
            </div>
          </Container>
        </Section>

        {/* Use Cases */}
        <Section id="use-cases">
          <Container>
            <h2 className="text-3xl font-bold text-center mb-4">For every developer workflow</h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
              OfflineTools adapts to how you work, whether you&apos;re a frontend developer, backend engineer, or DevOps specialist.
            </p>
            <div className="grid gap-10 md:grid-cols-2">
              <div className="rounded-lg border bg-background p-6 shadow-sm">
                <h3 className="text-2xl font-semibold mb-4">Frontend Developers</h3>
                <div className="aspect-[16/10] mb-4 bg-gray-100 dark:bg-gray-800 flex items-center justify-center rounded-md">
                  <p className="text-muted-foreground">Screenshot Placeholder</p>
                </div>
                <p className="text-muted-foreground">
                  Streamline your frontend workflow with tools for JSON, CSS, color manipulation,
                  and more, all integrated in one application.
                </p>
              </div>
              <div className="rounded-lg border bg-background p-6 shadow-sm">
                <h3 className="text-2xl font-semibold mb-4">Backend Engineers</h3>
                <div className="aspect-[16/10] mb-4 bg-gray-100 dark:bg-gray-800 flex items-center justify-center rounded-md">
                  <p className="text-muted-foreground">Screenshot Placeholder</p>
                </div>
                <p className="text-muted-foreground">
                  Decode JWTs, generate UUIDs, hash strings, and test regular expressions
                  without leaving your desktop or exposing sensitive data online.
                </p>
              </div>
            </div>
          </Container>
        </Section>

        {/* CTA */}
        <Section>
          <Container>
            <div className="rounded-lg bg-primary px-6 py-10 md:py-16 text-center text-primary-foreground">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-6">
                Ready to boost your productivity?
              </h2>
              <p className="mx-auto max-w-2xl text-lg mb-8">
                Join thousands of developers who use OfflineTools to streamline their daily tasks.
              </p>
              <Button 
                size="lg" 
                className="text-base py-2.5 px-5 font-medium"
                variant="secondary" 
                asChild
              >
                <Link href="/download" className="flex items-center gap-2">
                  <Download className="h-5 w-5" /> Download Now
                </Link>
              </Button>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  )
}
