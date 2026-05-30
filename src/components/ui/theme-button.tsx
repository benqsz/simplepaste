'use client'

import { MoonIcon, SunIcon } from '@phosphor-icons/react/ssr'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'

export function ThemeButton() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? <MoonIcon /> : <SunIcon />}
    </Button>
  )
}
