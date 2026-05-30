import { ReactNode } from 'react'

import { cn } from '@/lib/utils'

type Props = {
  children: ReactNode
  className?: string
}

export function Container({ children, className }: Props) {
  return (
    <div className={cn('mx-auto px-4 py-2 max-w-7xl', className)}>
      {children}
    </div>
  )
}
