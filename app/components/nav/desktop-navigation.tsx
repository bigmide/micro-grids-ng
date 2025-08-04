import type React from 'react'
import { NavItem } from './nav-item'

// ----------------------------------------------------------------------

export function DesktopNavigation(
  props: React.ComponentPropsWithoutRef<'nav'>,
) {
  return (
    <nav {...props}>
      <ul className="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
        <NavItem href="map-explorer">Map explorer</NavItem>
        <NavItem href="submit-microgrid">Submit microgrid</NavItem>
        <NavItem href="solar-providers">Solar Suppliers</NavItem>
        <NavItem href="about">About</NavItem>
      </ul>
    </nav>
  )
}
