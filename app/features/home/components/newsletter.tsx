import { Button } from '~/components/button'
import { MailIcon } from '~/components/icons/mail-icon'
import { Input } from '~/components/input'
import { Form } from 'react-router'

// ----------------------------------------------------------------------

export function Newsletter() {
  return (
    <Form action="/thank-you" className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <MailIcon className="h-6 w-6 flex-none" type="outline" />
        <span className="ml-3">Stay up to date</span>
      </h2>

      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Get notified when I publish something new, and unsubscribe at any time.
      </p>

      <div className="mt-6 flex items-center">
        <span className="flex min-w-0 flex-auto p-px">
          <Input type="email" placeholder="Email address" aria-label="Email address" required />
        </span>

        <Button type="submit" className="ml-4 flex-none">
          Join
        </Button>
      </div>
    </Form>
  )
}
