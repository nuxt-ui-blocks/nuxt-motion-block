import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'relative',
    card: 'absolute w-full h-full',
    header: 'flex items-center justify-between',
    title: 'text-lg font-semibold text-highlighted',
    content: 'flex-1 font-normal text-default',
    footer: 'flex items-center gap-2',
    avatar: 'rounded-full',
    name: 'text-muted font-medium dark:text-inverted',
    designation: 'text-muted font-normal dark:text-default text-sm',
  },
}

export type CardStackTheme = typeof defaultTheme

export type CardStackConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'cardStack', 'ui'>

export default defaultTheme
