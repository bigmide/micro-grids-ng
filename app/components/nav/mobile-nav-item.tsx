import type React from 'react'
import { Link } from 'react-router'
import { PopoverButton } from '@headlessui/react'

// ----------------------------------------------------------------------

export function MobileNavItem({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <li>
      <PopoverButton as={Link} to={href} className="block py-2">
        {children}
      </PopoverButton>
    </li>
  )
}
