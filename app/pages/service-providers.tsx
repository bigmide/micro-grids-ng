import { microgridServiceProviders } from '@/assets/grid-data'
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

export default function SolarProvidersView() {
  const [showForm, setShowForm] = useState(false)

  const [searchTerm, setSearchTerm] = useState('')

  // Filter solar suppliers
  const solarSuppliers = microgridServiceProviders
    .filter(
      (category) => category.category === 'Solar Suppliers & Distributors',
    )
    .flatMap((category) => category.data)

  // Filter by search term
  const filteredSuppliers = solarSuppliers.filter(
    (supplier) =>
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Container className="mt-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-sm:w-full sm:flex-1">
          <Heading>Solar Suppliers & Distributors in Nigeria</Heading>

          <Text>
            Find reliable solar equipment suppliers and distributors across
            Nigeria. Connect with providers for your solar projects and energy
            needs.
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
              <Select name="sort_by">
                <option value="name">Sort by name</option>
                <option value="date">Sort by date</option>
                <option value="status">Sort by status</option>
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
          <ServiceProviderApplicationForm onClose={() => setShowForm(false)} />
        </AnimatePresence>
      )}

      <ServiceProviderStatsBanner />

      <SolarProviderGrid filteredSuppliers={filteredSuppliers} />

      <HowToGetListed />
    </Container>
  )
}
