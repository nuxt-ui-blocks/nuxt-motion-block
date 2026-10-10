import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'relative w-full select-none outline-none',
    stage: 'relative mx-auto flex h-[320px] items-center justify-center',
    card: 'absolute h-[220px] w-[280px] overflow-hidden rounded-2xl border border-foreground/10 bg-background shadow-xl',
    image: 'h-full w-full object-cover',
    content: 'flex h-full w-full items-center justify-center p-4 text-sm',
    controls: 'mt-4 flex items-center justify-center gap-4',
    button: 'rounded-full border border-default bg-default px-4 py-1.5 text-sm text-default transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50',
    status: 'sr-only',
  },
}

export type CoverflowCarouselTheme = typeof defaultTheme

export type CoverflowCarouselConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'coverflowCarousel', 'ui'>

export default defaultTheme
