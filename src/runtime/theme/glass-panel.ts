import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'relative overflow-hidden',
    card: 'relative z-10 backdrop-blur-md bg-default/10 dark:bg-default/30 border border-default/20 dark:border-default/10',
    background: 'absolute inset-0 z-0 transition-transform duration-200 ease-out',
    backgroundImage: 'w-full h-full object-cover scale-110',
  },
}

export type GlassPanelTheme = typeof defaultTheme

export type GlassPanelConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'glassPanel', 'ui'>

export default defaultTheme
