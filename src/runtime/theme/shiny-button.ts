import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'group relative inline-flex items-center justify-center overflow-hidden rounded-lg border border-default bg-default px-6 py-3 text-sm font-medium text-highlighted transition hover:border-accented active:scale-[0.98]',
    shine: 'pointer-events-none absolute inset-y-0 -left-full w-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-[300%]',
    label: 'relative z-10',
  },
}

export type ShinyButtonTheme = typeof defaultTheme

export type ShinyButtonConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'shinyButton', 'ui'>

export default defaultTheme
