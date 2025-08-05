import { stats } from '@/assets/microgrids-form-data'

// ----------------------------------------------------------------------

export function ServiceProviderStatsBanner() {
  return (
    <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="flex flex-col bg-zinc-400/5 p-8 dark:bg-zinc-200/5"
        >
          <dt className="text-sm/6 font-semibold text-zinc-600 dark:text-zinc-500">
            {stat.name}
          </dt>
          <dd className="order-first text-3xl font-semibold tracking-tight dark:text-white">
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  )
}
