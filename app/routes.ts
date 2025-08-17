import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from '@react-router/dev/routes'

export default [
  layout('./layouts/layout.tsx', [
    index('routes/home.tsx'),

    route('author', 'routes/author.tsx'),

    route('about', 'routes/about.tsx'),

    route('blog', 'routes/blog/blog.tsx'),

    route('submit-microgrid', 'routes/submit-microgrid.tsx'),

    route('service-providers', 'routes/service-providers.tsx'),

    ...prefix('dashboard', [
      route(':tab', './routes/dashboard/dashboard.tsx'),
      route(':tab/:name', './routes/dashboard/dashboard-view.tsx'),
      route(':tab:name/edit', './routes/dashboard/dashboard-edit.tsx'),
    ]),

    route('dashboard2', './temp/admin-dashboard.tsx'),

    route(
      'blog/powering-nigeria-one-community-at-a-time',
      './routes/blog/posts/powering-nigeria-one-community-at-a-time.mdx',
    ),

    route('map-explorer', 'routes/map-explorer/map-explorer.tsx', [
      index('./routes/map-explorer/map-nav.tsx'),
      route(':name', 'routes/map-explorer/map-details.tsx'),
    ]),

    route('*', 'routes/not-found.tsx'),
  ]),

  layout('./layouts/auth-layout.tsx', [
    route('login', 'routes/auth/login.tsx'),
  ]),
] satisfies RouteConfig
