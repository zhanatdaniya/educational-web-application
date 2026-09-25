'use client'

import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface CtaButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'gold' | 'outline' | 'ghost'
  size?: 'md' | 'lg'
}

// Ойынға арналған кинематографиялық түйме.
export function CtaButton({
  children,
  variant = 'gold',
  size = 'lg',
  className,
  ...props
}: CtaButtonProps) {
  return (
    <button
      className={cn(
        'group relative inline-flex items-center justify-center gap-2 rounded-xl font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-40 active:translate-y-px',
        size === 'lg' ? 'px-7 py-3.5 text-base' : 'px-5 py-2.5 text-sm',
        variant === 'gold' &&
          'bg-gradient-to-b from-[oklch(0.86_0.14_84)] to-[oklch(0.74_0.13_74)] text-[oklch(0.2_0.04_265)] shadow-[0_8px_30px_-6px_oklch(0.82_0.14_82_/_0.6)] hover:brightness-110 hover:shadow-[0_10px_40px_-6px_oklch(0.82_0.14_82_/_0.8)]',
        variant === 'outline' &&
          'border border-gold/40 bg-gold/5 text-gold hover:bg-gold/15',
        variant === 'ghost' &&
          'text-muted-foreground hover:bg-white/5 hover:text-foreground',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
