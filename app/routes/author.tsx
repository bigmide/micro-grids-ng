import { AuthorView } from '@/pages/author'

// ----------------------------------------------------------------------

export function meta() {
  return [
    { title: 'Author' },
    {
      name: 'description',
      content:
        'I’m Ekanem Bassey, shaping the future of energy and law—power, gas, clean fuels, policy, and regulatory strategy across the oil & gas sector.',
    },
  ]
}

export default function Author() {
  return <AuthorView />
}
