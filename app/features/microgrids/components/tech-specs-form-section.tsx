import { microgridPowerSourceOptions } from '@/assets/microgrids-form-data'
import { ErrorMessage, Field, FieldGroup, Fieldset, Label } from '@/components/fieldset'
import { InputWithDropdown } from '@/components/input-with-dropdown'
import { Listbox, ListboxLabel, ListboxOption } from '@/components/listbox'
import type { Microgrid, MicrogridValidationErrors } from '@/types/microgrids'

export function TechSpecsFormSection({
  errors,
  onChange,
}: {
  errors: MicrogridValidationErrors | null
  onChange: <T extends keyof Microgrid>(name: T, value: Microgrid[T]) => void
}) {
  return (
    <Fieldset aria-label="Technical specifications">
      <FieldGroup>
        <div className="grid grid-cols-2 gap-6">
          <Field>
            <Label>Capacity</Label>
            <InputWithDropdown
              inputName="capacity"
              selectName="capacityUnit"
              invalid={!!errors?.validation?.capacity}
              onChange={(value) => onChange('capacity', value)}
            >
              <option>KW</option>
              <option>MW</option>
              <option>GW</option>
            </InputWithDropdown>
            {errors?.validation?.capacity && <ErrorMessage>{errors.validation.capacity}</ErrorMessage>}
          </Field>

          <Field>
            <Label>Size</Label>

            <InputWithDropdown
              inputName="size"
              selectName="sizeUnit"
              invalid={!!errors?.validation?.size}
              onChange={(value) => onChange('size', value)}
            >
              <option>Hectare</option>
              <option>Plot</option>
              <option>Acres</option>
              <option>m2</option>
            </InputWithDropdown>

            {errors?.validation?.size && <ErrorMessage>{errors.validation.size}</ErrorMessage>}
          </Field>

          <Field>
            <Label>Power Sources</Label>
            <Listbox
              name="powerSources"
              placeholder="Select power source&hellip;"
              invalid={!!errors?.validation?.powerSources}
              onChange={(value) => onChange('powerSources', value as string)}
            >
              {microgridPowerSourceOptions.map((source) => (
                <ListboxOption key={source} value={source}>
                  <ListboxLabel>{source}</ListboxLabel>
                </ListboxOption>
              ))}
            </Listbox>
            {errors?.validation?.powerSources && <ErrorMessage>{errors.validation.powerSources}</ErrorMessage>}
          </Field>
        </div>
      </FieldGroup>
    </Fieldset>
  )
}
