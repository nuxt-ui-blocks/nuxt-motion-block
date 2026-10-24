import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'relative text-default leading-relaxed',
    text: 'text-pretty',
    /** Anchor for the popover; the `pt-2`/`pb-2` bridge is added in the template. */
    cardWrapper: 'absolute z-20',
    /**
     * An enriched word, not a chip: it keeps the paragraph's size and colour and
     * only picks up a face and a hairline rule under it.
     */
    trigger: 'group mx-[0.12em] inline-flex cursor-pointer items-center gap-[0.32em] rounded-[0.3em] align-middle font-medium text-highlighted outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-default',
    avatar: 'shrink-0 rounded-full object-cover ring-1 ring-default transition-shadow duration-150 ease-out',
    initials: 'flex shrink-0 items-center justify-center rounded-full bg-muted font-semibold text-muted ring-1 ring-default transition-shadow duration-150 ease-out',
    /** `leading-none` keeps the rule tight under the name instead of at the line box's bottom. */
    name: 'border-b-[1.5px] border-muted pb-[0.08em] leading-none transition-colors duration-150 ease-out group-hover:border-accented',
    card: 'rounded-xl border border-default bg-default p-4 text-left shadow-[0_1px_2px_rgb(0_0_0/0.05),0_14px_32px_-14px_rgb(0_0_0/0.28)] dark:shadow-[0_1px_2px_rgb(0_0_0/0.4),0_14px_32px_-14px_rgb(0_0_0/0.7)]',
    cardHead: 'flex items-center gap-3',
    cardName: 'truncate text-sm font-semibold text-highlighted',
    cardRole: 'truncate text-xs text-muted',
    quote: 'mt-3 text-sm leading-relaxed text-default',
    rating: 'mt-3 flex items-center gap-0.5',
    star: 'size-3.5',
  },
}

export type InlineTestimonialsTheme = typeof defaultTheme

export type InlineTestimonialsConfig = ComponentConfig<
  typeof defaultTheme,
  Record<string, any>,
  'inlineTestimonials',
  'ui'
>

export default defaultTheme
