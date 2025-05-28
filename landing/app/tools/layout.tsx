import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { generateMetadata } from "@/lib/metadata";
import { ToolVisitTracker } from "@/components/tool-visit-tracker"; // Import the new tracker component

export const metadata = generateMetadata({
  title: {
    default: "Online Developer Tools",
    template: "%s | OfflineTools",
  },
  description:
    "Browse our collection of free, privacy-focused developer tools for JSON formatting, encoding, hashing, and more. All tools process data locally for enhanced security.",
  openGraph: {
    title: "Developer Tools Collection | OfflineTools",
    description:
      "Browse our collection of free, privacy-focused developer tools for JSON formatting, encoding, hashing, and more.",
  },
  twitter: {
    title: "Developer Tools Collection | OfflineTools",
    description:
      "Browse our collection of free, privacy-focused developer tools for JSON formatting, encoding, hashing, and more.",
  },
});

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <ToolVisitTracker /> {/* Add the tracker component here */}
    </div>
  );
}
