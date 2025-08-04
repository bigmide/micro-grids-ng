import {
  ErrorMessage,
  Field,
  FieldGroup,
  Fieldset,
  Label,
} from '@/components/fieldset'
import { Input } from '@/components/input'
import type { MicrogridValidationErrors } from '@/types/microgrids'

export function SourceInfoFormSection({
  errors,
}: {
  errors: MicrogridValidationErrors
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
          />
          {errors?.validation?.source && (
            <ErrorMessage>{errors.validation.source}</ErrorMessage>
          )}
        </Field>
      </FieldGroup>
    </Fieldset>
  )
}
