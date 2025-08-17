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
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import type { Microgrid, MicrogridValidationErrors } from '@/types/microgrids'
import * as z from 'zod'
import { MicrogridSchema } from '@/lib/validation/microgrid-schema'

export function SubmitMicrogridView({ actionData }: Route.ComponentProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const navigate = useNavigate()
  const { state, formData } = useNavigation()
  const isSubmitting = state === 'submitting'
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [errors, setErrors] = useState<MicrogridValidationErrors | null>(null)
  const submitSuccess = actionData?.ok
  const [formValues, setFormValues] = useState({
    address: '',
    area: '',
    capacity: '',
    category: '',
    commissioningYear: '',
    contactName: '',
    description: '',
    email: '',
    geopoliticalZone: '',
    lga: '',
    microgridName: '',
    notes: '',
    operator: '',
    position: {
      lat: '',
      lng: '',
    },
    powerSources: '',
    size: '',
    slug: '',
    source: '',
    state: '',
    status: 'pending',
    type: '',
  })

  function handleChange<T extends keyof Microgrid>(name: T, value: Microgrid[T]) {
    if (!hasSubmitted || !errors?.validation) return

    setFormValues((prevValues) => {
      const updatedValues = { ...prevValues, [name]: value }

      const result = MicrogridSchema.safeParse(updatedValues)

      if (!result.success) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          validation: z.flattenError(result.error).fieldErrors,
          other: prevErrors?.other || null,
        }))
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          validation: null,
          other: null,
        }))
      }

      return updatedValues
    })
  }

  useEffect(() => {
    if (actionData?.errors) setErrors(actionData.errors as MicrogridValidationErrors)
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

    setHasSubmitted(false)
    toast.success(' Microgrid submitted successfully! Thank you for your contribution.', { position: 'top-center' })
  }, [submitSuccess])

  useEffect(() => {
    if (formData)
      setFormValues({
        address: (formData.get('address') as string) || '',
        area: (formData.get('area') as string) || '',
        capacity: (formData.get('capacity') as string)
          ? `${formData.get('capacity') as string} ${formData.get('capacityUnit') as string}`
          : '',
        category: (formData.get('category') as string) || '',
        commissioningYear: (formData.get('commissioningYear') as string) || '',
        contactName: formData.get('contactName') as string,
        description: formData.get('description') as string,
        email: formData.get('email') as string,
        geopoliticalZone: (formData.get('geopoliticalZone') as string) || '',
        lga: (formData.get('lga') as string) || '',
        microgridName: formData.get('microgridName') as string,
        notes: formData.get('notes') as string,
        operator: formData.get('operator') as string,
        position: {
          lat: formData.get('lat') as string,
          lng: formData.get('lng') as string,
        },
        powerSources: (formData.get('powerSources') as string) || '',
        size: (formData.get('size') as string)
          ? `${formData.get('size') as string} ${formData.get('sizeUnit') as string}`
          : '',
        slug: formData.get('microgridName')?.toString().toLowerCase().split(' ').join('-') || '',
        source: formData.get('source') as string,
        state: (formData.get('state') as string) || '',
        status: 'pending',
        type: (formData.get('type') as string) || '',
      })
  }, [formData])

  return (
    <Container className="mt-16">
      <div className="mx-auto max-w-4xl">
        <Heading>Submit New Microgrid</Heading>

        <Text>Contribute to Nigeria&apos;s renewable energy database by submitting information about microgrids</Text>

        <Divider className="my-10 mt-6" />

        <Form ref={formRef} method="post">
          <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="space-y-1">
              <Subheading>Basic Information</Subheading>
              <Text>
                Provide key details about your microgrid. This information will appear on your public profile and help
                others understand your project at a glance.
              </Text>
            </div>
            <BasicInfoFormSection errors={errors} onChange={handleChange} />
          </section>

          <Divider className="my-10" soft />

          <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="space-y-1">
              <Subheading>Location Details</Subheading>
              <Text>
                Enter the exact location of your microgrid. These details help people find and understand where your
                project operates.
              </Text>
            </div>
            <LocationDetailsFormSection errors={errors} formValues={formValues} onChange={handleChange} />
          </section>

          <Divider className="my-10" soft />

          <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="space-y-1">
              <Subheading>Technical Specifications</Subheading>
              <Text>
                Share the core technical details of your microgrid. This information helps others understand its scale,
                capacity, and energy sources.
              </Text>
            </div>
            <TechSpecsFormSection errors={errors} onChange={handleChange} />
          </section>

          <Divider className="my-10" soft />

          <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="space-y-1">
              <Subheading>Commissioning Date</Subheading>
              <Text>For developing/potential microgrids, use expected dates.</Text>
            </div>
            <CommissioningInfoFormSection errors={errors} onChange={handleChange} />
          </section>

          <Divider className="my-10" soft />

          <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="space-y-1">
              <Subheading>Source Information</Subheading>
              <Text>
                Please indicate where the information came from. This could be an official report, industry database,
                website, or any other credible source.
              </Text>
            </div>
            <SourceInfoFormSection errors={errors} onChange={handleChange} />
          </section>

          <Divider className="my-10" soft />

          <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="space-y-1">
              <Subheading>Contact Information</Subheading>
              <Text>
                Please provide details of the person we can reach out to for clarification or follow-up regarding this
                information.
              </Text>
            </div>
            <ContactInfoFormSection errors={errors} onChange={handleChange} />
          </section>

          <Divider className="my-10" soft />

          <div className="flex items-center justify-end gap-4">
            <Button type="button" variant="secondary" onClick={() => navigate('/')}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className={`${isSubmitting ? 'cursor-not-allowed' : ''}`}>
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
