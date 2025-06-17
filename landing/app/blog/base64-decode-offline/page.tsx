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
  title: "Base64 Decode Offline | OfflineTools",
  description:
    "Base64 decode offline tools let you decode data without internet access. Learn browser methods, common problems, and why OfflineTools is the ideal solution for secure Base64 decoding.",
};

export default function Base64DecodeOfflinePage() {
  return (
    <PageLayout>
      <Container className="py-12 md:py-16 max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg -z-10"></div>
          <div className="p-6 md:p-8 rounded-lg border border-muted/20">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <CalendarIcon className="h-4 w-4" />
              <time dateTime="2025-05-08">May 8, 2025</time>
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              Base64 Decode Offline
            </h1>
            <div className="flex flex-wrap gap-2 mb-8">
              <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-400/30">
                Developer Tools
              </span>
              <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-700/10 dark:bg-green-400/10 dark:text-green-400 dark:ring-green-400/30">
                Offline Applications
              </span>
              <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10 dark:bg-purple-400/10 dark:text-purple-400 dark:ring-purple-400/30">
                Base64 Decoding
              </span>
              <span className="inline-flex items-center rounded-md bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-700/10 dark:bg-amber-400/10 dark:text-amber-400 dark:ring-amber-400/30">
                Data Security
              </span>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="lead text-xl md:text-2xl font-medium text-foreground/80">
                Base64 decoding is essential for working with encoded data in development and web applications. Learn
                how to decode Base64 strings offline to protect sensitive data and ensure uninterrupted workflows.
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
            <CodeIcon className="h-6 w-6 text-blue-500" />
            What Is Base64 Decoding?
          </h2>

          <p className="mb-6">
            Base64 is an encoding scheme that converts binary data into text format, allowing it to be safely
            transmitted over text-based protocols. Base64 decoding is the process of converting this encoded text back
            to its original format.
          </p>

          <p className="mb-6">Base64 is commonly used in:</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="flex items-start space-x-3 p-3 border rounded-lg bg-muted/5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <div>
                <strong className="text-blue-700 dark:text-blue-300">Email attachments (MIME)</strong>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Used to convert binary attachments into text for transmission over email protocols.
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
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <strong className="text-purple-700 dark:text-purple-300">Embedding images in HTML/CSS</strong>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Data URIs allow embedding images directly in code using <code>data:image/png;base64,...</code>
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 border rounded-lg bg-muted/5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <strong className="text-green-700 dark:text-green-300">Storing binary data in JSON</strong>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  JSON only supports text, so binary data (images, files) must be Base64-encoded.
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
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <strong className="text-amber-700 dark:text-amber-300">HTTP Basic Authentication</strong>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Username:password pairs are Base64-encoded in the Authorization header.
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
                  d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <strong className="text-indigo-700 dark:text-indigo-300">Data URIs in web browsers</strong>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Used to embed resources directly in HTML or CSS using the <code>data:</code> protocol.
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
                  d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v-1l1-1 1-1-1-1H6v-1h1l2-2-5-5H2v-1h1l5 5V8c0-2.21 1.795-4 4-4s4 1.79 4 4zM3.586 4L2 2.414 3.414 1 5 2.586 3.586 4zM16 3a1 1 0 10-2 0v1a1 1 0 102 0V3z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <strong className="text-rose-700 dark:text-rose-300">JWT tokens for authentication</strong>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Modern authentication tokens use Base64 encoding for their three components.
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-2">
            <QuestionMarkCircledIcon className="h-6 w-6 text-blue-500" />
            Browser-Based Base64 Decoding Methods
          </h2>

          <p className="mb-6">Modern browsers include built-in methods for Base64 decoding:</p>

          <div className="grid grid-cols-1 gap-6 mb-8">
            <div className="border rounded-lg p-6 bg-muted/10 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 text-blue-600"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                </svg>
                <h3 className="text-xl font-medium">Chrome</h3>
              </div>
              <div className="space-y-4">
                <p>
                  Use Chrome's DevTools Console with the <code>atob()</code> function:
                </p>
                <div className="relative">
                  <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded overflow-x-auto">
                    <code>atob('SGVsbG8sIFdvcmxkIQ==')</code>
                  </pre>
                  <div className="absolute top-2 right-2 bg-blue-100 dark:bg-blue-900 text-xs px-2 py-1 rounded text-blue-800 dark:text-blue-200">
                    In Console
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm mt-3 text-green-700 dark:text-green-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    Returns: <code>Hello, World!</code>
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Access the console with <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>J</kbd> (Windows) or <kbd>Cmd</kbd>+
                  <kbd>Option</kbd>+<kbd>J</kbd> (Mac)
                </p>
              </div>
            </div>

            <div className="border rounded-lg p-6 bg-muted/10 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 text-orange-600"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                </svg>
                <h3 className="text-xl font-medium">Firefox</h3>
              </div>
              <div className="space-y-4">
                <p>
                  Firefox DevTools also supports <code>atob()</code> function:
                </p>
                <div className="relative">
                  <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded overflow-x-auto">
                    <code>atob('SGVsbG8sIFdvcmxkIQ==')</code>
                  </pre>
                  <div className="absolute top-2 right-2 bg-blue-100 dark:bg-blue-900 text-xs px-2 py-1 rounded text-blue-800 dark:text-blue-200">
                    In Console
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm mt-3 text-green-700 dark:text-green-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    Returns: <code>Hello, World!</code>
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Access the console with <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>K</kbd> (Windows) or <kbd>Cmd</kbd>+
                  <kbd>Option</kbd>+<kbd>K</kbd> (Mac)
                </p>
              </div>
            </div>

            <div className="border rounded-lg p-6 bg-muted/10 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 text-blue-500"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                </svg>
                <h3 className="text-xl font-medium">Edge</h3>
              </div>
              <div className="space-y-4">
                <p>
                  Microsoft Edge also uses the standard <code>atob()</code> function:
                </p>
                <div className="relative">
                  <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded overflow-x-auto">
                    <code>atob('SGVsbG8sIFdvcmxkIQ==')</code>
                  </pre>
                  <div className="absolute top-2 right-2 bg-blue-100 dark:bg-blue-900 text-xs px-2 py-1 rounded text-blue-800 dark:text-blue-200">
                    In Console
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm mt-3 text-green-700 dark:text-green-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    Returns: <code>Hello, World!</code>
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Access the console with <kbd>F12</kbd> or <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd>
                </p>
              </div>
            </div>
          </div>

          <p className="mb-8">
            While browsers offer basic decoding capabilities, specialized tools like OfflineTools provide a better user
            experience with advanced features, proper error handling, and support for binary data. Most importantly,
            specialized tools keep your data secure by processing it locally.
          </p>

          <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-2">
            <DownloadIcon className="h-6 w-6 text-blue-500" />
            OfflineTools: Desktop vs. Online
          </h2>

          <p className="mb-6">
            OfflineTools provides two versions of its Base64 decoder: a web-based online version and a downloadable
            desktop application.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="border rounded-lg p-6 bg-muted/10 relative overflow-hidden hover:shadow-md transition-shadow">
              <div className="absolute right-0 top-0 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs py-1 px-3 rounded-bl-lg">
                Browser-based
              </div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-blue-700 dark:text-blue-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
                    clipRule="evenodd"
                  />
                </svg>
                Online Version
              </h3>
              <div className="space-y-4">
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
                    <strong>Accessible from any browser</strong>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Works on any device without installation, perfect for quick tasks.
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
                    <strong>No installation required</strong>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Use immediately without downloading or installing any software.
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
                    <strong>Basic decoding functionality</strong>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Covers essential needs for standard Base64 decoding operations.
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
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <strong>Limited security</strong>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Not recommended for sensitive data as it may be transmitted to servers.
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
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <strong>Browser memory constraints</strong>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Performance issues with larger files due to browser limitations.
                    </p>
                  </div>
                </div>

                <a
                  className="mt-4 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4"
                  href="/tools/base64-codec"
                >
                  Try Online
                </a>
              </div>
            </div>

            <div className="border border-green-200 dark:border-green-900 rounded-lg p-6 bg-green-50/30 dark:bg-green-900/20 relative overflow-hidden hover:shadow-md transition-shadow">
              <div className="absolute right-0 top-0 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 text-xs py-1 px-3 rounded-bl-lg">
                Recommended
              </div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-green-700 dark:text-green-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2h3a1 1 0 100-2h-3z"
                    clipRule="evenodd"
                  />
                </svg>
                Desktop Application
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-700 mt-0.5"
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
                    <strong>Complete offline functionality</strong>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Works without internet connection, ideal for secure environments.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-700 mt-0.5"
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
                    <strong>Enhanced security for sensitive data</strong>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      All processing happens locally; data never leaves your device.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-700 mt-0.5"
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
                    <strong>Better performance with large data</strong>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Handles large files efficiently without browser memory constraints.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-700 mt-0.5"
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
                    <strong>Advanced features like URL-safe mode</strong>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Supports special Base64 variants and includes additional processing options.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-700 mt-0.5"
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
                    <strong>Binary file support</strong>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Decode Base64 directly to binary files like images, PDFs, or executable files.
                    </p>
                  </div>
                </div>

                <a
                  className="mt-4 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-green-600 text-white hover:bg-green-700 h-10 py-2 px-4"
                  href="/download"
                >
                  Download
                </a>
              </div>
            </div>
          </div>

          <p className="mb-6">
            While the online version is convenient for quick tasks, the desktop version provides significant advantages
            for security-conscious users and professional developers:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            <div className="flex items-start space-x-3 p-4 border rounded-lg bg-muted/5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0"
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
                <strong className="text-purple-700 dark:text-purple-300">Privacy</strong>
                <p className="text-sm text-gray-600 dark:text-gray-400">Your data never leaves your computer</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 border rounded-lg bg-muted/5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <strong className="text-green-700 dark:text-green-300">Reliability</strong>
                <p className="text-sm text-gray-600 dark:text-gray-400">Work without internet connectivity</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 border rounded-lg bg-muted/5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <strong className="text-blue-700 dark:text-blue-300">Performance</strong>
                <p className="text-sm text-gray-600 dark:text-gray-400">Process larger data more efficiently</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 border rounded-lg bg-muted/5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v-1l1-1 1-1-1-1H6v-1h1l2-2-5-5H2v-1h1l5 5V8c0-2.21 1.795-4 4-4s4 1.79 4 4zM3.586 4L2 2.414 3.414 1 5 2.586 3.586 4zM16 3a1 1 0 10-2 0v1a1 1 0 102 0V3z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <strong className="text-amber-700 dark:text-amber-300">Security</strong>
                <p className="text-sm text-gray-600 dark:text-gray-400">Keep sensitive encoded information secure</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 border rounded-lg bg-muted/5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-indigo-500 mt-0.5 flex-shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
              </svg>
              <div>
                <strong className="text-indigo-700 dark:text-indigo-300">Integration</strong>
                <p className="text-sm text-gray-600 dark:text-gray-400">Fits into your local development workflow</p>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-2">
            <LockClosedIcon className="h-6 w-6 text-blue-500" />5 Common Problems with Online Base64 Decoders
          </h2>

          <div className="space-y-6 mb-10">
            <div className="border rounded-lg overflow-hidden bg-muted/5 hover:shadow-md transition-shadow">
              <div className="bg-red-50 dark:bg-red-900/20 p-3 border-b border-red-100 dark:border-red-800">
                <h3 className="text-xl font-medium flex items-center gap-2 text-red-700 dark:text-red-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>1. Offline Access Limitations</span>
                </h3>
              </div>
              <div className="p-4">
                <p className="mb-3">
                  Most online Base64 decoders require constant internet connectivity. This creates problems when working
                  in environments with limited or no internet access, making it impossible to decode Base64 data when
                  you most need it.
                </p>
                <div className="text-sm text-gray-600 dark:text-gray-400 border-t border-dashed pt-3 mt-3">
                  <strong className="text-red-600 dark:text-red-400">Impact: </strong>
                  Unable to decode important data when traveling, in secure facilities, or during internet outages.
                </div>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden bg-muted/5 hover:shadow-md transition-shadow">
              <div className="bg-red-50 dark:bg-red-900/20 p-3 border-b border-red-100 dark:border-red-800">
                <h3 className="text-xl font-medium flex items-center gap-2 text-red-700 dark:text-red-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>2. Security and Privacy Risks</span>
                </h3>
              </div>
              <div className="p-4">
                <p className="mb-3">
                  When using online decoders, your encoded data is sent to a third-party server. This creates
                  significant security risks, especially when working with sensitive information like authentication
                  tokens, API keys, or proprietary data.
                </p>
                <div className="text-sm text-gray-600 dark:text-gray-400 border-t border-dashed pt-3 mt-3">
                  <strong className="text-red-600 dark:text-red-400">Impact: </strong>
                  Potential exposure of confidential information, security credentials, or intellectual property.
                </div>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden bg-muted/5 hover:shadow-md transition-shadow">
              <div className="bg-red-50 dark:bg-red-900/20 p-3 border-b border-red-100 dark:border-red-800">
                <h3 className="text-xl font-medium flex items-center gap-2 text-red-700 dark:text-red-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
                    <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
                    <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
                  </svg>
                  <span>3. Size Limitations</span>
                </h3>
              </div>
              <div className="p-4">
                <p className="mb-3">
                  Many web-based Base64 decoders struggle with large encoded strings, often imposing size limits or
                  experiencing performance issues. This makes them impractical for working with encoded binary files or
                  large data sets.
                </p>
                <div className="text-sm text-gray-600 dark:text-gray-400 border-t border-dashed pt-3 mt-3">
                  <strong className="text-red-600 dark:text-red-400">Impact: </strong>
                  Browser crashes, timeouts, or error messages when working with large Base64 strings like encoded
                  images or documents.
                </div>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden bg-muted/5 hover:shadow-md transition-shadow">
              <div className="bg-red-50 dark:bg-red-900/20 p-3 border-b border-red-100 dark:border-red-800">
                <h3 className="text-xl font-medium flex items-center gap-2 text-red-700 dark:text-red-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
                  </svg>
                  <span>4. Limited Character Set Support</span>
                </h3>
              </div>
              <div className="p-4">
                <p className="mb-3">
                  Standard Base64 uses characters A-Z, a-z, 0-9, +, and /. URL-safe Base64 replaces + with - and / with
                  _. Many online tools don't support both variations, leading to decoding errors when working with
                  URL-safe encoded data.
                </p>
                <div className="text-sm text-gray-600 dark:text-gray-400 border-t border-dashed pt-3 mt-3">
                  <strong className="text-red-600 dark:text-red-400">Impact: </strong>
                  Failed decoding operations when working with JWT tokens, URL parameters, or other URL-safe Base64
                  variants.
                </div>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden bg-muted/5 hover:shadow-md transition-shadow">
              <div className="bg-red-50 dark:bg-red-900/20 p-3 border-b border-red-100 dark:border-red-800">
                <h3 className="text-xl font-medium flex items-center gap-2 text-red-700 dark:text-red-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>5. Poor Error Handling</span>
                </h3>
              </div>
              <div className="p-4">
                <p className="mb-3">
                  Basic online decoders often provide cryptic error messages or no feedback at all when decoding fails.
                  This makes troubleshooting difficult, especially for users who aren't familiar with the specifics of
                  Base64 encoding.
                </p>
                <div className="text-sm text-gray-600 dark:text-gray-400 border-t border-dashed pt-3 mt-3">
                  <strong className="text-red-600 dark:text-red-400">Impact: </strong>
                  Wasted time debugging unclear errors, with no guidance on how to fix invalid Base64 input.
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-10">
            <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-700 dark:text-gray-300">
              "Offline tools are essential for industries with strict security requirements. Working offline ensures
              your sensitive data never leaves your device, eliminating the risk of interception or unauthorized access
              that comes with online services."
              <footer className="text-sm mt-2 text-gray-600 dark:text-gray-400">— SecurityWeekly.com</footer>
            </blockquote>
          </div>

          <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-2">
            <MagnifyingGlassIcon className="h-6 w-6 text-blue-500" />5 Other Base64 Decoding Tools
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="border rounded-lg p-4 bg-muted/5 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-medium text-blue-700 dark:text-blue-300 mb-2">1. CyberChef</h3>
              <p className="text-sm mb-2">
                An open-source data conversion tool that can be used offline. It includes Base64 decoding along with
                hundreds of other operations for complex transformations.
              </p>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Browser-based • Multi-step data processing workflows
              </div>
            </div>

            <div className="border rounded-lg p-4 bg-muted/5 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-medium text-blue-700 dark:text-blue-300 mb-2">
                2. Base64 Decoder (Windows App)
              </h3>
              <p className="text-sm mb-2">
                A simple, dedicated Windows application for encoding and decoding Base64 text and files, with clipboard
                integration and batch processing capabilities.
              </p>
              <div className="text-xs text-gray-600 dark:text-gray-400">Windows • Quick Base64 conversions</div>
            </div>

            <div className="border rounded-lg p-4 bg-muted/5 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-medium text-blue-700 dark:text-blue-300 mb-2">3. Base64 Utility</h3>
              <p className="text-sm mb-2">
                A macOS application that provides Base64 encoding and decoding with drag-and-drop file support and
                integration with macOS services.
              </p>
              <div className="text-xs text-gray-600 dark:text-gray-400">macOS • Seamless system integration</div>
            </div>

            <div className="border rounded-lg p-4 bg-muted/5 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-medium text-blue-700 dark:text-blue-300 mb-2">
                4. Base64 Command Line Tools
              </h3>
              <p className="text-sm mb-2">
                Standard utilities like base64 (Linux/macOS) and certutil (Windows) that provide Base64 encoding and
                decoding capabilities directly from the command line.
              </p>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Linux, macOS, Windows • Terminal users and automated scripts
              </div>
            </div>

            <div className="border rounded-lg p-4 bg-muted/5 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-medium text-blue-700 dark:text-blue-300 mb-2">
                5. Base64 Browser Extensions
              </h3>
              <p className="text-sm mb-2">
                Various browser extensions for Chrome, Firefox, and Edge that add Base64 decoding functionality directly
                within your browser for quick access.
              </p>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Browser extensions • Quick in-browser conversions
              </div>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-10">
            <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-700 dark:text-gray-300">
              "Working offline isn't just about convenience—it's also about security. When you use an offline Base64
              decoder, your data stays on your device, eliminating the risk of exposure through network transmission or
              third-party servers."
              <footer className="text-sm mt-2 text-gray-600 dark:text-gray-400">— PrivacyGuide.org</footer>
            </blockquote>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-10">
            <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-700 dark:text-gray-300">
              "Developers working in regulated industries like healthcare, finance, or government should avoid using
              online encoding/decoding tools for sensitive data. Using offline tools that process data locally is not
              just a best practice—it's often a compliance requirement."
              <footer className="text-sm mt-2 text-gray-600 dark:text-gray-400">— DevSecOps Journal</footer>
            </blockquote>
          </div>

          <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-2">
            <LightningBoltIcon className="h-6 w-6 text-blue-500" />
            OfflineTools: The Complete Base64 Solution
          </h2>

          <p className="mb-6">
            OfflineTools Desktop provides a comprehensive solution for Base64 decoding that addresses all the common
            problems faced by developers:
          </p>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 p-6 rounded-lg border border-blue-100 dark:border-blue-800 my-8">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-600 dark:text-blue-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
              </svg>
              OfflineTools Base64 Decoder Features
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-600 dark:text-blue-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-blue-700 dark:text-blue-300">Complete Offline Operation</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Decode Base64 data without internet connectivity, ideal for secure environments or when traveling.
                  </p>
                  <div className="mt-2 text-sm text-gray-500 dark:text-gray-500 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1 text-green-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Works when internet is unavailable
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-600 dark:text-blue-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-blue-700 dark:text-blue-300">Enhanced Security</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Your data never leaves your device, ensuring complete privacy for sensitive information.
                  </p>
                  <div className="mt-2 text-sm text-gray-500 dark:text-gray-500 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1 text-green-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Ideal for confidential data
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-600 dark:text-blue-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-blue-700 dark:text-blue-300">URL-safe Mode Support</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Seamlessly handle both standard and URL-safe Base64 variants with automatic detection.
                  </p>
                  <div className="mt-2 text-sm text-gray-500 dark:text-gray-500 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1 text-green-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Decodes JWT tokens and URL parameters correctly
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-600 dark:text-blue-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-blue-700 dark:text-blue-300">Binary File Support</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Decode Base64 directly to binary files like images, PDFs, or executable files.
                  </p>
                  <div className="mt-2 text-sm text-gray-500 dark:text-gray-500 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1 text-green-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    No file size limitations
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-600 dark:text-blue-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-blue-700 dark:text-blue-300">Clipboard Integration</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Easily copy decoded output or paste encoded input with one-click operations.
                  </p>
                  <div className="mt-2 text-sm text-gray-500 dark:text-gray-500 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1 text-green-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Streamlined workflow
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-600 dark:text-blue-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-blue-700 dark:text-blue-300">Clear Error Messages</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Helpful feedback when decoding fails, with suggestions on how to fix common issues.
                  </p>
                  <div className="mt-2 text-sm text-gray-500 dark:text-gray-500 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1 text-green-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Saves troubleshooting time
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <Link
                href="/download"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-blue-600 text-white hover:bg-blue-700 h-12 px-6 gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Download OfflineTools Desktop
              </Link>
            </div>
          </div>
        </article>
      </Container>
    </PageLayout>
  );
}
