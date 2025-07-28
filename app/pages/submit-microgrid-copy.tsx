import { BasicInfo } from '@/components/basic-info'
import { Button } from '@/components/button'
import { CommissioningInformation } from '@/components/commission-Info'
import { Container } from '@/components/container'
import { Divider } from '@/components/divider'
import { Heading, Subheading } from '@/components/heading'
import { LocationDetails } from '@/components/location-details'
import { SourceInformation } from '@/components/source-information'
import { SubmissionGuidelines } from '@/components/submission-guidelines'
import { TechSpecs } from '@/components/tech-specs'
import { Text } from '@/components/text'

export function SubmitMicrogridView() {
  return (
    <Container className="mt-16">
      <div className="mx-auto max-w-4xl">
        <Heading>Submit New Microgrid</Heading>
        <Text>
          Contribute to Nigeria&apos;s renewable energy database by submitting
          information about microgrids
        </Text>

        <Divider className="my-10 mt-6" />

        <form method="post">
          <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="space-y-1">
              <Subheading>Basic Information</Subheading>
              <Text>This will be displayed on your public profile.</Text>
            </div>
            <BasicInfo />
          </section>

          <Divider className="my-10" soft />

          <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="space-y-1">
              <Subheading>Location Details</Subheading>
              <Text>This will be displayed on your public profile.</Text>
            </div>
            <LocationDetails />
          </section>

          <Divider className="my-10" soft />

          <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="space-y-1">
              <Subheading>Technical Specifications</Subheading>
              <Text>This will be displayed on your public profile.</Text>
            </div>
            <TechSpecs />
          </section>

          <Divider className="my-10" soft />

          <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="space-y-1">
              <Subheading>Commissioning Date</Subheading>
              <Text>
                For developing/potential microgrids, use expected dates
              </Text>
            </div>
            <CommissioningInformation />
          </section>

          <Divider className="my-10" soft />

          <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="space-y-1">
              <Subheading> Source Information</Subheading>
              <Text>Where did you get this information?</Text>
            </div>
            <SourceInformation />
          </section>

          <Divider className="my-10" soft />

          <div className="flex justify-end gap-4">
            <Button type="reset" variant="secondary">
              Reset
            </Button>
            <Button type="submit">Submit Microgrid</Button>
          </div>
        </form>

        <SubmissionGuidelines />
      </div>
    </Container>
  )
}
