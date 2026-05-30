import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from 'radix-ui'
import { ReactNode } from 'react'

import { cn } from '@/lib/utils'

const typographyVariants = cva('', {
  variants: {
    variant: {
      h1: 'scroll-m-20 text-3xl sm:text-4xl font-extrabold tracking-tight text-balance',
      h2: 'scroll-m-20 pb-2 text-2xl sm:text-3xl font-semibold tracking-tight first:mt-0',
      h3: 'scroll-m-20 text-xl sm:text-2xl font-semibold tracking-tight',
      h4: 'scroll-m-20 text-lg sm:text-xl font-semibold tracking-tight',
      p: 'leading-7 [&:not(:first-child)]:mt-6',
      lead: 'text-lg font-semibold">',
      small: 'text-sm leading-none font-medium',
      muted: 'text-sm text-muted-foreground',
    },
  },
  defaultVariants: {
    variant: 'p',
  },
})

type Props = {
  children: ReactNode
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div'
  asChild?: boolean
  className?: string
} & VariantProps<typeof typographyVariants>

export function Typography({
  children,
  as = 'p',
  variant,
  asChild,
  className,
}: Props) {
  const Comp = asChild ? Slot.Root : as
  const resolvedVariant = variant ?? (as === 'span' || as === 'div' ? 'p' : as)

  return (
    <Comp
      className={cn(
        typographyVariants({
          variant: resolvedVariant,
          className,
        }),
      )}
    >
      {children}
    </Comp>
  )
}
