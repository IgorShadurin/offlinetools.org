"use client"

import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { FeatureItem } from "@/components/feature-item"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { Section, SectionHeading } from "@/components/ui/section"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28">
          <Container className="flex flex-col items-center text-center">
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">
              All-in-one Toolbox for Developers
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground mb-8 md:mb-10">
              A collection of essential offline developer tools to boost your productivity.
              Available for macOS, Windows, and Linux.
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <Button size="lg" asChild>
                <Link href="/download">Download Now</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#features">Learn More</Link>
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
            <SectionHeading
              title="🧰 What's in the box?"
              description="OfflineTools provides powerful utilities for developers in a single, well-designed desktop application."
            />
            <div className="grid gap-8 md:grid-cols-3">
              <FeatureItem
                title="JSON Formatter"
                description="Format, validate, and transform JSON data with a powerful editing interface."
                icon="/images/placeholder.svg"
              />
              <FeatureItem
                title="Base64 Encoder/Decoder"
                description="Quickly encode and decode Base64 strings with support for various formats."
                icon="/images/placeholder.svg"
              />
              <FeatureItem
                title="URL Parser"
                description="Parse and analyze URL components with an intuitive visual interface."
                icon="/images/placeholder.svg"
              />
            </div>
          </Container>
        </Section>

        {/* Use Cases */}
        <Section id="use-cases">
          <Container>
            <SectionHeading
              title="For every developer workflow"
              description="OfflineTools adapts to how you work, whether you're a frontend developer, backend engineer, or DevOps specialist."
            />
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

        {/* Templates */}
        <Section id="templates" className="bg-gray-50 dark:bg-gray-900/50">
          <Container>
            <SectionHeading
              title="Customizable Templates"
              description="Start with pre-built templates or create your own to save time on common tasks."
            />
            <div className="grid gap-6 md:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-lg border bg-background shadow-sm overflow-hidden">
                  <div className="aspect-[16/12] bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <p className="text-muted-foreground">Template Placeholder</p>
                  </div>
                  <div className="p-4">
                    <h4 className="font-medium mb-2">Template {i}</h4>
                    <p className="text-sm text-muted-foreground">
                      Quick starter template for common development tasks.
                    </p>
                  </div>
                </div>
              ))}
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
              <Button size="lg" variant="secondary" asChild>
                <Link href="/download">Download Now</Link>
              </Button>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  )
}
