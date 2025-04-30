import { Container } from "@/components/ui/container";
import { PageLayout } from "@/components/page-layout";

export const metadata = {
  title: "Terms of Service | Offline Tools",
  description: "Our terms of service outline the rules, guidelines, and legal agreements for using Offline Tools.",
};

export default function TermsPage() {
  return (
    <PageLayout>
      <Container className="py-12 md:py-16">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-center">Terms of Service</h1>
          <p className="mt-4 text-muted-foreground md:text-lg text-center">
            {/*Last updated: June 15, 2024*/}
          </p>
          
          <div className="mt-10 md:mt-16 space-y-8 prose dark:prose-invert max-w-none">
            <section>
              <h2 className="text-2xl font-semibold">1. Acceptance of Terms</h2>
              <p>
                By accessing or using Offline Tools (&quot;the Service&quot;), you agree to be bound by these Terms of Service
                (&quot;Terms&quot;). If you do not agree to these Terms, please do not use the Service.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold">2. Description of Service</h2>
              <p>
                Offline Tools provides a set of browser-based utilities designed to operate offline, allowing
                users to process data locally without transmitting information to external servers.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold">3. User Responsibilities</h2>
              <p>
                As a user of the Service, you agree to:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Use the Service only for lawful purposes and in accordance with these Terms</li>
                <li>Not use the Service in any way that could disable, overburden, or impair the Service</li>
                <li>Not attempt to gain unauthorized access to any part of the Service</li>
                <li>Not use the Service for any illegal or harmful activities</li>
                <li>Take responsibility for all data processed using our tools</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold">4. Intellectual Property</h2>
              <p>
                The Service and its original content, features, and functionality are owned by Offline Tools
                and are protected by international copyright, trademark, patent, trade secret, and other
                intellectual property or proprietary rights laws.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold">5. User Content</h2>
              <p>
                Any data you process using our tools (&quot;User Content&quot;) remains your property. Since our tools
                operate offline, your User Content is processed locally on your device and is not transmitted
                to our servers or stored by us.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold">6. Disclaimer of Warranties</h2>
              <p>
                The Service is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, either
                express or implied. We do not warrant that the Service will be uninterrupted or error-free,
                that defects will be corrected, or that the Service is free of viruses or other harmful
                components.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold">7. Limitation of Liability</h2>
              <p>
                In no event shall Offline Tools be liable for any indirect, incidental, special, consequential,
                or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other
                intangible losses, resulting from your access to or use of or inability to access or use the Service.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold">8. Changes to Terms</h2>
              <p>
                We reserve the right to modify or replace these Terms at any time. We will provide notice of
                any changes by posting the new Terms on this page and updating the &quot;Last updated&quot; date.
                Your continued use of the Service after any such changes constitutes your acceptance of the
                new Terms.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold">9. Governing Law</h2>
              <p>
                These Terms shall be governed by and defined following the laws of [Your Jurisdiction].
                Offline Tools and yourself irrevocably consent that the courts of [Your Jurisdiction] shall
                have exclusive jurisdiction to resolve any dispute which may arise in connection with these Terms.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold">10. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at:
              </p>
              <p>
                <a href="mailto:legal@offlinetools.org" className="text-primary hover:underline">
                  legal@offlinetools.org
                </a>
              </p>
            </section>
          </div>
        </div>
      </Container>
    </PageLayout>
  );
} 