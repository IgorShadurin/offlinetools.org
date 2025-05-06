import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ArticlePromo } from '@/components/article-promo';
import { jsonFormatterPromo } from '@/app/tools/json-formatter/error-handling/promo-data';
import { ArticlePromoProvider } from "@/components/article-promo-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Metadata for articles section
 */
export const metadata: Metadata = {
  title: "Articles | Offline Tools",
  description: "Helpful articles about our tools and how to use them",
};

/**
 * Layout component for the articles section
 */
export default function ArticlesLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <ArticlePromoProvider value={jsonFormatterPromo}>
        <div className={`${geistSans.variable} ${geistMono.variable}`}>
          <Header/>
          <main className="container mx-auto px-4 py-8 max-w-4xl">
            <article className="prose dark:prose-invert max-w-none">
              <div className="max-w-3xl mx-auto">
                <ArticlePromo/>

                {children}

                <div className="mt-10">
                  <ArticlePromo/>
                </div>
              </div>
            </article>
          </main>
          <Footer/>
        </div>
      </ArticlePromoProvider>
  );
} 