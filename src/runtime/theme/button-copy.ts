import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: '',
    copyIcon: 'inline-flex',
    copyIconSvg: 'w-4 h-4',
    copiedIcon: 'inline-flex text-green-400',
    copiedIconSvg: 'w-4 h-4',
    copiedLabel: 'text-green-400',
  },
}

export type ButtonCopyTheme = typeof defaultTheme

export type ButtonCopyConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'buttonCopy', 'ui'>

export default defaultTheme
