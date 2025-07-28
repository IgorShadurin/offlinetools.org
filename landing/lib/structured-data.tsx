"use client";

import Script from "next/script";
import { siteConfig } from "@/lib/metadata";

/**
 * Comprehensive Organization structured data for the main site
 */
export function OrganizationSchema() {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: {
      "@type": "ImageObject",
      url: `${siteConfig.url}${siteConfig.ogImage}`,
      width: 1200,
      height: 630,
    },
    description: siteConfig.description,
    foundingDate: "2024",
    sameAs: [
      siteConfig.githubUrl,
      `https://twitter.com/Web3Igor`,
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: siteConfig.supportEmail,
      contactType: "customer support",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "US",
    },
  };

  return (
    <Script id="organization-schema" type="application/ld+json">
      {JSON.stringify(orgSchema)}
    </Script>
  );
}

/**
 * Enhanced WebSite structured data with search functionality
 */
export function WebApplicationSchema() {
  const webAppSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        publisher: {
          "@id": `${siteConfig.url}/#organization`,
        },
        inLanguage: "en-US",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${siteConfig.url}/tools?search={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${siteConfig.url}/#software`,
        name: siteConfig.name,
        description: siteConfig.description,
        url: siteConfig.url,
        applicationCategory: "DeveloperApplication",
        operatingSystem: ["Web Browser", "Windows", "macOS", "Linux"],
        browserRequirements: "Requires modern web browser with JavaScript enabled",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
        author: {
          "@id": `${siteConfig.url}/#organization`,
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          ratingCount: "287",
          bestRating: "5",
          worstRating: "1",
        },
        featureList: [
          "JSON Formatter and Validator",
          "Base64 Encoder/Decoder",
          "URL Encoder/Decoder",
          "Hash Generator (MD5, SHA-1, SHA-256, etc.)",
          "UUID Generator",
          "QR Code Generator/Reader",
          "File Generator",
          "Image Resizer",
          "Text Utilities",
          "Privacy-First Processing",
        ],
        screenshot: {
          "@type": "ImageObject",
          url: `${siteConfig.url}${siteConfig.ogImage}`,
          caption: "OfflineTools - Privacy-First Developer Tools Dashboard",
        },
      },
    ],
  };

  return (
    <Script id="webapp-schema" type="application/ld+json">
      {JSON.stringify(webAppSchema)}
    </Script>
  );
}

/**
 * Tools Software Application Collection structured data
 */
export function ToolsSoftwareApplicationSchema() {
  const toolsSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${siteConfig.url}/tools/#collection`,
    url: `${siteConfig.url}/tools`,
    name: "Developer Tools Collection",
    description: "Comprehensive collection of privacy-first developer tools for web development and data processing.",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: 24,
      itemListElement: [
        {
          "@type": "SoftwareApplication",
          name: "JSON Formatter",
          description: "Format and validate JSON data with syntax highlighting",
          url: `${siteConfig.url}/tools/json-formatter`,
          applicationCategory: "DeveloperApplication",
        },
        {
          "@type": "SoftwareApplication",
          name: "Base64 Encoder/Decoder",
          description: "Convert text to/from Base64 encoding",
          url: `${siteConfig.url}/tools/base64-codec`,
          applicationCategory: "DeveloperApplication",
        },
        {
          "@type": "SoftwareApplication",
          name: "URL Encoder/Decoder",
          description: "Safely encode text for URLs",
          url: `${siteConfig.url}/tools/url-encoder`,
          applicationCategory: "DeveloperApplication",
        },
        {
          "@type": "SoftwareApplication",
          name: "Hash Generator",
          description: "Generate cryptographic hashes with multiple algorithms",
          url: `${siteConfig.url}/tools/text-hash-generator`,
          applicationCategory: "DeveloperApplication",
        },
        {
          "@type": "SoftwareApplication",
          name: "UUID Generator",
          description: "Generate RFC4122 compliant UUIDs",
          url: `${siteConfig.url}/tools/uuid-generator`,
          applicationCategory: "DeveloperApplication",
        },
      ],
    },
    isPartOf: {
      "@id": `${siteConfig.url}/#website`,
    },
  };

  return (
    <Script id="tools-schema" type="application/ld+json">
      {JSON.stringify(toolsSchema)}
    </Script>
  );
}

/**
 * Enhanced Breadcrumb structured data
 */
export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <Script id="breadcrumb-schema" type="application/ld+json">
      {JSON.stringify(breadcrumbSchema)}
    </Script>
  );
}

/**
 * Enhanced Tool Page structured data
 */
export function ToolPageSchema({
  toolName,
  toolDescription,
  toolUrl,
  toolCategory,
}: {
  toolName: string;
  toolDescription: string;
  toolUrl: string;
  toolCategory: string;
}) {
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${siteConfig.url}${toolUrl}/#tool`,
    name: toolName,
    description: toolDescription,
    url: `${siteConfig.url}${toolUrl}`,
    applicationCategory: "DeveloperApplication",
    applicationSubCategory: toolCategory,
    operatingSystem: "Web Browser",
    browserRequirements: "Requires modern web browser with JavaScript enabled",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    author: {
      "@id": `${siteConfig.url}/#organization`,
    },
    isPartOf: {
      "@id": `${siteConfig.url}/#software`,
    },
    featureList: ["Privacy-First Processing", "Offline Functionality", "No Server Transmission"],
    screenshot: {
      "@type": "ImageObject",
      url: `${siteConfig.url}${siteConfig.ogImage}`,
      caption: `${toolName} - Privacy-First Developer Tool`,
    },
  };

  return (
    <Script id="tool-schema" type="application/ld+json">
      {JSON.stringify(toolSchema)}
    </Script>
  );
}

/**
 * Enhanced FAQ Page structured data
 */
export function FAQPageSchema({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${siteConfig.url}/faq/#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
    isPartOf: {
      "@id": `${siteConfig.url}/#website`,
    },
  };

  return (
    <Script id="faq-schema" type="application/ld+json">
      {JSON.stringify(faqSchema)}
    </Script>
  );
}

/**
 * Enhanced Article structured data
 */
export function ArticleSchema({
  title,
  description,
  publishDate,
  modifiedDate,
  image,
  authorName,
}: {
  title: string;
  description: string;
  publishDate: string;
  modifiedDate?: string;
  image: string;
  authorName: string;
}) {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    image: {
      "@type": "ImageObject",
      url: `${siteConfig.url}${image}`,
      width: 1200,
      height: 630,
    },
    datePublished: publishDate,
    dateModified: modifiedDate || publishDate,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": window.location.href,
    },
    isPartOf: {
      "@id": `${siteConfig.url}/#website`,
    },
  };

  return (
    <Script id="article-schema" type="application/ld+json">
      {JSON.stringify(articleSchema)}
    </Script>
  );
}
