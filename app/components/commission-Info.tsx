import { Field, FieldGroup, Fieldset, Label } from './fieldset'
import { Input } from './input'

export function CommissioningInformation() {
  return (
    <Fieldset aria-label="Commissioning information">
      <FieldGroup>
        <Field>
          <Label>Commissioning Date</Label>
          <Input
            type="text"
            name="commissioningDates"
            placeholder="e.g., 2022-06-15 or Q3 2025"
          />
        </Field>
      </FieldGroup>
    </Fieldset>
  )
}
