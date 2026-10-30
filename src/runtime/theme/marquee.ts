import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'group flex overflow-hidden',
    track: 'mb-marquee-x flex w-max shrink-0',
    trackVertical: 'mb-marquee-y flex h-max shrink-0 flex-col',
  },
}

export type MarqueeTheme = typeof defaultTheme

export type MarqueeConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'marquee', 'ui'>

export default defaultTheme
