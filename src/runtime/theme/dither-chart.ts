import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'inline-flex flex-col gap-2 text-default',
    label: 'font-medium text-sm',
    canvas: 'block',
    description: 'sr-only',
    caption: 'text-muted text-xs',
  },
}

export type DitherChartTheme = typeof defaultTheme

export type DitherChartConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'ditherChart', 'ui'>

export default defaultTheme
