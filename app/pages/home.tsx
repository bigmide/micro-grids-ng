import { Container } from '~/components/container'
import { Stats } from '~/components/stats'
import { Hero } from '~/features/home/components/hero'
import { Newsletter } from '~/features/home/components/newsletter'
import { QuickLink } from '~/features/home/components/quick-link'
import type { Route } from '../routes/+types/home'

// ----------------------------------------------------------------------

export function HomeView({ loaderData }: Route.ComponentProps) {
  const { stats } = loaderData

  return (
    <>
      <Hero />
      <Container className="mt-16 sm:mt-20">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            <QuickLink
              key="track"
              href="/map-explorer"
              title="Track Microgrids"
              description="View microgrid locations across Nigeria using an interactive map, searchable by state, LGA, or zone."
            />
            <QuickLink
              key="submit"
              href="/submit-microgrid"
              title="Submit a Microgrids"
              description="Contribute information, new or existing"
            />
            <QuickLink
              key="suppliers"
              href="/solar-providers"
              title="Solar Suppliers & Distributors"
              description="Access a list of solar panel & batteries suppliers and distributors within Nigeria."
            />
          </div>

          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <Newsletter />

            <div className="flex justify-between gap-1">
              {stats.map((stat) => (
                <Stats key={stat.title} title={stat.title} value={stat.value || 0} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
