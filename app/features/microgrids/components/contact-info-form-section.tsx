import {
  ErrorMessage,
  Field,
  FieldGroup,
  Fieldset,
  Label,
} from '@/components/fieldset'
import { Input } from '@/components/input'
import { Textarea } from '@/components/textarea'
import type { MicrogridValidationErrors } from '@/types/microgrids'

export function ContactInfoFormSection({
  errors,
}: {
  errors: MicrogridValidationErrors
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
          />
          {errors?.validation?.contactName && (
            <ErrorMessage>{errors?.validation?.contactName}</ErrorMessage>
          )}
        </Field>

        <Field>
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            placeholder="example@email.com"
            invalid={!!errors?.validation?.email}
          />
          {errors?.validation?.email && (
            <ErrorMessage>{errors?.validation?.email}</ErrorMessage>
          )}
        </Field>

        <Field>
          <Label>Other Information</Label>
          <Textarea
            name="notes"
            rows={3}
            placeholder="Any other information not covered, you would like us to know about"
            invalid={!!errors?.validation?.notes}
          />
          {errors?.validation?.notes && (
            <ErrorMessage>{errors?.validation?.notes}</ErrorMessage>
          )}
        </Field>
      </FieldGroup>
    </Fieldset>
  )
}
