import type { MetadataRoute } from "next";
import { getArticleLinks } from "@/lib/article-catalog";

export const SITE_URL = "https://offlinetools.org";

const STATIC_PAGES = [
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

const TOOLS = [
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

const JSON_FORMATTER_PAGES = ["use-cases-and-applications", "advanced-features", "api-documentation"];
const BASE64_PAGES = ["url-safe-encoding", "binary-encoding", "api-documentation"];
const URL_ENCODER_PAGES = ["encoding-guide"];

const BLOG_ARTICLES = [
  "base64-decode-offline",
  "hash-encode-decode-offline",
  "jolt-offline-json-formatter",
  "offline-code-hierarchy-tools",
  "offline-json-query-tool",
  "what-developer-tools-can-be-used-offline",
  "developer-tools-offline",
];

export function getSitemapEntries(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticEntries = STATIC_PAGES.map((page) => ({
    url: `${SITE_URL}${page}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: page === "" ? 1.0 : 0.8,
  }));

  const toolEntries = TOOLS.flatMap((tool) => [
    {
      url: `${SITE_URL}/tools/${tool}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tools/${tool}/metadata`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
  ]);

  const jsonFormatterEntries = JSON_FORMATTER_PAGES.map((page) => ({
    url: `${SITE_URL}/tools/json-formatter/${page}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const base64Entries = BASE64_PAGES.map((page) => ({
    url: `${SITE_URL}/tools/base64-codec/${page}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const urlEncoderEntries = URL_ENCODER_PAGES.map((page) => ({
    url: `${SITE_URL}/tools/url-encoder/${page}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogEntries = BLOG_ARTICLES.map((article) => ({
    url: `${SITE_URL}/blog/${article}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const articleEntries = getArticleLinks().map((article) => ({
    url: `${SITE_URL}${article.urlPath}`,
    lastModified,
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
  ];
}

export function getIndexableUrls() {
  return Array.from(new Set(getSitemapEntries().map((entry) => entry.url)));
}
