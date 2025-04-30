import { Container } from "@/components/ui/container";
import { PageLayout } from "@/components/page-layout";

export const metadata = {
  title: "Privacy Policy | Offline Tools",
  description: "Our privacy policy explains how we handle your data and protect your privacy while using Offline Tools.",
};

export default function PrivacyPage() {
  return (
    <PageLayout>
      <Container className="py-12 md:py-16">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-center">Privacy Policy</h1>
          <p className="mt-4 text-muted-foreground md:text-lg text-center">
            {/*Last updated: June 15, 2024*/}
          </p>
          
          <div className="mt-10 md:mt-16 space-y-8 prose dark:prose-invert max-w-none">
            <section>
              <h2 className="text-2xl font-semibold">Introduction</h2>
              <p>
                At Offline Tools, privacy isn&apos;t just a policy—it&apos;s our core mission. We believe your data belongs to you, 
                which is why our tools are designed to work entirely offline, ensuring your information never leaves your device 
                without your knowledge or consent.
              </p>
              <p>
                This Privacy Policy explains our approach to data collection, processing, and your rights regarding any information 
                that might be collected when you visit our website.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold">Information We Collect</h2>
              <p>
                Since our tools operate entirely in your browser, we collect minimal data:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Website Usage Data:</strong> Basic analytics data such as page views, referring websites, and user 
                  behavior on our site. This data is anonymized and used only to improve our website.
                </li>
                <li>
                  <strong>Contact Information:</strong> If you voluntarily contact us through our contact form or by email, 
                  we will store the information you provide to respond to your inquiry.
                </li>
                <li>
                  <strong>Tool Usage:</strong> Our offline tools do not transmit any of the data you process with them back to our 
                  servers. All processing happens locally in your browser.
                </li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold">Cookies and Similar Technologies</h2>
              <p>
                Our website uses only essential cookies necessary for the site to function properly. We do not use third-party 
                tracking cookies or advertising cookies. The essential cookies we use do not store personal information.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold">How We Use Your Information</h2>
              <p>
                The limited information we collect is used only for:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Improving our website and tools based on anonymous usage patterns</li>
                <li>Responding to your inquiries or support requests</li>
                <li>Sending updates about our tools if you&apos;ve explicitly opted in</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold">Data Sharing and Third Parties</h2>
              <p>
                We do not sell, trade, or otherwise transfer your information to third parties. We may use trusted service 
                providers to help us operate our website, but these providers are bound by confidentiality agreements and do 
                not have the right to use your information beyond what is necessary to assist us.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold">Your Rights</h2>
              <p>
                As a user, you have the right to:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Access any personal information we hold about you</li>
                <li>Request deletion of your personal information</li>
                <li>Opt out of any future communications from us</li>
                <li>Request a copy of your data in a portable format</li>
              </ul>
              <p>
                To exercise any of these rights, please contact us using the information provided at the end of this policy.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold">Security</h2>
              <p>
                We implement a variety of security measures to protect your information. Our website uses HTTPS encryption, 
                and our internal systems are protected with appropriate access controls.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold">Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new 
                Privacy Policy on this page and updating the &quot;Last updated&quot; date.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p>
                <a href="mailto:privacy@offlinetools.org" className="text-primary hover:underline">
                  privacy@offlinetools.org
                </a>
              </p>
            </section>
          </div>
        </div>
      </Container>
    </PageLayout>
  );
} 