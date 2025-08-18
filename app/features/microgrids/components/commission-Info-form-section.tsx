import { ErrorMessage, Field, FieldGroup, Fieldset, Label } from '~/components/fieldset'
import { Listbox, ListboxLabel, ListboxOption } from '~/components/listbox'
import type { Microgrid, MicrogridValidationErrors } from '~/types/microgrids'
import { useMemo } from 'react'

export function CommissioningInfoFormSection({
  errors,
  onChange,
}: {
  errors: MicrogridValidationErrors | null
  onChange: <T extends keyof Microgrid>(name: T, value: Microgrid[T]) => void
}) {
  const years = useMemo(() => {
    const currentYear = new Date().getFullYear()
    const pastYears = Array.from({ length: 150 }, (_, i) => currentYear - i)
    const futureYears = Array.from({ length: 10 }, (_, i) => currentYear + i + 1) // 10 years ahead
    return [...futureYears.reverse(), ...pastYears].map(String)
  }, [])

  return (
    <Fieldset aria-label="Commissioning information">
      <FieldGroup>
        <Field>
          <Label>Commissioning Year</Label>
          <Listbox
            name="commissioningYear"
            placeholder="Select year&hellip;"
            invalid={!!errors?.validation?.commissioningYear}
            onChange={(value) => onChange('commissioningYear', value as string)}
          >
            {years.map((date) => (
              <ListboxOption key={date} value={date}>
                <ListboxLabel>{date}</ListboxLabel>
              </ListboxOption>
            ))}
          </Listbox>
          {errors?.validation?.commissioningYear && (
            <ErrorMessage>{errors?.validation?.commissioningYear}</ErrorMessage>
          )}
        </Field>
      </FieldGroup>
    </Fieldset>
  )
}
