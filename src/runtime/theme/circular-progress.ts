import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'relative inline-flex items-center justify-center',
    svg: '-rotate-90',
    track: 'stroke-current text-muted/20',
    indicator: 'stroke-current text-primary',
    label: 'absolute inset-0 flex flex-col items-center justify-center text-highlighted',
    value: 'text-lg font-semibold tabular-nums',
    caption: 'text-xs text-muted',
  },
}

export type CircularProgressTheme = typeof defaultTheme

export type CircularProgressConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'circularProgress', 'ui'>

export default defaultTheme
