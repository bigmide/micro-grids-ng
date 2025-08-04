import type React from 'react'
import { useNavigate } from 'react-router'

export const MapBackLink = ({
  children,
  className,
}: React.ComponentPropsWithRef<'button'>) => {
  const navigate = useNavigate()
  return (
    <button type="button" onClick={() => navigate(-1)} className={className}>
      {children}
    </button>
  )
}
