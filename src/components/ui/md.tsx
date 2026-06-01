import hljs from 'highlight.js'
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
  }),
)

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
