"use client";

import { useState } from "react";
import { MessageSquare } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FeedbackForm } from "@/components/feedback-form";

/**
 * Props for the FeedbackButton component
 */
interface FeedbackButtonProps {
  defaultValues?: {
    email?: string;
    message?: string;
  };
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  showButton?: boolean;
}

/**
 * A floating feedback button component that appears on all pages and opens a feedback form modal
 * @param defaultValues - Optional default values to pre-fill the form
 * @param isOpen - Optional external control of modal open state
 * @param onOpenChange - Optional callback when modal open state changes
 * @param showButton - Whether to show the floating button (default: true)
 */
export function FeedbackButton({
  defaultValues,
  isOpen: externalIsOpen,
  onOpenChange: externalOnOpenChange,
  showButton = true,
}: FeedbackButtonProps = {}) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Use external control if provided, otherwise use internal state
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const setIsOpen = externalOnOpenChange || setInternalIsOpen;

  /**
   * Handles successful form submission
   */
  const handleSuccess = () => {
    setFormStatus("success");
    // Auto-close the dialog after 3 seconds when submission is successful
    setTimeout(() => {
      setIsOpen(false);
      // Reset form status after dialog closes
      setTimeout(() => setFormStatus("idle"), 300);
    }, 3000);
  };

  /**
   * Handles form submission error
   * @param error - Error message
   */
  const handleError = (error: string) => {
    setFormStatus("error");
    setErrorMessage(error);
  };

  /**
   * Resets the form status when dialog closes
   */
  const handleDialogChange = (open: boolean) => {
    setIsOpen(open);
    if (!open && formStatus !== "idle") {
      setTimeout(() => {
        setFormStatus("idle");
        setErrorMessage(null);
      }, 300);
    }
  };

  return (
    <>
      {showButton && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 w-12 h-12 rounded-full shadow-lg z-50 flex items-center justify-center p-0 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-all duration-200 hover:scale-105"
          aria-label="Provide feedback"
        >
          <MessageSquare className="h-5 w-5" />
        </Button>
      )}

      <Dialog open={isOpen} onOpenChange={handleDialogChange}>
        <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{formStatus === "success" ? "Thank You!" : "We Value Your Feedback"}</DialogTitle>
            <DialogDescription>
              {formStatus === "success"
                ? "Your feedback has been submitted successfully. We appreciate your input!"
                : "Help us improve by sharing your thoughts, suggestions, or reporting issues."}
            </DialogDescription>
          </DialogHeader>

          {formStatus === "error" && (
            <div className="bg-destructive/15 text-destructive rounded-md p-3 mb-4">
              <p className="text-sm font-medium">Failed to submit feedback: {errorMessage}</p>
            </div>
          )}

          {formStatus === "success" ? (
            <div className="flex items-center justify-center p-4">
              <div className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200 rounded-full p-3">
                <MessageSquare className="h-8 w-8" />
              </div>
            </div>
          ) : (
            <FeedbackForm onSuccess={handleSuccess} onError={handleError} defaultValues={defaultValues} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
