'use client'

import { CopyIcon, DownloadSimpleIcon } from '@phosphor-icons/react/ssr'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'

export function NoteButtons({ content }: { content: string }) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content)
      toast.success('Copied to clipboard')
    } catch {
      toast.error('Failed to copy')
    }
  }

  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/markdown' })
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
        onClick={handleCopy}
        variant="secondary"
        aria-label="copy"
        size="icon"
      >
        <CopyIcon />
      </Button>
      <Button
        onClick={handleDownload}
        variant="secondary"
        aria-label="Download"
        size="icon"
      >
        <DownloadSimpleIcon />
      </Button>
    </div>
  )
}
