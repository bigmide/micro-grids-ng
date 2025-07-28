'use client'

/*global React*/

import { createContext, useEffect, useRef } from 'react'
import { ThemeProvider, useTheme, type Theme } from './theme-context'
import { useFetcher, useLocation } from 'react-router'

// ----------------------------------------------------------------------

function usePrevious<T>(value: T) {
  let ref = useRef<T>()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

// ----------------------------------------------------------------------

function ThemeWatcher() {
  let { theme } = useTheme()
  const fetcher = useFetcher()

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')

    function onMediaChange() {
      let systemTheme = media.matches ? 'dark' : 'light'
      fetcher.submit({ theme: systemTheme }, { method: 'post', action: '/' })
    }

    media.addEventListener('change', onMediaChange)

    return () => {
      media.removeEventListener('change', onMediaChange)
    }
  }, [fetcher, theme])

  return null
}

// ----------------------------------------------------------------------

export const AppContext = createContext<{ previousPathname?: string }>({})

export function Providers({
  theme,
  children,
}: {
  theme: Theme
  children: React.ReactNode
}) {
  let pathname = useLocation().pathname
  let previousPathname = usePrevious(pathname)

  return (
    <AppContext.Provider value={{ previousPathname }}>
      <ThemeProvider specifiedTheme={theme}>
        <ThemeWatcher />
        {children}
      </ThemeProvider>
    </AppContext.Provider>
  )
}
