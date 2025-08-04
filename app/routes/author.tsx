import { AuthorView } from '@/pages/author'

// ----------------------------------------------------------------------

export function meta() {
  return [
    { title: 'Ekanem Bassey | Energy Law & Policy Expert' },
    {
      name: 'description',
      content:
        'Discover the thought leadership of Ekanem Bassey in energy law, gas and power regulation, clean fuels policy, and strategic insights for the oil & gas industry.',
    },
  ]
}

export default function Author() {
  return <AuthorView />
}
