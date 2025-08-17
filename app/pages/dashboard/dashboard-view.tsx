import { Container } from '@/components/container'
import { ArrowLeftIcon } from '@/components/icons/arrow-left-icon'
import { AppContext } from '@/context/providers'
import { InfoCard } from '@/features/dashboard/components/info-card'
import { LocationCard } from '@/features/dashboard/components/location-card'
import { useContext } from 'react'
import { useNavigate } from 'react-router'

export function DashboardViewView() {
  const navigate = useNavigate()
  const { previousPathname } = useContext(AppContext)

  return (
    <Container className="mt-16">
      <div className="xl:relative">
        <div className="mx-auto max-w-4xl">
          {previousPathname && (
            <button
              type="button"
              onClick={() => navigate(-1)}
              aria-label="Go back to articles"
              className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md ring-1 shadow-zinc-800/5 ring-zinc-900/5 transition lg:absolute lg:-left-5 lg:-mt-2 lg:mb-0 xl:-top-1.5 xl:left-0 xl:mt-0 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20"
            >
              <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400" />
            </button>
          )}

          <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              <InfoCard
                title="Basic Information"
                items={[
                  { label: 'Type', value: 'submission.type' },
                  { label: 'Operator', value: 'submission.operator' },
                  { label: 'State', value: 'submission.state' },
                  { label: 'LGA', value: 'submission.LGA' },
                  {
                    label: 'Geopolitical Zone',
                    value: 'submission.geopoliticalZone',
                  },
                ]}
              />
              <InfoCard
                title="Technical Specifications"
                items={[
                  { label: 'Capacity', value: 'submission.capacity' },
                  { label: 'Size', value: 'submission.size' },
                  { label: 'Power Sources', value: 'submission.powerSources' },
                  {
                    label: 'Commissioning Date',
                    value: 'submission.commissioningDates',
                  },
                ]}
              />
            </div>

            <LocationCard
              lat={'submission.position.lat'}
              lng={'submission.position.lng'}
            />

            <InfoCard
              title="Submission Details"
              items={[
                { label: 'Source', value: 'submission.source' },
                {
                  label: 'Submitted At',
                  value: new Date('submission.submittedAt').toLocaleString(),
                },
              ]}
            />
          </div>
        </div>
      </div>
    </Container>
  )
}
