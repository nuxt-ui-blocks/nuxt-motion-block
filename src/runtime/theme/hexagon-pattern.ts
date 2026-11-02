import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'pointer-events-none absolute inset-0 size-full fill-current stroke-current',
    highlight: 'overflow-visible',
  },
}

export type HexagonPatternTheme = typeof defaultTheme

export type HexagonPatternConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'hexagonPattern', 'ui'>

export default defaultTheme
