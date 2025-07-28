'use client'

import { Container } from '@/components/container'
import { Map } from '@/components/map.client'
import { Sidebar } from '@/components/sidebar'

export function MapExplorerView() {
  return (
    <Container id="map" className="mt-16 sm:mt-32">
      <div className="relative flex overscroll-y-none">
        <Sidebar />
        <Map />
      </div>
    </Container>
  )
}
