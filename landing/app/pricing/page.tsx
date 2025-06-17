"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageLayout } from "@/components/page-layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { FeedbackButton } from "@/components/feedback-button";

/**
 * Pricing page component
 */
export default function PricingPage() {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  /**
   * Handles Buy Now button click to open feedback modal with pre-filled message
   */
  const handleBuyNowClick = () => {
    setIsFeedbackOpen(true);
  };

  return (
    <PageLayout>
      <Section>
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Simple, Transparent Pricing</h1>
            <p className="mt-4 text-xl text-muted-foreground">One price, all features, no subscriptions.</p>
          </div>

          <div className="mx-auto max-w-xl mt-10 md:mt-16">
            <Card className="border-primary/20 shadow-lg">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-2xl">OfflineTools</CardTitle>
                <CardDescription>For developers who value privacy and productivity</CardDescription>

                <div className="mt-4 flex items-baseline justify-center">
                  <span className="text-5xl font-extrabold tracking-tight">$19.99</span>
                  <span className="ml-1 text-xl font-normal text-muted-foreground">one-time</span>
                </div>
              </CardHeader>

              <CardContent className="pt-6">
                <ul className="space-y-3">
                  {[
                    "All tools included with lifetime access",
                    "1 year of free updates",
                    "Works on macOS, Windows & Linux (offline)",
                    "No data collection or hidden costs",
                  ].map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="h-5 w-5 flex-shrink-0 text-green-500" />
                      <span className="ml-3 text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="flex justify-center pb-8">
                <Button size="lg" onClick={handleBuyNowClick} className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" /> Buy Now
                </Button>
              </CardFooter>
            </Card>

            <div className="mt-8 text-center text-sm text-muted-foreground">
              <p>All major credit cards accepted. Secure payment processing.</p>
              <p className="mt-2">
                Have questions?{" "}
                <Link href="/contact" className="underline hover:text-foreground">
                  Contact us
                </Link>
                .
              </p>
            </div>
          </div>

          <div className="mx-auto max-w-2xl mt-16 border-t pt-10">
            <h2 className="text-2xl font-bold text-center mb-6">Frequently Asked Questions</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium">Is this really a one-time purchase?</h3>
                <p className="mt-2 text-muted-foreground">
                  Yes! Pay once and use OfflineTools forever. No subscriptions, no hidden fees.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium">Will I get future updates?</h3>
                <p className="mt-2 text-muted-foreground">
                  Yes, your purchase includes a full year of updates. After that, you can continue using the version you
                  have indefinitely.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium">Can I use it on multiple computers?</h3>
                <p className="mt-2 text-muted-foreground">
                  Yes, your license allows you to install OfflineTools on up to 3 personal devices.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium">Do you offer refunds?</h3>
                <p className="mt-2 text-muted-foreground">
                  We offer a 30-day money-back guarantee if you&apos;re not satisfied with your purchase.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Feedback Modal with pre-filled message */}
      <FeedbackButton
        showButton={false}
        isOpen={isFeedbackOpen}
        onOpenChange={setIsFeedbackOpen}
        defaultValues={{
          message: "I want to buy your product, please contact me by email above.",
        }}
      />
    </PageLayout>
  );
}
