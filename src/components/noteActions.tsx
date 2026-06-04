'use client'

import { CopyIcon, DownloadSimpleIcon } from '@phosphor-icons/react/ssr'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'

export function NoteActions({ content }: { content: string }) {
  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success('Copied to clipboard')
    } catch {
      toast.error('Failed to copy')
    }
  }

  const handleDownload = (text: string) => {
    const blob = new Blob([text], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'note.md'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex gap-2">
      <Button
        onClick={() => handleCopy(content)}
        variant="secondary"
        aria-label="copy"
        size="icon"
      >
        <CopyIcon />
      </Button>
      <Button
        onClick={() => handleDownload(content)}
        variant="secondary"
        aria-label="Download"
        size="icon"
      >
        <DownloadSimpleIcon />
      </Button>
    </div>
  )
}
