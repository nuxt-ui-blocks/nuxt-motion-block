import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    viewport: 'm-toaster fixed z-[100] flex w-[calc(100%-2rem)] flex-col gap-3 sm:w-96',
    root: 'pointer-events-auto relative flex gap-2.5 overflow-hidden rounded-lg bg-default p-4 shadow-lg ring ring-default',
    icon: 'size-5 shrink-0',
    wrapper: 'flex w-0 flex-1 flex-col',
    title: 'text-sm font-medium text-highlighted',
    description: 'text-sm text-muted',
    close: 'shrink-0 cursor-pointer rounded-full p-1 transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none',
    closeIcon: 'h-4 w-4',
  },
  variants: {
    position: {
      'top-left': { viewport: 'top-4 left-4' },
      'top-center': { viewport: 'top-4 left-1/2 -translate-x-1/2' },
      'top-right': { viewport: 'top-4 right-4' },
      'bottom-left': { viewport: 'bottom-4 left-4' },
      'bottom-center': { viewport: 'bottom-4 left-1/2 -translate-x-1/2' },
      'bottom-right': { viewport: 'bottom-4 right-4' },
    },
    color: {
      error: { icon: 'text-error' },
      info: { icon: 'text-info' },
      neutral: { icon: 'text-highlighted' },
      primary: { icon: 'text-primary' },
      success: { icon: 'text-success' },
      warning: { icon: 'text-warning' },
    },
  },
  defaultVariants: {
    color: 'neutral',
    position: 'top-right',
  },
}

export type ToasterTheme = typeof defaultTheme

export type ToasterConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'toaster', 'ui'>

export default defaultTheme
