"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Apple, MonitorIcon, Terminal } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { PageLayout } from "@/components/page-layout";

const DOWNLOAD_LINKS = {
  mac_arm64: "https://github.com/IgorShadurin/offlinetools.org/releases/latest/download/desktop_arm64.dmg",
  mac_x64: "https://github.com/IgorShadurin/offlinetools.org/releases/latest/download/desktop_x64.dmg",
  linux: "https://github.com/IgorShadurin/offlinetools.org/releases/latest/download/desktop_x86_64.AppImage",
  windows: "https://github.com/IgorShadurin/offlinetools.org/releases/latest/download/desktop.exe",
};

/**
 * Platform detection result type
 */
type PlatformType = "mac_arm64" | "mac_x64" | "linux" | "windows" | null;

/**
 * Download page component
 */
export default function DownloadPage() {
  const [detectedPlatform, setDetectedPlatform] = useState<PlatformType>(null);

  useEffect(() => {
    // Detect user platform
    const detectPlatform = (): PlatformType => {
      const platform = navigator.platform.toLowerCase();
      const userAgent = navigator.userAgent.toLowerCase();

      // Check for macOS
      if (platform.includes("mac")) {
        // Check for Apple Silicon
        if (userAgent.includes("mac") && (userAgent.includes("arm") || userAgent.includes("apple"))) {
          return "mac_arm64";
        }
        // Intel Mac
        return "mac_x64";
      }

      // Check for Windows
      if (platform.includes("win")) {
        return "windows";
      }

      // Check for Linux
      if (platform.includes("linux") || platform.includes("unix")) {
        return "linux";
      }

      return null;
    };

    setDetectedPlatform(detectPlatform());
  }, []);

  return (
    <PageLayout>
      <Section>
        <Container>
          <div className="flex flex-col items-center text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Download OfflineTools</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Privacy-focused desktop application for various utilities and tools that work offline.
            </p>
          </div>

          {detectedPlatform && (
            <Card className="w-full max-w-xl mx-auto mb-12 border-primary/20">
              <CardHeader>
                <CardTitle className="text-center">Recommended Download</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <div className="mb-4">
                  {detectedPlatform.includes("mac") && <Apple className="w-16 h-16" />}
                  {detectedPlatform === "windows" && <MonitorIcon className="w-16 h-16" />}
                  {detectedPlatform === "linux" && <Terminal className="w-16 h-16" />}
                </div>
                <div className="text-center mb-6">
                  <h3 className="text-xl font-medium mb-2">
                    {detectedPlatform === "mac_arm64" && "macOS (Apple Silicon)"}
                    {detectedPlatform === "mac_x64" && "macOS (Intel)"}
                    {detectedPlatform === "windows" && "Windows"}
                    {detectedPlatform === "linux" && "Linux"}
                  </h3>
                  <p className="text-muted-foreground">We detected your platform automatically.</p>
                </div>
                <Button size="lg" asChild>
                  <Link href={DOWNLOAD_LINKS[detectedPlatform]}>
                    <Download className="mr-2" /> Download for{" "}
                    {detectedPlatform === "mac_arm64"
                      ? "macOS (Apple Silicon)"
                      : detectedPlatform === "mac_x64"
                        ? "macOS (Intel)"
                        : detectedPlatform === "windows"
                          ? "Windows"
                          : "Linux"}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-center">
                  <Apple className="mr-2" /> macOS (Apple Silicon)
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <p className="text-center text-muted-foreground mb-4">For Macs with M1, M2, or M3 chips</p>
                <Button asChild>
                  <Link href={DOWNLOAD_LINKS.mac_arm64}>
                    <Download className="mr-2" /> Download .dmg
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-center">
                  <Apple className="mr-2" /> macOS (Intel)
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <p className="text-center text-muted-foreground mb-4">For Intel-based Mac computers</p>
                <Button asChild>
                  <Link href={DOWNLOAD_LINKS.mac_x64}>
                    <Download className="mr-2" /> Download .dmg
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-center">
                  <MonitorIcon className="mr-2" /> Windows
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <p className="text-center text-muted-foreground mb-4">For Windows 10 and above</p>
                <Button asChild>
                  <Link href={DOWNLOAD_LINKS.windows}>
                    <Download className="mr-2" /> Download .exe
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="md:col-span-2 lg:col-span-3">
              <CardHeader>
                <CardTitle className="flex items-center justify-center">
                  <Terminal className="mr-2" /> Linux
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <p className="text-center text-muted-foreground mb-4">Portable AppImage for Linux distributions</p>
                <Button asChild>
                  <Link href={DOWNLOAD_LINKS.linux}>
                    <Download className="mr-2" /> Download .AppImage
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Installation Instructions</h2>

            <div className="max-w-2xl mx-auto text-left space-y-6">
              <div>
                <h3 className="text-xl font-medium mb-2">macOS</h3>
                <ol className="list-decimal list-inside space-y-2 pl-4">
                  <li>Download the appropriate .dmg file for your Mac</li>
                  <li>Open the .dmg file once downloaded</li>
                  <li>Drag the OfflineTools app to your Applications folder</li>
                  <li>Right-click the app and select &ldquo;Open&rdquo; the first time to bypass Gatekeeper</li>
                </ol>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-2">Windows</h3>
                <ol className="list-decimal list-inside space-y-2 pl-4">
                  <li>Download the .exe installer</li>
                  <li>Run the installer and follow the on-screen instructions</li>
                  <li>
                    Windows SmartScreen may show a warning, click &ldquo;More info&rdquo; then &ldquo;Run anyway&rdquo;
                  </li>
                </ol>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-2">Linux</h3>
                <ol className="list-decimal list-inside space-y-2 pl-4">
                  <li>Download the .AppImage file</li>
                  <li>
                    Make the AppImage executable with: <code>chmod +x desktop_x86_64.AppImage</code>
                  </li>
                  <li>
                    Run the application with: <code>./desktop_x86_64.AppImage</code>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </PageLayout>
  );
}
