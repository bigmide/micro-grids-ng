import { InfoItem } from './info-Item'

interface LocationCardProps {
  lat: number
  lng: number
}

export function LocationCard({ lat, lng }: LocationCardProps) {
  return (
    <div className="mb-8 rounded-lg bg-zinc-50 p-5 dark:bg-zinc-800">
      <h2 className="mb-4 text-lg font-semibold text-zinc-800 dark:text-zinc-100">
        Location Information
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <InfoItem label="Coordinates" value={`Lat: ${lat}, Lng: ${lng}`} />
        <div className="flex h-48 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-700">
          <p className="text-zinc-500 dark:text-zinc-400">
            Map visualization would appear here
          </p>
        </div>
      </div>
    </div>
  )
}
