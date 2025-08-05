import { microgridPowerSourceOptions } from '@/assets/microgrids-form-data'
import {
  ErrorMessage,
  Field,
  FieldGroup,
  Fieldset,
  Label,
} from '@/components/fieldset'
import { Input } from '@/components/input'
import { Listbox, ListboxLabel, ListboxOption } from '@/components/listbox'
import type { MicrogridValidationErrors } from '@/types/microgrids'

export function TechSpecsFormSection({
  errors,
}: {
  errors: MicrogridValidationErrors
}) {
  return (
    <Fieldset aria-label="Technical specifications">
      <FieldGroup>
        <div className="grid grid-cols-2 gap-6">
          <Field>
            <Label>Capacity</Label>
            <Input
              type="text"
              name="capacity"
              placeholder="e.g., 10kW, 50kW"
              invalid={!!errors?.validation?.capacity}
            />
            {errors?.validation?.capacity && (
              <ErrorMessage>{errors.validation.capacity}</ErrorMessage>
            )}
          </Field>

          <Field>
            <Label>Size</Label>
            <Input
              type="text"
              name="size"
              placeholder="e.g., 1 hectare, 2 acres"
              invalid={!!errors?.validation?.size}
            />
            {errors?.validation?.size && (
              <ErrorMessage>{errors.validation.size}</ErrorMessage>
            )}
          </Field>

          <Field>
            <Label>Power Sources</Label>
            <Listbox
              name="powerSources"
              placeholder="Select power source&hellip;"
              invalid={!!errors?.validation?.powerSources}
            >
              {microgridPowerSourceOptions.map((source) => (
                <ListboxOption key={source} value={source}>
                  <ListboxLabel>{source}</ListboxLabel>
                </ListboxOption>
              ))}
            </Listbox>
            {errors?.validation?.powerSources && (
              <ErrorMessage>{errors.validation.powerSources}</ErrorMessage>
            )}
          </Field>
        </div>
      </FieldGroup>
    </Fieldset>
  )
}
