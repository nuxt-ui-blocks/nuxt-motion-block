import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'relative flex h-full w-full items-center justify-center overflow-hidden',
    canvas: 'size-full cursor-grab touch-none active:cursor-grabbing',
    fallback: 'flex h-full w-full flex-col items-center justify-center gap-2 p-6 text-center text-sm text-muted',
  },
}

export type GlobeTheme = typeof defaultTheme

export type GlobeConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'globe', 'ui'>

export default defaultTheme
