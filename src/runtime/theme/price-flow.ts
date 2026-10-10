import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'flex items-center gap-0.5 font-mono',
    inner: 'relative flex items-center gap-0.5',
    prefix: 'text-lg text-muted mr-0.5',
    currency: 'text-3xl font-bold text-highlighted',
    digit: 'inline-block text-3xl font-bold text-highlighted',
  },
}

export type PriceFlowTheme = typeof defaultTheme

export type PriceFlowConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'priceFlow', 'ui'>

export default defaultTheme
