import { BlogView } from '@/pages/blog'
import { getAllPosts } from '@/features/blog/utils/posts.server'
import type { Route } from '../+types/blog'

// ----------------------------------------------------------------------

export function meta() {
  return [
    { title: 'Insights on Energy Law & Policy | Ekanem Bassey' },
    {
      name: 'description',
      content:
        'Explore expert insights by Ekanem Bassey on energy law, regulatory frameworks, clean fuels, power and gas policy, and strategies shaping the future of the oil & gas industry.',
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
