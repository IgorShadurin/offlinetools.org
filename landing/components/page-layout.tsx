import React from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

/**
 * Standard page layout with header and footer
 */
export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
