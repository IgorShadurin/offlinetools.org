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
  FaRulerCombined,
  FaImage,
  FaLock,
} from "react-icons/fa";

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
    "Image Resizer": <FaImage />,
    "Person Generator": <FaUser />,
    "UUID Generator": <FaFingerprint />,
    "QR Code Tool": <FaLink />,
    "Speech Length Estimator": <FaClock />,
    "Text to Slug": <FaSlash />,
    "Unit Converter": <FaRulerCombined />,
    "Watermark Tool": <FaImage />,
    "Steganography Tool": <FaLock />,
  };
  return iconMap[title] || <FaCode />;
};

export default function Home() {
  const [modalImage, setModalImage] = useState<{ src: string; alt: string } | null>(null);

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
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
                             {/* Text Content - 1/3 width */}
               <div className="lg:col-span-1 order-1 lg:order-1 text-center lg:text-left">
                 <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                   One-Stop Developer Toolbox
                 </h1>
                 <p className="text-lg text-muted-foreground mb-8">
                   A collection of essential offline developer tools to boost your productivity. Available for macOS,
                   Windows, and Linux.
                 </p>

                 {/* Feature Highlights */}
                 <div className="space-y-3 mb-8">
                   <div className="flex items-center justify-center lg:justify-start gap-3">
                     <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                       <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                         <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                       </svg>
                     </div>
                     <span className="text-foreground font-medium">macOS, Windows, Linux & online supported</span>
                   </div>
                   <div className="flex items-center justify-center lg:justify-start gap-3">
                     <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                       <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                         <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                       </svg>
                     </div>
                     <span className="text-foreground font-medium">All Mac chips supported: Apple Silicon & Intel</span>
                   </div>
                   <div className="flex items-center justify-center lg:justify-start gap-3">
                     <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                       <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                         <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                       </svg>
                     </div>
                     <span className="text-foreground font-medium">Work offline, protect your data privacy</span>
                   </div>
                 </div>

                 {/* Rating */}
                 <div className="flex items-center justify-center lg:justify-start gap-2 mb-8">
                   <div className="flex items-center">
                     {[...Array(5)].map((_, i) => (
                       <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                       </svg>
                     ))}
                   </div>
                   <span className="text-lg font-semibold text-foreground">4.95</span>
                   <span className="text-muted-foreground">Based on author's opinion</span>
                 </div>

                 <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center lg:justify-start">
                   <Button size="lg" className="text-base py-2.5 px-5 font-medium" asChild>
                     <Link href="/download" className="flex items-center gap-2">
                       <Download className="h-5 w-5" /> Download Now
                     </Link>
                   </Button>
                 </div>
                 <div className="w-full mt-6">
                   <RecentlyVisitedTools />
                 </div>
               </div>

               {/* Video Section - 2/3 width */}
               <div className="lg:col-span-2 order-2 lg:order-2">
                 <div className="relative w-full rounded-lg overflow-hidden shadow-2xl">
                   <video
                     autoPlay
                     loop
                     playsInline
                     muted
                     poster="/main.webp"
                     className="w-full h-auto"
                     style={{ aspectRatio: "16/9" }}
                   >
                     <source src="/main.mp4" type="video/mp4" />
                     Your browser does not support the video tag.
                   </video>
                 </div>
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
                      {tool.external ? (
                        <a href={tool.path} target="_blank" rel="noopener noreferrer">
                          Try online →
                        </a>
                      ) : (
                        <Link href={tool.path}>Try online →</Link>
                      )}
                    </Button>
                  </div>
                </FeatureItem>
              ))}
            </div>
          </Container>
        </Section>

        {/* Use Cases */}
        <Section id="use-cases">
          <Container>
            <h2 className="text-3xl font-bold text-center mb-4">For every developer workflow</h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-16">
              OfflineTools adapts to how you work, whether you&apos;re a frontend developer, backend engineer, or DevOps
              specialist.
            </p>
            
            {/* Frontend Developers - Text Left, Image Right */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center mb-20">
              <div className="lg:col-span-1 order-2 lg:order-1">
                <h3 className="text-3xl font-bold mb-6 text-primary">Frontend Developers</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Streamline your frontend workflow with tools for JSON formatting, CSS manipulation, color conversion, and more. All integrated in one powerful application for maximum productivity.
                </p>
              </div>
              <div className="lg:col-span-2 order-1 lg:order-2">
                <div className="aspect-[16/9] overflow-hidden rounded-lg shadow-lg">
                  <div
                    className="cursor-pointer transition-transform hover:scale-[1.02]"
                    onClick={() => openModal("/screenshots/4.jpeg", "Frontend Developer Tools Screenshot")}
                  >
                    <Image
                      src="/screenshots/4.jpeg"
                      alt="Frontend Developer Tools Screenshot"
                      width={960}
                      height={540}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Backend Engineers - Image Left, Text Right */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
              <div className="lg:col-span-2 order-2 lg:order-1">
                <div className="aspect-[16/9] overflow-hidden rounded-lg shadow-lg">
                  <div
                    className="cursor-pointer transition-transform hover:scale-[1.02]"
                    onClick={() => openModal("/screenshots/5.jpeg", "Backend Developer Tools Screenshot")}
                  >
                    <Image
                      src="/screenshots/5.jpeg"
                      alt="Backend Developer Tools Screenshot"
                      width={960}
                      height={540}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
              <div className="lg:col-span-1 order-1 lg:order-2">
                <h3 className="text-3xl font-bold mb-6 text-primary">Backend Engineers</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Decode JWTs, generate UUIDs, create secure hashes, and test regular expressions without leaving your desktop or exposing sensitive data online. Privacy-first development tools.
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
          src={modalImage?.src || ""}
          alt={modalImage?.alt || ""}
        />
      </main>
      <Footer />
    </div>
  );
}
