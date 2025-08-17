import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { LinkEffect } from '@/components/link-effect'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

// ----------------------------------------------------------------------

export function Hero() {
  return (
    <Container className="relative z-1 mt-9 [--feature-text-offset:65%]">
      <div className="grid grid-cols-12 items-center gap-5 lg:gap-8">
        <div className="relative z-[1] col-span-12 lg:col-span-5">
          <div className="mb-1.5 text-sm text-gray-500 lg:mb-2 lg:text-base">Make an impact</div>

          <div>
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl lg:w-[calc(100%_+_var(--feature-text-offset))] dark:text-zinc-100">
              Crowdsourced Microgrid Tracking for Nigeria
            </h1>
            <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
              Create a database of existing and new microgrids by uploading information to a searchable map.
            </p>
          </div>

          <div className="mt-3 lg:mt-6">
            <div className="flex flex-wrap items-center gap-3 lg:gap-6">
              <Button
                href="submit-microgrid"
                className="relative cursor-pointer justify-center leading-tight whitespace-nowrap no-underline shadow-md transition-all duration-200"
              >
                Upload Microgrid
              </Button>

              <LinkEffect href="/about">Learn more</LinkEffect>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-7">
          <figure className="relative flex justify-end overflow-hidden rounded-xl sm:rounded-2xl">
            <DotLottieReact
              src="https://lottie.host/25a7c23b-f38c-4865-8c56-5f9f2d3a43af/317ebqOZeL.lottie"
              loop
              autoplay
            />
          </figure>
        </div>
      </div>
    </Container>
  )
}
