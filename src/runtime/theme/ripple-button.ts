import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'relative inline-flex items-center justify-center overflow-hidden rounded-lg border border-default bg-elevated px-6 py-3 text-sm font-medium text-highlighted transition active:scale-[0.98]',
    ripple: 'pointer-events-none absolute size-8 rounded-full bg-primary/40',
    label: 'relative z-10',
  },
}

export type RippleButtonTheme = typeof defaultTheme

export type RippleButtonConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'rippleButton', 'ui'>

export default defaultTheme
