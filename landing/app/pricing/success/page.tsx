"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Copy, Loader2, Mail, ShieldCheck, TriangleAlert } from "lucide-react";
import { PageLayout } from "@/components/page-layout";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type CompletionResult = {
  success: boolean;
  email: string;
  licenseKey: string;
  emailSent: boolean;
  emailError?: string;
};

export default function PricingSuccessPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [errorText, setErrorText] = useState("");
  const [copied, setCopied] = useState(false);
  const [result, setResult] = useState<CompletionResult | null>(null);

  const sessionId = useMemo(() => {
    if (typeof window === "undefined") {
      return "";
    }

    const params = new URLSearchParams(window.location.search);
    return params.get("session_id")?.trim() ?? "";
  }, []);

  useEffect(() => {
    if (!sessionId) {
      setErrorText("Missing Stripe session id. Please return to pricing and complete checkout again.");
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    const completeCheckout = async () => {
      try {
        const response = await fetch(`/api/payments/complete?session_id=${encodeURIComponent(sessionId)}`);
        const data = (await response.json()) as CompletionResult & { error?: string };
        if (!response.ok || !data.success) {
          throw new Error(data.error || "Could not verify payment.");
        }

        if (isMounted) {
          setResult({
            success: true,
            email: data.email,
            licenseKey: data.licenseKey,
            emailSent: data.emailSent,
            emailError: data.emailError,
          });
        }
      } catch (error) {
        if (isMounted) {
          setErrorText(error instanceof Error ? error.message : "Could not verify payment.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void completeCheckout();
    return () => {
      isMounted = false;
    };
  }, [sessionId]);

  const copyLicenseKey = async () => {
    if (!result?.licenseKey) {
      return;
    }

    try {
      await navigator.clipboard.writeText(result.licenseKey);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  };

  return (
    <PageLayout>
      <Section>
        <Container>
          <div className="mx-auto max-w-2xl">
            <Card className="border-primary/20 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                  License Activation
                </CardTitle>
                <CardDescription>We verify your payment with Stripe, then issue your key for OfflineTools Desktop.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {isLoading ? (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Verifying payment and preparing your license key...
                  </div>
                ) : null}

                {!isLoading && errorText ? (
                  <div className="rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-700">
                    <p className="flex items-center gap-2 font-medium">
                      <TriangleAlert className="h-4 w-4" />
                      Could not complete license delivery
                    </p>
                    <p className="mt-1">{errorText}</p>
                  </div>
                ) : null}

                {result ? (
                  <div className="space-y-3 rounded-md border border-border bg-muted/30 p-4">
                    <p className="flex items-center gap-2 text-sm font-medium text-green-700">
                      <CheckCircle2 className="h-4 w-4" />
                      Payment confirmed
                    </p>
                    <p className="text-sm">
                      <strong>Email:</strong> {result.email}
                    </p>
                    <p className="text-sm break-all">
                      <strong>License key:</strong> {result.licenseKey}
                    </p>
                    <Button type="button" size="sm" onClick={copyLicenseKey}>
                      <Copy className="h-4 w-4" />
                      {copied ? "Copied" : "Copy key"}
                    </Button>

                    {result.emailSent ? (
                      <p className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        We also sent this key to your email.
                      </p>
                    ) : (
                      <p className="text-sm text-amber-700">
                        We could not send the email automatically, but your key is ready above.
                      </p>
                    )}
                  </div>
                ) : null}
              </CardContent>
              <CardFooter className="flex flex-wrap gap-2">
                <Button asChild>
                  <Link href="/download">Download desktop app</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/pricing">Back to pricing</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </Container>
      </Section>
    </PageLayout>
  );
}
