import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'fixed inset-0 z-50 flex items-center justify-center bg-(--ui-bg-inverted)/50 backdrop-blur-sm',
    panel: 'flex flex-col items-center gap-4 p-6 rounded-xl bg-default/80 backdrop-blur-sm shadow-xl',
    progress: 'w-48',
    spinnerIcon: 'w-8 h-8 text-primary',
    label: 'text-sm text-muted',
  },
}

export type PagePreloaderTheme = typeof defaultTheme

export type PagePreloaderConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'pagePreloader', 'ui'>

export default defaultTheme
