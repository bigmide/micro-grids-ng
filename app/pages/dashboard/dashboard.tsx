import { Container } from '~/components/container'

import { DashboardMicrogridSubmissionsPanel } from '~/features/dashboard/dashboard-microgrid-submissions-panel'
import { DashboardPagination } from '~/features/dashboard/dashboard-pagination'
import { useEffect, useMemo, useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { toast } from 'sonner'
import { clsx } from 'clsx'
import { Link } from '~/components/link'
import type { Route } from '../../routes/dashboard/+types/dashboard'

export function DashboardView({ loaderData }: Route.ComponentProps) {
  const [activeTab, setActiveTab] = useState(0)
  const { microgrids, error } = loaderData

  const tabs = useMemo(() => {
    return [
      {
        name: 'Microgrid Submissions',
        href: '/dashboard/microgrid-submissions',
        count: microgrids?.length,
        current: activeTab === 0,
      },
      {
        name: 'Rejected Microgrids',
        href: '/dashboard/rejected-microgrids',
        count: '4',
        current: activeTab === 1,
      },
      {
        name: 'Supplier Applications',
        href: '/dashboard/supplier-applications',
        count: '6',
        current: activeTab === 2,
      },
      {
        name: 'Rejected Suppliers',
        href: '/dashboard/rejected-suppliers',
        count: '4',
        current: activeTab === 3,
      },
    ]
  }, [activeTab, microgrids])

  useEffect(() => {
    if (error) toast.error(error)
  }, [error])

  return (
    <Container className="mt-16">
      <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
        <Tabs selectedIndex={activeTab} onSelect={(index) => setActiveTab(index)}>
          <TabList className="-mb-px flex space-x-8 border-b border-zinc-100 dark:border-b-white/10">
            {tabs.map((tab) => (
              <Tab
                key={tab.name}
                className={`flex border-b-2 px-1 py-4 text-sm font-medium whitespace-nowrap outline-none ${
                  tab.current
                    ? 'border-teal-600 text-teal-600 dark:border-teal-400 dark:text-teal-400'
                    : 'border-transparent text-zinc-500 hover:border-zinc-200 hover:text-zinc-700 dark:hover:border-white/20'
                }`}
              >
                <Link href={tab.href}>
                  {tab.name}
                  {tab.count ? (
                    <span
                      className={clsx(
                        tab.current
                          ? 'bg-teal-100 text-teal-600 dark:bg-teal-900 dark:text-teal-200'
                          : 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-300',
                        'ml-3 hidden rounded-full px-2.5 py-0.5 text-xs font-medium md:inline-block',
                      )}
                    >
                      {tab.count}
                    </span>
                  ) : null}
                </Link>
              </Tab>
            ))}
          </TabList>

          <TabPanel>
            <DashboardMicrogridSubmissionsPanel microgrids={microgrids || []} />
          </TabPanel>

          <TabPanel></TabPanel>
          <TabPanel></TabPanel>
          <TabPanel></TabPanel>

          <DashboardPagination />
        </Tabs>
      </div>
    </Container>
  )
}
