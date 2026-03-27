const HEADLINES = [
  'What does a stress-free wedding actually look like?',
  '50 years of weddings. Yours is next.',
  '1,000+ five-star reviews on Google. Come see why.',
] as const

export type HeadlineVariant = 'A' | 'B' | 'C'

const STORAGE_KEY = 'rt_headline_variant'

export function getHeadlineVariant(): HeadlineVariant {
  if (typeof window === 'undefined') return 'A'

  // Check URL param first (for forcing a variant in ads)
  const params = new URLSearchParams(window.location.search)
  const forced = params.get('v')?.toUpperCase() as HeadlineVariant | undefined
  if (forced && ['A', 'B', 'C'].includes(forced)) {
    localStorage.setItem(STORAGE_KEY, forced)
    return forced
  }

  // Check localStorage for returning visitors
  const stored = localStorage.getItem(STORAGE_KEY) as HeadlineVariant | null
  if (stored && ['A', 'B', 'C'].includes(stored)) return stored

  // Random assignment
  const variants: HeadlineVariant[] = ['A', 'B', 'C']
  const picked = variants[Math.floor(Math.random() * variants.length)]
  localStorage.setItem(STORAGE_KEY, picked)
  return picked
}

export function getHeadline(variant: HeadlineVariant): string {
  switch (variant) {
    case 'A': return HEADLINES[0]
    case 'B': return HEADLINES[1]
    case 'C': return HEADLINES[2]
  }
}
