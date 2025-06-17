import { Container } from "@/components/ui/container";
import { ToolArticle, ToolArticlesList } from "@/components/tool-articles-list";
import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookOpen, Code, Coffee, Lightbulb, FileText, BookMarked } from "lucide-react";

/**
 * Metadata for the Base64 Codec Basics and Introduction page
 */
export const metadata: Metadata = {
  title: "Base64 Codec Basics and Introduction | Offline Tools",
  description: "Learn the fundamentals of Base64 encoding and decoding, including concepts, history, and basic usage",
};

/**
 * Articles related to Base64 Codec basics and introduction
 */
const base64CodecArticles: ToolArticle[] = [
  {
    title: "What is Base64 Encoding? A Beginner's Guide",
    description:
      "A comprehensive introduction to Base64 encoding, explaining what it is, how it works, and why it's used.",
    slug: "what-is-base64-encoding-a-beginners-guide",
  },
  {
    title: "The History and Evolution of Base64 Encoding",
    description: "Explore the origins of Base64 encoding, its standardization, and how it has evolved over time.",
    slug: "the-history-and-evolution-of-base64-encoding",
  },
  {
    title: "Base64 Alphabet: Understanding the Character Set",
    description: "Learn about the 64 characters used in Base64 encoding and how they represent binary data.",
    slug: "base64-alphabet-understanding-the-character-set",
  },
  {
    title: "How Base64 Encoding Works: The Technical Process",
    description: "A detailed explanation of the step-by-step process of converting binary data to Base64 and back.",
    slug: "how-base64-encoding-works-the-technical-process",
  },
  {
    title: "Base64 vs Other Encoding Schemes: A Comparison",
    description:
      "Compare Base64 with other encoding methods like Hex, URL encoding, and Base32 to understand their differences.",
    slug: "base64-vs-other-encoding-schemes-a-comparison",
  },
  {
    title: "Common Use Cases for Base64 Encoding",
    description: "Discover the most frequent applications of Base64 encoding in modern computing and web development.",
    slug: "common-use-cases-for-base64-encoding",
  },
  {
    title: "Base64 in Email: Why MIME Uses It",
    description: "Understand why the MIME standard for email attachments relies on Base64 encoding.",
    slug: "base64-in-email-why-mime-uses-it",
  },
  {
    title: "Base64 for Images: Data URIs Explained",
    description: "Learn how Base64 encoding enables embedding images directly in HTML and CSS through data URIs.",
    slug: "base64-for-images-data-uris-explained",
  },
  {
    title: "Understanding Base64 Padding: The '=' Character",
    description: "Learn why Base64 strings sometimes end with '=' characters and how padding works.",
    slug: "understanding-base64-padding-the-equals-character",
  },
  {
    title: "URL-Safe Base64: Adapting for Web Contexts",
    description:
      "Discover how URL-safe Base64 encoding modifies the standard to work better in web URLs and identifiers.",
    slug: "url-safe-base64-adapting-for-web-contexts",
  },
  {
    title: "Base64 Size Calculation: Understanding the Output Length",
    description:
      "Learn how to calculate the size of Base64 encoded data and why it's approximately 33% larger than the original.",
    slug: "base64-size-calculation-understanding-the-output-length",
  },
  {
    title: "Base64 and Binary Data: Bridging Text and Binary Worlds",
    description: "Understand how Base64 serves as a bridge between binary data and text-based systems.",
    slug: "base64-and-binary-data-bridging-text-and-binary-worlds",
  },
  {
    title: "Learning Base64 Through Examples: Encoding and Decoding Demonstrations",
    description: "See practical examples of Base64 encoding and decoding with step-by-step explanations.",
    slug: "learning-base64-through-examples-encoding-and-decoding-demonstrations",
  },
  {
    title: "Base64 in Authentication: Basic Auth and Beyond",
    description: "Learn how Base64 is used in HTTP Basic Authentication and other authentication mechanisms.",
    slug: "base64-in-authentication-basic-auth-and-beyond",
  },
  {
    title: "Base64 in JWT (JSON Web Tokens): A Primer",
    description: "Understand how Base64 encoding is used in the structure of JSON Web Tokens for authentication.",
    slug: "base64-in-jwt-json-web-tokens-a-primer",
  },
  {
    title: "Base64 in HTML5: Modern Usage Patterns",
    description: "Explore how Base64 is utilized in modern HTML5 applications and web development.",
    slug: "base64-in-html5-modern-usage-patterns",
  },
  {
    title: "Base64 Encoding vs Encryption: Understanding the Difference",
    description: "Learn why Base64 is not encryption and how to avoid security misconceptions.",
    slug: "base64-encoding-vs-encryption-understanding-the-difference",
  },
  {
    title: "Base64 Encoding in Different Programming Languages",
    description: "An introduction to Base64 encoding and decoding methods in popular programming languages.",
    slug: "base64-encoding-in-different-programming-languages",
  },
  {
    title: "Base64 Standards: RFC 4648 and Beyond",
    description: "An overview of the official standards that define Base64 encoding and its variants.",
    slug: "base64-standards-rfc-4648-and-beyond",
  },
  {
    title: "Learning Path: From Base64 Basics to Advanced Usage",
    description: "A structured learning path to progress from beginner to advanced understanding of Base64 encoding.",
    slug: "learning-path-from-base64-basics-to-advanced-usage",
  },
];

/**
 * Base64 Codec Basics and Introduction page component
 */
export default function Base64CodecBasicsPage() {
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
                <li aria-current="page">Basics and Introduction</li>
              </ol>
            </nav>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">Base64 Codec Basics and Introduction</h1>
          </div>
        </div>

        <Card className="mb-8 overflow-hidden border-2">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 pb-2">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <BookOpen className="text-blue-500" size={24} />
              Getting Started With Base64
            </CardTitle>
            <CardDescription>Understanding the fundamentals of Base64 encoding and decoding</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="mt-1 text-blue-600 dark:text-blue-400 shrink-0">
                    <BookMarked size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Core Concepts</h3>
                    <p className="text-sm text-muted-foreground">
                      Learn the basic principles of Base64 encoding, its character set, and how binary data is converted
                      to text.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1 text-blue-600 dark:text-blue-400 shrink-0">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Practical Usage</h3>
                    <p className="text-sm text-muted-foreground">
                      Discover how Base64 is used in emails, web development, data URIs, and authentication systems.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="mt-1 text-indigo-600 dark:text-indigo-500 shrink-0">
                    <Code size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Implementation Examples</h3>
                    <p className="text-sm text-muted-foreground">
                      Step-by-step examples of Base64 encoding and decoding across different languages and platforms.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1 text-indigo-600 dark:text-indigo-500 shrink-0">
                    <Lightbulb size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Key Insights</h3>
                    <p className="text-sm text-muted-foreground">
                      Important distinctions between encoding and encryption, plus common misconceptions about Base64.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-md bg-muted p-4 text-sm">
              <div className="flex items-center gap-2 font-medium">
                <Coffee size={16} className="text-blue-500" />
                <span>Base64 in a Nutshell:</span>
              </div>
              <p className="mt-1 text-muted-foreground">
                Base64 is an encoding scheme that represents binary data in an ASCII string format by translating it
                into a radix-64 representation. It uses a set of 64 characters (A-Z, a-z, 0-9, + and /) to ensure safe
                data transmission where binary data might otherwise be altered.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <ToolArticlesList toolName="Base64 Codec" toolSlug="base64-codec" articles={base64CodecArticles} />
    </Container>
  );
}
