import { HomeView } from '@/pages/home'

// ----------------------------------------------------------------------

export function meta() {
  return [
    { title: 'Micro-Grids NG' },
    { name: 'description', content: 'Welcome to Micro-grid NG!' },
  ]
}

export default function Home() {
  return <HomeView />
}
