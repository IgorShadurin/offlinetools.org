import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Container } from "@/components/ui/container";
import { PageLayout } from "@/components/page-layout";
import { StructuredData } from "@/components/structured-data";

export const metadata = {
  title: "Frequently Asked Questions | Offline Tools",
  description: "Find answers to common questions about Offline Tools platform and services.",
};

// FAQ data that will be used both for the UI and structured data
const faqData = [
  {
    question: "What are Offline Tools?",
    answer:
      "Offline Tools is a platform that provides a suite of utilities designed to work entirely offline, respecting your privacy and ensuring that your data never leaves your device.",
  },
  {
    question: "Are Offline Tools really 100% offline?",
    answer:
      "While our web-based tools run in your browser, they require an internet connection to access initially. For true offline functionality, we recommend downloading our desktop application, which allows you to use all our tools without any internet connection at all. The desktop version ensures complete offline usage and data privacy.",
  },
  {
    question: "Is Offline Tools free to use?",
    answer:
      "We offer a range of both free and premium tools. Our basic utilities are free for everyone to use, while some advanced features may require a subscription. Please check our pricing page for more details.",
  },
  {
    question: "How do I suggest a new tool?",
    answer:
      "We welcome suggestions for new tools! Please visit our contact page and share your ideas with us. We regularly evaluate user suggestions for our development roadmap.",
  },
  {
    question: "Can I use Offline Tools for commercial purposes?",
    answer:
      "Yes, you can use our tools for both personal and commercial purposes. Please refer to our Terms of Service for detailed usage policies.",
  },
  {
    question: "How do I report a bug?",
    answer:
      "If you encounter any issues while using our tools, please visit our contact page to report the bug. Please include as much detail as possible to help us reproduce and fix the issue quickly.",
  },
];

export default function FAQPage() {
  return (
    <PageLayout>
      {/* Add structured data for FAQs */}
      <StructuredData type="faq" faqs={faqData} />

      <Container className="py-12 md:py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Frequently Asked Questions</h1>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Find answers to the most common questions about Offline Tools
          </p>
        </div>

        <div className="mx-auto max-w-3xl mt-10 md:mt-16">
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index + 1}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Container>
    </PageLayout>
  );
}
