import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'grid w-full auto-rows-[18rem] grid-cols-1 gap-4',
  },
  variants: {
    cols: {
      1: { root: 'grid-cols-1' },
      2: { root: 'grid-cols-1 md:grid-cols-2' },
      3: { root: 'grid-cols-1 md:grid-cols-3' },
      4: { root: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' },
      5: { root: 'grid-cols-1 md:grid-cols-3 lg:grid-cols-5' },
      6: { root: 'grid-cols-1 md:grid-cols-3 lg:grid-cols-6' },
    },
  },
  defaultVariants: {
    cols: 3 as const,
  },
}

export type BentoGridTheme = typeof defaultTheme

export type BentoGridConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'bentoGrid', 'ui'>

export default defaultTheme
