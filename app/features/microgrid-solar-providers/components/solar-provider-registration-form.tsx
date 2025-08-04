import { Button } from '@/components/button'
import { Checkbox, CheckboxField, CheckboxGroup } from '@/components/checkbox'
import { Divider } from '@/components/divider'
import { Field, FieldGroup, Fieldset, Label } from '@/components/fieldset'
import { CrossIcon } from '@/components/icons/cross-icon'
import { Input } from '@/components/input'
import { Listbox, ListboxOption } from '@/components/listbox'
import { Textarea } from '@/components/textarea'
import { Form } from 'react-router'

// ----------------------------------------------------------------------

export function SolarProviderRegistrationForm({
  onClose,
}: {
  onClose: () => void
}) {
  return (
    <div className="mt-16 overflow-hidden rounded-2xl border border-zinc-100 dark:border-zinc-700/40">
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">
            Supplier Registration Form
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
        <Fieldset aria-label="supplier registration form">
          <FieldGroup>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                <Label>Location (State/City)</Label>
                <Input
                  type="text"
                  name="location"
                  placeholder="e.g., Lagos, Abuja, Kano"
                />
              </Field>

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
                  placeholder="Describe your company, services, and expertise"
                />
              </Field>

              <Field className="md:col-span-2">
                <Label>Products & Services Offered </Label>
                <Textarea
                  name="products"
                  rows={3}
                  placeholder="List the solar products and services you offer"
                />
              </Field>

              <Field className="md:col-span-2">
                <Label>Coverage Area (States)</Label>
                <CheckboxGroup className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                  {[
                    'Lagos',
                    'Abuja',
                    'Kano',
                    'Rivers',
                    'Oyo',
                    'Delta',
                    'Enugu',
                    'Others',
                  ].map((state) => (
                    <CheckboxField key={state} className="flex items-center">
                      <Checkbox
                        id={`state-${state}`}
                        value={state}
                        color="teal"
                      />
                      <Label
                        htmlFor={`state-${state}`}
                        className="ml-2 text-sm"
                      >
                        {state}
                      </Label>
                    </CheckboxField>
                  ))}
                </CheckboxGroup>
              </Field>

              <Field>
                <Label>Years of Experience</Label>
                <Listbox name="yearsExperience">
                  <ListboxOption value="">Select years</ListboxOption>
                  <ListboxOption value="1-2">1-2 years</ListboxOption>
                  <ListboxOption value="3-5">3-5 years</ListboxOption>
                  <ListboxOption value="6-10">6-10 years</ListboxOption>
                  <ListboxOption value="10+">10+ years</ListboxOption>
                </Listbox>
              </Field>

              <Field>
                <Label>Certifications</Label>
                <Input
                  type="text"
                  name="certifications"
                  placeholder="e.g., NABCEP, ISO, etc."
                />
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
    </div>
  )
}
