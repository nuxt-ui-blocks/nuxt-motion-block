import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'm-toast fixed top-4 right-4 z-50 flex w-80 items-center gap-3 rounded-lg border p-4 shadow-lg',
    iconWrapper: 'shrink-0',
    icon: 'h-5 w-5',
    srLabel: 'sr-only',
    message: 'flex-1 text-sm',
    close: 'shrink-0 cursor-pointer rounded-full p-1 transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none',
    closeIcon: 'h-4 w-4',
  },
  variants: {
    type: {
      error: {
        root: 'border-error/20 bg-error/10',
        icon: 'text-error',
      },
      info: {
        root: 'border-info/20 bg-info/10',
        icon: 'text-info',
      },
      success: {
        root: 'border-success/20 bg-success/10',
        icon: 'text-success',
      },
      warning: {
        root: 'border-warning/20 bg-warning/10',
        icon: 'text-warning',
      },
    },
  },
}

export type BasicToastTheme = typeof defaultTheme

export type BasicToastConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'basicToast', 'ui'>

export default defaultTheme
