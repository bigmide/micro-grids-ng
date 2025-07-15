import { Card } from '@/components/card'
import { SimpleLayout } from '@/components/simple-layout'
import { formatDate } from '@/lib/formatDate'
import type { PostFrontmatterWithSlug } from '@/lib/posts/types'

// ----------------------------------------------------------------------

export function BlogView({ posts }: { posts: PostFrontmatterWithSlug[] }) {
  return (
    <SimpleLayout
      title="Writing on software design, company building, and the aerospace industry."
      intro="All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order."
    >
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {posts.map((post) => (
            <Post key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </SimpleLayout>
  )
}

// ----------------------------------------------------------------------

function Post({ post }: { post: PostFrontmatterWithSlug }) {
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
