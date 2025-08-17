import { microgridCategories, microgridTypes } from '@/assets/microgrids-form-data'
import { ErrorMessage, Field, FieldGroup, Fieldset, Label } from '@/components/fieldset'
import { Input } from '@/components/input'
import { Listbox, ListboxLabel, ListboxOption } from '@/components/listbox'
import { Textarea } from '@/components/textarea'
import type { Microgrid, MicrogridValidationErrors } from '@/types/microgrids'

export function BasicInfoFormSection({
  errors,
  onChange,
}: {
  errors: MicrogridValidationErrors | null
  onChange: <T extends keyof Microgrid>(name: T, value: Microgrid[T]) => void
}) {
  return (
    <Fieldset aria-label="Basic information">
      <FieldGroup>
        <Field>
          <Label>Category</Label>
          <Listbox
            name="category"
            placeholder="Select category&hellip;"
            invalid={!!errors?.validation?.category}
            onChange={(value) => onChange('category', value as string)}
          >
            {microgridCategories.map((category) => (
              <ListboxOption key={category} value={category}>
                <ListboxLabel>{category}</ListboxLabel>
              </ListboxOption>
            ))}
          </Listbox>
          {errors?.validation?.category && <ErrorMessage>{errors.validation.category}</ErrorMessage>}
        </Field>

        <Field>
          <Label>Microgrid Name</Label>
          <Input
            type="text"
            name="microgridName"
            placeholder="e.g., Ikot Solar Mini-grid"
            invalid={!!errors?.validation?.microgridName}
            onChange={(event) => onChange('microgridName', event.target.value)}
          />
          {errors?.validation?.microgridName && <ErrorMessage>{errors.validation.microgridName}</ErrorMessage>}
        </Field>

        <Field>
          <Label>Description</Label>
          <Textarea
            name="description"
            rows={3}
            maxLength={160}
            placeholder="Brief description of the microgrid (max 160 characters)"
            invalid={!!errors?.validation?.description}
            onChange={(event) => onChange('description', event.target.value)}
          />
          {<ErrorMessage>{errors?.validation?.description}</ErrorMessage>}
        </Field>

        <Field>
          <Label>Type</Label>
          <Listbox
            name="type"
            placeholder="Select type&hellip;"
            invalid={!!errors?.validation?.type}
            onChange={(value) => onChange('type', value as string)}
          >
            {microgridTypes.map((type) => (
              <ListboxOption key={type} value={type}>
                <ListboxLabel>{type}</ListboxLabel>
              </ListboxOption>
            ))}
          </Listbox>
          {<ErrorMessage>{errors?.validation?.type}</ErrorMessage>}
        </Field>

        <Field>
          <Label>Operator</Label>
          <Input
            type="text"
            name="operator"
            placeholder="Organization or individual name"
            invalid={!!errors?.validation?.operator}
            onChange={(event) => {
              onChange('operator', event.target.value)
            }}
          />
          {<ErrorMessage>{errors?.validation?.operator}</ErrorMessage>}
        </Field>
      </FieldGroup>
    </Fieldset>
  )
}
