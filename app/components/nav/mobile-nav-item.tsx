import type React from 'react'
import { PopoverButton } from '@headlessui/react'
import { Link } from '../link'

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
      <PopoverButton as={Link} href={href} className="block py-2">
        {children}
      </PopoverButton>
    </li>
  )
}
