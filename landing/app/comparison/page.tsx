import { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageLayout } from "@/components/page-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Comparison - OfflineTools vs DevUtils vs DevToys | OfflineTools.org",
  description:
    "Compare OfflineTools with DevUtils and DevToys. See why OfflineTools offers better value, cross-platform support, and superior offline privacy protection.",
  keywords: [
    "developer tools comparison",
    "DevUtils vs OfflineTools",
    "DevToys vs OfflineTools", 
    "offline developer tools",
    "developer productivity tools",
    "cross-platform developer tools",
    "privacy-focused development tools",
    "developer toolkit comparison",
  ],
  openGraph: {
    title: "OfflineTools vs DevUtils vs DevToys - Developer Tools Comparison",
    description:
      "Comprehensive comparison of leading developer toolkits. Discover why OfflineTools provides the best value and cross-platform experience.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OfflineTools vs DevUtils vs DevToys - Developer Tools Comparison",
    description:
      "Comprehensive comparison of leading developer toolkits. Discover why OfflineTools provides the best value and cross-platform experience.",
  },
};

/**
 * Comparison table data structure
 */
interface ComparisonFeature {
  feature: string;
  offlinetools: boolean | string;
  devutils: boolean | string;
  devtoys: boolean | string;
}

const comparisonFeatures: ComparisonFeature[] = [
  { feature: "macOS Support", offlinetools: true, devutils: true, devtoys: true },
  { feature: "Windows Support", offlinetools: true, devutils: false, devtoys: true },
  { feature: "Linux Support", offlinetools: true, devutils: false, devtoys: true },
  { feature: "Online Web Version", offlinetools: true, devutils: false, devtoys: false },
  { feature: "Pricing", offlinetools: "$19.99 one-time", devutils: "$30-80 one-time", devtoys: "—" },
  { feature: "JSON Formatter", offlinetools: true, devutils: true, devtoys: true },
  { feature: "Base64 Encoder/Decoder", offlinetools: true, devutils: true, devtoys: true },
  { feature: "JWT Debugger", offlinetools: true, devutils: true, devtoys: true },
  { feature: "UUID Generator", offlinetools: true, devutils: true, devtoys: true },
  { feature: "Hash Generator", offlinetools: true, devutils: true, devtoys: true },
  { feature: "QR Code Generator", offlinetools: true, devutils: true, devtoys: true },
  { feature: "RegExp Tester", offlinetools: true, devutils: true, devtoys: true },
  { feature: "URL Encoder/Decoder", offlinetools: true, devutils: true, devtoys: true },
  { feature: "Steganography Tool", offlinetools: true, devutils: false, devtoys: false },
  { feature: "Watermark Tool", offlinetools: true, devutils: false, devtoys: false },
  { feature: "Image Resizer", offlinetools: true, devutils: false, devtoys: true },
  { feature: "Unit Converter", offlinetools: true, devutils: false, devtoys: false },
  { feature: "Timezone Converter", offlinetools: true, devutils: true, devtoys: false },
  { feature: "Ethernet Converter", offlinetools: true, devutils: false, devtoys: false },
  { feature: "Data Encryptor", offlinetools: true, devutils: false, devtoys: false },
  { feature: "Password Strength Meter", offlinetools: true, devutils: false, devtoys: true },
  { feature: "Apple Silicon Support", offlinetools: true, devutils: true, devtoys: true },
  { feature: "Intel Mac Support", offlinetools: true, devutils: true, devtoys: true },
  { feature: "Total Tools Available", offlinetools: "20+", devutils: "47+", devtoys: "30+" },
  { feature: "Open Source", offlinetools: true, devutils: "partial", devtoys: true },
  { feature: "Smart Detection", offlinetools: true, devutils: true, devtoys: true },
];

/**
 * Renders a feature value in the comparison table
 */
const FeatureValue = ({ value, isOfflineTools = false }: { value: boolean | string; isOfflineTools?: boolean }) => {
  if (typeof value === "boolean") {
    return value ? (
      <Check className={`h-5 w-5 mx-auto ${isOfflineTools ? 'text-green-700' : 'text-green-600'}`} />
    ) : (
      <X className="h-5 w-5 text-red-500 mx-auto" />
    );
  }
  if (value === "partial") {
    return <Minus className="h-5 w-5 text-yellow-600 mx-auto" />;
  }
  return <span className={`text-sm font-medium text-center block ${isOfflineTools ? 'text-primary font-semibold' : ''}`}>{value}</span>;
};

/**
 * Comparison page component
 */
