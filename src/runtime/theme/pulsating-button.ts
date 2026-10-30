import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'group relative inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-inverted active:scale-[0.98]',
    pulse: 'pointer-events-none absolute inset-0 -z-10 rounded-[inherit] bg-primary',
    label: 'relative',
  },
}

export type PulsatingButtonTheme = typeof defaultTheme

export type PulsatingButtonConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'pulsatingButton', 'ui'>

export default defaultTheme
