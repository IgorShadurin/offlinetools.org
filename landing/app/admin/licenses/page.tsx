"use client";

import { useState } from "react";
import { PageLayout } from "@/components/page-layout";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export default function AdminLicensesPage() {
  const [adminToken, setAdminToken] = useState("");
  const [email, setEmail] = useState("");
  const [sendEmail, setSendEmail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedKey, setGeneratedKey] = useState("");
  const [normalizedEmail, setNormalizedEmail] = useState("");
  const [statusText, setStatusText] = useState("");
  const [errorText, setErrorText] = useState("");

  const handleGenerate = async () => {
    setIsLoading(true);
    setGeneratedKey("");
    setNormalizedEmail("");
    setStatusText("");
    setErrorText("");

    try {
      const response = await fetch("/api/admin/licenses/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({
          email,
          sendEmail,
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result?.error || "Failed to generate license");
      }

      setGeneratedKey(result.licenseKey || "");
      setNormalizedEmail(result.email || "");
      setStatusText(result.emailSent ? "Key generated and email sent." : "Key generated.");
    } catch (error) {
      setErrorText(error instanceof Error ? error.message : "Failed to generate license");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageLayout>
      <Section>
        <Container>
          <div className="mx-auto max-w-2xl">
            <Card>
              <CardHeader>
                <CardTitle>Admin License Generation</CardTitle>
                <CardDescription>Generate OfflineTools license keys manually for specific emails.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-token">Admin token</Label>
                  <Input
                    id="admin-token"
                    type="password"
                    value={adminToken}
                    onChange={(event) => setAdminToken(event.target.value)}
                    placeholder="Paste LICENSE_ADMIN_TOKEN"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customer-email">Customer email</Label>
                  <Input
                    id="customer-email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="customer@example.com"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="send-email"
                    checked={sendEmail}
                    onCheckedChange={(checked) => setSendEmail(checked === true)}
                  />
                  <Label htmlFor="send-email">Send key by email</Label>
                </div>

                <Button onClick={handleGenerate} disabled={isLoading || !adminToken || !email}>
                  {isLoading ? "Generating..." : "Generate key"}
                </Button>

                {statusText ? <p className="text-sm text-green-600">{statusText}</p> : null}
                {errorText ? <p className="text-sm text-red-600">{errorText}</p> : null}

                {generatedKey ? (
                  <div className="space-y-2 rounded-md border border-border bg-muted/30 p-3">
                    <p className="text-sm">
                      <strong>Email:</strong> {normalizedEmail}
                    </p>
                    <p className="text-sm break-all">
                      <strong>License key:</strong> {generatedKey}
                    </p>
                  </div>
                ) : null}
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>
    </PageLayout>
  );
}
