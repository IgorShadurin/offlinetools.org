import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { PageLayout } from "@/components/page-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

export const metadata = {
  title: "Careers | Offline Tools",
  description: "Join our team and help us build privacy-focused tools that empower users to take control of their data.",
};

export default function CareersPage() {
  return (
    <PageLayout>
      <Container className="py-12 md:py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Careers at Offline Tools</h1>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Join us in building a more private and secure digital future
          </p>
        </div>
        
        <div className="mx-auto max-w-5xl mt-10 md:mt-16 space-y-10">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Why Join Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Mission-Driven</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Work on products that actually make a positive difference in the world and align with your values.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Remote-First</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Work from anywhere in the world. We believe in hiring the best talent, regardless of location.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Growth-Focused</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>We invest in your professional development with mentorship, learning resources, and growth opportunities.</p>
                </CardContent>
              </Card>
            </div>
          </section>
          
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold">Open Positions</h2>
            <Tabs defaultValue="engineering" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="engineering">Engineering</TabsTrigger>
                <TabsTrigger value="product">Product</TabsTrigger>
                <TabsTrigger value="operations">Operations</TabsTrigger>
              </TabsList>
              <TabsContent value="engineering" className="space-y-4 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Senior Frontend Engineer</CardTitle>
                    <CardDescription>Remote · Full-Time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>We&apos;re looking for experienced frontend engineers to help build our next generation of privacy-focused tools.</p>
                  </CardContent>
                  <CardFooter>
                    <p className="text-sm text-muted-foreground">Full job description coming soon</p>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Full Stack Developer</CardTitle>
                    <CardDescription>Remote · Full-Time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Join our team to help build and maintain our growing platform of offline-first tools.</p>
                  </CardContent>
                  <CardFooter>
                    <p className="text-sm text-muted-foreground">Full job description coming soon</p>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="product" className="space-y-4 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Product Manager</CardTitle>
                    <CardDescription>Remote · Full-Time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>We&apos;re seeking a product manager to help define and execute our product roadmap.</p>
                  </CardContent>
                  <CardFooter>
                    <p className="text-sm text-muted-foreground">Full job description coming soon</p>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="operations" className="space-y-4 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Community Manager</CardTitle>
                    <CardDescription>Remote · Full-Time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Help grow and nurture our community of privacy-conscious users.</p>
                  </CardContent>
                  <CardFooter>
                    <p className="text-sm text-muted-foreground">Full job description coming soon</p>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </section>
          
          <section className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Don&apos;t see a perfect fit?</h2>
            <p className="mb-6">We&apos;re always looking for talented individuals who share our values and mission.</p>
            <Button asChild>
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </section>
        </div>
      </Container>
    </PageLayout>
  );
} 