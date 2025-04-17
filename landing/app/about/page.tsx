import { Container } from "@/components/ui/container";
import { PageLayout } from "@/components/page-layout";

export const metadata = {
  title: "About Us | Offline Tools",
  description: "Learn about the Offline Tools platform, our mission, values, and the team behind our privacy-focused tools.",
};

export default function AboutPage() {
  return (
    <PageLayout>
      <Container className="py-12 md:py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">About Offline Tools</h1>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Building privacy-focused tools for a better internet
          </p>
        </div>
        
        <div className="mx-auto max-w-3xl mt-10 md:mt-16 space-y-10">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Our Mission</h2>
            <p>
              At Offline Tools, we believe that privacy should be accessible to everyone. Our mission is to provide 
              high-quality utilities that work entirely offline, ensuring your data never leaves your device without your consent.
            </p>
            <p>
              We&apos;re committed to building tools that respect user privacy while delivering exceptional functionality
              and a seamless user experience.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Our Story</h2>
            <div className="relative h-64 w-full my-6 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-20"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-lg font-medium">Team Photo Coming Soon</p>
              </div>
            </div>
            <p>
              Offline Tools was founded in 2023 by a group of privacy advocates and developers who were frustrated 
              with the increasing number of online services that collected and monetized user data.
            </p>
            <p>
              What started as a small collection of utilities has grown into a comprehensive platform of 
              privacy-focused tools used by thousands of people daily.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Privacy First</h3>
                <p className="text-muted-foreground">We believe your data belongs to you. Period.</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Transparency</h3>
                <p className="text-muted-foreground">Our code is open for review, with nothing to hide.</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Quality</h3>
                <p className="text-muted-foreground">We&apos;re committed to building tools that are reliable and effective.</p>
              </div>
            </div>
          </section>
        </div>
      </Container>
    </PageLayout>
  );
} 