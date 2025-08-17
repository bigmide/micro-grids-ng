import * as Headless from '@headlessui/react'
import type React from 'react'
import { Link as RouterLink, type LinkProps } from 'react-router'

// ----------------------------------------------------------------------

export function Link(
  props: {
    ref?: React.RefObject<HTMLAnchorElement>
    href: string | LinkProps['to']
  } & Omit<LinkProps, 'to'>,
) {
  return (
    <Headless.DataInteractive>
      <RouterLink {...props} to={props.href} ref={props.ref} />
    </Headless.DataInteractive>
  )
}
