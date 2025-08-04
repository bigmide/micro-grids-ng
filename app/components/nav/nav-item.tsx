import type React from 'react'
import { clsx } from 'clsx'
import { NavLink } from 'react-router'

// ----------------------------------------------------------------------

export function NavItem({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <li>
      <NavLink
        to={href}
        className={({ isActive }) =>
          clsx(
            'relative block px-3 py-2 transition',
            isActive
              ? 'text-teal-500 dark:text-teal-400'
              : 'hover:text-teal-500 dark:hover:text-teal-400',
          )
        }
      >
        {({ isActive }) => (
          <>
            {children}
            {isActive && (
              <span className="absolute inset-x-1 -bottom-px h-px bg-linear-to-r from-teal-500/0 via-teal-500/40 to-teal-500/0 dark:from-teal-400/0 dark:via-teal-400/40 dark:to-teal-400/0" />
            )}
          </>
        )}
      </NavLink>
    </li>
  )
}
