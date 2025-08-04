export function MapDetailItem({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="mb-3 last:mb-0">
      <dt className="text-sm font-semibold text-zinc-500">{label}</dt>
      <dd className="mt-1">{value}</dd>
    </div>
  )
}
