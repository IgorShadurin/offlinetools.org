import { z } from "zod";

export const emailSchema = z.string().trim().toLowerCase().email("Please enter a valid email address");

export const createCheckoutSessionSchema = z.object({
  email: emailSchema,
});

export const completeCheckoutSchema = z.object({
  sessionId: z.string().trim().min(1),
});

export const adminGenerateLicenseSchema = z.object({
  email: emailSchema,
  sendEmail: z.boolean().optional().default(false),
});
