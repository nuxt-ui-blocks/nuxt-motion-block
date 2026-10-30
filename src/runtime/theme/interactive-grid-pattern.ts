import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'interactive-grid-pattern absolute inset-0 h-full w-full',
    square: 'transition-colors duration-100',
  },
}

export type InteractiveGridPatternTheme = typeof defaultTheme

export type InteractiveGridPatternConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'interactiveGridPattern', 'ui'>

export default defaultTheme
