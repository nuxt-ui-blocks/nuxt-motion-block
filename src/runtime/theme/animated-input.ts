import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'relative flex items-center',
    icon: 'pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-dimmed',
    iconGlyph: 'h-4 w-4',
    input: 'peer w-full rounded-md border-0 appearance-none placeholder:text-dimmed disabled:cursor-not-allowed disabled:opacity-75 transition-colors px-2.5 py-1.5 text-base/5 md:text-sm gap-1.5 text-highlighted bg-default ring ring-inset ring-accented outline-primary/25 focus-visible:outline-3 focus-visible:ring-primary',
    label: 'pointer-events-none absolute top-1/2 left-3 origin-left -translate-y-1/2 rounded-md border border-transparent bg-default px-1 transition-colors',
  },
}

export type AnimatedInputTheme = typeof defaultTheme

export type AnimatedInputConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'animatedInput', 'ui'>

export default defaultTheme
