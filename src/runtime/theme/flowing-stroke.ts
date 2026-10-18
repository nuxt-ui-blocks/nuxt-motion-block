import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'relative overflow-hidden',
    svg: 'w-full h-full block',
  },
}

export type FlowingStrokeTheme = typeof defaultTheme

export type FlowingStrokeConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'flowingStroke', 'ui'>

export default defaultTheme
