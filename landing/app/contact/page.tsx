import { Metadata } from "next"
import { Container } from "@/components/ui/container"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Section, SectionHeading } from "@/components/ui/section"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ContactForm from "@/components/contact-form"
import { Mail } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact Us | OfflineTools",
  description: "Get in touch with the OfflineTools team for support, feedback, or inquiries.",
}

/**
 * Contact page component that renders using SSR
 */
export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Section>
          <Container>
            <SectionHeading
              title="Contact Us"
              description="We&apos;d love to hear from you. Fill out the form below or use the contact option."
            />
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Contact Information */}
              <div className="lg:col-span-1">
                <div className="space-y-8">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start space-x-4">
                        <div className="rounded-full bg-primary/10 p-3">
                          <Mail className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium mb-1">Email</h3>
                          <p className="text-muted-foreground">
                            <a href="mailto:igor.shadurin@gmail.com" className="hover:text-primary">
                              igor.shadurin@gmail.com
                            </a>
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Send us a message</CardTitle>
                    <CardDescription>
                      We&apos;ll respond to your inquiry as soon as possible.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ContactForm />
                  </CardContent>
                </Card>
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  )
} 