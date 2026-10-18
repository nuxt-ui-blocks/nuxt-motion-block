import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'relative overflow-hidden',
    mask: 'absolute inset-0 z-10 flex items-center justify-center',
    content: 'text-center p-6',
    iconWrapper: 'mb-4',
    icon: 'w-12 h-12 mx-auto text-white',
    label: 'text-white text-lg font-medium',
  },
}

export type MaskContainerTheme = typeof defaultTheme

export type MaskContainerConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'maskContainer', 'ui'>

export default defaultTheme
