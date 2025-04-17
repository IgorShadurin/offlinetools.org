import * as React from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "../../lib/utils"

/**
 * Select component props
 */
export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {}

/**
 * Select component for dropdown selection
 * @param props - Select component props
 * @returns Select component
 */
const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <select
          className={cn(
            "h-9 w-full appearance-none truncate rounded-md border border-input bg-background flex items-center py-0 pl-3 pr-8 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-50" />
      </div>
    )
  }
)
Select.displayName = "Select"

/**
 * SelectOption component props
 */
export interface SelectOptionProps
  extends React.OptionHTMLAttributes<HTMLOptionElement> {}

/**
 * SelectOption component for options in a select
 * @param props - SelectOption component props
 * @returns SelectOption component
 */
const SelectOption = React.forwardRef<HTMLOptionElement, SelectOptionProps>(
  ({ className, ...props }, ref) => {
    return (
      <option
        className={cn("relative cursor-default select-none py-1.5", className)}
        ref={ref}
        {...props}
      />
    )
  }
)
SelectOption.displayName = "SelectOption"

export { Select, SelectOption } 