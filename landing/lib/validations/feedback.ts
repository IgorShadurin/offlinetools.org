import { z } from "zod";

/**
 * Schema for feedback form validation
 */
export const feedbackFormSchema = z.object({
  email: z.string().email("Please enter a valid email address").or(z.literal("")).optional(),
  message: z
    .string()
    .min(3, "Message must be at least 3 characters")
    .max(2000, "Message cannot exceed 2000 characters"),
});

export type FeedbackFormValues = z.infer<typeof feedbackFormSchema>;
