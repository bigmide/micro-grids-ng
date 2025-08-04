import { Card } from '@/components/card'

// ----------------------------------------------------------------------

export function QuickLink({
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
