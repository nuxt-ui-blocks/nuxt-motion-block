import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'relative inline-block',
    highlight: 'pointer-events-none absolute inset-x-[-0.18em] inset-y-[0.06em] origin-left rounded-[0.2em] bg-primary/30',
    text: 'relative z-10',
  },
}

export type TextHighlighterTheme = typeof defaultTheme

export type TextHighlighterConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'textHighlighter', 'ui'>

export default defaultTheme
