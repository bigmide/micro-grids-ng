import { Card } from '@/components/card'
import { formatDate } from '@/utils/format-date'
import type { PostFrontmatterWithSlug } from '../types/post.types'

// ----------------------------------------------------------------------

export function Post({ post }: { post: PostFrontmatterWithSlug }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/blog/${post.slug}`}>{post.title}</Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={post.published}
          className="md:hidden"
          decorate
        >
          {formatDate(post.published)}
        </Card.Eyebrow>
        <Card.Description>{post.description}</Card.Description>
        <Card.Cta>Read post</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={post.published}
        className="mt-1 max-md:hidden"
      >
        {formatDate(post.published)}
      </Card.Eyebrow>
    </article>
  )
}
