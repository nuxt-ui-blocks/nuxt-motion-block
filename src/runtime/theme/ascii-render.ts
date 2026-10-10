import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'relative isolate overflow-hidden rounded-xl bg-default',
    media: '',
    pre: 'm-0 select-none whitespace-pre font-mono',
    srOnly: 'sr-only',
  },
  variants: {
    color: {
      mono: {
        pre: 'text-default',
      },
      source: {
        pre: 'bg-clip-text text-transparent',
      },
    },
  },
}

export type AsciiRenderTheme = typeof defaultTheme

export type AsciiRenderConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'asciiRender', 'ui'>

export default defaultTheme
