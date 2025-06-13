"use client";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { FeatureItem } from "@/components/feature-item";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Section } from "@/components/ui/section";
import { Download } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { StructuredData } from "@/components/structured-data";
import { onlineTools } from "@/components/online-tools-grid";
import { ImageModal } from "@/components/ui/modal";
import { useState } from "react";
import { RecentlyVisitedTools } from "@/components/recently-visited-tools";
import { 
  FaEthereum, 
  FaCode, 
  FaHtml5, 
  FaKey, 
  FaFile, 
  FaLink, 
  FaShieldAlt, 
  FaHashtag, 
  FaFileAlt, 
  FaUser, 
  FaFingerprint, 
  FaClock, 
  FaSlash, 
  FaRulerCombined 
} from 'react-icons/fa';

const getToolIcon = (title: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    "Ethereum Unit Converter": <FaEthereum />,
    "JSON Formatter": <FaCode />,
    "HTML Text Extractor": <FaHtml5 />,
    "Base64 Encoder/Decoder": <FaKey />,
    "Binary Base64 Encoder/Decoder": <FaFile />,
    "URL Encoder/Decoder": <FaLink />,
    "File & Text Hash Compare": <FaShieldAlt />,
    "Text Hash Generator": <FaHashtag />,
    "File Generator": <FaFileAlt />,
    "Person Generator": <FaUser />,
    "UUID Generator": <FaFingerprint />,
    "QR Code Tool": <FaLink />,
    "Speech Length Estimator": <FaClock />,
    "Text to Slug": <FaSlash />,
    "Unit Converter": <FaRulerCombined />,
  };
  return iconMap[title] || <FaCode />;
};

export default function Home() {
  const [modalImage, setModalImage] = useState<{src: string; alt: string} | null>(null);
  
  const openModal = (src: string, alt: string) => {
    setModalImage({ src, alt });
  };
  
  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Add specific home page structured data */}
        <StructuredData type="home" />

        {/* Hero Section */}
        <section className="relative py-20 md:py-28">
          <Container className="flex flex-col items-center text-center">
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">
              One-Stop Developer Toolbox
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground mb-8 md:mb-10">
              A collection of essential offline developer tools to boost your productivity. Available for macOS,
              Windows, and Linux.
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <Button size="lg" className="text-base py-2.5 px-5 font-medium" asChild>
                <Link href="/download" className="flex items-center gap-2">
                  <Download className="h-5 w-5" /> Download Now
                </Link>
              </Button>
            </div>
            <div className="w-full max-w-2xl mt-6">
              <RecentlyVisitedTools />
            </div>
            <div className="mt-12 md:mt-16 relative w-full max-w-5xl rounded-lg overflow-hidden">
              <div 
                className="cursor-pointer transition-transform hover:scale-[1.01]" 
                onClick={() => openModal("/screenshots/1.jpeg", "OfflineTools Application Screenshot")}
              >
                <Image 
                  src="/screenshots/1.jpeg" 
                  alt="OfflineTools Application Screenshot" 
                  width={1280} 
                  height={720}
                  className="w-full h-auto" 
                  priority
                />
              </div>
            </div>
          </Container>
        </section>

        {/* Features Section */}
        <Section id="features" className="bg-gray-50 dark:bg-gray-900/50">
          <Container>
            <h2 className="text-3xl font-bold text-center mb-4">🧰 What&apos;s in the box?</h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
              OfflineTools provides powerful utilities for developers in a single, well-designed desktop application.
              All tools are also available online for free use in your browser.
            </p>
            <div className="grid gap-8 md:grid-cols-3">
              {onlineTools.map((tool, index) => (
                <FeatureItem
                  key={index}
                  title={tool.title}
                  description={tool.description}
                  icon={getToolIcon(tool.title)}
                >
                  <div className="mt-4">
                    <Button variant="link" asChild className="h-auto p-0">
                      <Link href={tool.path}>Try online →</Link>
                    </Button>
                  </div>
                </FeatureItem>
              ))}
            </div>
          </Container>
        </Section>

        {/* Use Cases */}
        <Section id="use-cases" className="bg-gray-50 dark:bg-gray-900/50">
          <Container>
            <h2 className="text-3xl font-bold text-center mb-4">For every developer workflow</h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
              OfflineTools adapts to how you work, whether you&apos;re a frontend developer, backend engineer, or DevOps
              specialist.
            </p>
            <div className="grid gap-10 max-w-3xl mx-auto">
              <div className="rounded-lg border bg-background p-8 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-2xl font-semibold mb-4 text-primary">Frontend Developers</h3>
                <div className="aspect-[16/9] mb-6 overflow-hidden rounded-lg">
                  <div 
                    className="cursor-pointer transition-transform hover:scale-[1.02]" 
                    onClick={() => openModal("/screenshots/4.jpeg", "Frontend Developer Tools Screenshot")}
                  >
                    <Image 
                      src="/screenshots/4.jpeg" 
                      alt="Frontend Developer Tools Screenshot" 
                      width={640} 
                      height={360}
                      className="w-full h-auto" 
                    />
                  </div>
                </div>
                <p className="text-muted-foreground text-center max-w-lg mx-auto">
                  Streamline your frontend workflow with tools for JSON, CSS, color manipulation, and more, all
                  integrated in one application.
                </p>
              </div>
              
              <div className="rounded-lg border bg-background p-8 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-2xl font-semibold mb-4 text-primary">Backend Engineers</h3>
                <div className="aspect-[16/9] mb-6 overflow-hidden rounded-lg">
                  <div 
                    className="cursor-pointer transition-transform hover:scale-[1.02]" 
                    onClick={() => openModal("/screenshots/5.jpeg", "Backend Developer Tools Screenshot")}
                  >
                    <Image 
                      src="/screenshots/5.jpeg" 
                      alt="Backend Developer Tools Screenshot" 
                      width={640} 
                      height={360}
                      className="w-full h-auto" 
                    />
                  </div>
                </div>
                <p className="text-muted-foreground text-center max-w-lg mx-auto">
                  Decode JWTs, generate UUIDs, hash strings, and test regular expressions without leaving your desktop
                  or exposing sensitive data online.
                </p>
              </div>
            </div>
          </Container>
        </Section>

        {/* CTA */}
        <Section>
          <Container>
            <div className="rounded-lg bg-primary px-6 py-10 md:py-16 text-center text-primary-foreground">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-6">Ready to boost your productivity?</h2>
              <p className="mx-auto max-w-2xl text-lg mb-8">
                Join thousands of developers who use OfflineTools to streamline their daily tasks.
              </p>
              <Button size="lg" className="text-base py-2.5 px-5 font-medium" variant="secondary" asChild>
                <Link href="/download" className="flex items-center gap-2">
                  <Download className="h-5 w-5" /> Download Now
                </Link>
              </Button>
            </div>
          </Container>
        </Section>
        
        {/* Image Modal */}
        <ImageModal 
          isOpen={!!modalImage} 
          onClose={closeModal} 
          src={modalImage?.src || ''} 
          alt={modalImage?.alt || ''}
        />
      </main>
      <Footer />
    </div>
  );
}
