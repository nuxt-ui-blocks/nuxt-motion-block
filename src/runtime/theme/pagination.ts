import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'mx-auto flex w-full justify-center',
    list: 'flex flex-row items-center gap-1',
    item: 'list-none',
    navButton: 'inline-flex items-center gap-1 rounded-md px-2.5 py-1.5 text-sm font-medium text-muted transition-colors hover:bg-elevated hover:text-highlighted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-default focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
    navLabel: 'hidden sm:block',
    icon: 'size-4',
    ellipsis: 'flex size-9 items-center justify-center text-sm text-muted',
    pageButton: 'relative inline-flex size-9 items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-elevated focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-default focus-visible:outline-none',
    indicator: 'absolute inset-0 rounded-md border border-default bg-default shadow-sm',
    pageLabel: 'relative z-10',
  },
  variants: {
    active: {
      true: {
        pageButton: 'text-highlighted',
      },
      false: {
        pageButton: 'text-muted',
      },
    },
  },
  defaultVariants: {
    active: false,
  },
}

export type PaginationTheme = typeof defaultTheme

export type PaginationConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'pagination', 'ui'>

export default defaultTheme
