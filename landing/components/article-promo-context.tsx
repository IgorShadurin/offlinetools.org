"use client";

import { createContext, useContext, ReactNode } from "react";

/**
 * Article promo data structure
 */
export interface ArticlePromoData {
  title: string;
  description: string;
  linkText: string;
  linkUrl: string;
}

/**
 * Default promo data if none is provided
 */
export const defaultPromoData: ArticlePromoData = {
  title: "Need help with this tool?",
  description: "Try our online tool to make your work easier and more efficient.",
  linkText: "Try our tool",
  linkUrl: "/tools",
};

/**
 * Context for article promo data
 */
const ArticlePromoContext = createContext<ArticlePromoData>(defaultPromoData);

/**
 * Provider component to pass promo data from page to layout
 */
export function ArticlePromoProvider({
  children,
  value = defaultPromoData,
}: {
  children: ReactNode;
  value?: ArticlePromoData;
}) {
  return <ArticlePromoContext.Provider value={value}>{children}</ArticlePromoContext.Provider>;
}

/**
 * Hook to access article promo data in layout
 */
export function useArticlePromo() {
  return useContext(ArticlePromoContext);
}
