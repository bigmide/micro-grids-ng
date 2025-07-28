'use client'

import { microgridData } from '@/assets/grid-data'
import { useGeolocation } from '@/hooks/useGeolocation'
import { useUrlPosition } from '@/hooks/useUrlPosition'
import { useEffect, useState } from 'react'
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from 'react-leaflet'
import { useNavigate } from 'react-router'

// ----------------------------------------------------------------------

export function Map() {
  const [mapPosition, setMapPosition] = useState([9.082, 8.6753])
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation()
  const [mapLat, mapLng] = useUrlPosition()

  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng])
    },
    [mapLat, mapLng],
  )

  useEffect(
    function () {
      if (geolocationPosition)
        setMapPosition([geolocationPosition.lat, geolocationPosition.lng])
    },
    [geolocationPosition],
  )

  return (
    <div className="relative h-full flex-1">
      {!geolocationPosition && (
        <button type="button" onClick={getPosition}>
          {isLoadingPosition ? 'Loading...' : 'Use your position'}
        </button>
      )}

      <MapContainer
        center={mapPosition}
        zoom={10}
        scrollWheelZoom={true}
        className="h-150"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {microgridData.map((category) =>
          category.data.map((microGrid) => (
            <Marker
              position={[microGrid.position.lat, microGrid.position.lng]}
              key={microGrid.microgridName}
            >
              <Popup>
                {microGrid.microgridName}
                <br /> {microGrid.description}
              </Popup>
            </Marker>
          )),
        )}

        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  )
}

//////

function ChangeCenter({ position }) {
  const map = useMap()
  map.setView(position)
  return null
}

function DetectClick() {
  const navigate = useNavigate()

  useMapEvents({
    click: (event) =>
      navigate(`form?lat=${event.latlng.lat}&lng=${event.latlng.lng}`),
  })
  return null
}

const grids = [
  {
    id: 1,
    position: { lat: 51.505, lng: -0.09 },
    gridName: 'Test Grid',
  },
  {
    id: 2,
    position: { lat: 9.082, lng: 8.6753 },
    gridName: 'Test2 Grid',
  },
]
