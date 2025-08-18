import { microgridCategories, microgridTypes } from '~/assets/microgrids-form-data'
import { Description, Field, FieldGroup, Fieldset, Label, Legend } from '~/components/fieldset'
import { Input } from '~/components/input'
import { Listbox, ListboxLabel, ListboxOption } from '~/components/listbox'
import { Select } from '~/components/select'
import { Text } from '~/components/text'
import { Textarea } from '~/components/textarea'
import { Form } from 'react-router'

export function EditSupplierApplication() {
  return (
    <Form method="PATCH">
      <Fieldset>
        <Legend>Shipping details</Legend>
        <FieldGroup>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-4">
            <Field>
              <Label>Category</Label>
              <Listbox
                name="category"
                placeholder="Select category&hellip;"
                // invalid={!!errors?.validation?.category}
              >
                {microgridCategories.map((category) => (
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
              <Label>Microgrid Name</Label>
              <Input
                type="text"
                name="microgridName"
                placeholder="e.g., Ikot Solar Mini-grid"
                // invalid={!!errors?.validation?.microgridName}
              />
              {/* {errors?.validation?.microgridName && (
                <ErrorMessage>{errors.validation.microgridName}</ErrorMessage>
              )} */}
            </Field>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-4">
            <Field>
              <Label>Type</Label>
              <Listbox
                name="type"
                placeholder="Select type&hellip;"
                // invalid={!!errors?.validation?.type}
              >
                {microgridTypes.map((type) => (
                  <ListboxOption key={type} value={type}>
                    <ListboxLabel>{type}</ListboxLabel>
                  </ListboxOption>
                ))}
              </Listbox>
              {/* {<ErrorMessage>{errors?.validation?.type}</ErrorMessage>} */}
            </Field>

            <Field>
              <Label>Operator</Label>
              <Input
                type="text"
                name="operator"
                placeholder="Organization or individual name"
                // invalid={!!errors?.validation?.operator}
              />
              {/* {<ErrorMessage>{errors?.validation?.operator}</ErrorMessage>} */}
            </Field>
          </div>

          <Field>
            <Label>Description</Label>
            <Textarea
              name="description"
              rows={3}
              maxLength={160}
              placeholder="Brief description of the microgrid (max 160 characters)"
              //  invalid={!!errors?.validation?.description}
            />
            {/* {<ErrorMessage>{errors?.validation?.description}</ErrorMessage>} */}
          </Field>
        </FieldGroup>
      </Fieldset>
    </Form>
  )
}
