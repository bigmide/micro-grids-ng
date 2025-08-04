import { useLoaderData, useNavigate } from 'react-router'
import { useUrlPosition } from '@/hooks/useUrlPosition'
import type { LatLngExpression } from 'leaflet'
import { useEffect, useState } from 'react'
import L from 'leaflet'
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from 'react-leaflet'
import type {
  Microgrids,
  MicrogridServiceProviders,
} from '@/routes/map-explorer/map-explorer'

// ----------------------------------------------------------------------

export function Map() {
  const mapData: (Microgrids | MicrogridServiceProviders)[] = useLoaderData()

  const [mapPosition, setMapPosition] = useState<LatLngExpression>([
    9.082, 8.6753,
  ])

  const [mapLat, mapLng] = useUrlPosition()

  const redIcon = new L.Icon({
    iconUrl: '/images/markers/marker-red.png',
    iconSize: [25, 26],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  })

  const blackIcon = new L.Icon({
    iconUrl: '/images/markers/marker-black.png',
    iconSize: [25, 26],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  })

  const blueIcon = new L.Icon({
    iconUrl: '/images/markers/marker-blue.png',
    iconSize: [25, 26],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  })

  const greenIcon = new L.Icon({
    iconUrl: '/images/markers/marker-green.png',
    iconSize: [25, 26],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  })

  const orangeIcon = new L.Icon({
    iconUrl: '/images/markers/marker-orange.png',
    iconSize: [25, 26],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  })

  const purpleIcon = new L.Icon({
    iconUrl: '/images/markers/marker-purple.png',
    iconSize: [25, 26],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  })

  type MicrogridCategory =
    | 'Existing Microgrids'
    | 'Developing Microgrids'
    | 'Potential Microgrids'
    | 'Failed Microgrids'
    | 'Microgrid Developers'
    | 'Solar Suppliers & Distributors'

  const icon: Record<MicrogridCategory, L.Icon> = {
    'Existing Microgrids': greenIcon,
    'Developing Microgrids': blueIcon,
    'Potential Microgrids': orangeIcon,
    'Failed Microgrids': redIcon,
    'Microgrid Developers': blackIcon,
    'Solar Suppliers & Distributors': purpleIcon,
  }

  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([Number(mapLat), Number(mapLng)])
    },
    [mapLat, mapLng],
  )

  return (
    <div>
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className="h-150"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {mapData.map((data) => {
          const name =
            'microgrid_name' in data ? data.microgrid_name : data.company_name
          const description =
            'description' in data ? data.description : data.company_description

          return (
            <Marker
              position={[Number(data.position.lat), Number(data.position.lng)]}
              key={name}
              icon={icon[data.category as MicrogridCategory]}
            >
              <Popup>
                {name}
                <br /> {description}
              </Popup>
            </Marker>
          )
        })}

        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  )
}

// ----------------------------------------------------------------------

function ChangeCenter({ position }: { position: LatLngExpression }) {
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
