import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-neutral-950 px-6 py-3 text-sm font-medium text-white shadow-lg transition active:scale-[0.98] dark:bg-neutral-900',
    shimmer: 'pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/35 to-transparent',
    label: 'relative z-10',
  },
}

export type ShimmerButtonTheme = typeof defaultTheme

export type ShimmerButtonConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'shimmerButton', 'ui'>

export default defaultTheme
