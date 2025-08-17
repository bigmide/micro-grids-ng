import { useLoaderData, useNavigate } from 'react-router'
import { useUrlPosition } from '@/hooks/useUrlPosition'
import type { LatLngExpression } from 'leaflet'
import { useEffect, useState } from 'react'
import L from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet'
import type { Microgrid } from '@/types/microgrids'
import type { ServiceProvider } from '@/types/service-providers'

// ----------------------------------------------------------------------

export function Map() {
  const mapData: (Microgrid | ServiceProvider)[] = useLoaderData()

  const [mapPosition, setMapPosition] = useState<LatLngExpression>([9.082, 8.6753])

  const [mapLat, mapLng] = useUrlPosition()

  //

  function iconColor(category: string) {
    switch (category) {
      case 'Existing Microgrid':
        return 'green'
      case 'Developing Microgrid':
        return 'blue'
      case 'Potential Microgrid':
        return 'orange'
      case 'Failed Microgrid':
        return 'red'
      case 'Microgrid Developer':
        return 'black'
      case 'Solar Provider':
        return 'purple'
      default:
        return 'black'
    }
  }

  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([Number(mapLat), Number(mapLng)])
    },
    [mapLat, mapLng],
  )

  return (
    <div>
      <MapContainer center={mapPosition} zoom={6} scrollWheelZoom={true} className="h-150">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {mapData.map((data) => {
          console.log(data.category)
          const name = 'microgridName' in data ? data.microgridName : data.companyName
          const description = data.description

          return (
            <Marker
              position={[Number(data.position.lat), Number(data.position.lng)]}
              key={name}
              icon={
                new L.Icon({
                  iconUrl: `/images/markers/marker-${iconColor(data.category)}.png`,
                  iconSize: [25, 26],
                  iconAnchor: [12, 41],
                  popupAnchor: [1, -34],
                })
              }
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
    click: (event) => navigate(`form?lat=${event.latlng.lat}&lng=${event.latlng.lng}`),
  })
  return null
}
