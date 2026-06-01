'use client'

import hljs from 'highlight.js'
import { sanitize } from 'isomorphic-dompurify'
import { Marked } from 'marked'
import { markedHighlight } from 'marked-highlight'

import { cn } from '@/lib/utils'

type Props = {
  content: string
  className?: string
}

const marked = new Marked(
  markedHighlight({
    emptyLangClass: 'hljs',
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext'
      return hljs.highlight(code, { language }).value
    },
    async: false,
  }),
)

export function Md({ content, className }: Props) {
  const html = marked.parse(content) as string
  const clean = sanitize(html)

  return (
    <div
      className={cn(
        'prose-neutral prose-sm prose dark:prose-invert border border-input bg-input/20 rounded-sm p-2 min-w-full min-h-full',
        className,
      )}
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  )
}
