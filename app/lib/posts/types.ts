export interface PostFrontmatter {
  title: string
  description: string
  author: string
  published: string // YYYY-MM-DD
}

export interface PostFrontmatterWithSlug extends PostFrontmatter {
  slug: string
}
