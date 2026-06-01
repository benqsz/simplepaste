import { marked } from 'marked'

import { cn } from '@/lib/utils'

type Props = {
  content: string
  className?: string
}

export function Md({ content, className }: Props) {
  return (
    <div
      className={cn(
        'prose-neutral prose-sm prose dark:prose-invert border border-input bg-input/20 rounded-sm p-2 min-w-full min-h-full',
        className,
      )}
      // TODO sanitize content
      dangerouslySetInnerHTML={{ __html: marked.parse(content) }}
    />
  )
}
