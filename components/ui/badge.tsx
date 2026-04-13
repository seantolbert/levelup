import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center px-2.5 py-0.5 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-gold-500/20 text-gold-400 border border-gold-500/30',
        secondary: 'bg-obsidian-700 text-ash-300 border border-white/10',
        destructive: 'bg-red-900/40 text-red-400 border border-red-500/30',
        outline: 'border border-white/20 text-ash-300',
        success: 'bg-emerald-900/40 text-emerald-400 border border-emerald-500/30',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
