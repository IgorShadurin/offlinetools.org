"use client";

import { FeedbackButton } from "@/components/feedback-button";

/**
 * Provider component that adds the FeedbackButton to any page
 * @param children - Child components to render
 */
export function FeedbackProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <FeedbackButton />
    </>
  );
}
