import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'size-full',
    map: 'size-full text-muted',
    fallback: 'flex h-full w-full flex-col items-center justify-center gap-2 p-6 text-center text-sm text-muted',
  },
}

export type DottedMapTheme = typeof defaultTheme

export type DottedMapConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'dottedMap', 'ui'>

export default defaultTheme
