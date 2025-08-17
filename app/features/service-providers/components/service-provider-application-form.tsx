import { Button } from '@/components/button'
import { Divider } from '@/components/divider'
import { Description, ErrorMessage, Field, FieldGroup, Fieldset, Label } from '@/components/fieldset'
import { CrossIcon } from '@/components/icons/cross-icon'
import { Input } from '@/components/input'
import { Listbox, ListboxLabel, ListboxOption } from '@/components/listbox'
import { Textarea } from '@/components/textarea'
import { Form, useNavigation } from 'react-router'
import { motion } from 'motion/react'
import {
  serviceProviderBusinessClassification,
  serviceProviderConnectionMode,
  serviceProvidersCategories,
  serviceProvidersCoverageAreas,
  serviceProvidersProductsAndServices,
} from '@/assets/service-providers-form-data'
import { getLgaByState, nigerianStates } from '@/assets/nigeriaGeospatialData'
import React, { useEffect, useRef, useState } from 'react'
import { InputWithAddOn } from '@/components/input-with-add-on'
import { ReactSelectMultiSelect } from '@/components/react-select-multi-select'
import type { ServiceProvider, ServiceProviderValidationErrors } from '@/types/service-providers'
import { toast } from 'sonner'
import { ServiceProviderSchema } from '@/lib/validation/service-provider-schema'
import * as z from 'zod'

// ----------------------------------------------------------------------

