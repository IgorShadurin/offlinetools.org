import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Container } from "@/components/ui/container";
import { PageLayout } from "@/components/page-layout";

export const metadata = {
  title: "Frequently Asked Questions | Offline Tools",
  description: "Find answers to common questions about Offline Tools platform and services.",
};

export default function FAQPage() {
  return (
    <PageLayout>
      <Container className="py-12 md:py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Frequently Asked Questions</h1>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Find answers to the most common questions about Offline Tools
          </p>
        </div>
        
        <div className="mx-auto max-w-3xl mt-10 md:mt-16">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What are Offline Tools?</AccordionTrigger>
              <AccordionContent>
                Offline Tools is a platform that provides a suite of utilities designed to work entirely offline, 
                respecting your privacy and ensuring that your data never leaves your device.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger>Are Offline Tools really 100% offline?</AccordionTrigger>
              <AccordionContent>
                Yes, all our tools are designed to run completely in your browser without sending any data to external servers.
                Once loaded, you can even disconnect from the internet and continue to use our tools.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger>Is Offline Tools free to use?</AccordionTrigger>
              <AccordionContent>
                We offer a range of both free and premium tools. Our basic utilities are free for everyone to use,
                while some advanced features may require a subscription. Please check our pricing page for more details.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger>How do I suggest a new tool?</AccordionTrigger>
              <AccordionContent>
                We welcome suggestions for new tools! Please visit our contact page and share your ideas with us.
                We regularly evaluate user suggestions for our development roadmap.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5">
              <AccordionTrigger>Can I use Offline Tools for commercial purposes?</AccordionTrigger>
              <AccordionContent>
                Yes, you can use our tools for both personal and commercial purposes. 
                Please refer to our Terms of Service for detailed usage policies.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-6">
              <AccordionTrigger>How do I report a bug?</AccordionTrigger>
              <AccordionContent>
                If you encounter any issues while using our tools, please visit our contact page to report the bug.
                Please include as much detail as possible to help us reproduce and fix the issue quickly.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Container>
    </PageLayout>
  );
} 