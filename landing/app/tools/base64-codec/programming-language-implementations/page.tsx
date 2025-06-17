import { Container } from "@/components/ui/container";
import { ToolArticle, ToolArticlesList } from "@/components/tool-articles-list";
import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Code, Braces, FileCode, Library, Terminal, Blocks } from "lucide-react";

/**
 * Metadata for the Base64 Codec Programming Language Implementations page
 */
export const metadata: Metadata = {
  title: "Base64 Codec Programming Language Implementations | Offline Tools",
  description: "Learn about Base64 codec implementations across different programming languages",
};

/**
 * Articles related to Base64 Codec programming language implementations
 */
const base64CodecArticles: ToolArticle[] = [
  {
    title: "JavaScript Base64 Implementation: btoa and atob Functions",
    description:
      "Understanding the built-in Base64 encoding and decoding functions in JavaScript and their limitations.",
    slug: "javascript-base64-implementation-btoa-and-atob-functions",
  },
  {
    title: "TypeScript Base64 Handling: Type-Safe Implementations",
    description: "Type-safe approaches to Base64 encoding and decoding in TypeScript applications.",
    slug: "typescript-base64-handling-type-safe-implementations",
  },
  {
    title: "Python Base64 Module: Comprehensive API Overview",
    description: "Exploring the rich functionality provided by Python's built-in base64 module.",
    slug: "python-base64-module-comprehensive-api-overview",
  },
  {
    title: "Java Base64 Encoding: java.util.Base64 Class",
    description: "Deep dive into Java's native Base64 implementation and its encoding/decoding capabilities.",
    slug: "java-base64-encoding-java-util-base64-class",
  },
  {
    title: "C# Base64 Encoding with System.Convert",
    description: "Using C#'s System.Convert class for efficient Base64 encoding and decoding operations.",
    slug: "csharp-base64-encoding-with-system-convert",
  },
  {
    title: "PHP Base64 Functions: base64_encode and base64_decode",
    description: "Working with PHP's native Base64 functions for web application development.",
    slug: "php-base64-functions-base64-encode-and-base64-decode",
  },
  {
    title: "Go Language Base64 Implementation in encoding/base64",
    description: "Exploring Go's standard library support for Base64 encoding and its performance characteristics.",
    slug: "go-language-base64-implementation-in-encoding-base64",
  },
  {
    title: "Ruby Base64 Module: Features and Examples",
    description: "A guide to Ruby's Base64 module with practical coding examples and usage patterns.",
    slug: "ruby-base64-module-features-and-examples",
  },
  {
    title: "C++ Base64 Implementations: Standard Library Options",
    description: "Base64 encoding approaches in C++ using both standard library and popular third-party libraries.",
    slug: "cpp-base64-implementations-standard-library-options",
  },
  {
    title: "Rust Base64 Encoding Crates: Performance and Features",
    description:
      "A comparison of Base64 libraries available in the Rust ecosystem with focus on safety and performance.",
    slug: "rust-base64-encoding-crates-performance-and-features",
  },
  {
    title: "Swift Base64 Encoding with Foundation Framework",
    description: "Using Swift and the Foundation framework for Base64 operations in iOS and macOS development.",
    slug: "swift-base64-encoding-with-foundation-framework",
  },
  {
    title: "Kotlin Base64 Extensions and Multi-platform Support",
    description: "Base64 implementation in Kotlin with emphasis on cross-platform compatibility.",
    slug: "kotlin-base64-extensions-and-multi-platform-support",
  },
  {
    title: "Node.js Buffer API for Base64 Encoding",
    description: "Leveraging Node.js Buffer API for efficient Base64 encoding and decoding in server applications.",
    slug: "nodejs-buffer-api-for-base64-encoding",
  },
  {
    title: "Low-Level C Base64 Implementation Techniques",
    description: "Implementing efficient Base64 encoding and decoding algorithms in the C programming language.",
    slug: "low-level-c-base64-implementation-techniques",
  },
  {
    title: "Assembly Language Base64 Implementations for Performance",
    description: "Exploring assembly-level Base64 encoding for maximum performance in specialized applications.",
    slug: "assembly-language-base64-implementations-for-performance",
  },
  {
    title: "Scala Base64 Encoding Options and Functional Approaches",
    description: "Functional programming patterns for Base64 encoding and decoding in the Scala language.",
    slug: "scala-base64-encoding-options-and-functional-approaches",
  },
  {
    title: "Perl's MIME::Base64 Module: Features and Usage",
    description: "Understanding Perl's approach to Base64 encoding through the MIME::Base64 module.",
    slug: "perls-mime-base64-module-features-and-usage",
  },
  {
    title: "Objective-C Base64 Encoding Methods for iOS Development",
    description: "Base64 encoding techniques in Objective-C for legacy iOS application development.",
    slug: "objective-c-base64-encoding-methods-for-ios-development",
  },
  {
    title: "Cross-Language Base64 Compatibility Considerations",
    description: "Ensuring consistent Base64 output across different programming language implementations.",
    slug: "cross-language-base64-compatibility-considerations",
  },
  {
    title: "Embedded Systems Base64 Implementations for Resource-Constrained Environments",
    description: "Optimized Base64 coding techniques for microcontrollers and embedded systems with limited resources.",
    slug: "embedded-systems-base64-implementations-for-resource-constrained-environments",
  },
];

