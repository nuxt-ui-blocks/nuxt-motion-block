import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'relative',
    svg: 'h-full w-full',
    marker: 'pointer-events-none absolute top-0 left-0',
    markerInner: '-translate-x-1/2 -translate-y-1/2',
  },
}

export type SvgDrawOnScrollTheme = typeof defaultTheme
export type SvgDrawOnScrollConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'svgDrawOnScroll', 'ui'>
export default defaultTheme
