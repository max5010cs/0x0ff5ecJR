'use client'

import { useEffect, useState } from 'react'
import DarkModeToggle from './DarkModeToggle'

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'dark' | 'light'>('light')

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    const isValidTheme = (val: string | null): val is 'dark' | 'light' =>
      val === 'dark' || val === 'light'

    const defaultTheme: 'dark' | 'light' = isValidTheme(stored)
      ? stored
      : prefersDark
        ? 'dark'
        : 'light'

    setTheme(defaultTheme)
    document.body.classList.toggle('dark', defaultTheme === 'dark')
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.body.classList.toggle('dark', newTheme === 'dark')
  }

  return (
    <>
      <DarkModeToggle theme={theme} toggleTheme={toggleTheme} />
      {children}
    </>
  )
}
