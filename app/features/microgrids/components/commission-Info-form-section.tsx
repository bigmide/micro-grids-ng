import {
  ErrorMessage,
  Field,
  FieldGroup,
  Fieldset,
  Label,
} from '@/components/fieldset'
import { Listbox, ListboxLabel, ListboxOption } from '@/components/listbox'
import type { MicrogridValidationErrors } from '@/types/microgrids'

export function CommissioningInfoFormSection({
  errors,
}: {
  errors: MicrogridValidationErrors
}) {
  return (
    <Fieldset aria-label="Commissioning information">
      <FieldGroup>
        <Field>
          <Label>Commissioning Date</Label>

          <Listbox
            name="commissioningDate"
            placeholder="Select year&hellip;"
            invalid={!!errors?.validation?.commissioningDate}
          >
            {Array.from({ length: 150 }, (_, i) =>
              String(new Date().getFullYear() - i),
            ).map((date) => (
              <ListboxOption key={date} value={date}>
                <ListboxLabel>{date}</ListboxLabel>
              </ListboxOption>
            ))}
          </Listbox>

          {errors?.validation?.commissioningDate && (
            <ErrorMessage>{errors?.validation?.commissioningDate}</ErrorMessage>
          )}
        </Field>
      </FieldGroup>
    </Fieldset>
  )
}
