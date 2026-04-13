import * as React from 'react'
import { cn } from '@/lib/utils'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[100px] w-full rounded-none border border-white/10 bg-obsidian-800/60 px-4 py-3 text-sm text-ash-100 placeholder:text-ash-600 focus-visible:outline-none focus-visible:border-gold-500/60 focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 transition-colors resize-none',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea }
