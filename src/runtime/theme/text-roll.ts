import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: '',
    letter: 'relative inline-block [perspective:10000px] [transform-style:preserve-3d] [width:auto]',
    enter: 'absolute inline-block [backface-visibility:hidden] [transform-origin:50%_25%]',
    exit: 'absolute inline-block [backface-visibility:hidden] [transform-origin:50%_100%]',
    placeholder: 'invisible',
    srOnly: 'sr-only',
  },
}

export type TextRollTheme = typeof defaultTheme

export type TextRollConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'textRoll', 'ui'>

export default defaultTheme
