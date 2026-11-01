import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'relative h-full w-full overflow-hidden',
    canvas: 'pointer-events-none absolute inset-0 h-full w-full',
  },
}

export type FlickeringGridTheme = typeof defaultTheme

export type FlickeringGridConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'flickeringGrid', 'ui'>

export default defaultTheme
