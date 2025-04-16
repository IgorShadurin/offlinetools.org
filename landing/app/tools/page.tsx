"use client"

import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { onlineTools } from "@/components/online-tools-grid"

export default function ToolsPage() {
  return (
    <>
      <Container className="py-8 md:py-12">
        <SectionHeading
          title="Online Tools"
          description="A collection of useful web-based tools for developers and designers."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {onlineTools.map((tool, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl">{tool.title}</CardTitle>
                <CardDescription>
                  {tool.title === "JSON Formatter" 
                    ? "Format and beautify your JSON with customizable indentation options."
                    : `Description for ${tool.title}`}
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={tool.path}>Use Tool</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Container>
    </>
  )
} 