import { InfoItem } from './info-Item'

interface InfoCardProps {
  title: string
  items: { label: string; value: string | number | undefined }[]
}

export function InfoCard({ title, items }: InfoCardProps) {
  return (
    <div className="rounded-lg bg-zinc-50 p-5 dark:bg-zinc-800">
      <h2 className="mb-4 text-lg font-semibold text-zinc-800 dark:text-zinc-100">
        {title}
      </h2>
      <div className="space-y-3">
        {items.map((item, idx) => (
          <InfoItem key={idx} label={item.label} value={item.value} />
        ))}
      </div>
    </div>
  )
}
