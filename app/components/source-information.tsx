import { Field, FieldGroup, Fieldset, Label } from './fieldset'
import { Input } from './input'

export function SourceInformation() {
  return (
    <Fieldset aria-label="Source information">
      <FieldGroup>
        <Field>
          <Label>Data Source</Label>
          <Input
            type="text"
            name="source"
            placeholder="e.g., REAN Database, Company Report, Website Link"
          />
        </Field>
      </FieldGroup>
    </Fieldset>
  )
}