/**
 * Base64 Codec Programming Language Implementations page component
 */
export default function Base64CodecProgrammingLanguagesPage() {
  return (
    <Container className="py-10">
      <div className="mb-10">
        <div className="mb-4 flex items-center">
          <div className="flex-1">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/" className="hover:text-foreground">
                    Home
                  </Link>
                </li>
                <li>
                  <span>/</span>
                </li>
                <li>
                  <Link href="/tools" className="hover:text-foreground">
                    Tools
                  </Link>
                </li>
                <li>
                  <span>/</span>
                </li>
                <li>
                  <Link href="/tools/base64-codec" className="hover:text-foreground">
                    Base64 Codec
                  </Link>
                </li>
                <li>
                  <span>/</span>
                </li>
                <li aria-current="page">Programming Language Implementations</li>
              </ol>
            </nav>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">
              Base64 Codec Programming Language Implementations
            </h1>
          </div>
        </div>

        <Card className="mb-8 overflow-hidden border-2">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-zinc-50 dark:from-gray-950/30 dark:to-zinc-950/30 pb-2">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Code className="text-gray-700" size={24} />
              Base64 Across Programming Languages
            </CardTitle>
            <CardDescription>
              Implementations and libraries for Base64 encoding in different programming ecosystems
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="mt-1 text-gray-700 dark:text-gray-300 shrink-0">
                    <Braces size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Web and Scripting Languages</h3>
                    <p className="text-sm text-muted-foreground">
                      Base64 implementations in JavaScript, TypeScript, Python, Ruby, PHP, and Node.js for web and
                      scripting applications.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1 text-gray-700 dark:text-gray-300 shrink-0">
                    <FileCode size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Systems Programming</h3>
                    <p className="text-sm text-muted-foreground">
                      Low-level Base64 implementations in C, C++, Rust, Go, and Assembly for performance-critical
                      applications.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="mt-1 text-zinc-700 dark:text-zinc-300 shrink-0">
                    <Library size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Object-Oriented Languages</h3>
                    <p className="text-sm text-muted-foreground">
                      Base64 libraries and patterns in Java, C#, Swift, Kotlin, and Objective-C for enterprise and
                      mobile development.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1 text-zinc-700 dark:text-zinc-300 shrink-0">
                    <Blocks size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Cross-Platform Considerations</h3>
                    <p className="text-sm text-muted-foreground">
                      Ensuring Base64 compatibility across languages, platforms, and environments including embedded
                      systems.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-md bg-muted p-4 text-sm">
              <div className="flex items-center gap-2 font-medium">
                <Terminal size={16} className="text-gray-700" />
                <span>Implementation Insight:</span>
              </div>
              <p className="mt-1 text-muted-foreground">
                While most programming languages follow RFC 4648 for Base64 implementation, subtle differences can exist
                in handling padding characters, line breaks, and URL-safe variants. When working across multiple
                languages, be aware of these nuances to ensure compatibility in your Base64 encoded data.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <ToolArticlesList toolName="Base64 Codec" toolSlug="base64-codec" articles={base64CodecArticles} />
    </Container>
  );
}
