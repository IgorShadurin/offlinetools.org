import React from "react";
import { cn } from "../../lib/utils";
import { AlertTriangleIcon, InfoIcon, XCircleIcon } from "lucide-react";

/**
 * Alert component props
 */
interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "destructive" | "warning";
}

/**
 * Alert description component props
 */
interface AlertDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

/**
 * Alert title component props
 */
interface AlertTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

/**
 * Alert component
 * @param props - Alert component props
 * @returns Alert component
 */
export function Alert({
  children,
  className,
  variant = "default",
  ...props
}: AlertProps) {
  const icon = {
    default: <InfoIcon className="h-4 w-4" />,
    destructive: <XCircleIcon className="h-4 w-4" />,
    warning: <AlertTriangleIcon className="h-4 w-4" />,
  }[variant];

  return (
    <div
      className={cn(
        "relative w-full rounded-lg border p-4 text-sm [&>svg~*]:pl-7 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4",
        {
          "bg-muted/50 text-foreground border-border": variant === "default",
          "border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400 [&>svg]:text-red-600 dark:[&>svg]:text-red-400":
            variant === "destructive",
          "border-yellow-500/30 bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 [&>svg]:text-yellow-700 dark:[&>svg]:text-yellow-400":
            variant === "warning",
        },
        className
      )}
      {...props}
    >
      {icon}
      {children}
    </div>
  );
}

/**
 * Alert description component
 * @param props - Alert description component props
 * @returns Alert description component
 */
export function AlertDescription({
  className,
  ...props
}: AlertDescriptionProps) {
  return (
    <div
      className={cn("text-sm [&_p]:leading-relaxed", className)}
      {...props}
    />
  );
}

/**
 * Alert title component
 * @param props - Alert title component props
 * @returns Alert title component
 */
export const AlertTitle = React.forwardRef<HTMLParagraphElement, AlertTitleProps>(
  ({ className, ...props }, ref) => (
    <h5
      ref={ref}
      className={cn("mb-1 font-medium leading-none tracking-tight", className)}
      {...props}
    />
  )
);

AlertTitle.displayName = "AlertTitle";
