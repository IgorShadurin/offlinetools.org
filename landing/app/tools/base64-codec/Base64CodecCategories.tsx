"use client";

import {
  AlertCircle,
  BookIcon,
  Code2,
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
  Bug,
  GitBranch,
  Accessibility,
  Lightbulb,
  Users,
  BookOpen,
  FileText,
} from "lucide-react";
import { ToolCategories, ToolCategory } from "@/components/ui/tool-categories";

/**
 * Base64 Codec categories component that renders a grid of categories
 * from the Base64 codec articles.
 */
export default function Base64CodecCategories() {
  const categories: ToolCategory[] = [
    {
      title: "Error Handling",
      slug: "error-handling",
      description: "Learn about common Base64 encoding and decoding errors and how to troubleshoot them.",
      icon: <AlertCircle className="h-8 w-8" />,
      url: "/tools/base64-codec/error-handling",
    },
    {
      title: "Features and Functionality",
      slug: "features-and-functionality",
      description: "Explore the capabilities of modern Base64 codec tools, from basic encoding to advanced features.",
      icon: <Puzzle className="h-8 w-8" />,
      url: "/tools/base64-codec/features-and-functionality",
    },
    {
      title: "Basics and Introduction",
      slug: "basics-and-introduction",
      description: "Get started with Base64 encoding and decoding fundamentals for beginners.",
      icon: <BookOpen className="h-8 w-8" />,
      url: "/tools/base64-codec/basics-and-introduction",
    },
    {
      title: "Implementation Details",
      slug: "implementation-details",
      description:
        "Dive into the technical aspects of building Base64 codecs and understanding the encoding algorithm.",
      icon: <Code2 className="h-8 w-8" />,
      url: "/tools/base64-codec/implementation-details",
    },
    {
      title: "Performance Optimization",
      slug: "performance-optimization",
      description: "Techniques for optimizing Base64 encoding and decoding for speed and efficiency.",
      icon: <Zap className="h-8 w-8" />,
      url: "/tools/base64-codec/performance-optimization",
    },
    {
      title: "Security Considerations",
      slug: "security-considerations",
      description: "Understand security implications and best practices when working with Base64 encoded data.",
      icon: <Shield className="h-8 w-8" />,
      url: "/tools/base64-codec/security-considerations",
    },
    {
      title: "Use Cases and Applications",
      slug: "use-cases-and-applications",
      description: "Explore practical applications and common scenarios where Base64 encoding is essential.",
      icon: <Briefcase className="h-8 w-8" />,
      url: "/tools/base64-codec/use-cases-and-applications",
    },
    {
      title: "Programming Language Implementations",
      slug: "programming-language-implementations",
      description: "Learn about Base64 codec implementations across different programming languages.",
      icon: <Code className="h-8 w-8" />,
      url: "/tools/base64-codec/programming-language-implementations",
    },
    {
      title: "Standards and Best Practices",
      slug: "standards-and-best-practices",
      description: "Understand official Base64 specifications and best practices for encoding and decoding.",
      icon: <BookIcon className="h-8 w-8" />,
      url: "/tools/base64-codec/standards-and-best-practices",
    },
    {
      title: "Comparative Analysis",
      slug: "comparative-analysis",
      description: "Compare different Base64 encoding tools, algorithms, and approaches.",
      icon: <BarChart2 className="h-8 w-8" />,
      url: "/tools/base64-codec/comparative-analysis",
    },
    {
      title: "Troubleshooting and Debugging",
      slug: "troubleshooting-and-debugging",
      description: "Advanced techniques for identifying and resolving Base64 encoding and decoding issues.",
      icon: <Bug className="h-8 w-8" />,
      url: "/tools/base64-codec/troubleshooting-and-debugging",
    },
    {
      title: "Integration and Interoperability",
      slug: "integration-and-interoperability",
      description: "Strategies for integrating Base64 encoders/decoders with other tools and systems.",
      icon: <Link className="h-8 w-8" />,
      url: "/tools/base64-codec/integration-and-interoperability",
    },
    {
      title: "User Experience Design",
      slug: "user-experience-design",
      description: "Design principles for creating intuitive and effective Base64 encoding tool interfaces.",
      icon: <Smile className="h-8 w-8" />,
      url: "/tools/base64-codec/user-experience-design",
    },
    {
      title: "Education and Learning",
      slug: "education-and-learning",
      description: "Resources and approaches for learning Base64 encoding concepts and techniques.",
      icon: <GraduationCap className="h-8 w-8" />,
      url: "/tools/base64-codec/education-and-learning",
    },
    {
      title: "Testing and Quality Assurance",
      slug: "testing-and-quality-assurance",
      description: "Methods for ensuring Base64 codec reliability, correctness, and quality.",
      icon: <TestTube className="h-8 w-8" />,
      url: "/tools/base64-codec/testing-and-quality-assurance",
    },
    {
      title: "DevOps and CI/CD",
      slug: "devops-and-cicd",
      description: "Implementing Base64 encoding in deployment pipelines, infrastructure, and automation.",
      icon: <GitBranch className="h-8 w-8" />,
      url: "/tools/base64-codec/devops-and-cicd",
    },
    {
      title: "Accessibility and Inclusivity",
      slug: "accessibility-and-inclusivity",
      description: "Making Base64 tools accessible to users of all abilities through inclusive design.",
      icon: <Accessibility className="h-8 w-8" />,
      url: "/tools/base64-codec/accessibility-and-inclusivity",
    },
    {
      title: "Future Trends and Innovations",
      slug: "future-trends-and-innovations",
      description: "Emerging technologies and approaches that will shape the future of Base64 encoding tools.",
      icon: <Lightbulb className="h-8 w-8" />,
      url: "/tools/base64-codec/future-trends-and-innovations",
    },
    {
      title: "Community and Ecosystem",
      slug: "community-and-ecosystem",
      description: "Building and nurturing open source communities around Base64 encoding tools and standards.",
      icon: <Users className="h-8 w-8" />,
      url: "/tools/base64-codec/community-and-ecosystem",
    },
    {
      title: "Miscellaneous Topics",
      slug: "miscellaneous-topics",
      description: "Additional Base64 encoding topics that don't fit into other categories.",
      icon: <FileText className="h-8 w-8" />,
      url: "/tools/base64-codec/miscellaneous-topics",
    },
  ];

  return (
    <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm">
      <ToolCategories categories={categories} baseUrl="/tools/base64-codec" columns={3} />
    </div>
  );
}
