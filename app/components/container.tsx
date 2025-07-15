/*global React*/

import { clsx } from 'clsx'

// ----------------------------------------------------------------------

export function ContainerOuter({
  ref,
  className,
  children,
  ...props
}: React.ComponentPropsWithRef<'div'>) {
  return (
    <div ref={ref} className={clsx('sm:px-8', className)} {...props}>
      <div className="mx-auto w-full max-w-7xl lg:px-8">{children}</div>
    </div>
  )
}

// ----------------------------------------------------------------------

export function ContainerInner({
  ref,
  className,
  children,
  ...props
}: React.ComponentPropsWithRef<'div'>) {
  return (
    <div
      ref={ref}
      className={clsx('relative px-4 sm:px-8 lg:px-12', className)}
      {...props}
    >
      <div className="mx-auto max-w-2xl lg:max-w-5xl">{children}</div>
    </div>
  )
}

// ----------------------------------------------------------------------

export function Container({
  ref,
  children,
  ...props
}: React.ComponentPropsWithRef<typeof ContainerOuter>) {
  return (
    <ContainerOuter ref={ref} {...props}>
      <ContainerInner>{children}</ContainerInner>
    </ContainerOuter>
  )
}
