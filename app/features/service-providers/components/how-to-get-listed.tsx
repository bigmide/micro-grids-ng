// ----------------------------------------------------------------------

export function HowToGetListed() {
  return (
    <div className="mt-16 rounded-xl border border-teal-500/20 bg-teal-50/50 p-6 md:p-8 dark:bg-teal-500/5">
      <h2 className="mb-6 text-center text-2xl font-bold text-zinc-800 dark:text-zinc-100">
        How to Get Listed
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Step
          step={1}
          heading="Submit Your Details"
          text="Fill out our registration form with your company information and
            services."
        />

        <Step
          step={2}
          heading="Verification Process"
          text="Our team will review your application to ensure quality standards."
        />

        <Step
          step={3}
          heading="Get Listed"
          text="Once approved, your company will be visible to thousands of
            customers."
        />
      </div>
    </div>
  )
}

function Step({
  step,
  heading,
  text,
}: {
  step: number
  heading: string
  text: string
}) {
  return (
    <div className="p-5 text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900">
        <span className="text-2xl font-bold text-teal-800 dark:text-teal-500">
          {step}
        </span>
      </div>
      <h3 className="mb-2 text-lg font-semibold text-zinc-800 dark:text-zinc-100">
        {heading}
      </h3>
      <p className="text-zinc-600 dark:text-zinc-300">{text}</p>
    </div>
  )
}
