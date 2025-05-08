import { Container } from "@/components/ui/container";
import { PageLayout } from "@/components/page-layout";
import { CalendarIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { ShareButtons } from "../what-developer-tools-can-be-used-offline/ShareButtons";

export const metadata = {
  title: "Jolt Offline JSON Formatter | Offline Tools",
  description:
    "Learn about Jolt JSON formatter and why processing your JSON files locally provides better security, privacy, and performance.",
};

export default function JoltOfflineJsonFormatterPage() {
  return (
    <PageLayout>
      <Container className="py-12 md:py-16 max-w-4xl mx-auto">
        {/* Hero Section with Enhanced Visual Appeal */}
        <div className="mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg -z-10"></div>
          <div className="p-6 md:p-8 rounded-lg border border-muted/20">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <CalendarIcon className="h-4 w-4" />
              <time dateTime="2025-06-10">June 10, 2025</time>
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              Jolt Offline JSON Formatter
            </h1>
            <div className="flex flex-wrap gap-2 mb-8">
              <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-400/30">
                Developer Tools
              </span>
              <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-700/10 dark:bg-green-400/10 dark:text-green-400 dark:ring-green-400/30">
                Offline Applications
              </span>
              <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10 dark:bg-purple-400/10 dark:text-purple-400 dark:ring-purple-400/30">
                Privacy
              </span>
              <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-700/10 dark:bg-red-400/10 dark:text-red-400 dark:ring-red-400/30">
                Security
              </span>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="lead text-xl md:text-2xl font-medium text-foreground/80">
                In today's data-driven development world, JSON has become essential for APIs, configurations, and data
                exchange. However, when you use online formatters, your API keys, credentials, and sensitive business
                data are vulnerable to breaches. Jolt gives you the power to transform and format JSON files securely on
                your own machine, combining robust functionality with complete data privacy that developers and
                organizations require for mission-critical information.
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/download"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-green-600 text-white hover:bg-green-700 h-10 py-2 px-4"
              >
                Download Offline Tools
              </Link>
              <Link
                href="/tools/json-formatter"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4"
              >
                Try Online JSON Formatter
              </Link>
            </div>
          </div>
        </div>

        {/* What is Jolt Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">What is Jolt?</h2>

          <p className="mb-6">
            Jolt is a specialized Java-based library that transforms JSON documents from one structure to another.
            Created for developers who work regularly with complex JSON restructuring tasks, it provides a declarative
            way to define JSON-to-JSON transformations. Unlike traditional online formatters, Jolt doesn't just prettify
            your code—it enables sophisticated transformations while keeping your data completely secure.
          </p>

          <p className="mb-6">
            Developed by Bazaarvoice and released as an open-source project, Jolt's unique approach uses JSON itself as
            the specification language for transformations. This innovative design means that if you understand JSON,
            you can quickly master Jolt's transformation syntax. The library is particularly valuable for tasks like API
            response normalization, data extraction, and preparing JSON for different consumers.
          </p>

          <div className="bg-blue-50 dark:bg-blue-950/30 p-6 rounded-lg border border-blue-100 dark:border-blue-900 my-8">
            <h3 className="text-xl font-medium mb-4 text-blue-800 dark:text-blue-300">How Jolt Works</h3>
            <p className="mb-4">Jolt employs a chain of transformations that progressively modify your JSON data:</p>
            <ol className="space-y-2 mb-4 list-decimal list-inside">
              <li>
                <strong>Shift</strong> - Copy data from input to output with potential restructuring
              </li>
              <li>
                <strong>Default</strong> - Apply default values to the transformed structure
              </li>
              <li>
                <strong>Remove</strong> - Filter out unwanted elements from the JSON
              </li>
              <li>
                <strong>Sort</strong> - Alphabetically arrange keys for improved readability
              </li>
              <li>
                <strong>Cardinality</strong> - Fix the cardinality of elements (convert between arrays and single
                values)
              </li>
            </ol>
            <p>
              These transformations can be combined in a "spec" file that defines exactly how your data should be
              restructured.
            </p>
          </div>

          <div className="bg-muted/10 border rounded-lg p-6 my-8">
            <h3 className="text-xl font-semibold mb-4">Key Capabilities of Jolt</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0"
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
                  <strong>Powerful Transformation Engine:</strong> Reshape complex JSON hierarchies with a declarative
                  specification
                </span>
              </li>
              <li className="flex items-start gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0"
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
                  <strong>Complete Offline Processing:</strong> All transformations happen locally on your machine—data
                  never touches external servers
                </span>
              </li>
              <li className="flex items-start gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0"
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
                  <strong>Extensible Architecture:</strong> Create custom transformations for specialized business
                  requirements
                </span>
              </li>
              <li className="flex items-start gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0"
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
                  <strong>Performance Optimized:</strong> Handles enterprise-scale JSON files efficiently with minimal
                  memory overhead
                </span>
              </li>
              <li className="flex items-start gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0"
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
                  <strong>Integrated Tooling:</strong> Command-line interface and demo application for quick
                  experimentation
                </span>
              </li>
            </ul>
          </div>

          <p className="mb-6">
            For organizations that regularly process sensitive JSON data—particularly from APIs, customer records, or
            financial systems—Jolt's offline approach isn't just convenient; it's an essential security practice that
            prevents potential data leaks associated with online formatters and processors.
          </p>
        </div>

        {/* Main Blog Post Content */}
        <article className="prose prose-lg dark:prose-invert max-w-none mb-10">
          <h2 className="text-3xl font-bold mb-8">Why JSON Formatting Matters</h2>

          <p className="mb-6">
            JSON (JavaScript Object Notation) has become the standard data interchange format for web applications,
            APIs, and configuration files. Its lightweight, human-readable structure makes it ideal for transmitting
            data between servers and clients. However, when working with JSON, proper formatting is essential for
            several reasons:
          </p>

          <ul className="space-y-2 mb-6">
            <li>Improved readability for debugging and development</li>
            <li>Easier identification of structural errors</li>
            <li>Better code maintenance and collaboration</li>
            <li>More efficient troubleshooting of API responses</li>
          </ul>

          <p className="mb-6">
            While many online JSON formatters exist, there are compelling reasons to process your JSON data locally
            instead of uploading it to third-party services.
          </p>

          <h2 className="text-3xl font-bold mt-12 mb-8">The Critical Importance of Offline JSON Processing</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
            <div className="border rounded-lg p-6 bg-muted/10">
              <h3 className="text-xl font-medium mb-4 text-red-600 dark:text-red-400">
                Security Risks with Online Formatters
              </h3>
              <p className="mb-4">When you paste JSON into an online formatter, you're potentially exposing:</p>
              <ul className="mt-2 space-y-2">
                <li>API credentials and tokens</li>
                <li>Customer information and PII</li>
                <li>Proprietary business logic</li>
                <li>Internal system structures</li>
                <li>Database connection details</li>
              </ul>
            </div>
            <div className="border rounded-lg p-6 bg-muted/10">
              <h3 className="text-xl font-medium mb-4 text-green-600 dark:text-green-400">
                Benefits of Offline Processing
              </h3>
              <ul className="mt-2 space-y-2">
                <li>Complete data privacy and security</li>
                <li>No risk of data interception</li>
                <li>Works without internet connectivity</li>
                <li>Processing speed not affected by network</li>
                <li>No size limitations from browser or service</li>
              </ul>
            </div>
          </div>

          <p className="mb-6">
            For developers working with sensitive information, using an offline JSON formatter isn't just a
            preference—it's a security necessity. Development teams working on financial applications, healthcare
            systems, or any product handling personal data should consider offline processing tools as part of their
            security best practices.
          </p>

          <h2 className="text-3xl font-bold mt-12 mb-8">Performance Considerations</h2>

          <p className="mb-6">
            Beyond security and privacy concerns, offline JSON processors typically offer significant performance
            advantages:
          </p>

          <ul className="space-y-2 mb-10">
            <li>
              <strong>No upload/download time:</strong> Processing happens instantly without waiting for network
              transfers
            </li>
            <li>
              <strong>Lower resource overhead:</strong> Native applications can be more efficient than browser-based
              tools
            </li>
            <li>
              <strong>Better handling of large files:</strong> Desktop applications can process larger JSON files that
              might crash browser-based tools
            </li>
            <li>
              <strong>Uninterrupted workflow:</strong> Continue working regardless of internet connectivity issues
            </li>
          </ul>

          <h2 className="text-3xl font-bold mt-12 mb-8">Top 5 Offline JSON Formatters</h2>

          <p className="mb-6">
            There are several excellent offline JSON formatters available for developers looking to keep their data
            secure. Here are five popular options worth considering:
          </p>

          <div className="space-y-8 mb-10">
            <div className="border rounded-lg p-6 bg-muted/10">
              <h3 className="text-2xl font-semibold mb-4">1. JSONBuddy</h3>
              <p className="mb-4">
                <strong>Platform:</strong> Windows
              </p>
              <p className="mb-4">
                JSONBuddy is a comprehensive JSON editor and validator for Windows that offers an impressive range of
                features for professional developers.
              </p>
              <h4 className="text-lg font-medium mb-3">Key Features:</h4>
              <ul className="space-y-2 mb-4">
                <li>Advanced JSON Schema editor and validator</li>
                <li>Tree view and text-based editing modes</li>
                <li>Syntax highlighting and auto-completion</li>
                <li>JSON to XML/CSV conversion capabilities</li>
                <li>Large file support for enterprise applications</li>
              </ul>
              <p>
                <strong>Price:</strong> Paid with free trial available
              </p>
            </div>

            <div className="border rounded-lg p-6 bg-muted/10">
              <h3 className="text-2xl font-semibold mb-4">2. DevUtils JSON Formatter</h3>
              <p className="mb-4">
                <strong>Platform:</strong> macOS
              </p>
              <p className="mb-4">
                DevUtils offers a native macOS application with a clean interface for formatting and validating JSON
                data completely offline.
              </p>
              <h4 className="text-lg font-medium mb-3">Key Features:</h4>
              <ul className="space-y-2 mb-4">
                <li>Format with various indentation options (2 spaces, 4 spaces, tabs)</li>
                <li>Minify JSON with a single click</li>
                <li>System-wide keyboard shortcut activation</li>
                <li>Automatic error highlighting</li>
                <li>Clipboard content detection</li>
              </ul>
              <p>
                <strong>Price:</strong> Free
              </p>
            </div>

            <div className="border rounded-lg p-6 bg-muted/10">
              <h3 className="text-2xl font-semibold mb-4">3. Japplis Toolbox</h3>
              <p className="mb-4">
                <strong>Platform:</strong> Windows, macOS, Linux
              </p>
              <p className="mb-4">
                Japplis Toolbox is a cross-platform utility suite that includes a powerful JSON formatter among its 50+
                text processing tools.
              </p>
              <h4 className="text-lg font-medium mb-3">Key Features:</h4>
              <ul className="space-y-2 mb-4">
                <li>Fast JSON formatting with extensive customization</li>
                <li>Handles large JSON files efficiently</li>
                <li>Live formatting as you type</li>
                <li>UTF-8 encoding support</li>
                <li>Unpack gzip files (in Pro version)</li>
              </ul>
              <p>
                <strong>Price:</strong> Free (basic version), Pro version available
              </p>
            </div>

            <div className="border rounded-lg p-6 bg-muted/10">
              <h3 className="text-2xl font-semibold mb-4">4. JSONBox</h3>
              <p className="mb-4">
                <strong>Platform:</strong> Windows, macOS, Linux
              </p>
              <p className="mb-4">
                JSONBox is an Electron-based cross-platform application specifically designed for JSON formatting with a
                clean, minimal interface.
              </p>
              <h4 className="text-lg font-medium mb-3">Key Features:</h4>
              <ul className="space-y-2 mb-4">
                <li>Paste-to-format functionality</li>
                <li>Syntax highlighting</li>
                <li>Multi-tab support for multiple JSON files</li>
                <li>Search functionality with position highlighting</li>
                <li>Export to XML and YAML formats</li>
              </ul>
              <p>
                <strong>Price:</strong> Free and open-source
              </p>
            </div>

            <div className="border rounded-lg p-6 bg-muted/10">
              <h3 className="text-2xl font-semibold mb-4">5. OK JSON</h3>
              <p className="mb-4">
                <strong>Platform:</strong> macOS
              </p>
              <p className="mb-4">
                OK JSON is a sleek, native macOS application designed for simplicity and ease of use when viewing and
                formatting JSON data.
              </p>
              <h4 className="text-lg font-medium mb-3">Key Features:</h4>
              <ul className="space-y-2 mb-4">
                <li>One-click beautify and minify operations</li>
                <li>Tree view and raw text editor modes</li>
                <li>Dark mode support</li>
                <li>Copy values, keys, or paths with ease</li>
                <li>Immediate syntax error highlighting</li>
              </ul>
              <p>
                <strong>Price:</strong> Free
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold mt-12 mb-8">OfflineTools: A Comprehensive Alternative</h2>

          <p className="mb-6">
            While the tools above offer excellent JSON formatting capabilities, developers seeking a more comprehensive
            suite of offline utilities should consider{" "}
            <Link href="/download" className="text-blue-600 dark:text-blue-400 no-underline hover:underline">
              OfflineTools
            </Link>
            . This desktop application provides not only advanced JSON formatting but also a range of other developer
            utilities that function completely offline.
          </p>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 p-6 rounded-lg border border-blue-100 dark:border-blue-800 my-10">
            <h3 className="text-2xl font-semibold mb-4">OfflineTools Desktop Features</h3>
            <p className="mb-4">
              The JSON formatter in OfflineTools offers everything you'd expect from a premium tool:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Multiple indentation options (2 spaces, 4 spaces, tabs, minified)</span>
              </li>
              <li className="flex items-start gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Advanced error reporting with line number identification</span>
              </li>
              <li className="flex items-start gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Syntax highlighting for improved readability</span>
              </li>
              <li className="flex items-start gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Efficient handling of large JSON files</span>
              </li>
            </ul>
            <p className="mb-6">
              But the real advantage is the additional toolkit of offline utilities in the same application:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 mb-6">
              <li>Base64 Encoding/Decoding</li>
              <li>URL Encoding/Decoding</li>
              <li>Text Hash Generation</li>
              <li>File Hash Comparison</li>
              <li>Binary-Base64 Conversion</li>
              <li>Clipboard Detection</li>
            </ul>
            <div className="mt-6">
              <Link
                href="/download"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-blue-600 text-white hover:bg-blue-700 h-10 py-2 px-4"
              >
                Download OfflineTools Desktop
              </Link>
            </div>
          </div>

          <h2 className="text-3xl font-bold mt-12 mb-8">Need an Online Option?</h2>

          <p className="mb-6">
            While offline processing is recommended for sensitive data, sometimes you just need a quick formatting
            solution without installing anything. For these situations, OfflineTools offers a{" "}
            <Link
              href="/tools/json-formatter"
              className="text-blue-600 dark:text-blue-400 no-underline hover:underline"
            >
              browser-based JSON formatter
            </Link>{" "}
            that delivers professional-grade formatting capabilities right in your browser.
          </p>

          <p className="mb-6">The online formatter is perfect for:</p>
          <ul className="space-y-2 mb-8">
            <li>Quick formatting of non-sensitive JSON data</li>
            <li>Sharing properly formatted JSON with colleagues</li>
            <li>When you're using a computer where you can't install software</li>
          </ul>

          <div className="flex justify-center my-10">
            <Link
              href="/tools/json-formatter"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-muted px-4 py-2 hover:bg-muted/80"
            >
              Try the Online JSON Formatter
            </Link>
          </div>

          <h2 className="text-3xl font-bold mt-12 mb-8">Conclusion</h2>

          <p className="mb-6">
            When working with JSON data, particularly in professional or security-sensitive contexts, Jolt provides
            essential security and performance benefits. By processing your JSON locally, you maintain complete control
            over your information while gaining the advantages of native application performance.
          </p>

          <div className="bg-gradient-to-r from-blue-50/30 to-indigo-50/30 dark:from-blue-950/40 dark:to-indigo-950/40 p-6 rounded-lg border border-blue-100/30 dark:border-blue-800/30 my-10">
            <p className="mb-0 text-lg">
              For developers who value both privacy and productivity,{" "}
              <Link href="/download" className="text-blue-600 dark:text-blue-400 no-underline hover:underline">
                OfflineTools Desktop
              </Link>{" "}
              offers the best of both worlds: robust JSON formatting alongside a complete suite of offline development
              utilities.{" "}
              <span className="font-medium">
                Download today and experience secure, efficient JSON processing on your desktop.
              </span>
            </p>

            <div className="mt-6">
              <Link
                href="/download"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-green-600 text-white hover:bg-green-700 h-10 py-2 px-4"
              >
                Download Now
              </Link>
            </div>
          </div>
        </article>

        <div className="mt-12 pt-8 border-t">
          <h3 className="text-lg font-medium mb-4">Share this article</h3>
          <ShareButtons
            url="https://offlinetools.org/blog/jolt-offline-json-formatter"
            title="Jolt Offline JSON Formatter"
          />
        </div>

        <div className="mt-12">
          <Link href="/blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
            ← Back to Blog
          </Link>
        </div>
      </Container>
    </PageLayout>
  );
}
