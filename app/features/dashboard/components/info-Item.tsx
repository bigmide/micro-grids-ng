interface InfoItemProps {
  label: string
  value: string | number | undefined
}

export function InfoItem({ label, value }: InfoItemProps) {
  return (
    <div>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">{label}</p>
      <p className="font-medium text-zinc-800 dark:text-zinc-100">{value}</p>
    </div>
  )
}
