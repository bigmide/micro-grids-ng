import { BlogView } from '@/pages/blog'
import { getAllPosts } from '@/lib/posts/posts.server'
import type { Route } from './+types/blog'

// ----------------------------------------------------------------------

export function meta() {
  return [
    { title: 'Article' },
    {
      name: 'description',
      content:
        'I’m Ekanem Bassey, shaping the future of energy and law—power, gas, clean fuels, policy, and regulatory strategy across the oil & gas sector.',
    },
  ]
}

export async function loader() {
  const posts = await getAllPosts()
  return posts
}

export default function Blog({ loaderData }: Route.ComponentProps) {
  return <BlogView posts={loaderData} />
}
