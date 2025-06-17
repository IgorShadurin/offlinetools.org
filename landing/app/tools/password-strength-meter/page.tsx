import PasswordStrengthMeter from "./PasswordStrengthMeter";
import { StructuredData } from "@/components/structured-data";
import { generateMetadata } from "@/lib/metadata";

export const metadata = generateMetadata({
  title: "Password Strength Meter - Test Password Security",
  description:
    "Analyze password strength and get security recommendations based on OWASP industry standards. Check password security with real-time feedback.",
  openGraph: {
    title: "Password Strength Meter - Analyze Password Security",
    description:
      "Test your password strength with our secure, client-side password analyzer. Get real-time feedback and security recommendations.",
  },
  twitter: {
    title: "Password Strength Meter - Test Password Security",
    description: "Analyze password strength and get security recommendations based on OWASP industry standards.",
  },
});

export default function PasswordStrengthMeterPage() {
  return (
    <>
      <StructuredData
        type="tool"
        toolName="Password Strength Meter"
        toolDescription="Analyze password strength and get security recommendations based on OWASP industry standards. Check password security with real-time feedback and privacy protection."
        toolUrl="/tools/password-strength-meter"
        toolCategory="SecurityTool"
      />
      <PasswordStrengthMeter />
    </>
  );
}
