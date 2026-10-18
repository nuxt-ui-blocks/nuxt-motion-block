import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'flex flex-col gap-2 m-animated-list',
    row: 'list-none',
  },
}

export type AnimatedListTheme = typeof defaultTheme

export type AnimatedListConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'animatedList', 'ui'>

export default defaultTheme
