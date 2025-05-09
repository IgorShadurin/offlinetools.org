import { Container } from "@/components/ui/container";
import { PageLayout } from "@/components/page-layout";
import {
  CalendarIcon,
  DownloadIcon,
  CodeIcon,
  MagnifyingGlassIcon,
  ArrowRightIcon,
  CheckCircledIcon,
  ExclamationTriangleIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";

export const metadata = {
  title: "Navigating Code Structure: Best Offline Tools for Code Hierarchy | OfflineTools",
  description:
    "Discover the best offline tools for code hierarchy visualization and navigation. Learn how these tools enhance code understanding, improve productivity, and work reliably without internet connectivity.",
};

export default function OfflineCodeHierarchyToolsPage() {
  return (
    <PageLayout>
      <Container className="py-12 md:py-16 max-w-4xl mx-auto">
        {/* Hero Section with visual header */}
        <div className="mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg -z-10"></div>
          <div className="p-6 md:p-8 rounded-lg border border-muted/20">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <CalendarIcon className="h-4 w-4" />
              <time dateTime="2025-05-08">May 8, 2025</time>
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              Navigating Code Structure: Best Offline Tools for Code Hierarchy
            </h1>
            <div className="flex flex-wrap gap-2 mb-8">
              <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-400/30">
                Developer Tools
              </span>
              <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10 dark:bg-purple-400/10 dark:text-purple-400 dark:ring-purple-400/30">
                Code Visualization
              </span>
              <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10 dark:bg-indigo-400/10 dark:text-indigo-400 dark:ring-indigo-400/30">
                Code Navigation
              </span>
              <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-700/10 dark:bg-green-400/10 dark:text-green-400 dark:ring-green-400/30">
                Offline Applications
              </span>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="lead text-xl md:text-2xl font-medium text-foreground/80">
                Understanding code structure is crucial for developer productivity. Discover how offline code hierarchy tools can enhance your workflow with reliable, private, and efficient code navigation.
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/download"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-purple-600 text-white hover:bg-purple-700 h-10 py-2 px-4"
              >
                <DownloadIcon className="mr-2 h-4 w-4" /> Download Desktop App
              </Link>
              <Link
                href="/tools"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4"
              >
                Try Online Tools
              </Link>
            </div>
          </div>
        </div>

        {/* Main Blog Post Content */}
        <article className="prose prose-lg dark:prose-invert max-w-none mb-10">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <CodeIcon className="h-6 w-6 text-blue-500" />
            Understanding Code Hierarchy Tools
          </h2>

          <p className="mb-6">
            Code hierarchy tools help developers visualize, understand, and navigate complex codebases. These tools map relationships between files, classes, functions, and modules, presenting them in an organized, hierarchical structure that makes code exploration intuitive and efficient.
          </p>

          <p className="mb-6">
            Whether you're exploring an unfamiliar codebase, refactoring legacy code, or documenting your project's architecture, code hierarchy tools can significantly improve your comprehension and productivity. They transform abstract code structures into visual maps that highlight dependencies, inheritance relationships, and call patterns.
          </p>

          <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-2">
            <MagnifyingGlassIcon className="h-6 w-6 text-blue-500" />
            Online vs. Desktop Code Hierarchy Tools: A Comparison
          </h2>

          <div className="mb-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Online Tools Card */}
              <div className="border rounded-xl overflow-hidden transition-all hover:shadow-md flex flex-col h-full">
                <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 p-4 border-b">
                  <h3 className="text-xl font-medium flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                    </svg>
                    Online Code Hierarchy Tools
                  </h3>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <div className="space-y-4 flex-1">
                    <div className="flex items-start gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <h4 className="font-medium">Accessibility</h4>
                        <p className="text-sm text-muted-foreground">Available anywhere with an internet connection.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <h4 className="font-medium">No Installation Required</h4>
                        <p className="text-sm text-muted-foreground">Access immediately through your browser.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <h4 className="font-medium">Security Concerns</h4>
                        <p className="text-sm text-muted-foreground">Code must be uploaded to third-party servers.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <h4 className="font-medium">Internet Dependency</h4>
                        <p className="text-sm text-muted-foreground">Requires constant connection for functionality.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-13a1 1 0 112 0v4a1 1 0 11-2 0V5zm1 8a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <h4 className="font-medium">Limited Project Size</h4>
                        <p className="text-sm text-muted-foreground">Many online tools cap file size or project complexity.</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Link 
                      href="/tools" 
                      className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-blue-600 text-white hover:bg-blue-700 h-10 py-2 px-4 w-full"
                    >
                      Try Online Tools <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Desktop Tools Card */}
              <div className="border rounded-xl overflow-hidden transition-all hover:shadow-md flex flex-col h-full">
                <div className="bg-gradient-to-r from-purple-500/10 to-violet-500/10 p-4 border-b">
                  <h3 className="text-xl font-medium flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
                    </svg>
                    Desktop Code Hierarchy Tools
                  </h3>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <div className="space-y-4 flex-1">
                    <div className="flex items-start gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <h4 className="font-medium">Complete Privacy</h4>
                        <p className="text-sm text-muted-foreground">All code processing happens locally on your machine.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <h4 className="font-medium">Works Offline</h4>
                        <p className="text-sm text-muted-foreground">No internet required for full functionality.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <h4 className="font-medium">Enhanced Performance</h4>
                        <p className="text-sm text-muted-foreground">Faster analysis for large codebases with local processing.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <h4 className="font-medium">Better Integration</h4>
                        <p className="text-sm text-muted-foreground">Often integrates with your IDE and development workflow.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-13a1 1 0 112 0v4a1 1 0 11-2 0V5zm1 8a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <h4 className="font-medium">Initial Setup Required</h4>
                        <p className="text-sm text-muted-foreground">One-time installation and configuration needed.</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Link 
                      href="/download" 
                      className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-purple-600 text-white hover:bg-purple-700 h-10 py-2 px-4 w-full"
                    >
                      Download OfflineTools <DownloadIcon className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-2">
            <ExclamationTriangleIcon className="h-6 w-6 text-amber-500" />
            5 Common Problems with Online Code Hierarchy Tools
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {/* Problem 1 */}
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-red-50 dark:bg-red-900/20 p-4 border-b flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600 dark:text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <h3 className="font-medium">Data Privacy Concerns</h3>
              </div>
              <div className="p-4">
                <p className="text-sm mb-3">
                  Online tools require uploading your codebase to third-party servers, potentially exposing proprietary code, security vulnerabilities, and business logic.
                </p>
                <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-md">
                  <p className="text-sm font-medium text-amber-700 dark:text-amber-400">
                    <span className="font-bold">Impact:</span> Intellectual property risks, confidentiality breaches, and compliance violations in regulated industries.
                  </p>
                </div>
              </div>
            </div>

            {/* Problem 2 */}
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-red-50 dark:bg-red-900/20 p-4 border-b flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600 dark:text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <h3 className="font-medium">Connection Dependency</h3>
              </div>
              <div className="p-4">
                <p className="text-sm mb-3">
                  Online tools stop functioning during internet outages, service disruptions, or when working in environments with restricted connectivity or VPN limitations.
                </p>
                <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-md">
                  <p className="text-sm font-medium text-amber-700 dark:text-amber-400">
                    <span className="font-bold">Impact:</span> Productivity loss during outages, inconsistent access while traveling, and workflow disruptions.
                  </p>
                </div>
              </div>
            </div>

            {/* Problem 3 */}
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-red-50 dark:bg-red-900/20 p-4 border-b flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600 dark:text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <h3 className="font-medium">Size Limitations</h3>
              </div>
              <div className="p-4">
                <p className="text-sm mb-3">
                  Most online tools impose strict file size limits or project complexity restrictions that prevent analyzing enterprise-scale codebases effectively.
                </p>
                <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-md">
                  <p className="text-sm font-medium text-amber-700 dark:text-amber-400">
                    <span className="font-bold">Impact:</span> Incomplete analysis, forced partial uploads, or inability to process large monorepos and complex projects.
                  </p>
                </div>
              </div>
            </div>

            {/* Problem 4 */}
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-red-50 dark:bg-red-900/20 p-4 border-b flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600 dark:text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <h3 className="font-medium">Performance Bottlenecks</h3>
              </div>
              <div className="p-4">
                <p className="text-sm mb-3">
                  Network latency and server-side processing limitations often result in slower analysis speeds, particularly for complex queries or large codebases.
                </p>
                <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-md">
                  <p className="text-sm font-medium text-amber-700 dark:text-amber-400">
                    <span className="font-bold">Impact:</span> Extended wait times during analysis, slower navigation experience, and reduced developer productivity.
                  </p>
                </div>
              </div>
            </div>

            {/* Problem 5 */}
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-red-50 dark:bg-red-900/20 p-4 border-b flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600 dark:text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <h3 className="font-medium">Limited IDE Integration</h3>
              </div>
              <div className="p-4">
                <p className="text-sm mb-3">
                  Browser-based tools typically lack deep integration with your development environment, requiring context switching and hampering seamless workflow.
                </p>
                <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-md">
                  <p className="text-sm font-medium text-amber-700 dark:text-amber-400">
                    <span className="font-bold">Impact:</span> Disrupted workflow, efficiency losses from constant switching between tools, and limited navigation capabilities.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-2">
            <CheckCircledIcon className="h-6 w-6 text-green-500" />
            5 Alternative Offline Code Hierarchy Tools
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {/* Tool 1 */}
            <div className="border rounded-lg overflow-hidden transition-all hover:shadow-md">
              <div className="p-4 border-b">
                <h3 className="font-medium text-lg">OfflineTools Code Explorer</h3>
                <div className="flex gap-2 mt-2">
                  <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-400/30">
                    Windows
                  </span>
                  <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10 dark:bg-purple-400/10 dark:text-purple-400 dark:ring-purple-400/30">
                    macOS
                  </span>
                  <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-700/10 dark:bg-emerald-400/10 dark:text-emerald-400 dark:ring-emerald-400/30">
                    Linux
                  </span>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm mb-4">
                  Our own tool combines complete privacy with powerful visualization capabilities to map complex codebases and their relationships.
                </p>
                <h4 className="text-sm font-medium mb-2">Best For:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Enterprise-scale projects</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Security-focused development</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Multi-language projects</span>
                  </li>
                </ul>
                <div className="mt-4">
                  <Link 
                    href="/download" 
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-blue-600 text-white hover:bg-blue-700 h-10 py-2 px-4 w-full"
                  >
                    Download Now <DownloadIcon className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Tool 2 */}
            <div className="border rounded-lg overflow-hidden transition-all hover:shadow-md">
              <div className="p-4 border-b">
                <h3 className="font-medium text-lg">Source Insight</h3>
                <div className="flex gap-2 mt-2">
                  <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-400/30">
                    Windows
                  </span>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm mb-4">
                  A powerful code editor and browser with integrated analysis capabilities for understanding and navigating complex codebases.
                </p>
                <h4 className="text-sm font-medium mb-2">Best For:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Windows-centric development</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Legacy codebases</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">C/C++/C# development</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Tool 3 */}
            <div className="border rounded-lg overflow-hidden transition-all hover:shadow-md">
              <div className="p-4 border-b">
                <h3 className="font-medium text-lg">Understand by SciTools</h3>
                <div className="flex gap-2 mt-2">
                  <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-400/30">
                    Windows
                  </span>
                  <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10 dark:bg-purple-400/10 dark:text-purple-400 dark:ring-purple-400/30">
                    macOS
                  </span>
                  <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-700/10 dark:bg-emerald-400/10 dark:text-emerald-400 dark:ring-emerald-400/30">
                    Linux
                  </span>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm mb-4">
                  A comprehensive static code analysis tool with advanced visualization features for understanding complex software systems.
                </p>
                <h4 className="text-sm font-medium mb-2">Best For:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Large enterprise codebases</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Complex architecture analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Multi-language projects</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Tool 4 */}
            <div className="border rounded-lg overflow-hidden transition-all hover:shadow-md">
              <div className="p-4 border-b">
                <h3 className="font-medium text-lg">JetBrains IDE Suite</h3>
                <div className="flex gap-2 mt-2">
                  <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-400/30">
                    Windows
                  </span>
                  <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10 dark:bg-purple-400/10 dark:text-purple-400 dark:ring-purple-400/30">
                    macOS
                  </span>
                  <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-700/10 dark:bg-emerald-400/10 dark:text-emerald-400 dark:ring-emerald-400/30">
                    Linux
                  </span>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm mb-4">
                  JetBrains IDEs (IntelliJ, PyCharm, WebStorm, etc.) offer built-in code navigation and hierarchy visualization tools that work offline.
                </p>
                <h4 className="text-sm font-medium mb-2">Best For:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Language-specific projects</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Integrated development workflows</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Framework-specific navigation</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Tool 5 */}
            <div className="border rounded-lg overflow-hidden transition-all hover:shadow-md">
              <div className="p-4 border-b">
                <h3 className="font-medium text-lg">VS Code + Extensions</h3>
                <div className="flex gap-2 mt-2">
                  <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-400/30">
                    Windows
                  </span>
                  <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10 dark:bg-purple-400/10 dark:text-purple-400 dark:ring-purple-400/30">
                    macOS
                  </span>
                  <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-700/10 dark:bg-emerald-400/10 dark:text-emerald-400 dark:ring-emerald-400/30">
                    Linux
                  </span>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm mb-4">
                  Visual Studio Code with extensions like "Code Map" or "Call Tree" provides offline code navigation and visualization capabilities.
                </p>
                <h4 className="text-sm font-medium mb-2">Best For:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Web development projects</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Customizable workflows</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Lightweight solutions</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            Expert Insights on Offline Code Navigation
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            {/* Quote 1 */}
            <div className="p-6 border rounded-lg bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500/40 mb-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M6.625 2.625c-1.5 0-2.75 1.25-2.75 2.75v3.5c0 1.5 1.25 2.75 2.75 2.75h.5l1 3v1h3.5v-1l-1-3h1.5c1.5 0 2.75-1.25 2.75-2.75v-3.5c0-1.5-1.25-2.75-2.75-2.75h-5.5zm0 2h5.5c.5 0 .75.25.75.75v3.5c0 .5-.25.75-.75.75h-3l.25 1h-2l.25-1h-1c-.5 0-.75-.25-.75-.75v-3.5c0-.5.25-.75.75-.75z" />
              </svg>
              <p className="text-foreground/90 mb-4">
                "The ability to work offline is no longer just a convenience—it's a necessity for secure development environments. Code hierarchy tools that function without internet access not only protect sensitive code but also ensure consistent productivity regardless of connectivity."
              </p>
              <div className="flex items-center gap-3 mt-4">
                <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-sm">Sarah Chen</p>
                  <p className="text-xs text-muted-foreground">CTO, SecureCode Systems</p>
                </div>
              </div>
            </div>

            {/* Quote 2 */}
            <div className="p-6 border rounded-lg bg-gradient-to-br from-purple-50/50 to-violet-50/50 dark:from-purple-900/20 dark:to-violet-900/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500/40 mb-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M6.625 2.625c-1.5 0-2.75 1.25-2.75 2.75v3.5c0 1.5 1.25 2.75 2.75 2.75h.5l1 3v1h3.5v-1l-1-3h1.5c1.5 0 2.75-1.25 2.75-2.75v-3.5c0-1.5-1.25-2.75-2.75-2.75h-5.5zm0 2h5.5c.5 0 .75.25.75.75v3.5c0 .5-.25.75-.75.75h-3l.25 1h-2l.25-1h-1c-.5 0-.75-.25-.75-.75v-3.5c0-.5.25-.75.75-.75z" />
              </svg>
              <p className="text-foreground/90 mb-4">
                "In our research on developer productivity, we found that teams using offline code hierarchy tools spent 37% less time orienting themselves in unfamiliar codebases. The ability to visualize and navigate code structure intuitively creates significant efficiency gains."
              </p>
              <div className="flex items-center gap-3 mt-4">
                <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 dark:text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-sm">Dr. Marcus Reynolds</p>
                  <p className="text-xs text-muted-foreground">Lead Researcher, DevProductivity Institute</p>
                </div>
              </div>
            </div>

            {/* Quote 3 */}
            <div className="p-6 border rounded-lg bg-gradient-to-br from-green-50/50 to-emerald-50/50 dark:from-green-900/20 dark:to-emerald-900/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500/40 mb-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M6.625 2.625c-1.5 0-2.75 1.25-2.75 2.75v3.5c0 1.5 1.25 2.75 2.75 2.75h.5l1 3v1h3.5v-1l-1-3h1.5c1.5 0 2.75-1.25 2.75-2.75v-3.5c0-1.5-1.25-2.75-2.75-2.75h-5.5zm0 2h5.5c.5 0 .75.25.75.75v3.5c0 .5-.25.75-.75.75h-3l.25 1h-2l.25-1h-1c-.5 0-.75-.25-.75-.75v-3.5c0-.5.25-.75.75-.75z" />
              </svg>
              <p className="text-foreground/90 mb-4">
                "After moving our team to desktop-based code hierarchy tools, we've seen dramatic improvements in onboarding time for new developers. Being able to visualize inheritance patterns and dependency relationships makes complex architectures understandable at a glance."
              </p>
              <div className="flex items-center gap-3 mt-4">
                <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 dark:text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-sm">Janine Rodriguez</p>
                  <p className="text-xs text-muted-foreground">Engineering Director, EnterpriseStack</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-10 mt-10">
            <h2 className="text-3xl font-bold mb-6">Conclusion: Take Control of Your Code Navigation</h2>
            <p className="mb-6">
              Offline code hierarchy tools provide significant advantages in terms of privacy, reliability, and performance compared to their online counterparts. By visualizing and navigating your code structure locally, you can enhance productivity while maintaining complete control over your intellectual property.
            </p>
            <p className="mb-8">
              OfflineTools offers a comprehensive solution that combines the best of both worlds: powerful visualization capabilities with complete privacy and offline functionality. Start exploring your code more efficiently today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/download"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-purple-600 text-white hover:bg-purple-700 h-10 py-2 px-4"
              >
                <DownloadIcon className="mr-2 h-4 w-4" /> Download Desktop App
              </Link>
              <Link
                href="/tools"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4"
              >
                Try Online Tools
              </Link>
            </div>
          </div>
        </article>
      </Container>
    </PageLayout>
  );
} 