import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'relative',
    svg: 'absolute h-0 w-0',
    content: 'h-full w-full',
  },
}

export type SvgClipMaskTheme = typeof defaultTheme
export type SvgClipMaskConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'svgClipMask', 'ui'>
export default defaultTheme
