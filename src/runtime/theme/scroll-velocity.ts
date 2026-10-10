import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: '',
    parallax: 'relative overflow-hidden',
    scroller: 'flex whitespace-nowrap text-center font-sans text-4xl font-bold tracking-[-0.02em] drop-shadow md:text-[5rem] md:leading-[5rem]',
    text: 'flex-shrink-0',
  },
}

export type ScrollVelocityTheme = typeof defaultTheme

export type ScrollVelocityConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'scrollVelocity', 'ui'>

export default defaultTheme
