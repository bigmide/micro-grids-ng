import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { Divider } from '@/components/divider'
import { Heading, Subheading } from '@/components/heading'
import { SubmissionGuidelines } from '@/features/microgrids/components/submission-guidelines'
import { Text } from '@/components/text'
import { BasicInfoFormSection } from '@/features/microgrids/components/basic-info-form-section'
import { LocationDetailsFormSection } from '@/features/microgrids/components/location-details-form-section'
import { TechSpecsFormSection } from '@/features/microgrids/components/tech-specs-form-section'
import { CommissioningInfoFormSection } from '@/features/microgrids/components/commission-Info-form-section'
import { SourceInfoFormSection } from '@/features/microgrids/components/source-info-form-section'
import { Form, useNavigate, useNavigation } from 'react-router'
import { ContactInfoFormSection } from '@/features/microgrids/components/contact-info-form-section'
import type { Route } from '../routes/+types/submit-microgrid'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import type {
  MicrogridApplication,
  MicrogridValidationErrors,
} from '@/types/microgrids'
import * as z from 'zod'
import { MicrogridSchema } from '@/lib/validation/microgrid-schema'

export function SubmitMicrogridView({ actionData }: Route.ComponentProps) {
  const formRef = useRef<HTMLFormElement>(null)

  const navigation = useNavigation()

  const navigate = useNavigate()
  const isSubmitting = navigation.state === 'submitting'

  const [errors, setErrors] = useState<MicrogridValidationErrors>()
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const submitSuccess = actionData?.ok

  useEffect(() => {
    if (actionData?.errors) setErrors(actionData.errors)
  }, [actionData?.errors])

  useEffect(() => {
    if (errors?.other) {
      toast.error(errors.other, { position: 'top-center' })
    }

    if (errors) setHasSubmitted(true)
  }, [errors])

  useEffect(() => {
    if (!submitSuccess) return

    if (formRef.current) formRef.current.reset()

    toast.success(
      ' Microgrid submitted successfully! Thank you for your contribution.',
      { position: 'top-center' },
    )
  }, [submitSuccess])

  function handleChange(event: React.FormEvent<HTMLFormElement>) {
    if (!hasSubmitted || !errors?.validation) return

    const form = event.currentTarget
    const data = new FormData(form)

    const formData: MicrogridApplication = {
      category: (data.get('category') as string) || '',
      name: data.get('name') as string,
      operator: data.get('operator') as string,
      type: (data.get('type') as string) || '',
      capacity: data.get('capacity') as string,
      powerSources: (data.get('powerSources') as string) || '',
      description: data.get('description') as string,
      commissioningDate: data.get('commissioningDate') as string,
      state: (data.get('state') as string) || '',
      lga: (data.get('lga') as string) || '',
      area: (data.get('area') as string) || '',
      geopoliticalZone: (data.get('geopoliticalZone') as string) || '',
      size: data.get('size') as string,
      position: {
        lat: data.get('lat') as string,
        lng: data.get('lng') as string,
      },
      source: data.get('source') as string,
      contactName: data.get('contactName') as string,
      email: data.get('email') as string,
      notes: data.get('notes') as string,
    }

    const result = MicrogridSchema.safeParse(formData)

    if (!result.success) {
      setErrors((prevErr) => {
        return {
          ...prevErr,
          validation: z.flattenError(result.error).fieldErrors,
        }
      })
    }
  }

  return (
    <Container className="mt-16">
      <div className="mx-auto max-w-4xl">
        <Heading>Submit New Microgrid</Heading>

        <Text>
          Contribute to Nigeria&apos;s renewable energy database by submitting
          information about microgrids
        </Text>

        <Divider className="my-10 mt-6" />

        <Form ref={formRef} method="post" onChange={handleChange}>
          <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="space-y-1">
              <Subheading>Basic Information</Subheading>
              <Text>This will be displayed on your public profile.</Text>
            </div>
            <BasicInfoFormSection errors={errors} />
          </section>

          <Divider className="my-10" soft />

          <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="space-y-1">
              <Subheading>Location Details</Subheading>
              <Text>This will be displayed on your public profile.</Text>
            </div>
            <LocationDetailsFormSection errors={errors} />
          </section>

          <Divider className="my-10" soft />

          <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="space-y-1">
              <Subheading>Technical Specifications</Subheading>
              <Text>This will be displayed on your public profile.</Text>
            </div>
            <TechSpecsFormSection errors={errors} />
          </section>

          <Divider className="my-10" soft />

          <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="space-y-1">
              <Subheading>Commissioning Date</Subheading>
              <Text>
                For developing/potential microgrids, use expected dates
              </Text>
            </div>
            <CommissioningInfoFormSection errors={errors} />
          </section>

          <Divider className="my-10" soft />

          <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="space-y-1">
              <Subheading>Source Information</Subheading>
              <Text>Where did you get this information?</Text>
            </div>
            <SourceInfoFormSection errors={errors} />
          </section>

          <Divider className="my-10" soft />

          <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="space-y-1">
              <Subheading>Contact Information</Subheading>
              <Text>Where did you get this information?</Text>
            </div>
            <ContactInfoFormSection errors={errors} />
          </section>

          <Divider className="my-10" soft />

          <div className="flex items-center justify-end gap-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className={`${isSubmitting ? 'cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg
                    className="mr-2 -ml-1 h-4 w-4 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                'Submit Microgrid'
              )}
            </Button>
          </div>
        </Form>

        <SubmissionGuidelines />
      </div>
    </Container>
  )
}
