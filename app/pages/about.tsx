import { Container } from '@/components/container'
import { Prose } from '@/features/blog/components/prose'
import { Link } from 'react-router'
import image1 from '@/images/photos/image-1.jpg'
import image2 from '@/images/photos/image-2.jpg'
import image3 from '@/images/photos/image-3.jpg'
import image4 from '@/images/photos/image-4.jpg'
import image5 from '@/images/photos/image-5.jpg'
import clsx from 'clsx'

export function AboutView() {
  return (
    <>
      <Container className="mt-9">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            Powering Nigeria, One Community at a Time
          </h1>
        </div>
      </Container>
      <Photos />
      <Container className="mt-24 md:mt-28">
        <Prose>
          <h2>Welcome to Nigeria's Microgrid Map!</h2>

          <h2>What Are Microgrids?</h2>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            Think of microgrids as neighborhood power networks. They're local
            energy systems that can either connect to Nigeria's main grid or
            operate independently when needed. Picture a community powered by
            solar panels that keeps the lights on even during grid outages –
            that's the magic of microgrids!
          </p>

          <h2>Why Nigeria Needs Microgrids</h2>
          <ol>
            <li>
              <strong>Reliable Power:</strong> No more "UP NEPA" surprises!
              Microgrids keep communities powered during outages.
            </li>
            <li>
              <strong>Cost Savings:</strong> Cheaper than extending national
              grid lines to remote villages.
            </li>
            <li>
              <strong>Clean EnergyBoost:</strong> Perfect for scaling up solar
              and wind power in our sunny/windy regions.
            </li>
          </ol>

          <h2>The Problem We're Solving</h2>
          <p>
            Right now, nobody knows exactly how many microgrids exist across
            Nigeria – not government agencies, researchers, or even energy
            companies. With the new Electricity Act encouraging local power
            solutions, this information gap is holding back progress.
          </p>

          <h2>Our Solution: Your Knowledge, Our Map</h2>
          <p>
            This platform crowdsources microgrid locations to create Nigeria's
            first live map tracking:
          </p>
          <ul>
            <li>Existing community power projects</li>
            <li>New microgrids under development</li>
            <li>Solar/hybrid systems powering schools, clinics & businesses</li>
          </ul>

          <h2>How You Help</h2>
          <p>
            When you report a microgrid (whether it's your cousin's
            solar-powered business in Lagos or a community project in Kano),
            you're helping:
          </p>
          <ul>
            <li> Researchers understand what's working</li>
            <li> Policymakers design better energy laws</li>
            <li> Communities find reliable power solutions</li>
          </ul>

          <h2>Behind This Project</h2>
          <p>
            <em>
              "I'm a Nigerian law PhD candidate at Durham University,
              researching how our new Electricity Act can make microgrids easier
              to deploy. This map is my fieldwork, helping us see where
              microgrids are succeeding and where regulations need improvement
              to power Nigeria's energy future."
              <Link
                aria-hidden="true"
                to="/author"
                className="flex items-center"
              >
                Read more about me
                <ChevronRightIcon className="ml-1 h-4 w-4 stroke-current" />
              </Link>
            </em>
          </p>

          <h2>Join Our Movement:</h2>
          <p>
            Every pin on this map brings us closer to solving Nigeria's energy
            puzzle. Add a microgrid you know, explore what others have shared,
            and let's light up Nigeria together!
          </p>
          <ChevronRightIcon className="ml-1 h-4 w-4 stroke-current" />
        </Prose>
      </Container>
    </>
  )
}

function Photos() {
  let rotations = ['rotate-2', '-rotate-2', 'rotate-2', 'rotate-2', '-rotate-2']

  return (
    <div className="mt-16 sm:mt-20">
      <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
        {[image1, image2, image3, image4, image5].map((image, imageIndex) => (
          <div
            key={image}
            className={clsx(
              'relative aspect-9/10 w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 sm:w-72 sm:rounded-2xl dark:bg-zinc-800',
              rotations[imageIndex % rotations.length],
            )}
          >
            <img
              src={image}
              alt=""
              sizes="(min-width: 640px) 18rem, 11rem"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

function ChevronRightIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M6.75 5.75 9.25 8l-2.5 2.25"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