export function ServiceProviderApplicationForm({
  onClose,
  actionData,
}: {
  actionData:
    | {
        ok: boolean
        errors: null
      }
    | {
        ok: boolean
        errors: {
          validation: ServiceProviderValidationErrors | null
          other: string | null
        }
      }
    | undefined
  onClose: () => void
}) {
  const { state: navigationState, formData } = useNavigation()
  const isSubmitting = navigationState === 'submitting'

  const formRef = useRef<HTMLFormElement>(null)
  const [errors, setErrors] = useState<ServiceProviderValidationErrors | null>(null)
  const submitSuccess = actionData?.ok

  const [state, setState] = useState('')
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [formValues, setFormValues] = useState({
    address: '',
    businessClassification: '',
    category: '',
    certification: '',
    city: '',
    commencementYear: '',
    companyName: '',
    connectionMode: '',
    contactName: '',
    coverageAreas: [''],
    description: '',
    email: '',
    lga: '',
    logo: '',
    notes: '',
    phone: '',
    position: {
      lat: '',
      lng: '',
    },
    productsAndServices: [''],
    slug: '',
    state: '',
    status: 'pending',
    website: '',
  })

  const positionError = errors?.validation?.position
  const latError =
    positionError?.length === 2
      ? positionError.at(0)
      : positionError?.at(0)?.toLowerCase().includes('lat')
        ? positionError.at(0)
        : ''
  const lngError =
    positionError?.length === 2
      ? positionError.at(1)
      : positionError?.at(0)?.toLowerCase().includes('lng')
        ? positionError.at(0)
        : ''

  function handlePhoneNumberInput(e: React.FormEvent<HTMLInputElement>) {
    let newValue = e.currentTarget.value.replace(/\D/g, '') // digits only

    if (newValue.length > 10) {
      newValue = newValue.slice(0, 10) // limit to 10 digits
    }
    e.currentTarget.value = newValue // directly update the input
  }

  function handleChange<T extends keyof ServiceProvider>(name: T, value: ServiceProvider[T]) {
    if (!hasSubmitted || !errors?.validation) return

    setFormValues((prevValues) => {
      const updatedValues = { ...prevValues, [name]: value }

      const result = ServiceProviderSchema.safeParse(updatedValues)

      if (!result.success) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          validation: z.flattenError(result.error).fieldErrors,
          other: prevErrors?.other || null,
        }))
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          validation: null,
          other: null,
        }))
      }

      return updatedValues
    })
  }

  useEffect(() => {
    if (actionData?.errors) setErrors(actionData.errors as ServiceProviderValidationErrors)
  }, [actionData?.errors])

  useEffect(() => {
    if (errors?.other) {
      toast.error(errors.other, { position: 'top-center' })
    }
    if (errors) setHasSubmitted(true)
  }, [errors])

  useEffect(() => {
    if (!submitSuccess) return

    if (formRef.current) formRef.current.reset()

    setHasSubmitted(false)
    toast.success('Application successfully! Thank you for your contribution, we will be in touch.', {
      position: 'top-center',
    })
  }, [submitSuccess])

  useEffect(() => {
    if (formData)
      setFormValues({
        address: formData.get('address') as string,
        businessClassification: (formData.get('businessClassification') as string) || '',
        category: (formData.get('category') as string) || '',
        certification: (formData.get('certification') as string) || '',
        city: formData.get('city') as string,
        commencementYear: (formData.get('commencementYear') as string) || '',
        companyName: formData.get('companyName') as string,
        connectionMode: (formData.get('connectionMode') as string) || '',
        contactName: formData.get('contactName') as string,
        coverageAreas: formData.get('coverageAreas')?.toString().split(',') || [],
        description: formData.get('description') as string,
        email: formData.get('email') as string,
        lga: (formData.get('lga') as string) || '',
        logo: (formData.get('logo') as string) || '',
        notes: formData.get('notes') as string,
        phone: (formData.get('phone') as string) || '',
        position: {
          lat: formData.get('lat') as string,
          lng: formData.get('lng') as string,
        },
        productsAndServices: formData.get('productsAndServices')?.toString().split(',') || [],
        slug: formData.get('companyName')?.toString().toLowerCase().split(' ').join('-') || '',
        state: (formData.get('state') as string) || '',
        status: 'pending',
        website: formData.get('website') ? `https://${formData.get('website')}` : '',
      })
  }, [formData])

  return (
    <motion.div
      key="providerForm"
      initial={{ height: 0 }}
      animate={{ height: 'auto' }}
      exit={{ height: 0 }}
      transition={{ duration: 0.6 }}
      className="mt-16 overflow-hidden rounded-2xl border border-zinc-100 dark:border-zinc-700/40"
    >
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Supplier Application Form</h2>
          <button type="button" aria-label="close form" onClick={onClose} className="text-white hover:text-teal-200">
            <CrossIcon className="size-6" />
          </button>
        </div>
      </div>

      <Form method="post" className="p-6" encType="multipart/form-data">
        <Fieldset aria-label="Supplier registration form" disabled={isSubmitting}>
          <FieldGroup>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Field>
                <Label>Category</Label>
                <Listbox
                  name="category"
                  placeholder="Select category&hellip;"
                  invalid={!!errors?.validation?.category}
                  onChange={(value) => handleChange('category', value as string)}
                >
                  {serviceProvidersCategories.map((category) => (
                    <ListboxOption key={category} value={category}>
                      <ListboxLabel>{category}</ListboxLabel>
                    </ListboxOption>
                  ))}
                </Listbox>
                {errors?.validation?.category && <ErrorMessage>{errors.validation.category}</ErrorMessage>}
              </Field>

              <Field>
                <Label>Company Name</Label>
                <Input
                  type="text"
                  name="companyName"
                  placeholder="Your company name"
                  invalid={!!errors?.validation?.companyName}
                  onChange={(event) => handleChange('companyName', event.target.value)}
                />
                {errors?.validation?.companyName && <ErrorMessage>{errors.validation.companyName}</ErrorMessage>}
              </Field>

              <Field>
                <Label>Contact Person</Label>
                <Input
                  type="text"
                  name="contactName"
                  placeholder="Full name"
                  invalid={!!errors?.validation?.contactName}
                  onChange={(event) => handleChange('contactName', event.target.value)}
                />
                {errors?.validation?.contactName && <ErrorMessage>{errors.validation.contactName}</ErrorMessage>}
              </Field>

              <Field>
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="contact@company.com"
                  invalid={!!errors?.validation?.email}
                  onChange={(event) => handleChange('email', event.target.value)}
                />
                {errors?.validation?.email && <ErrorMessage>{errors.validation.email}</ErrorMessage>}
              </Field>

              <Field>
                <Label>Phone Number</Label>
                <InputWithAddOn
                  type="tel"
                  name="phone"
                  placeholder="800 000 0000"
                  preText="+234"
                  invalid={!!errors?.validation?.phone}
                  onChange={(event) => {
                    handlePhoneNumberInput(event)
                    handleChange('phone', event.target.value)
                  }}
                />
                {errors?.validation?.phone && <ErrorMessage>{errors.validation.phone}</ErrorMessage>}
              </Field>

              <Field>
                <Label>Address</Label>
                <Input
                  type="text"
                  name="address"
                  placeholder="No 1, street ..."
                  invalid={!!errors?.validation?.address}
                  onChange={(event) => handleChange('address', event.target.value)}
                />
                {errors?.validation?.address && <ErrorMessage>{errors.validation.address}</ErrorMessage>}
              </Field>

              <Field>
                <Label>City/area/town</Label>
                <Input
                  type="text"
                  name="city"
                  placeholder="e.g. Makurdi"
                  invalid={!!errors?.validation?.city}
                  onChange={(event) => handleChange('city', event.target.value)}
                />
                {errors?.validation?.city && <ErrorMessage>{errors.validation.city}</ErrorMessage>}
              </Field>

              <Field>
                <Label>State</Label>
                <Listbox
                  name="state"
                  placeholder="Select state&hellip;"
                  invalid={!!errors?.validation?.state}
                  onChange={(value) => {
                    setState(value as string)
                    handleChange('state', value as string)
                  }}
                >
                  {nigerianStates.map((state) => (
                    <ListboxOption key={state} value={state}>
                      <ListboxLabel>{state}</ListboxLabel>
                    </ListboxOption>
                  ))}
                </Listbox>
                {errors?.validation?.state && <ErrorMessage>{errors.validation.state}</ErrorMessage>}
              </Field>

              <Field>
                <Label>LGA (Local Government Area)</Label>
                <Listbox
                  name="lga"
                  placeholder="Select LGA&hellip;"
                  disabled={!state}
                  invalid={!!errors?.validation?.lga}
                  onChange={(value) => handleChange('lga', value as string)}
                >
                  {getLgaByState(state).map((lga) => (
                    <ListboxOption key={lga} value={lga}>
                      <ListboxLabel>{lga}</ListboxLabel>
                    </ListboxOption>
                  ))}
                </Listbox>
                {errors?.validation?.lga && <ErrorMessage>{errors.validation.lga}</ErrorMessage>}
              </Field>

              <Field>
                <Label>Connection mode</Label>
                <Listbox
                  name="connectionMode"
                  placeholder="Select connection mode&hellip;"
                  invalid={!!errors?.validation?.connectionMode}
                  onChange={(value) => handleChange('connectionMode', value as string)}
                >
                  {serviceProviderConnectionMode.map((connectionMode) => (
                    <ListboxOption key={connectionMode} value={connectionMode}>
                      <ListboxLabel>{connectionMode}</ListboxLabel>
                    </ListboxOption>
                  ))}
                </Listbox>
                {errors?.validation?.connectionMode && <ErrorMessage>{errors.validation.connectionMode}</ErrorMessage>}
              </Field>

              <Field>
                <Label>Business classification</Label>
                <Listbox
                  name="businessClassification"
                  placeholder="Select business classification&hellip;"
                  invalid={!!errors?.validation?.businessClassification}
                  onChange={(value) => handleChange('businessClassification', value as string)}
                >
                  {serviceProviderBusinessClassification.map((businessClassification) => (
                    <ListboxOption key={businessClassification} value={businessClassification}>
                      <ListboxLabel>{businessClassification}</ListboxLabel>
                    </ListboxOption>
                  ))}
                </Listbox>
                {errors?.validation?.businessClassification && (
                  <ErrorMessage>{errors.validation.businessClassification}</ErrorMessage>
                )}
              </Field>

              <div className="grid grid-cols-2 gap-6">
                <Field>
                  <Label>Latitude</Label>
                  <Input
                    aria-label="Latitude"
                    type="text"
                    name="lat"
                    placeholder="Latitude"
                    invalid={!!errors?.validation?.position}
                    onChange={(event) =>
                      handleChange('position', {
                        ...formValues.position,
                        lat: event.target.value,
                      })
                    }
                  />
                  {latError && <ErrorMessage>{latError}</ErrorMessage>}{' '}
                </Field>

                <Field>
                  <Label>Longitude</Label>
                  <Input
                    aria-label="Longitude"
                    type="text"
                    name="lng"
                    placeholder="Longitude"
                    invalid={!!errors?.validation?.position}
                    onChange={(event) =>
                      handleChange('position', {
                        ...formValues.position,
                        lng: event.target.value,
                      })
                    }
                  />
                  {lngError && <ErrorMessage>{lngError}</ErrorMessage>}{' '}
                </Field>
              </div>

              <Field>
                <Label>Website</Label>
                <InputWithAddOn
                  type="text"
                  name="website"
                  placeholder="www.example.com"
                  preText="https://"
                  invalid={!!errors?.validation?.website}
                  onChange={(event) =>
                    handleChange(
                      'website',
                      event.target.value.includes('https://') ? event.target.value : `https://${event.target.value}`,
                    )
                  }
                />
                {errors?.validation?.website && <ErrorMessage>{errors.validation.website}</ErrorMessage>}
              </Field>

              <Field className="md:col-span-2">
                <Label>Company Description</Label>
                <Textarea
                  name="description"
                  rows={3}
                  maxLength={160}
                  placeholder="Describe your company, services, and expertise (max 160 characters)"
                  invalid={!!errors?.validation?.description}
                  onChange={(event) => handleChange('description', event.target.value)}
                />
                {errors?.validation?.description && <ErrorMessage>{errors.validation.description}</ErrorMessage>}
              </Field>

              <Field className="md:col-span-2">
                <Label>Products & Services Offered </Label>
                <ReactSelectMultiSelect
                  name="productsAndServices"
                  options={serviceProvidersProductsAndServices}
                  placeholder="Select business classification&hellip;"
                  invalid={!!errors?.validation?.productsAndServices}
                  disabled={isSubmitting}
                  onChange={(values) => {
                    handleChange(
                      'productsAndServices',
                      values.map((value) => (value as { value: string }).value),
                    )
                  }}
                />
                {errors?.validation?.productsAndServices && (
                  <ErrorMessage>{errors.validation.productsAndServices}</ErrorMessage>
                )}
              </Field>

              <Field className="md:col-span-2">
                <Label>Coverage Area (States)</Label>
                <ReactSelectMultiSelect
                  name="coverageAreas"
                  options={serviceProvidersCoverageAreas}
                  placeholder="Select business classification&hellip;"
                  invalid={!!errors?.validation?.coverageAreas}
                  disabled={isSubmitting}
                  onChange={(values) =>
                    handleChange(
                      'coverageAreas',
                      values.map((value) => (value as { value: string }).value),
                    )
                  }
                />
                {errors?.validation?.coverageAreas && <ErrorMessage>{errors.validation.coverageAreas}</ErrorMessage>}
              </Field>

              <Field>
                <Field>
                  <Label>Commencement year</Label>
                  <Listbox
                    name="commencementYear"
                    placeholder="Select year&hellip;"
                    invalid={!!errors?.validation?.commencementYear}
                    onChange={(value) => handleChange('commencementYear', value as string)}
                  >
                    {Array.from({ length: 150 }, (_, i) => String(new Date().getFullYear() - i)).map((date) => (
                      <ListboxOption key={date} value={date}>
                        <ListboxLabel>{date}</ListboxLabel>
                      </ListboxOption>
                    ))}
                  </Listbox>
                  {errors?.validation?.commencementYear && (
                    <ErrorMessage>{errors?.validation?.commencementYear}</ErrorMessage>
                  )}
                </Field>
              </Field>

              <Field>
                <Label>Certification</Label>
                <Input
                  type="text"
                  name="certifications"
                  placeholder="e.g., NABCEP, ISO, etc."
                  invalid={!!errors?.validation?.certification}
                  onChange={(event) => handleChange('certification', event.target.value)}
                />
                {errors?.validation?.certification && <ErrorMessage>{errors?.validation?.certification}</ErrorMessage>}
              </Field>

              <Field>
                <Label>Upload Logo</Label>
                <Input
                  type="file"
                  name="logo"
                  accept="image/png, image/jpeg, image/gif"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      if (file.size > 1 * 1024 * 1024) {
                        alert('File size exceeds 1MB. Please upload a smaller file.')
                        e.target.value = '' // Clear the input
                      } else {
                        console.log('File selected:', file)
                      }
                    }
                  }}
                />
                <Description>JPG, GIF or PNG. 1MB max.</Description>
              </Field>

              <Field>
                <Label>Other Information</Label>
                <Textarea
                  name="notes"
                  rows={3}
                  placeholder="Any other information not covered, you would like us to know about"
                  invalid={!!errors?.validation?.notes}
                  onChange={(event) => handleChange('notes', event.target.value)}
                />
                {errors?.validation?.notes && <ErrorMessage>{errors?.validation?.notes}</ErrorMessage>}
              </Field>
            </div>
          </FieldGroup>
        </Fieldset>

        <Divider className="my-10" soft />

        <div className="flex items-center justify-end gap-4">
          <Button type="reset" variant="secondary" disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg
                  className="mr-2 -ml-1 h-4 w-4 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Submitting...
              </span>
            ) : (
              'Submit Registration'
            )}
          </Button>
        </div>
      </Form>
    </motion.div>
  )
}
