import { useTheme } from '~/context/theme-context'
import { useFetcher } from 'react-router'
import { SunIcon } from './icons/sun-icon'
import { MoonIcon } from './icons/moon-icon'

// ----------------------------------------------------------------------

export function ThemeToggle() {
  const fetcher = useFetcher()
  const { theme } = useTheme()
  const nextTheme = theme === 'dark' ? 'light' : 'dark'

  return (
    <fetcher.Form method="post">
      <button
        type="submit"
        name="theme"
        value={nextTheme}
        aria-label="Toggle theme"
        className="group rounded-full bg-white/90 px-3 py-2 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20"
      >
        <SunIcon className="h-6 w-6 fill-zinc-100 stroke-zinc-500 transition group-hover:fill-zinc-200 group-hover:stroke-zinc-700 dark:hidden [@media(prefers-color-scheme:dark)]:fill-teal-50 [@media(prefers-color-scheme:dark)]:stroke-teal-500 [@media(prefers-color-scheme:dark)]:group-hover:fill-teal-50 [@media(prefers-color-scheme:dark)]:group-hover:stroke-teal-600" />
        <MoonIcon className="hidden h-6 w-6 fill-zinc-700 stroke-zinc-500 transition not-[@media_(prefers-color-scheme:dark)]:fill-teal-400/10 not-[@media_(prefers-color-scheme:dark)]:stroke-teal-500 dark:block [@media(prefers-color-scheme:dark)]:group-hover:stroke-zinc-400" />
      </button>
    </fetcher.Form>
  )
}
