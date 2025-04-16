"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { feedbackFormSchema, type FeedbackFormValues } from "@/lib/validations/feedback";

/**
 * Props for the FeedbackForm component
 */
interface FeedbackFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

/**
 * Feedback form component with email and message inputs
 * @param onSuccess - Optional callback when feedback is successfully submitted
 * @param onError - Optional callback when feedback submission fails
 */
export function FeedbackForm({ onSuccess, onError }: FeedbackFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackFormSchema),
    defaultValues: {
      email: "",
      message: "",
    },
  });

  /**
   * Handles form submission
   * @param values - Form values to submit
   */
  const onSubmit = async (values: FeedbackFormValues) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to submit feedback");
      }
      
      // Reset form on success
      form.reset();
      onSuccess?.();
    } catch (error) {
      console.error("Error submitting feedback:", error);
      onError?.(error instanceof Error ? error.message : "An unknown error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email (optional)</FormLabel>
              <FormControl>
                <Input 
                  placeholder="your@email.com" 
                  {...field} 
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Your feedback message (max 2000 characters)" 
                  className="min-h-32 resize-none" 
                  {...field} 
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
              <div className="text-xs text-muted-foreground text-right">
                {field.value.length}/2000
              </div>
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Send Feedback
            </>
          )}
        </Button>
      </form>
    </Form>
  );
} 