import { ErrorMessage, Field, FieldGroup, Fieldset, Label } from '@/components/fieldset'
import { Input } from '@/components/input'
import { Textarea } from '@/components/textarea'
import type { Microgrid, MicrogridValidationErrors } from '@/types/microgrids'

export function ContactInfoFormSection({
  errors,
  onChange,
}: {
  errors: MicrogridValidationErrors | null
  onChange: <T extends keyof Microgrid>(name: T, value: Microgrid[T]) => void
}) {
  return (
    <Fieldset aria-label="Contact information">
      <FieldGroup>
        <Field>
          <Label>Full Name</Label>
          <Input
            type="text"
            name="contactName"
            placeholder="e.g., John Doe"
            invalid={!!errors?.validation?.contactName}
            onChange={(event) => onChange('contactName', event.target.value)}
          />
          {errors?.validation?.contactName && <ErrorMessage>{errors?.validation?.contactName}</ErrorMessage>}
        </Field>

        <Field>
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            placeholder="example@email.com"
            invalid={!!errors?.validation?.email}
            onChange={(event) => {
              onChange('email', event.target.value)
            }}
          />
          {errors?.validation?.email && <ErrorMessage>{errors?.validation?.email}</ErrorMessage>}
        </Field>

        <Field>
          <Label>Other Information</Label>
          <Textarea
            name="notes"
            rows={3}
            placeholder="Any other information not covered, you would like us to know about"
            invalid={!!errors?.validation?.notes}
            onChange={(event) => onChange('notes', event.target.value)}
          />
          {errors?.validation?.notes && <ErrorMessage>{errors?.validation?.notes}</ErrorMessage>}
        </Field>
      </FieldGroup>
    </Fieldset>
  )
}
