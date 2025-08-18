import { AboutView } from '~/pages/about'

// ----------------------------------------------------------------------

export function meta() {
  return [
    { title: 'About | Microgrids NG' },
    {
      name: 'description',
      content:
        'Learn about Micro-Grids NG — our mission, vision, and commitment to advancing sustainable and decentralized energy systems across Nigeria.',
    },
  ]
}

export default function Home() {
  return <AboutView />
}
