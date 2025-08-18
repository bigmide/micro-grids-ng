import { useState } from 'react'
import { Badge } from '~/components/badge'
import { Button } from '~/components/button'
import { Heading } from '~/components/heading'
import { Text } from '~/components/text'
import type { ServiceProvider } from '~/types/service-providers'
import { Dialog, DialogActions, DialogBody, DialogDescription, DialogTitle } from '~/components/dialog'

// ----------------------------------------------------------------------

export function ServiceProviderCard({ provider }: { provider: ServiceProvider }) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isContactOpen, setIsContactOpen] = useState(false)
  return (
    <>
      <div className="overflow-hidden rounded-xl border border-zinc-100 shadow-md transition-shadow hover:shadow-lg dark:border-zinc-700/40">
        <div className="p-6">
          <div className="flex items-start">
            <div className="h-16 w-16 rounded-xl border-2 border-dashed bg-zinc-200 dark:border-teal-500 dark:bg-zinc-700" />
            <div className="ml-4">
              <Heading level={3} className="text-xl font-bold">
                {provider.companyName}
              </Heading>
              <div className="mt-1 flex items-center text-zinc-600 dark:text-zinc-400">
                <svg className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                <span>{provider.state}</span>
              </div>
            </div>
          </div>

          <Text className="mt-4">{provider.description}</Text>

          <div className="mt-5">
            <Heading level={4} className="mb-2 text-base font-medium">
              Products & Services
            </Heading>
            <div className="flex flex-wrap gap-2">
              {JSON.parse(provider.productsAndServices as unknown as string).map((service: string, index: number) => (
                <Badge color="teal" key={index}>
                  {service}
                </Badge>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              variant="secondary"
              className="min-w-[120px] flex-1 px-4 py-2 font-medium"
              onClick={() => setIsDetailsOpen(true)}
            >
              View Details
            </Button>
            <Button className="min-w-[120px] flex-1 px-4 py-2 font-medium" onClick={() => setIsContactOpen(true)}>
              Contact
            </Button>
          </div>
        </div>
      </div>

      {/* View Details Modal */}
      <Dialog open={isDetailsOpen} onClose={setIsDetailsOpen}>
        <DialogTitle>{provider.companyName}</DialogTitle>
        <DialogDescription>{provider.description}</DialogDescription>
        <DialogBody>
          <div className="mb-2">
            <span className="font-medium">Address:</span> {provider.address}
          </div>
          <div className="mb-2">
            <span className="font-medium">State:</span> {provider.state}
          </div>
          <div className="mb-2">
            <span className="font-medium">City:</span> {provider.city}
          </div>
          <div className="mb-2">
            <span className="font-medium">Email:</span> {provider.email}
          </div>
          <div className="mb-2">
            <span className="font-medium">Phone:</span> {provider.phone}
          </div>
          <div className="mb-2">
            <span className="font-medium">Website:</span> {provider.website}
          </div>
          <div className="mb-2">
            <span className="font-medium">Commencement Year:</span> {provider.commencementYear}
          </div>
          <div className="mb-2">
            <span className="font-medium">Business Classification:</span> {provider.businessClassification}
          </div>
          <div className="mb-2">
            <span className="font-medium">Certification:</span> {provider.certification}
          </div>
        </DialogBody>
        <DialogActions>
          <Button variant="secondary" onClick={() => setIsDetailsOpen(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Contact Modal */}
      <Dialog open={isContactOpen} onClose={setIsContactOpen}>
        <DialogTitle>Contact Information</DialogTitle>
        <DialogBody>
          <div className="mb-2">
            <span className="font-medium">Contact Name:</span> {provider.contactName}
          </div>
          <div className="mb-2">
            <span className="font-medium">Email:</span> {provider.email}
          </div>
          <div className="mb-2">
            <span className="font-medium">Phone:</span> {provider.phone}
          </div>
          <div className="mb-2">
            <span className="font-medium">Website:</span> {provider.website}
          </div>
          <div className="mb-2">
            <span className="font-medium">Address:</span> {provider.address}
          </div>
        </DialogBody>
        <DialogActions>
          <Button variant="secondary" onClick={() => setIsContactOpen(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
