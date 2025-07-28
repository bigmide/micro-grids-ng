import { stats } from '@/assets/form-data'
import {
  microgridServiceProviders,
  type MicrogridServiceProvidersInfo,
} from '@/assets/grid-data'
import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { Divider } from '@/components/divider'
import { Heading } from '@/components/heading'
import { Input, InputGroup } from '@/components/input'
import { Select } from '@/components/select'
import { Text } from '@/components/text'
import { useState } from 'react'

export default function SolarProvidersView() {
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
        <Button>Register as Supplier</Button>
      </div>

      <StatisticsBanner />

      <SuppliersGrid filteredSuppliers={filteredSuppliers} />

      <div className="mt-16 rounded-xl border border-gray-200 bg-gray-50 p-6 md:p-8">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          How to Get Listed
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="p-5 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-100">
              <span className="text-2xl font-bold text-teal-800">1</span>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-800">
              Submit Your Details
            </h3>
            <p className="text-gray-600">
              Fill out our registration form with your company information and
              services.
            </p>
          </div>

          <div className="p-5 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-100">
              <span className="text-2xl font-bold text-teal-800">2</span>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-800">
              Verification Process
            </h3>
            <p className="text-gray-600">
              Our team will review your application to ensure quality standards.
            </p>
          </div>

          <div className="p-5 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-100">
              <span className="text-2xl font-bold text-teal-800">3</span>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-800">
              Get Listed
            </h3>
            <p className="text-gray-600">
              Once approved, your company will be visible to thousands of
              customers.
            </p>
          </div>
        </div>
      </div>
    </Container>
  )
}

function MagnifyingGlassIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
      data-slot="icon"
    >
      <path
        fillRule="evenodd"
        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
        clipRule="evenodd"
      ></path>
    </svg>
  )
}

function StatisticsBanner() {
  return (
    <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="flex flex-col bg-gray-400/5 p-8 dark:bg-gray-200/5"
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

function SuppliersGrid({
  filteredSuppliers,
}: {
  filteredSuppliers: MicrogridServiceProvidersInfo[]
}) {
  return (
    <div className="mt-16">
      <h2 className="mb-6 text-2xl font-bold text-zinc-800 dark:text-white">
        Verified Solar Suppliers
        {filteredSuppliers.length > 0 && `(${filteredSuppliers.length})`}
      </h2>

      {filteredSuppliers.length === 0 ? (
        <div className="py-12 text-center">
          <svg
            className="mx-auto h-16 w-16 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-4 text-xl font-medium text-gray-900">
            No suppliers found
          </h3>
          <p className="mx-auto mt-2 max-w-md text-gray-600">
            We couldn&apos;t find any suppliers matching your search. Try
            different keywords or register as a new supplier.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredSuppliers.map((supplier, index) => (
            <SupplierCard key={index} supplier={supplier} />
          ))}
        </div>
      )}
    </div>
  )
}

function SupplierCard({ supplier }: { supplier: any }) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md transition-shadow hover:shadow-lg">
      <div className="p-6">
        <div className="flex items-start">
          <div className="h-16 w-16 rounded-xl border-2 border-dashed bg-gray-200" />
          <div className="ml-4">
            <h3 className="text-xl font-bold text-gray-800">{supplier.name}</h3>
            <div className="mt-1 flex items-center text-gray-600">
              <svg
                className="mr-1 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>{supplier.location}</span>
            </div>
          </div>
        </div>

        <p className="mt-4 text-gray-600">{supplier.description}</p>

        <div className="mt-5">
          <h4 className="mb-2 font-medium text-gray-800">
            Products & Services
          </h4>
          <div className="flex flex-wrap gap-2">
            {['Solar Panels', 'Batteries', 'Inverters', 'Installation'].map(
              (service, idx) => (
                <span
                  key={idx}
                  className="rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700"
                >
                  {service}
                </span>
              ),
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button className="min-w-[120px] flex-1 rounded-lg border border-teal-600 bg-white px-4 py-2 font-medium text-teal-600 transition-colors hover:bg-teal-50">
            View Details
          </button>
          <button className="min-w-[120px] flex-1 rounded-lg bg-teal-600 px-4 py-2 font-medium text-white transition-colors hover:bg-teal-700">
            Contact
          </button>
        </div>
      </div>
    </div>
  )
}
