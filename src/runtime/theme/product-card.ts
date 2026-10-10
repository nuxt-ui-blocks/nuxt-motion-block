import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'group w-full',
    media: 'relative aspect-square overflow-hidden bg-muted',
    image: 'h-full w-full object-cover',
    overlay: 'pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 transition-opacity duration-300',
    badgeWrapper: 'absolute top-3 left-3',
    badge: 'px-2.5 py-1 font-semibold shadow-sm',
    wishlistButton: 'absolute top-3 right-3 flex size-8 cursor-pointer items-center justify-center rounded-full bg-default/80 backdrop-blur-sm transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
    wishlistIcon: 'size-4',
    content: 'flex flex-1 flex-col gap-2 p-4',
    title: 'line-clamp-1 text-sm font-semibold tracking-tight text-highlighted',
    rating: 'flex items-center gap-0.5',
    starHalf: 'size-3.5 text-warning',
    star: 'size-3.5',
    ratingValue: 'ml-1 text-xs font-medium text-muted',
    priceRow: 'flex items-baseline gap-2',
    price: 'text-xl font-bold tracking-tight text-highlighted',
    priceOld: 'text-sm text-muted line-through',
    discount: 'rounded-md bg-error/10 px-1.5 py-0.5 text-xs font-semibold text-error',
    footer: 'mt-auto pt-2',
    buttonLabel: 'flex items-center gap-2',
  },
}

export type ProductCardTheme = typeof defaultTheme

export type ProductCardConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'productCard', 'ui'>

export default defaultTheme
