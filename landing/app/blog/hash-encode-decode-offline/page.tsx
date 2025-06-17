import { Container } from "@/components/ui/container";
import { PageLayout } from "@/components/page-layout";
import {
  CalendarIcon,
  DownloadIcon,
  LockClosedIcon,
  CodeIcon,
  LightningBoltIcon,
  MagnifyingGlassIcon,
  QuestionMarkCircledIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";

export const metadata = {
  title: "Hash Encode Decode Offline | OfflineTools",
  description:
    "Encode and decode hashes securely offline with our dedicated hash tools. Learn about hash algorithms, common problems, and why OfflineTools is the secure solution for your hash encoding/decoding needs.",
};

export default function HashEncodeDecodeOfflinePage() {
  return (
    <PageLayout>
      <Container className="py-12 md:py-16 max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-indigo-500/10 rounded-lg -z-10"></div>
          <div className="p-6 md:p-8 rounded-lg border border-muted/20">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <CalendarIcon className="h-4 w-4" />
              <time dateTime="2025-05-08">May 8, 2025</time>
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-indigo-600 dark:from-emerald-400 dark:to-indigo-400">
              Hash Encode Decode Offline
            </h1>
            <div className="flex flex-wrap gap-2 mb-8">
              <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-400/30">
                Developer Tools
              </span>
              <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-700/10 dark:bg-green-400/10 dark:text-green-400 dark:ring-green-400/30">
                Offline Applications
              </span>
              <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10 dark:bg-purple-400/10 dark:text-purple-400 dark:ring-purple-400/30">
                Hash Encoding
              </span>
              <span className="inline-flex items-center rounded-md bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-700/10 dark:bg-amber-400/10 dark:text-amber-400 dark:ring-amber-400/30">
                Data Security
              </span>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="lead text-xl md:text-2xl font-medium text-foreground/80">
                Hash encoding and decoding are essential for data verification, security, and integrity. Learn how to
                work with hashes offline for secure, reliable operations without internet dependency.
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/download"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-green-600 text-white hover:bg-green-700 h-10 py-2 px-4"
              >
                Download
              </Link>
              <Link
                href="/tools"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4"
              >
                Online Tools
              </Link>
            </div>
          </div>
        </div>

        {/* Main Blog Post Content */}
        <article className="prose prose-lg dark:prose-invert max-w-none mb-10">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <CodeIcon className="h-6 w-6 text-emerald-500" />
            What Are Hash Functions?
          </h2>

          <p className="mb-6">
            Hash functions transform input data of any size into a fixed-size string of characters, typically a
            hexadecimal number. This transformation is deterministic (same input always produces the same output) and
            designed to be one-way (you cannot derive the original input from the hash output).
          </p>

          <p className="mb-6">Hash functions are commonly used for:</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="flex items-start space-x-3 p-3 border rounded-lg bg-muted/5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <strong className="text-emerald-700 dark:text-emerald-300">File integrity verification</strong>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Ensures files haven't been corrupted or tampered with during transfer or storage.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 border rounded-lg bg-muted/5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-indigo-500 mt-0.5 flex-shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <strong className="text-indigo-700 dark:text-indigo-300">Password storage</strong>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Stores password hashes rather than plaintext passwords for better security.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 border rounded-lg bg-muted/5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
              </svg>
              <div>
                <strong className="text-blue-700 dark:text-blue-300">Digital signatures</strong>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Verifies the authenticity and integrity of digital documents and messages.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 border rounded-lg bg-muted/5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <strong className="text-amber-700 dark:text-amber-300">Blockchain technology</strong>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Powers the chain of blocks through cryptographic hashing in cryptocurrency systems.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 border rounded-lg bg-muted/5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
                <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
                <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
              </svg>
              <div>
                <strong className="text-purple-700 dark:text-purple-300">Data deduplication</strong>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Identifies duplicate data by comparing hash values rather than entire datasets.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 border rounded-lg bg-muted/5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-rose-500 mt-0.5 flex-shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v-1l1-1 1-1-1-1H6v-1h1l2-2-5-5H2v-1h1l5 5V8c0-2.21 1.795-4 4-4s4 1.79 4 4z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <strong className="text-rose-700 dark:text-rose-300">Malware detection</strong>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Uses hash signatures to identify known malicious files without scanning content.
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-emerald-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            Common Hash Algorithms
          </h2>

          <div className="space-y-6 mb-8">
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted/10 px-4 py-2 border-b">
                <h3 className="font-medium">Commonly Used Hash Algorithms</h3>
              </div>
              <div className="divide-y">
                <div className="px-4 py-3 flex items-center justify-between">
                  <div>
                    <span className="font-medium">MD5</span>
                    <p className="text-sm text-muted-foreground">128-bit output</p>
                  </div>
                  <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20 dark:bg-red-900/30 dark:text-red-400 dark:ring-red-500/30">
                    Deprecated (Insecure)
                  </span>
                </div>
                <div className="px-4 py-3 flex items-center justify-between">
                  <div>
                    <span className="font-medium">SHA-1</span>
                    <p className="text-sm text-muted-foreground">160-bit output</p>
                  </div>
                  <span className="inline-flex items-center rounded-md bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-600/20 dark:bg-amber-900/30 dark:text-amber-400 dark:ring-amber-500/30">
                    Limited Security
                  </span>
                </div>
                <div className="px-4 py-3 flex items-center justify-between">
                  <div>
                    <span className="font-medium">SHA-256</span>
                    <p className="text-sm text-muted-foreground">256-bit output</p>
                  </div>
                  <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 dark:bg-green-900/30 dark:text-green-400 dark:ring-green-500/30">
                    Recommended
                  </span>
                </div>
                <div className="px-4 py-3 flex items-center justify-between">
                  <div>
                    <span className="font-medium">SHA-3</span>
                    <p className="text-sm text-muted-foreground">224, 256, 384, or 512-bit output</p>
                  </div>
                  <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 dark:bg-green-900/30 dark:text-green-400 dark:ring-green-500/30">
                    Recommended
                  </span>
                </div>
                <div className="px-4 py-3 flex items-center justify-between">
                  <div>
                    <span className="font-medium">BLAKE2</span>
                    <p className="text-sm text-muted-foreground">256 or 512-bit output</p>
                  </div>
                  <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 dark:bg-green-900/30 dark:text-green-400 dark:ring-green-500/30">
                    Recommended
                  </span>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-2">
            <MagnifyingGlassIcon className="h-6 w-6 text-emerald-500" />
            Online vs. Offline Hash Tools: A Comparison
          </h2>

          <div className="mb-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="border rounded-xl overflow-hidden transition-all hover:shadow-md">
                <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 p-4 border-b">
                  <h3 className="text-xl font-medium flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Online Hash Tools
                  </h3>
                </div>
                <div className="p-4 space-y-4">
                  <div className="flex items-start gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-500 mt-0.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div>
                      <h4 className="font-medium">Accessibility</h4>
                      <p className="text-sm text-muted-foreground">
                        Accessible from any device with a browser and internet connection.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-500 mt-0.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div>
                      <h4 className="font-medium">No Installation Required</h4>
                      <p className="text-sm text-muted-foreground">
                        Ready to use without software installation or updates.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-red-500 mt-0.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div>
                      <h4 className="font-medium">Privacy Concerns</h4>
                      <p className="text-sm text-muted-foreground">
                        Sensitive data is transmitted to third-party servers, creating security risks.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-red-500 mt-0.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div>
                      <h4 className="font-medium">Internet Dependency</h4>
                      <p className="text-sm text-muted-foreground">
                        Requires reliable internet connection; unavailable in offline environments.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-red-500 mt-0.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div>
                      <h4 className="font-medium">Performance Limitations</h4>
                      <p className="text-sm text-muted-foreground">
                        File size limits and slower processing for large files.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 border-t pt-4">
                    <a
                      href="/tools/text-hash-generator"
                      className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4 w-full"
                    >
                      Try Online Tool
                    </a>
                  </div>
                </div>
              </div>

              <div className="border rounded-xl overflow-hidden transition-all hover:shadow-md">
                <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 p-4 border-b">
                  <h3 className="text-xl font-medium flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-emerald-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    OfflineTools Desktop
                  </h3>
                </div>
                <div className="p-4 space-y-4">
                  <div className="flex items-start gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-500 mt-0.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div>
                      <h4 className="font-medium">Complete Privacy</h4>
                      <p className="text-sm text-muted-foreground">
                        All data processing happens locally, with no data transmitted to servers.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-500 mt-0.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div>
                      <h4 className="font-medium">Works Offline</h4>
                      <p className="text-sm text-muted-foreground">
                        Fully functional without internet connection, perfect for secure environments.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-500 mt-0.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div>
                      <h4 className="font-medium">Better Performance</h4>
                      <p className="text-sm text-muted-foreground">
                        Processes larger files faster using your computer's resources.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-500 mt-0.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div>
                      <h4 className="font-medium">Multiple Hash Algorithms</h4>
                      <p className="text-sm text-muted-foreground">
                        Support for SHA-256, SHA-224, SHA-1, MD5, SHA3, and Keccak variants.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-amber-500 mt-0.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div>
                      <h4 className="font-medium">Requires Installation</h4>
                      <p className="text-sm text-muted-foreground">
                        Initial download and installation required before use.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 border-t pt-4">
                    <a
                      href="/download"
                      className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-emerald-600 text-white hover:bg-emerald-700 h-10 py-2 px-4 w-full"
                    >
                      Download Desktop App
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

        <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-2">
          <QuestionMarkCircledIcon className="h-6 w-6 text-red-500" />5 Common Problems with Hash Tools
        </h2>

        <div className="space-y-6 mb-12">
          <div className="border rounded-lg overflow-hidden bg-muted/5 hover:shadow-md transition-shadow">
            <div className="p-4 border-b">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-red-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Security & Privacy Risks
              </h3>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Online hash tools process potentially sensitive data on their servers. When working with passwords,
                private keys, or confidential information, this creates significant data exposure risks.
              </p>
              <div className="mt-2 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/30 rounded p-2 text-sm text-red-700 dark:text-red-400">
                <strong>Impact:</strong> Data breaches, exposure of sensitive information, compliance violations
              </div>
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden bg-muted/5 hover:shadow-md transition-shadow">
            <div className="p-4 border-b">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-red-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Internet Dependency
              </h3>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Online hash tools become completely unusable without internet connectivity. This creates workflow
                disruptions in environments with unreliable connections or air-gapped systems.
              </p>
              <div className="mt-2 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/30 rounded p-2 text-sm text-red-700 dark:text-red-400">
                <strong>Impact:</strong> Workflow interruptions, productivity loss, inability to work in secure
                environments
              </div>
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden bg-muted/5 hover:shadow-md transition-shadow">
            <div className="p-4 border-b">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-red-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Limited Algorithm Support
              </h3>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Many basic hash tools only support a few common algorithms (often just MD5 and SHA-1), lacking newer,
                more secure options like SHA-256, SHA-3, and specialized variants.
              </p>
              <div className="mt-2 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/30 rounded p-2 text-sm text-red-700 dark:text-red-400">
                <strong>Impact:</strong> Reduced security posture, incompatibility with systems requiring specific hash
                types
              </div>
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden bg-muted/5 hover:shadow-md transition-shadow">
            <div className="p-4 border-b">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-red-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Performance Bottlenecks
              </h3>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Browser-based hash tools face significant performance limitations with large files, often imposing size
                restrictions or becoming unresponsive with complex operations.
              </p>
              <div className="mt-2 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/30 rounded p-2 text-sm text-red-700 dark:text-red-400">
                <strong>Impact:</strong> Inability to process large files, slower operations, browser crashes
              </div>
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden bg-muted/5 hover:shadow-md transition-shadow">
            <div className="p-4 border-b">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-red-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Encoding Inconsistencies
              </h3>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Different hash tools handle encoding inconsistently, especially with special characters or non-ASCII
                inputs, leading to hash mismatches when the same input is processed across tools.
              </p>
              <div className="mt-2 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/30 rounded p-2 text-sm text-red-700 dark:text-red-400">
                <strong>Impact:</strong> Verification failures, inconsistent results, debugging challenges
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-2">
          <LightningBoltIcon className="h-6 w-6 text-blue-500" />5 Alternative Hash Tools & Solutions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
            <div className="p-4 border-b bg-muted/5">
              <h3 className="font-medium">OfflineTools Desktop</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 dark:bg-gray-800 dark:text-gray-400">
                  Windows
                </span>
                <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 dark:bg-gray-800 dark:text-gray-400">
                  macOS
                </span>
                <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 dark:bg-gray-800 dark:text-gray-400">
                  Linux
                </span>
              </div>
            </div>
            <div className="p-4 flex-grow">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Complete offline hash toolkit with support for multiple algorithms, file comparison, and batch
                processing capabilities.
              </p>
              <div className="text-sm flex flex-col gap-2">
                <span className="flex items-center gap-1.5">
                  <svg className="h-4 w-4 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Full offline functionality</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="h-4 w-4 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Multiple hash algorithms</span>
                </span>
              </div>
            </div>
            <div className="p-4 border-t mt-auto">
              <a
                href="/download"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-blue-600 text-white hover:bg-blue-700 h-10 py-2 px-4 w-full"
              >
                Download
              </a>
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
            <div className="p-4 border-b bg-muted/5">
              <h3 className="font-medium">OpenSSL CLI</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 dark:bg-gray-800 dark:text-gray-400">
                  Command Line
                </span>
                <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 dark:bg-gray-800 dark:text-gray-400">
                  Cross-Platform
                </span>
              </div>
            </div>
            <div className="p-4 flex-grow">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Powerful command-line utility for generating hashes and working with cryptographic functions.
              </p>
              <div className="text-sm flex flex-col gap-2">
                <span className="flex items-center gap-1.5">
                  <svg className="h-4 w-4 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Extensive algorithm support</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="h-4 w-4 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Technical knowledge required</span>
                </span>
              </div>
            </div>
            <div className="p-4 border-t mt-auto">
              <code className="block bg-gray-100 dark:bg-gray-800 p-2 rounded text-xs overflow-x-auto">
                $ openssl dgst -sha256 file.txt
              </code>
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
            <div className="p-4 border-b bg-muted/5">
              <h3 className="font-medium">HashMyFiles</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 dark:bg-gray-800 dark:text-gray-400">
                  Windows
                </span>
              </div>
            </div>
            <div className="p-4 flex-grow">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Utility that calculates MD5, SHA-1, CRC32 and SHA-256 hashes of files with Windows Explorer integration.
              </p>
              <div className="text-sm flex flex-col gap-2">
                <span className="flex items-center gap-1.5">
                  <svg className="h-4 w-4 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Explorer integration</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="h-4 w-4 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Windows-only</span>
                </span>
              </div>
            </div>
            <div className="p-4 border-t mt-auto">
              <span className="block text-xs text-gray-500">Freeware from NirSoft</span>
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
            <div className="p-4 border-b bg-muted/5">
              <h3 className="font-medium">Hashdeep</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 dark:bg-gray-800 dark:text-gray-400">
                  Command Line
                </span>
                <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 dark:bg-gray-800 dark:text-gray-400">
                  Cross-Platform
                </span>
              </div>
            </div>
            <div className="p-4 flex-grow">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Advanced recursive hashing tool for generating, comparing, and auditing file collections.
              </p>
              <div className="text-sm flex flex-col gap-2">
                <span className="flex items-center gap-1.5">
                  <svg className="h-4 w-4 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Recursive directory hashing</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="h-4 w-4 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Steep learning curve</span>
                </span>
              </div>
            </div>
            <div className="p-4 border-t mt-auto">
              <code className="block bg-gray-100 dark:bg-gray-800 p-2 rounded text-xs overflow-x-auto">
                $ hashdeep -r /path/to/directory
              </code>
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
            <div className="p-4 border-b bg-muted/5">
              <h3 className="font-medium">Programming APIs</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 dark:bg-gray-800 dark:text-gray-400">
                  Developers
                </span>
                <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 dark:bg-gray-800 dark:text-gray-400">
                  Multiple Languages
                </span>
              </div>
            </div>
            <div className="p-4 flex-grow">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Native cryptographic libraries available in most programming languages for direct integration.
              </p>
              <div className="text-sm flex flex-col gap-2">
                <span className="flex items-center gap-1.5">
                  <svg className="h-4 w-4 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Maximum flexibility</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="h-4 w-4 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Programming knowledge required</span>
                </span>
              </div>
            </div>
            <div className="p-4 border-t mt-auto">
              <code className="block bg-gray-100 dark:bg-gray-800 p-2 rounded text-xs overflow-x-auto">
                import hashlib
                <br />
                hashlib.sha256(b"text").hexdigest()
              </code>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-blue-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
          </svg>
          Expert Opinions on Hash Security
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="border rounded-lg p-5 bg-muted/5 relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-indigo-300 absolute -top-4 -left-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M6 4.75A.75.75 0 016.75 4h10.5a.75.75 0 010 1.5H6.75A.75.75 0 016 4.75zM6 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H6.75A.75.75 0 016 10zm0 5.25a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H6.75a.75.75 0 01-.75-.75zM1.99 4.75c0-1.11.9-2.01 2.01-2.01s2.01.9 2.01 2.01-.9 2.01-2.01 2.01-2.01-.9-2.01-2.01zm1.01 0a1 1 0 112 0 1 1 0 01-2 0zM1.99 15.25c0-1.11.9-2.01 2.01-2.01s2.01.9 2.01 2.01-.9 2.01-2.01 2.01-2.01-.9-2.01-2.01zm1.01 0a1 1 0 112 0 1 1 0 01-2 0z" />
            </svg>
            <blockquote className="text-muted-foreground italic mb-4">
              "The privacy risks associated with online hash generation tools are substantial. Any service processing
              sensitive inputs should be run locally whenever possible, especially for cryptographic operations."
            </blockquote>
            <div className="font-medium">Dr. Matthew Green</div>
            <div className="text-sm text-muted-foreground">Cryptography Researcher, Johns Hopkins University</div>
          </div>

          <div className="border rounded-lg p-5 bg-muted/5 relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-indigo-300 absolute -top-4 -left-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M6 4.75A.75.75 0 016.75 4h10.5a.75.75 0 010 1.5H6.75A.75.75 0 016 4.75zM6 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H6.75A.75.75 0 016 10zm0 5.25a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H6.75a.75.75 0 01-.75-.75zM1.99 4.75c0-1.11.9-2.01 2.01-2.01s2.01.9 2.01 2.01-.9 2.01-2.01 2.01-2.01-.9-2.01-2.01zm1.01 0a1 1 0 112 0 1 1 0 01-2 0zM1.99 15.25c0-1.11.9-2.01 2.01-2.01s2.01.9 2.01 2.01-.9 2.01-2.01 2.01-2.01-.9-2.01-2.01zm1.01 0a1 1 0 112 0 1 1 0 01-2 0z" />
            </svg>
            <blockquote className="text-muted-foreground italic mb-4">
              "For organizations handling sensitive data, offline hash generation is not just a convenience—it's a
              regulatory necessity. Many compliance frameworks explicitly require cryptographic operations to occur in
              controlled environments."
            </blockquote>
            <div className="font-medium">Sarah Miller</div>
            <div className="text-sm text-muted-foreground">
              Information Security Officer, Financial Security Consortium
            </div>
          </div>

          <div className="border rounded-lg p-5 bg-muted/5 relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-indigo-300 absolute -top-4 -left-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M6 4.75A.75.75 0 016.75 4h10.5a.75.75 0 010 1.5H6.75A.75.75 0 016 4.75zM6 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H6.75A.75.75 0 016 10zm0 5.25a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H6.75a.75.75 0 01-.75-.75zM1.99 4.75c0-1.11.9-2.01 2.01-2.01s2.01.9 2.01 2.01-.9 2.01-2.01 2.01-2.01-.9-2.01-2.01zm1.01 0a1 1 0 112 0 1 1 0 01-2 0zM1.99 15.25c0-1.11.9-2.01 2.01-2.01s2.01.9 2.01 2.01-.9 2.01-2.01 2.01-2.01-.9-2.01-2.01zm1.01 0a1 1 0 112 0 1 1 0 01-2 0z" />
            </svg>
            <blockquote className="text-muted-foreground italic mb-4">
              "MD5 and SHA-1 should be considered deprecated for security-sensitive applications. Organizations should
              standardize on SHA-256 at minimum, with SHA-3 variants preferred for new implementations requiring strong
              security guarantees."
            </blockquote>
            <div className="font-medium">Alex Stamos</div>
            <div className="text-sm text-muted-foreground">Former CISO, Stanford Internet Observatory</div>
          </div>
        </div>

        <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-2">
          <LockClosedIcon className="h-6 w-6 text-emerald-500" />
          Why Choose OfflineTools for Hash Operations?
        </h2>

        <div className="mb-8 space-y-4">
          <p>
            When working with hash functions for data verification, security, or authentication, the privacy and
            reliability benefits of offline tools are substantial. OfflineTools provides a comprehensive hash toolkit
            that:
          </p>

          <ul className="space-y-2 list-none pl-0">
            <li className="flex items-start gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Operates completely offline with no data transmitted to external servers</span>
            </li>
            <li className="flex items-start gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>
                Supports modern hash algorithms including SHA-256, SHA-224, SHA-3 (224/256/384/512), Keccak variants,
                and legacy formats
              </span>
            </li>
            <li className="flex items-start gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Provides both text and file hashing with comparison capabilities</span>
            </li>
            <li className="flex items-start gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Features clean, intuitive interface for both basic users and professionals</span>
            </li>
            <li className="flex items-start gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Offers consistent results across platforms with proper character encoding handling</span>
            </li>
          </ul>

          <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-500 mt-0.5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <h4 className="font-medium text-blue-700 dark:text-blue-400">Security Tip</h4>
                <p className="text-sm text-blue-600 dark:text-blue-300">
                  While hash functions are one-way, remember that they're not designed for password storage without
                  additional measures like salting. For password-specific use cases, consider specialized algorithms
                  like bcrypt, scrypt, or Argon2.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href="/download"
            className="inline-flex items-center justify-center rounded-md text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-emerald-600 text-white hover:bg-emerald-700 h-12 py-2 px-6"
          >
            <DownloadIcon className="mr-2 h-5 w-5" />
            Download OfflineTools Desktop
          </a>
        </div>
      </Container>
    </PageLayout>
  );
}
