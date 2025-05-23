import { Container } from "@/components/ui/container";
import { ToolArticle, ToolArticlesList } from "@/components/tool-articles-list";
import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accessibility, UserCheck, Eye, MousePointer2, Keyboard, Globe2 } from "lucide-react";

/**
 * Metadata for the Base64 Codec Accessibility and Inclusivity page
 */
export const metadata: Metadata = {
  title: "Base64 Codec Accessibility and Inclusivity | Offline Tools",
  description: "Making Base64 tools accessible to users of all abilities through inclusive design",
};

/**
 * Articles related to Base64 Codec accessibility and inclusivity
 */
const base64CodecArticles: ToolArticle[] = [
  {
    title: "Designing Accessible Base64 Encoding Interfaces",
    description: "Principles for creating Base64 tools that are usable by people with various disabilities.",
    slug: "designing-accessible-base64-encoding-interfaces",
  },
  {
    title: "Screen Reader Compatibility in Base64 Tools",
    description: "Ensuring Base64 encoding interfaces work seamlessly with screen readers and assistive technologies.",
    slug: "screen-reader-compatibility-in-base64-tools",
  },
  {
    title: "Keyboard Navigation for Base64 Encoding Tools",
    description: "Implementing complete keyboard accessibility in Base64 encoding interfaces.",
    slug: "keyboard-navigation-for-base64-encoding-tools",
  },
  {
    title: "Color Contrast Standards in Base64 Tool Design",
    description: "Applying WCAG color contrast guidelines to make Base64 tools visually accessible.",
    slug: "color-contrast-standards-in-base64-tool-design",
  },
  {
    title: "Accessible Error Messages in Base64 Encoders",
    description: "Creating error notifications that are perceivable and understandable by all users.",
    slug: "accessible-error-messages-in-base64-encoders",
  },
  {
    title: "Font Selection for Readable Base64 Output",
    description: "Choosing fonts that optimize readability of Base64 encoded text for all users.",
    slug: "font-selection-for-readable-base64-output",
  },
  {
    title: "Internationalization of Base64 Encoding Tools",
    description: "Making Base64 tools accessible to users from different language backgrounds.",
    slug: "internationalization-of-base64-encoding-tools",
  },
  {
    title: "Cognitive Accessibility in Base64 Tool Design",
    description: "Creating Base64 interfaces that are understandable for users with cognitive disabilities.",
    slug: "cognitive-accessibility-in-base64-tool-design",
  },
  {
    title: "Mobile Accessibility for Base64 Encoding Applications",
    description: "Ensuring Base64 tools are usable on mobile devices by people with various abilities.",
    slug: "mobile-accessibility-for-base64-encoding-applications",
  },
  {
    title: "Voice Control Compatibility for Base64 Tools",
    description: "Designing Base64 encoding interfaces that work effectively with voice control systems.",
    slug: "voice-control-compatibility-for-base64-tools",
  },
  {
    title: "Accessibility Testing for Base64 Encoding Interfaces",
    description: "Methodologies for evaluating the accessibility of Base64 tools for all users.",
    slug: "accessibility-testing-for-base64-encoding-interfaces",
  },
  {
    title: "Creating Inclusive Documentation for Base64 Tools",
    description: "Writing help content and tutorials that are accessible to users with different abilities.",
    slug: "creating-inclusive-documentation-for-base64-tools",
  },
  {
    title: "Accommodating Low Vision Users in Base64 Interfaces",
    description: "Design considerations for users with partial vision when using Base64 encoding tools.",
    slug: "accommodating-low-vision-users-in-base64-interfaces",
  },
  {
    title: "Motor Disability Considerations in Base64 Tool Design",
    description: "Creating Base64 interfaces that are usable by people with limited motor control.",
    slug: "motor-disability-considerations-in-base64-tool-design",
  },
  {
    title: "Implementing ARIA Attributes in Base64 Encoding Tools",
    description: "Using ARIA roles and attributes to enhance the accessibility of Base64 interfaces.",
    slug: "implementing-aria-attributes-in-base64-encoding-tools",
  },
  {
    title: "Cultural Inclusivity in Base64 Tool Design",
    description: "Creating Base64 interfaces that respect and accommodate diverse cultural backgrounds.",
    slug: "cultural-inclusivity-in-base64-tool-design",
  },
  {
    title: "Accessibility Conformance Testing for Base64 Tools",
    description: "Formal methods for evaluating Base64 tools against accessibility standards and guidelines.",
    slug: "accessibility-conformance-testing-for-base64-tools",
  },
  {
    title: "Alternative Input Methods for Base64 Encoding",
    description: "Supporting diverse input methods beyond keyboard and mouse for Base64 operations.",
    slug: "alternative-input-methods-for-base64-encoding",
  },
  {
    title: "Age-Inclusive Design for Base64 Tools",
    description: "Creating Base64 interfaces that work well for users across all age groups.",
    slug: "age-inclusive-design-for-base64-tools",
  },
  {
    title: "Accessibility Features Comparing Leading Base64 Tools",
    description: "Evaluating and comparing the accessibility features of popular Base64 encoding tools.",
    slug: "accessibility-features-comparing-leading-base64-tools",
  },
];

