"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { onlineTools } from "@/components/online-tools-grid";
import { ArrowDownToLine, ShieldCheck, WifiOff, Zap } from "lucide-react";
import { StructuredData } from "@/components/structured-data";

export default function ToolsPage() {
  return (
    <>
      <StructuredData type="tools" />
      <Container className="py-8 md:py-12">
        <h1 className="text-4xl font-bold text-center mb-6">Available Tools</h1>

        {/* Why Go Offline Section */}
        <div className="mb-12 p-8 bg-muted rounded-xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Why Go Offline?</h2>
              <p className="text-muted-foreground mt-2">
                While online tools are convenient, offline tools offer significant advantages for data processing.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3 mt-8">
            <Card className="bg-background shadow-sm">
              <CardHeader>
                <ShieldCheck className="h-8 w-8 text-primary mb-2" />
                <h3 className="text-xl font-semibold">Complete Privacy</h3>
                <CardDescription>
                  Your data never leaves your device. Process sensitive information without cloud transmission or server
                  storage.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-background shadow-sm">
              <CardHeader>
                <WifiOff className="h-8 w-8 text-primary mb-2" />
                <h3 className="text-xl font-semibold">Work Anywhere</h3>
                <CardDescription>
                  No internet connection required. Process your data in remote locations, during travel, or in secure
                  environments.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-background shadow-sm">
              <CardHeader>
                <Zap className="h-8 w-8 text-primary mb-2" />
                <h3 className="text-xl font-semibold">Superior Performance</h3>
                <CardDescription>
                  Process large files faster with native performance, without upload/download delays or bandwidth
                  limitations.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="mt-8 bg-background p-6 rounded-lg border shadow-sm">
            <h3 className="font-medium mb-4">Additional Benefits:</h3>
            <ul className="space-y-4 pl-5 list-disc text-muted-foreground">
              <li>Enhanced security for working with confidential business or personal data</li>
              <li>Compliance with data protection regulations by keeping data local</li>
              <li>Reduced dependency on third-party services and their availability</li>
              <li>Consistent tool access even when internet connectivity is unreliable</li>
              <li>One-time download with no recurring subscription costs</li>
            </ul>
          </div>

          <div className="mt-8 flex justify-center">
            <Button asChild size="lg" className="gap-2">
              <Link href="/download">
                <ArrowDownToLine className="h-5 w-5" />
                Download Offline Tools
              </Link>
            </Button>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center mb-6">Online Tool Collection</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {onlineTools.map((tool, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <h3 className="text-xl font-semibold">{tool.title}</h3>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild variant="outline" className="w-full hover:bg-primary/10 border-primary/30 text-primary">
                  <Link href={tool.path}>Use Tool</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Container>
    </>
  );
}
