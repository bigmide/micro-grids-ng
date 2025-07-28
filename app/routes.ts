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
    route('submit-microgrid', 'routes/submit-microgrid.tsx'),
    route('submit-microgrid2', 'routes/submit-microgrid-copy.tsx'),
    route('solar-providers', 'routes/solar-providers.tsx'),
    route('solar-providers2', 'routes/solar-providers-copy.tsx'),
    route('dashboard', 'routes/admin-dashboard.tsx'),
    route(
      'blog/powering-nigeria-one-community-at-a-time',
      './routes/blogs/powering-nigeria-one-community-at-a-time.mdx',
    ),
    route('map-explorer', 'routes/map-explorer.tsx', [
      index('./components/microgrid-nav.tsx'),
      route(':name', './components/microgrid-details.tsx'),
    ]),
  ]),
] satisfies RouteConfig
