import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'relative flex items-center justify-center overflow-hidden',
    video: 'absolute inset-0 size-full object-cover',
    mask: 'relative flex size-full items-center justify-center',
    text: 'text-center font-black uppercase leading-none tracking-tight',
  },
}

export type VideoTextTheme = typeof defaultTheme

export type VideoTextConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'videoText', 'ui'>

export default defaultTheme
