import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'relative',
    scroller: 'flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide',
    card: 'snap-start shrink-0 w-80',
    cardHeader: 'flex items-center gap-3 mb-3',
    avatar: 'w-10 h-10 rounded-full object-cover',
    authorInfo: '',
    authorName: 'font-semibold text-highlighted',
    stars: 'flex gap-0.5',
    star: 'w-4 h-4',
    content: 'text-sm text-muted leading-relaxed',
    prevButton: 'absolute left-0 top-1/2 -translate-y-1/2 -ml-3 w-8 h-8 rounded-full bg-default border border-default shadow-md flex items-center justify-center hover:bg-muted transition-colors',
    nextButton: 'absolute right-0 top-1/2 -translate-y-1/2 -mr-3 w-8 h-8 rounded-full bg-default border border-default shadow-md flex items-center justify-center hover:bg-muted transition-colors',
    chevron: 'w-4 h-4 text-inverted',
  },
}

export type ReviewsCarouselTheme = typeof defaultTheme

export type ReviewsCarouselConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'reviewsCarousel', 'ui'>

export default defaultTheme
