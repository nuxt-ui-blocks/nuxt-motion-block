import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'relative flex flex-wrap gap-x-[0.4em] gap-y-[0.18em]',
    srOnly: 'sr-only',
  },
  variants: {
    align: {
      start: {
        root: 'justify-start',
      },
      center: {
        root: 'justify-center',
      },
      end: {
        root: 'justify-end',
      },
    },
  },
}

export type KineticTypeScrollTheme = typeof defaultTheme

export type KineticTypeScrollConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'kineticTypeScroll', 'ui'>

export default defaultTheme