export default function ComparisonPage() {
  return (
    <PageLayout>
      <Section>
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              OfflineTools vs Competition
            </h1>
            <p className="mt-4 text-xl text-muted-foreground">
              A comprehensive comparison of leading developer toolkits
            </p>
          </div>

          {/* Comparison Table */}
          <div className="mt-16 overflow-x-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Feature Comparison</CardTitle>
                <CardDescription className="text-center">
                  Compare OfflineTools with DevUtils and DevToys across key features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-semibold">Feature</th>
                        <th className="text-center py-4 px-6 font-bold text-lg text-primary bg-primary/5 border-l-4 border-primary relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 rounded-sm"></div>
                          <span className="relative">OfflineTools</span>
                        </th>
                        <th className="text-center py-3 px-4 font-semibold">DevUtils</th>
                        <th className="text-center py-3 px-4 font-semibold">DevToys</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonFeatures.map((item, index) => (
                        <tr key={index} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4 text-sm">{item.feature}</td>
                          <td className="py-4 px-6 text-center bg-primary/5 border-l-4 border-primary/30 font-medium">
                            <FeatureValue value={item.offlinetools} isOfflineTools={true} />
                          </td>
                          <td className="py-3 px-4 text-center">
                            <FeatureValue value={item.devutils} />
                          </td>
                          <td className="py-3 px-4 text-center">
                            <FeatureValue value={item.devtoys} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Why OfflineTools is Better Section */}
          <div className="mt-16">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Why OfflineTools is the Better Choice</CardTitle>
                <CardDescription className="text-center">
                  Key advantages that make OfflineTools superior for developers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <h3 className="font-semibold">True Cross-Platform Support</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Unlike DevUtils (macOS only) or DevToys (limited cross-platform stability), OfflineTools works seamlessly on macOS, Windows, Linux, and offers a full-featured web version.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <h3 className="font-semibold">Best Value Pricing</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      At $19.99, OfflineTools costs significantly less than DevUtils ($30-80) while offering comparable functionality and superior cross-platform support.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <h3 className="font-semibold">Unique Privacy Tools</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Exclusive features like steganography, watermark tools, and AES-256 data encryption that neither DevUtils nor DevToys offer.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <h3 className="font-semibold">Complete Offline Privacy</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Your sensitive data never leaves your machine. Perfect for enterprise environments with strict security requirements.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <h3 className="font-semibold">Professional Features</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Advanced tools like Ethereum unit converter, professional watermarking, and comprehensive file generation capabilities for serious developers.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <h3 className="font-semibold">Apple Silicon Optimized</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Native support for both Apple Silicon and Intel Macs, ensuring optimal performance across all Mac architectures.
                    </p>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t">
                  <h3 className="text-2xl font-bold mb-8 text-center">Quick Comparison Summary</h3>
                  
                  <div className="grid gap-6 md:grid-cols-2">
                    <Card className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/30">
                      <CardContent className="pt-6">
                        <h4 className="font-bold mb-4 text-green-800 dark:text-green-300 text-lg">OfflineTools vs DevUtils</h4>
                        <ul className="space-y-3 text-sm">
                          <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Cross-platform support (Windows, Linux, Web) vs macOS only</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Better pricing: $19.99 vs $30-80</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Unique privacy tools (steganography, watermarking)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Native Apple Silicon + Intel support</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Complete offline functionality</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Web version available for any device</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Web version for universal access</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Code reviewed by Google's Gemini</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Code well tested</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>New features request accepted via GitHub</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30">
                      <CardContent className="pt-6">
                        <h4 className="font-bold mb-4 text-blue-800 dark:text-blue-300 text-lg">OfflineTools vs DevToys</h4>
                        <ul className="space-y-3 text-sm">
                          <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                            <span>Better cross-platform stability and support</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                            <span>Professional pricing model vs unclear monetization</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                            <span>Exclusive security features (encryption, steganography)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                            <span>Web version for universal access</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                            <span>Specialized tools (Ethereum converter, watermarking)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                            <span>Enterprise-ready privacy guarantees</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                            <span>Code reviewed by Google's Gemini</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                            <span>Code well tested</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                            <span>New features request accepted via GitHub</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="mt-6 border-primary/20 bg-primary/5">
                    <CardContent className="pt-6">
                      <h4 className="font-bold mb-4 text-center text-primary text-lg">Why Choose OfflineTools</h4>
                      <ul className="grid gap-3 md:grid-cols-2 text-sm max-w-4xl mx-auto">
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>Best value proposition: comprehensive features at competitive pricing</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>True cross-platform compatibility without compromises</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>Privacy-first design with complete offline functionality</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>Professional-grade security tools unavailable elsewhere</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>Optimized for modern development workflows</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>Reliable support and regular updates</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <Card className="border-primary/20">
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold mb-4">Ready to Experience the Difference?</h3>
                <p className="text-muted-foreground mb-6">
                  Join thousands of developers who chose OfflineTools for better privacy, value, and cross-platform support.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild>
                    <Link href="/download">Download Now</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/pricing">View Pricing</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>
    </PageLayout>
  );
} 