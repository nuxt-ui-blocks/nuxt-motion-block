import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'inline-block',
    srOnly: 'sr-only',
    space: 'inline-block whitespace-pre',
    char: 'inline-block h-[1em] overflow-hidden align-bottom leading-none',
    column: 'flex flex-col',
    glyph: 'block h-[1em] leading-none',
  },
}

export type RollingTextTheme = typeof defaultTheme

export type RollingTextConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'rollingText', 'ui'>

export default defaultTheme
