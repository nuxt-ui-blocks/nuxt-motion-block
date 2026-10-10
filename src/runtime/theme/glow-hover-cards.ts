import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6',
    card: 'relative overflow-hidden transition-shadow duration-300',
    content: 'space-y-2',
    title: 'text-lg font-semibold text-highlighted',
    description: 'text-sm text-muted',
  },
}

export type GlowHoverCardsTheme = typeof defaultTheme

export type GlowHoverCardsConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'glowHoverCards', 'ui'>

export default defaultTheme
