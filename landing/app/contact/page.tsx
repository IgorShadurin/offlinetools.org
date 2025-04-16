import { Metadata } from "next"
import { Container } from "@/components/ui/container"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Section, SectionHeading } from "@/components/ui/section"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ContactForm from "@/components/contact-form"
import { MapPin, Mail, Phone } from "lucide-react"

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
              description="We&apos;d love to hear from you. Fill out the form below or use any of the contact options."
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
                            <a href="mailto:support@offlinetools.org" className="hover:text-primary">
                              support@offlinetools.org
                            </a>
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start space-x-4">
                        <div className="rounded-full bg-primary/10 p-3">
                          <MapPin className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium mb-1">Location</h3>
                          <p className="text-muted-foreground">
                            123 Developer Way<br />
                            San Francisco, CA 94107<br />
                            United States
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start space-x-4">
                        <div className="rounded-full bg-primary/10 p-3">
                          <Phone className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium mb-1">Phone</h3>
                          <p className="text-muted-foreground">
                            <a href="tel:+14155552671" className="hover:text-primary">
                              +1 (415) 555-2671
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
            
            {/* Map */}
            <div className="mt-12">
              <Card>
                <CardContent className="p-0 overflow-hidden rounded-lg">
                  <div className="aspect-[16/9] bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <p className="text-muted-foreground">Map Placeholder</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  )
} 