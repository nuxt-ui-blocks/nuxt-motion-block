import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'group relative inline-flex items-center justify-center overflow-hidden rounded-lg p-px text-sm font-medium active:scale-[0.98]',
    gradient: 'pointer-events-none absolute inset-[-100%] bg-[conic-gradient(from_90deg_at_50%_50%,#e2cbff_0%,#393bb2_50%,#e2cbff_100%)]',
    label: 'relative z-10 inline-flex w-full items-center justify-center rounded-[inherit] bg-background px-6 py-3 text-highlighted',
  },
}

export type RainbowButtonTheme = typeof defaultTheme

export type RainbowButtonConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'rainbowButton', 'ui'>

export default defaultTheme
