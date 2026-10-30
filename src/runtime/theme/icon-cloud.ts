import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'relative h-full w-full overflow-hidden',
    canvas: 'absolute inset-0 h-full w-full cursor-grab touch-none active:cursor-grabbing',
  },
}

export type IconCloudTheme = typeof defaultTheme

export type IconCloudConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'iconCloud', 'ui'>

export default defaultTheme
