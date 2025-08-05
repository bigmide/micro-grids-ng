import { Button } from '@/components/button'
import { Divider } from '@/components/divider'
import { Field, FieldGroup, Fieldset, Label } from '@/components/fieldset'
import { CrossIcon } from '@/components/icons/cross-icon'
import { Input } from '@/components/input'
import { Listbox, ListboxLabel, ListboxOption } from '@/components/listbox'
import { Textarea } from '@/components/textarea'
import { Form } from 'react-router'
import { motion } from 'motion/react'
import {
  serviceProviderBusinessClassification,
  serviceProviderConnectionMode,
  serviceProvidersCategories,
  serviceProvidersCoverageAreas,
  serviceProvidersProductsAndServices,
} from '@/assets/service-providers-form-data'
import { getLgaByState, nigerianStates } from '@/assets/nigeriaGeospatialData'
import { useState } from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'

// ----------------------------------------------------------------------

export function ServiceProviderApplicationForm({
  onClose,
}: {
  onClose: () => void
}) {
  const [state, setState] = useState('')
  const animatedComponents = makeAnimated()

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
          <h2 className="text-xl font-bold text-white">
            Supplier Application Form
          </h2>
          <button
            type="button"
            aria-label="close form"
            onClick={onClose}
            className="text-white hover:text-teal-200"
          >
            <CrossIcon className="size-6" />
          </button>
        </div>
      </div>

      <Form method="post" className="p-6">
        <Fieldset aria-label="Supplier registration form">
          <FieldGroup>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Field>
                <Label>Category</Label>
                <Listbox
                  name="category"
                  placeholder="Select category&hellip;"
                  // invalid={!!errors?.validation?.category}
                >
                  {serviceProvidersCategories.map((category) => (
                    <ListboxOption key={category} value={category}>
                      <ListboxLabel>{category}</ListboxLabel>
                    </ListboxOption>
                  ))}
                </Listbox>
                {/* {errors?.validation?.category && (
                  <ErrorMessage>{errors.validation.category}</ErrorMessage>
                )} */}
              </Field>

              <Field>
                <Label>Company Name</Label>
                <Input
                  type="text"
                  name="companyName"
                  placeholder="Your company name"
                />
              </Field>

              <Field>
                <Label>Contact Person</Label>
                <Input type="text" name="contactName" placeholder="Full name" />
              </Field>

              <Field>
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="contact@company.com"
                />
              </Field>

              <Field>
                <Label>Phone Number</Label>
                <Input
                  type="tel"
                  name="phone"
                  placeholder="+234 800 000 0000"
                />
              </Field>

              <Field>
                <Label>Address</Label>

                <Input
                  type="text"
                  name="address"
                  // invalid={!!errors?.validation?.geopoliticalZone}
                />
                {/* {errors?.validation?.geopoliticalZone && (
                    <ErrorMessage>
                      {errors.validation.geopoliticalZone}
                    </ErrorMessage>
                  )} */}
              </Field>

              <Field>
                <Label>State</Label>
                <Listbox
                  name="state"
                  placeholder="Select state&hellip;"
                  onChange={(value) => setState(value as string)}
                  // invalid={!!errors?.validation?.state}
                >
                  {nigerianStates.map((state) => (
                    <ListboxOption key={state} value={state}>
                      <ListboxLabel>{state}</ListboxLabel>
                    </ListboxOption>
                  ))}
                </Listbox>
                {/* {errors?.validation?.state && (
                  <ErrorMessage>{errors.validation.state}</ErrorMessage>
                )} */}
              </Field>

              <Field>
                <Label>LGA (Local Government Area)</Label>
                <Listbox
                  name="lga"
                  placeholder="Select LGA&hellip;"
                  disabled={!state}
                  // invalid={!!errors?.validation?.lga}
                >
                  {getLgaByState(state).map((lga) => (
                    <ListboxOption key={lga} value={lga}>
                      <ListboxLabel>{lga}</ListboxLabel>
                    </ListboxOption>
                  ))}
                </Listbox>
                {/* {errors?.validation?.lga && (
                  <ErrorMessage>{errors.validation.lga}</ErrorMessage>
                )} */}
              </Field>

              <Field>
                <Label>Connection mode</Label>
                <Listbox
                  name="connectionMode"
                  placeholder="Select connection mode&hellip;"
                  // invalid={!!errors?.validation?.lga}
                >
                  {serviceProviderConnectionMode.map((lga) => (
                    <ListboxOption key={lga} value={lga}>
                      <ListboxLabel>{lga}</ListboxLabel>
                    </ListboxOption>
                  ))}
                </Listbox>
                {/* {errors?.validation?.lga && (
                  <ErrorMessage>{errors.validation.lga}</ErrorMessage>
                )} */}
              </Field>

              <Field>
                <Label>Business classification</Label>
                <Listbox
                  name="businessClassification"
                  placeholder="Select business classification&hellip;"
                  // invalid={!!errors?.validation?.lga}
                >
                  {serviceProviderBusinessClassification.map((lga) => (
                    <ListboxOption key={lga} value={lga}>
                      <ListboxLabel>{lga}</ListboxLabel>
                    </ListboxOption>
                  ))}
                </Listbox>
                {/* {errors?.validation?.lga && (
                  <ErrorMessage>{errors.validation.lga}</ErrorMessage>
                )} */}
              </Field>

              <div className="grid grid-cols-2 gap-6">
                <Field>
                  <Input
                    aria-label="Latitude"
                    type="text"
                    name="lat"
                    placeholder="Latitude"
                    // invalid={!!errors?.validation?.position}
                  />
                  {/* {errors?.validation?.position && (
                    <ErrorMessage>
                      {errors.validation.position.at(0)}
                    </ErrorMessage>
                  )} */}
                </Field>

                <Field>
                  <Input
                    aria-label="Longitude"
                    type="text"
                    name="lng"
                    placeholder="Longitude"
                    // invalid={!!errors?.validation?.position}
                  />
                  {/* {errors?.validation?.position && (
                    <ErrorMessage>
                      {errors.validation.position.at(1)}
                    </ErrorMessage>
                  )} */}
                </Field>
              </div>

              <Field>
                <Label>Website</Label>
                <Input
                  type="url"
                  name="website"
                  placeholder="https://www.example.com"
                />
              </Field>

              <Field className="md:col-span-2">
                <Label>Company Description</Label>
                <Textarea
                  name="description"
                  rows={3}
                  maxLength={160}
                  placeholder="Describe your company, services, and expertise (max 160 characters)"
                />
              </Field>

              <Field className="md:col-span-2">
                <Label>Products & Services Offered </Label>
                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  name="colors"
                  options={serviceProvidersProductsAndServices}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              </Field>

              <Field className="md:col-span-2">
                <Label>Coverage Area (States)</Label>
                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  name="colors"
                  options={serviceProvidersCoverageAreas}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              </Field>

              <Field>
                <Label>Years of Experience</Label>
                <Input name="commencementYear" type="text" />
              </Field>

              <Field>
                <Label>Certifications</Label>
                <Input
                  type="text"
                  name="certifications"
                  placeholder="e.g., NABCEP, ISO, etc."
                />
              </Field>

              <div>
                <button
                  type="button"
                  className="rounded-md px-3 py-2 text-sm font-semibold shadow-xs hover:bg-white/20"
                >
                  Change avatar
                </button>
                <p className="mt-2 text-xs/5 text-zinc-400">
                  JPG, GIF or PNG. 1MB max.
                </p>
              </div>

              <Field>
                <Label>Other Information</Label>
                <Textarea
                  name="notes"
                  rows={3}
                  placeholder="Any other information not covered, you would like us to know about"
                  // invalid={!!errors?.validation?.notes}
                />
                {/* {errors?.validation?.notes && (
                          <ErrorMessage>{errors?.validation?.notes}</ErrorMessage>
                        )} */}
              </Field>
            </div>
          </FieldGroup>
        </Fieldset>

        <Divider className="my-10" soft />

        <div className="flex items-center justify-end gap-4">
          <Button type="reset" variant="secondary">
            Cancel
          </Button>
          <Button type="submit">Submit Registration</Button>
        </div>
      </Form>
    </motion.div>
  )
}
