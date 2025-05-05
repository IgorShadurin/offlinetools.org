"use client"

import { 
  AlertCircle, 
  BookIcon, 
  Code2, 
  History, 
  Puzzle,
  BarChart2,
  Briefcase,
  Code,
  Shield,
  Zap,
  Smile,
  Link,
  GraduationCap,
  TestTube,
  Globe,
  Bug,
  GitBranch,
  Accessibility,
  Lightbulb,
  Users
} from "lucide-react"
import { ToolCategories, ToolCategory } from "@/components/ui/tool-categories"

/**
 * JSON Formatter categories component that renders a grid of categories
 * from the JSON formatter articles.
 */
export default function JsonFormatterCategories() {
  const categories: ToolCategory[] = [
    {
      title: "Error Handling",
      slug: "error-handling",
      description: "Learn about common JSON syntax errors, troubleshooting techniques, and how to fix invalid JSON data.",
      icon: <AlertCircle className="h-8 w-8" />,
      url: "/tools/json-formatter/error-handling"
    },
    {
      title: "Features and Functionality",
      slug: "features-and-functionality",
      description: "Explore the capabilities of modern JSON formatters, from syntax highlighting to search functionality.",
      icon: <Puzzle className="h-8 w-8" />,
      url: "/tools/json-formatter/features-and-functionality"
    },
    {
      title: "History and Evolution",
      slug: "history-and-evolution",
      description: "Discover the origin story of JSON and how formatting tools have evolved over time.",
      icon: <History className="h-8 w-8" />,
      url: "/tools/json-formatter/history-and-evolution"
    },
    {
      title: "Implementation Details",
      slug: "implementation-details",
      description: "Dive into the technical aspects of building JSON formatters, from parsing to optimization techniques.",
      icon: <Code2 className="h-8 w-8" />,
      url: "/tools/json-formatter/implementation-details"
    },
    {
      title: "Standards and Best Practices",
      slug: "standards-and-best-practices",
      description: "Understand official JSON specifications and best practices for working with JSON data.",
      icon: <BookIcon className="h-8 w-8" />,
      url: "/tools/json-formatter/standards-and-best-practices"
    },
    {
      title: "Comparative Analysis",
      slug: "comparative-analysis",
      description: "Compare different JSON formatters across platforms, features, and performance characteristics.",
      icon: <BarChart2 className="h-8 w-8" />,
      url: "/tools/json-formatter/comparative-analysis"
    },
    {
      title: "Use Cases and Applications",
      slug: "use-cases-and-applications",
      description: "Explore various industry and development scenarios where JSON formatters prove invaluable.",
      icon: <Briefcase className="h-8 w-8" />,
      url: "/tools/json-formatter/use-cases-and-applications"
    },
    {
      title: "Programming Language Implementations",
      slug: "programming-language-implementations",
      description: "Learn about JSON formatter implementations across different programming languages.",
      icon: <Code className="h-8 w-8" />,
      url: "/tools/json-formatter/programming-language-implementations"
    },
    {
      title: "Security Considerations",
      slug: "security-considerations",
      description: "Understand security risks and best practices when working with JSON data and formatters.",
      icon: <Shield className="h-8 w-8" />,
      url: "/tools/json-formatter/security-considerations"
    },
    {
      title: "Performance Optimization",
      slug: "performance-optimization",
      description: "Techniques for optimizing JSON formatter performance for speed and resource efficiency.",
      icon: <Zap className="h-8 w-8" />,
      url: "/tools/json-formatter/performance-optimization"
    },
    {
      title: "User Experience Design",
      slug: "user-experience-design",
      description: "Design principles and patterns for creating intuitive and effective JSON formatter interfaces.",
      icon: <Smile className="h-8 w-8" />,
      url: "/tools/json-formatter/user-experience-design"
    },
    {
      title: "Integration and Interoperability",
      slug: "integration-and-interoperability",
      description: "Strategies for integrating JSON formatters with other tools and systems.",
      icon: <Link className="h-8 w-8" />,
      url: "/tools/json-formatter/integration-and-interoperability"
    },
    {
      title: "Education and Learning",
      slug: "education-and-learning",
      description: "Resources and approaches for learning JSON formatting techniques and concepts.",
      icon: <GraduationCap className="h-8 w-8" />,
      url: "/tools/json-formatter/education-and-learning"
    },
    {
      title: "Testing and Quality Assurance",
      slug: "testing-and-quality-assurance",
      description: "Methods for ensuring JSON formatter reliability, correctness, and quality.",
      icon: <TestTube className="h-8 w-8" />,
      url: "/tools/json-formatter/testing-and-quality-assurance"
    },
    {
      title: "Online vs Offline JSON Tools",
      slug: "online-vs-offline-json-tools",
      description: "Comparing the benefits and tradeoffs between online and offline JSON formatting tools.",
      icon: <Globe className="h-8 w-8" />,
      url: "/tools/json-formatter/online-vs-offline-json-tools"
    },
    {
      title: "Troubleshooting and Debugging",
      slug: "troubleshooting-and-debugging",
      description: "Advanced techniques for identifying and resolving JSON parsing and formatting issues.",
      icon: <Bug className="h-8 w-8" />,
      url: "/tools/json-formatter/troubleshooting-and-debugging"
    },
    {
      title: "JSON for DevOps and CI/CD",
      slug: "json-for-devops-and-cicd",
      description: "Implementing JSON in deployment pipelines, infrastructure as code, and continuous integration.",
      icon: <GitBranch className="h-8 w-8" />,
      url: "/tools/json-formatter/json-for-devops-and-cicd"
    },
    {
      title: "Accessibility and Inclusivity",
      slug: "accessibility-and-inclusivity",
      description: "Making JSON tools accessible to users of all abilities through inclusive design practices.",
      icon: <Accessibility className="h-8 w-8" />,
      url: "/tools/json-formatter/accessibility-and-inclusivity"
    },
    {
      title: "Future Trends and Innovations",
      slug: "future-trends-and-innovations",
      description: "Emerging technologies and approaches that will shape the future of JSON formatting tools.",
      icon: <Lightbulb className="h-8 w-8" />,
      url: "/tools/json-formatter/future-trends-and-innovations"
    },
    {
      title: "Community and Ecosystem",
      slug: "community-and-ecosystem",
      description: "Building and nurturing open source communities around JSON formatter tools and standards.",
      icon: <Users className="h-8 w-8" />,
      url: "/tools/json-formatter/community-and-ecosystem"
    }
  ]

  return (
    <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm">
      <ToolCategories 
        categories={categories} 
        baseUrl="/tools/json-formatter"
        columns={3}
      />
    </div>
  )
} 