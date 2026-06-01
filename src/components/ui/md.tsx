import { marked } from 'marked'

export function Md({ content }: { content: string }) {
  // TODO sanitize content
  return (
    <div
      className=" prose-neutral prose-sm prose dark:prose-invert border border-input bg-input/20 rounded-sm p-2 min-w-full min-h-200"
      dangerouslySetInnerHTML={{ __html: marked.parse(content) }}
    />
  )
}
