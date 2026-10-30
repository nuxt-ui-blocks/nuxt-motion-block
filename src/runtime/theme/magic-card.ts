import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'group relative flex size-full rounded-xl border border-default bg-default',
    gradient: 'magic-gradient pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100',
    glow: 'magic-glow pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-500',
    content: 'relative z-10 flex size-full flex-col rounded-[inherit]',
  },
}

export type MagicCardTheme = typeof defaultTheme

export type MagicCardConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'magicCard', 'ui'>

export default defaultTheme
