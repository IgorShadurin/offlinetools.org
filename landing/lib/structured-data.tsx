"use client";

import Script from "next/script";

/**
 * Organization structured data for the main site
 */
export function OrganizationSchema() {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "OfflineTools",
    url: "https://offlinetools.org",
    logo: "https://offlinetools.org/images/logo.png",
    description: "A collection of essential offline developer tools to boost your productivity.",
    sameAs: ["https://github.com/igorShadurin/offlinetools.org", "https://twitter.com/offlinetools"],
    contactPoint: {
      "@type": "ContactPoint",
      email: "support@offlinetools.org",
      contactType: "customer support",
    },
  };

  return (
    <Script id="organization-schema" type="application/ld+json">
      {JSON.stringify(orgSchema)}
    </Script>
  );
}

/**
 * WebApplication structured data for the main homepage
 */
export function WebApplicationSchema() {
  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "OfflineTools",
    applicationCategory: "DeveloperApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    operatingSystem: "Windows, macOS, Linux",
    downloadUrl: "https://offlinetools.org/download",
    screenshot: "https://offlinetools.org/images/app-screenshot.png",
    softwareVersion: "1.0",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "128",
    },
  };

  return (
    <Script id="application-schema" type="application/ld+json">
      {JSON.stringify(appSchema)}
    </Script>
  );
}

/**
 * SoftwareApplication structured data for the tools page
 */
export function ToolsSoftwareApplicationSchema() {
  const toolsSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "OfflineTools Developer Utilities",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Windows, macOS, Linux",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "A suite of essential offline developer tools including JSON formatter, Base64 encoder/decoder, URL encoder/decoder, and more.",
    softwareHelp: "https://offlinetools.org/docs",
    downloadUrl: "https://offlinetools.org/download",
    featureList: [
      "Works completely offline",
      "Privacy-focused - data never leaves your device",
      "JSON formatting and validation",
      "Base64 encoding and decoding",
      "URL encoding and decoding",
      "File hash generation and comparison",
      "Text hash generation",
    ],
  };

  return (
    <Script id="tools-software-schema" type="application/ld+json">
      {JSON.stringify(toolsSchema)}
    </Script>
  );
}

/**
 * Breadcrumb structured data for navigation
 */
export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const breadcrumbData = {
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
      {JSON.stringify(breadcrumbData)}
    </Script>
  );
}

/**
 * Generates structured data for a specific tool
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
    name: `${toolName} - OfflineTools`,
    applicationCategory: toolCategory,
    description: toolDescription,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: `https://offlinetools.org${toolUrl}`,
    softwareVersion: "1.0",
    operatingSystem: "Windows, macOS, Linux, Web",
    applicationSubCategory: "Developer Tools",
  };

  return (
    <Script id="tool-schema" type="application/ld+json">
      {JSON.stringify(toolSchema)}
    </Script>
  );
}

/**
 * FAQ page structured data
 */
export function FAQPageSchema({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <Script id="faq-schema" type="application/ld+json">
      {JSON.stringify(faqSchema)}
    </Script>
  );
}

/**
 * Article structured data for blog posts
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
    image: image,
    datePublished: publishDate,
    dateModified: modifiedDate || publishDate,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: "OfflineTools",
      logo: {
        "@type": "ImageObject",
        url: "https://offlinetools.org/images/logo.png",
      },
    },
  };

  return (
    <Script id="article-schema" type="application/ld+json">
      {JSON.stringify(articleSchema)}
    </Script>
  );
}
