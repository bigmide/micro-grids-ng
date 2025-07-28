/*global React */

'use client'

import { createContext, useContext, useEffect } from 'react'

// ----------------------------------------------------------------------

export type Theme = 'light' | 'dark'

type ThemeContextType = {
  theme: Theme
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider = ({
  specifiedTheme,
  children,
}: {
  specifiedTheme: Theme
  children: React.ReactNode
}) => {
  useEffect(() => {
    const isDark =
      specifiedTheme === 'dark' ||
      (!specifiedTheme &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)

    document.documentElement.classList.toggle('dark', isDark)
  }, [specifiedTheme])

  return (
    <ThemeContext.Provider value={{ theme: specifiedTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}
