import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'relative',
    item: 'will-change-transform',
  },
  variants: {
    direction: {
      grid: {
        root: 'grid gap-4',
      },
      row: {
        root: 'flex flex-wrap gap-4',
      },
      column: {
        root: 'space-y-4',
      },
    },
    columns: {
      1: {
        root: 'grid-cols-1',
      },
      2: {
        root: 'grid-cols-2',
      },
      3: {
        root: 'grid-cols-3',
      },
      4: {
        root: 'grid-cols-4',
      },
      5: {
        root: 'grid-cols-5',
      },
      6: {
        root: 'grid-cols-6',
      },
      12: {
        root: 'grid-cols-12',
      },
    },
  },
}

export type DynamicGroupTheme = typeof defaultTheme

export type DynamicGroupConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'dynamicGroup', 'ui'>

export default defaultTheme