/**
 * Base64 Codec Accessibility and Inclusivity page component
 */
export default function Base64CodecAccessibilityPage() {
  return (
    <Container className="py-10">
      <div className="mb-10">
        <div className="mb-4 flex items-center">
          <div className="flex-1">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/" className="hover:text-foreground">
                    Home
                  </Link>
                </li>
                <li>
                  <span>/</span>
                </li>
                <li>
                  <Link href="/tools" className="hover:text-foreground">
                    Tools
                  </Link>
                </li>
                <li>
                  <span>/</span>
                </li>
                <li>
                  <Link href="/tools/base64-codec" className="hover:text-foreground">
                    Base64 Codec
                  </Link>
                </li>
                <li>
                  <span>/</span>
                </li>
                <li aria-current="page">Accessibility and Inclusivity</li>
              </ol>
            </nav>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">Base64 Codec Accessibility and Inclusivity</h1>
          </div>
        </div>

        <Card className="mb-8 overflow-hidden border-2">
          <CardHeader className="bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-950/30 dark:to-emerald-950/30 pb-2">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Accessibility className="text-teal-600" size={24} />
              Inclusive Base64 Tools
            </CardTitle>
            <CardDescription>Designing Base64 encoding tools that are accessible to all users regardless of ability</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="mt-1 text-teal-600 dark:text-teal-400 shrink-0">
                    <UserCheck size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Universal Design</h3>
                    <p className="text-sm text-muted-foreground">
                      Creating Base64 tools with inclusive interfaces that accommodate users with varying abilities and preferences.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1 text-teal-600 dark:text-teal-400 shrink-0">
                    <Eye size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Visual Accessibility</h3>
                    <p className="text-sm text-muted-foreground">
                      Optimizing color contrast, typography, and layout to ensure Base64 tools are usable by people with vision impairments.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="mt-1 text-emerald-600 dark:text-emerald-400 shrink-0">
                    <MousePointer2 size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Input Accessibility</h3>
                    <p className="text-sm text-muted-foreground">
                      Supporting alternative input methods and accommodating users with motor limitations when using Base64 tools.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1 text-emerald-600 dark:text-emerald-400 shrink-0">
                    <Keyboard size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Assistive Technology Support</h3>
                    <p className="text-sm text-muted-foreground">
                      Ensuring Base64 encoding interfaces work seamlessly with screen readers, keyboard navigation, and other assistive tools.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-md bg-muted p-4 text-sm">
              <div className="flex items-center gap-2 font-medium">
                <Globe2 size={16} className="text-teal-600" />
                <span>Accessibility Insight:</span>
              </div>
              <p className="mt-1 text-muted-foreground">
                One of the most significant accessibility challenges in Base64 tools involves displaying encoded output, which appears as seemingly random strings. For screen reader users, this content can be confusing without proper labels and context. Effective Base64 tools include descriptive ARIA labels, announce the encoding status, and provide clear feedback when operations complete. Additionally, they offer multiple copy methods (button, keyboard shortcut) to accommodate diverse interaction preferences.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <ToolArticlesList toolName="Base64 Codec" toolSlug="base64-codec" articles={base64CodecArticles} />
    </Container>
  );
} 