import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'mx-auto overflow-hidden rounded-xl border border-default bg-elevated shadow-xl',
    bar: 'flex items-center gap-1.5 border-b border-default px-4 py-3',
    light: 'size-3 rounded-full',
    address: 'ml-3 flex-1 truncate rounded-md bg-default px-3 py-1 text-xs text-muted',
    content: 'bg-background',
  },
}

export type SafariTheme = typeof defaultTheme

export type SafariConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'safari', 'ui'>

export default defaultTheme
