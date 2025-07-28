import { MetadataRoute } from "next";

/**
 * Generate sitemap for the website
 * This includes all tools, static pages, and articles
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://offlinetools.org";

  // Static pages
  const staticPages = [
    "",
    "/tools",
    "/about",
    "/contact",
    "/docs",
    "/faq",
    "/pricing",
    "/download",
    "/comparison",
    "/privacy",
    "/terms",
    "/blog",
    "/careers",
    "/a",
  ];

  // Tool pages
  const tools = [
    "ethereum-converter",
    "json-formatter",
    "html-text-extractor",
    "base64-codec",
    "binary-base64-codec",
    "url-encoder",
    "qr-code",
    "file-hash-compare",
    "text-hash-generator",
    "file-generator",
    "speech-length-estimator",
    "password-strength-meter",
    "unit-converter",
    "timezone-converter",
    "text-to-slug",
    "uuid-generator",
    "person-generator",
    "data-encryptor",
    "online-timer",
    "watermark-tool",
    "image-resizer",
    "text-utility",
    "steganography",
  ];

  // Generate sitemap entries for static pages
  const staticEntries = staticPages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: page === "" ? 1.0 : 0.8,
  }));

  // Generate sitemap entries for tool pages
  const toolEntries = tools.flatMap((tool) => [
    // Main tool page
    {
      url: `${baseUrl}/tools/${tool}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    // Tool metadata page
    {
      url: `${baseUrl}/tools/${tool}/metadata`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
  ]);

  // Add JSON formatter specific pages
  const jsonFormatterPages = [
    "use-cases-and-applications",
    "advanced-features",
    "api-documentation",
  ];

  const jsonFormatterEntries = jsonFormatterPages.map((page) => ({
    url: `${baseUrl}/tools/json-formatter/${page}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Add Base64 codec specific pages
  const base64Pages = [
    "url-safe-encoding",
    "binary-encoding", 
    "api-documentation",
  ];

  const base64Entries = base64Pages.map((page) => ({
    url: `${baseUrl}/tools/base64-codec/${page}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Add URL encoder specific pages
  const urlEncoderPages = ["encoding-guide"];

  const urlEncoderEntries = urlEncoderPages.map((page) => ({
    url: `${baseUrl}/tools/url-encoder/${page}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Add blog articles
  const blogArticles = [
    "base64-decode-offline",
    "hash-encode-decode-offline", 
    "jolt-offline-json-formatter",
    "offline-code-hierarchy-tools",
    "offline-json-query-tool",
    "what-developer-tools-can-be-used-offline",
    "developer-tools-offline",
  ];

  const blogEntries = blogArticles.map((article) => ({
    url: `${baseUrl}/blog/${article}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Add article pages for JSON formatter
  const jsonFormatterArticles = [
    "common-json-syntax-errors-and-how-to-fix-them",
  ];

  const articleEntries = jsonFormatterArticles.map((article) => ({
    url: `${baseUrl}/a/json-formatter/${article}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Add binary base64 codec article
  const binaryBase64Articles = [
    "article-1",
  ];

  const binaryBase64Entries = binaryBase64Articles.map((article) => ({
    url: `${baseUrl}/a/binary-base64-codec/${article}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...staticEntries,
    ...toolEntries,
    ...jsonFormatterEntries,
    ...base64Entries,
    ...urlEncoderEntries,
    ...blogEntries,
    ...articleEntries,
    ...binaryBase64Entries,
  ];
} 