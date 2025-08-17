import { ErrorMessage, Field, FieldGroup, Fieldset, Label } from '@/components/fieldset'
import { Input } from '@/components/input'
import type { Microgrid, MicrogridValidationErrors } from '@/types/microgrids'

export function SourceInfoFormSection({
  errors,
  onChange,
}: {
  errors: MicrogridValidationErrors | null
  onChange: <T extends keyof Microgrid>(name: T, value: Microgrid[T]) => void
}) {
  return (
    <Fieldset aria-label="Source information">
      <FieldGroup>
        <Field>
          <Label>Data Source</Label>
          <Input
            type="text"
            name="source"
            placeholder="e.g., REAN Database, Company Report, Website Link"
            invalid={!!errors?.validation?.source}
            onChange={(event) => onChange('source', event.target.value)}
          />
          {errors?.validation?.source && <ErrorMessage>{errors.validation.source}</ErrorMessage>}
        </Field>
      </FieldGroup>
    </Fieldset>
  )
}
