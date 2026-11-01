import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'relative inline-block cursor-zoom-in overflow-hidden rounded-xl',
    image: 'block size-full object-cover',
    lens: 'pointer-events-none absolute rounded-full border border-white/50 bg-no-repeat shadow-2xl transition-opacity duration-200',
  },
}

export type LensTheme = typeof defaultTheme

export type LensConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'lens', 'ui'>

export default defaultTheme
