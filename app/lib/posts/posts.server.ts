/*global process */

import glob from 'fast-glob'
import matter from 'gray-matter'
import path from 'path'
import fs from 'fs/promises'
import type { PostFrontmatter, PostFrontmatterWithSlug } from './types'

// ----------------------------------------------------------------------

const POSTS_PATH = path.join(process.cwd(), 'app/routes/blogs')

export async function getAllPosts(): Promise<PostFrontmatterWithSlug[]> {
  const postsPath = await glob('**/*.mdx', {
    cwd: POSTS_PATH,
  })

  const posts = await Promise.all(
    postsPath.map(async (filePath) => {
      const fullPath = path.join(POSTS_PATH, filePath)
      const fileContent = await fs.readFile(fullPath, 'utf-8')
      const { data } = matter(fileContent)

      return {
        ...(data as PostFrontmatter),
        slug: filePath.replace(/\.mdx$/, ''),
      }
    }),
  )

  return sortBy(posts, (post) => post.published, 'desc')
}

export async function getPost(
  slug: string,
): Promise<PostFrontmatterWithSlug | null> {
  try {
    const fullPath = path.join(POSTS_PATH, `${slug}.mdx`)
    const fileContent = await fs.readFile(fullPath, 'utf-8')
    const { data } = matter(fileContent)

    return {
      ...(data as PostFrontmatter),
      slug,
    }
  } catch (error) {
    console.error(error)
    return null
  }
}

function sortBy<T>(
  arr: T[],
  key: (item: T) => string | number | Date,
  dir: 'asc' | 'desc' = 'asc',
): T[] {
  return arr.sort((a, b) => {
    const res = compare(key(a), key(b))
    return dir === 'asc' ? res : -res
  })
}

function compare<T>(a: T, b: T): number {
  if (a < b) return -1
  if (a > b) return 1
  return 0
}
