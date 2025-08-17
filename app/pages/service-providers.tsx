import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { Heading } from '@/components/heading'
import { MagnifyingGlassIcon } from '@/components/icons/magnifying-glass-icon'
import { PlusIcon } from '@/components/icons/plus-icon'
import { Input, InputGroup } from '@/components/input'
import { Select } from '@/components/select'
import { Text } from '@/components/text'
import { SolarProviderGrid } from '@/features/service-providers/components/service-provider-grid'
import { HowToGetListed } from '@/features/service-providers/components/how-to-get-listed'
import { ServiceProviderApplicationForm } from '@/features/service-providers/components/service-provider-application-form'
import { ServiceProviderStatsBanner } from '@/features/service-providers/components/service-provider-stats-banner'
import { useState } from 'react'
import { AnimatePresence } from 'motion/react'
import type { Route } from '../routes/+types/service-providers'
import type { ServiceProvider } from '@/types/service-providers'

export default function ServiceProvidersView({ actionData, loaderData }: Route.ComponentProps) {
  const { serviceProviders, count } = loaderData
  const [showForm, setShowForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('category')

  // Filter by search term
  const filteredServiceProviders = (serviceProviders as ServiceProvider[]).filter(
    (provider) =>
      provider.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      JSON.parse(provider.productsAndServices as unknown as string)
        .join(',')
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
  )

  const sortedServiceProviders = [...filteredServiceProviders].sort((a, b) => {
    if (sortBy === 'category') {
      return a.category.localeCompare(b.category)
    }
    if (sortBy === 'companyName') {
      return a.companyName.localeCompare(b.companyName)
    }
    if (sortBy === 'state') {
      return a.state.localeCompare(b.state)
    }
    return 0
  })

  return (
    <Container className="mt-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-sm:w-full sm:flex-1">
          <Heading>Solar Suppliers & Distributors in Nigeria</Heading>

          <Text>
            Find reliable solar equipment suppliers and distributors across Nigeria. Connect with providers for your
            solar projects and energy needs.
          </Text>

          <div className="mt-16 flex max-w-xl gap-4">
            <div className="flex-1">
              <InputGroup>
                <MagnifyingGlassIcon />
                <Input
                  type="text"
                  name="search"
                  placeholder="Search suppliers by name, location or services&hellip;"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </div>

            <div>
              <Select name="sort_by" onChange={(e) => setSortBy(e.target.value)}>
                <option value="category">Sort by category</option>
                <option value="companyName">Sort by name</option>
                <option value="state">Sort by state</option>
              </Select>
            </div>
          </div>
        </div>

        <Button onClick={() => setShowForm(!showForm)}>
          <PlusIcon />
          {showForm ? 'Hide Form' : 'Register as Supplier'}
        </Button>
      </div>

      {/* Registration Form */}
      {showForm && (
        <AnimatePresence>
          <ServiceProviderApplicationForm onClose={() => setShowForm(false)} actionData={actionData} />
        </AnimatePresence>
      )}

      <ServiceProviderStatsBanner />

      <SolarProviderGrid filteredServiceProviders={sortedServiceProviders} count={count} />

      <HowToGetListed />
    </Container>
  )
}
