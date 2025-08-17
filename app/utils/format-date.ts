export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

export function formatApiDate(apiDate: string): string {
  const date: Date = new Date(apiDate)

  const day: number = date.getDate()
  const month: number = date.getMonth() + 1 // Months are zero-based
  const year: number = date.getFullYear()

  return `${day}/${month}/${year}`
}
