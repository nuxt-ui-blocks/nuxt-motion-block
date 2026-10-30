import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'pointer-events-none fixed inset-0 z-50',
    canvas: 'size-full',
  },
}

export type ConfettiTheme = typeof defaultTheme

export type ConfettiConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'confetti', 'ui'>

export default defaultTheme
