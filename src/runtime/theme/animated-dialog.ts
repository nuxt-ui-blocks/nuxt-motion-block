import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: '',
    content: 'relative overflow-hidden backdrop-blur-sm outline-none focus:outline-none border-default bg-default text-default',
    contentInner: 'will-change-transform',
    body: 'flex-1 p-4 sm:p-6',
    footer: 'flex items-center gap-1.5 p-4 sm:px-6 border-t border-default',
  },
}

export type AnimatedDialogTheme = typeof defaultTheme

export type AnimatedDialogConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'animatedDialog', 'ui'>

export default defaultTheme
