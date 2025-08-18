import { Container } from '~/components/container'
import { InstagramIcon } from '~/components/icons/instagram-icon'
import { LinkedInIcon } from '~/components/icons/linked-in-icon'
import { MailIcon } from '~/components/icons/mail-icon'
import { XIcon } from '~/components/icons/x-icon'
import { SocialLink } from '~/components/social-link'
import portraitImage from '~/images/portrait.jpeg'

// ----------------------------------------------------------------------

export function AuthorView() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <img
              src={portraitImage}
              alt="Ekanem-Bassey-Portrait-Image"
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
          </div>
        </div>

        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            I’m Ekanem Bassey. I live in Durham, where I shape the future of energy and law.
          </h1>

          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <p>
              I’ve always been drawn to the intersection of policy, people, and power, not just the kind that fuels our
              homes, but the kind that drives systems, governs nations, and transforms industries. Growing up in
              Nigeria, I witnessed firsthand how natural resources can define a country’s path, and I became committed
              to ensuring they do so responsibly and sustainably.
            </p>
            <p>
              After earning my law degree, I found my place in the energy sector, a space where regulation, investment,
              and innovation collide. For over seven years, I’ve served with the Nigerian Upstream Petroleum Regulatory
              Commission (NUPRC), helping to craft the legal and regulatory frameworks that shape Nigeria’s energy
              landscape. From upstream oil and gas to clean fuels and just transitions, I’ve worked at the forefront of
              policy, compliance, and energy reform.
            </p>
            <p>
              Now based in Durham, England, I’m pursuing a Ph.D. in law while teaching part-time at Durham Law School.
              My academic work focuses on energy transition, regulatory frameworks, and the legal dimensions of
              sustainable development, themes that also inform my practical consulting on renewable energy, solar
              investment, and corporate compliance.
            </p>
            <p>
              Today, my work bridges continents and sectors, from Nigeria’s evolving oil and gas markets to the global
              push for decarbonisation. And while I may not wear a spacesuit, I’m committed to helping Nigeria make its
              next great leap.
            </p>
          </div>
        </div>

        <div className="lg:pl-20">
          <ul>
            <SocialLink href="#" icon={XIcon}>
              Follow on X
            </SocialLink>
            <SocialLink href="#" icon={InstagramIcon} className="mt-4">
              Follow on Instagram
            </SocialLink>
            <SocialLink href="https://www.linkedin.com/in/ekanem-bassey-72960a52" icon={LinkedInIcon} className="mt-4">
              Follow on LinkedIn
            </SocialLink>
            <SocialLink
              href="mailto:ekanembppp@gmail.com"
              icon={MailIcon}
              className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
            >
              ekanembppp@gmail.com
            </SocialLink>
          </ul>
        </div>
      </div>
    </Container>
  )
}
