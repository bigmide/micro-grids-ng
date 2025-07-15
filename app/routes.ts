import {
  type RouteConfig,
  index,
  layout,
  route,
} from '@react-router/dev/routes'

export default [
  layout('./components/layout.tsx', [
    index('routes/home.tsx'),
    route('author', 'routes/author.tsx'),
    route('about', 'routes/about.tsx'),
    route('blog', 'routes/blog.tsx'),
    route(
      'blog/powering-nigeria-one-community-at-a-time',
      './routes/blogs/powering-nigeria-one-community-at-a-time.mdx',
    ),
    route('mapping-micro-grids', 'routes/mapping.tsx'),
  ]),
] satisfies RouteConfig
