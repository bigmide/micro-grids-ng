import { useEffect, useState } from 'react'
import { Button } from '~/components/button'
import { Container } from '~/components/container'
import { Heading } from '~/components/heading'
import { Map } from '~/features/map/components/map.client'
import { Text } from '~/components/text'
import { Outlet } from 'react-router'
import { MapNavControl } from '~/features/map/components/map-nav-control'
import { MapDrawer } from '~/features/map/components/map-drawer'

// ----------------------------------------------------------------------

export function MapExplorerView() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [isClient])

  return (
    <Container id="map" className="mt-16">
      <Heading>Map explorer for microgrids in Nigeria</Heading>

      <Text>Interactive map of Nigeria with existing, developing, and potential microgrids.</Text>

      <Button href="/submit-microgrid" arrow="right" className="mt-4" variant="text">
        Submit a microgrid
      </Button>

      <header className="mt-10 flex items-center rounded-t-2xl px-4 ring-1 ring-zinc-100 dark:bg-zinc-800/60 dark:ring-zinc-300/20">
        <div className="py-2.5">
          <MapNavControl
            open={isSidebarVisible}
            onClick={() => {
              setIsSidebarVisible((isVisible) => !isVisible)
            }}
          />
        </div>
      </header>

      <div className="relative h-150 overflow-x-hidden rounded-b-2xl ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20">
        <MapDrawer open={isSidebarVisible}>
          <Outlet />
        </MapDrawer>
        {isClient && <Map />}
      </div>
    </Container>
  )
}
