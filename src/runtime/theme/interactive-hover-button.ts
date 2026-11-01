import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'group relative inline-flex h-10 w-36 items-center justify-center overflow-hidden rounded-full border border-default bg-background text-sm font-medium text-highlighted transition-colors duration-300 hover:border-primary',
    dot: 'absolute left-3 top-1/2 size-2 -translate-y-1/2 rounded-full bg-primary transition-all duration-300 ease-out group-hover:left-0 group-hover:top-0 group-hover:size-full group-hover:translate-y-0 group-hover:rounded-none',
    label: 'relative z-10 flex items-center gap-1 transition-all duration-300 group-hover:translate-x-2 group-hover:text-inverted',
    arrow: 'relative z-10 size-4 -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-inverted',
  },
}

export type InteractiveHoverButtonTheme = typeof defaultTheme

export type InteractiveHoverButtonConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'interactiveHoverButton', 'ui'>

export default defaultTheme
