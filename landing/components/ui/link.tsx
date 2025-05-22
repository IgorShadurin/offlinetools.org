import * as React from "react"
import { cn } from "@/lib/utils"
import NextLink from "next/link"

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  external?: boolean
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, href, external, ...props }, ref) => {
    const isExternal = external || href.startsWith("http")

    if (isExternal) {
      return (
        <a
          ref={ref}
          href={href}
          className={cn("text-primary underline-offset-4 hover:underline", className)}
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        />
      )
    }

    return (
      <NextLink
        href={href}
        ref={ref}
        className={cn("text-primary underline-offset-4 hover:underline", className)}
        {...props}
      />
    )
  }
)
Link.displayName = "Link"

export { Link }
