import { Link } from 'react-router'
import { Container } from '@/components/container'
import { Card } from '@/components/card'
import { Button } from '@/components/button'
import { clsx } from 'clsx'
import useCountUp from '@/hooks/use-count-up'
import React from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { Input } from '@/components/input'

function Test() {
  return (
    <Container className="relative z-1 mt-9 [--feature-text-offset:65%]">
      <div className="grid grid-cols-12 items-center gap-5 lg:gap-8">
        <div className="relative z-[1] col-span-12 lg:col-span-5">
          <div className="mb-1.5 text-sm text-gray-500 lg:mb-2 lg:text-base">
            Make an impact
          </div>

          <div>
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl lg:w-[calc(100%_+_var(--feature-text-offset))] dark:text-zinc-100">
              Crowdsourced Microgrid Tracking for Nigeria
            </h1>
            <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
              Create a database of existing and new microgrids by uploading
              information to a searchable map.
            </p>
          </div>

          <div className="mt-3 lg:mt-6">
            <div className="flex flex-wrap items-center gap-3 lg:gap-6">
              <Button
                to="submit-microgrid"
                className="relative cursor-pointer justify-center leading-tight whitespace-nowrap no-underline shadow-md transition-all duration-200"
              >
                Upload Microgrid
              </Button>
              <Link
                to="about"
                className="group relative inline-flex h-8 items-center px-1.5 text-teal-500 no-underline antialiased"
              >
                <span className="absolute bottom-0 left-0 h-px w-full [transform-origin:right_center] bg-current [transition:transform_0.2s_0.1s] group-hover:[transform:translateX(17px)_scaleX(0)] group-hover:[transition:transform_0.2s]" />

                <span>Learn more</span>

                <svg
                  className="absolute right-0 bottom-0 inline-block h-[1em] w-[1em] shrink-0 [transform:translateX(100%)_rotate(90deg)] fill-current text-[32px] leading-none text-inherit"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle
                      className="[stroke-dasharray:100] [stroke-dashoffset:100] [transition:stroke-dashoffset_0.2s] group-hover:[stroke-dashoffset:200] group-hover:[transition:stroke-dashoffset_0.2s_0.1s]"
                      cx="16"
                      cy="16"
                      r="15.5"
                    />
                    <line
                      className="[transform-origin:13px_15px] [transition:transform_0.4s] group-hover:[transform:rotate(-180deg)]"
                      x1="10"
                      y1="18"
                      x2="16"
                      y2="12"
                    />
                    <line
                      className="[transform-origin:19px_15px] [transition:transform_0.4s] group-hover:[transform:rotate(180deg)]"
                      x1="16"
                      y1="12"
                      x2="22"
                      y2="18"
                    />
                  </g>
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-7">
          <figure className="relative flex justify-end overflow-hidden rounded-xl sm:rounded-2xl">
            {/* <span className="absolute top-0 left-0 h-30 w-full bg-[linear-gradient(hsla(210,60%,8%,0.85),hsla(210,60%,8%,0.85),hsla(210,60%,8%,0))] mix-blend-multiply" /> */}
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

export function HomeView() {
  return (
    <>
      <Test />
      <Container className="mt-16 sm:mt-20">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            <Article
              key="track"
              href="track-microgrid"
              title="Track Microgrids"
              description="View microgrid locations across Nigeria using an interactive map, searchable by state, LGA, or zone."
            />
            <Article
              key="submit"
              href="submit-microgrid"
              title="Submit a Microgrids"
              description="Contribute information, new or existing"
            />
            <Article
              key="suppliers"
              href="solar-providers"
              title="Solar Suppliers & Distributors"
              description="Access a list of solar panel & batteries suppliers and distributors within Nigeria."
            />
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <Newsletter />
            <div className="flex justify-between gap-1">
              <Stats name="Total microgrids mapped" value={200} />
              <Stats name="States covered" value={300} />
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

function MailIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 7.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="m4 6 6.024 5.479a2.915 2.915 0 0 0 3.952 0L20 6"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  )
}

function Article({
  href,
  title,
  description,
}: {
  href: string
  title: string
  description: string
}) {
  return (
    <Card as="article">
      <Card.Title href={href}>{title}</Card.Title>
      <Card.Description>{description}</Card.Description>
      <Card.Cta>Read article</Card.Cta>
    </Card>
  )
}

function Newsletter() {
  return (
    <form
      action="/thank-you"
      className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
    >
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <MailIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Stay up to date</span>
      </h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Get notified when I publish something new, and unsubscribe at any time.
      </p>
      <div className="mt-6 flex items-center">
        <span className="flex min-w-0 flex-auto p-px">
          <Input
            type="email"
            placeholder="Email address"
            aria-label="Email address"
            required
          />
        </span>
        <Button type="submit" className="ml-4 flex-none">
          Join
        </Button>
      </div>
    </form>
  )
}

interface StatsProps {
  name: string
  value: number
  className?: string
}
function Stats({ name, value, className }: StatsProps) {
  const { displayValue, isVisible, elementRef } = useCountUp({
    value,
  })
  return (
    <div
      className={clsx(
        'flex-1 overflow-hidden rounded-2xl border border-zinc-100 dark:border-zinc-700/40',
        className,
      )}
    >
      <dl className="flex flex-col items-center p-6">
        <dt className="text-xs/7 text-zinc-500 dark:text-zinc-400">{name}</dt>
        <dd
          className={`order-first text-3xl font-semibold tracking-tight text-zinc-900 tabular-nums sm:text-5xl dark:text-zinc-100 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          <span
            ref={elementRef as React.RefObject<HTMLSpanElement>}
            aria-hidden="true"
          >
            {displayValue}
          </span>
        </dd>
      </dl>
    </div>
  )
}
