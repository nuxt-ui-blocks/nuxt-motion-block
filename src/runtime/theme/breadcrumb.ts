import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'inline-flex',
    list: 'flex flex-wrap items-center gap-1.5 text-sm text-muted sm:gap-2.5',
    item: 'inline-flex items-center gap-1.5',
    separator: 'mr-1.5',
    link: 'transition-colors hover:text-highlighted',
    current: 'font-normal text-highlighted',
    plain: 'text-muted',
  },
}

export type BreadcrumbTheme = typeof defaultTheme

export type BreadcrumbConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'breadcrumb', 'ui'>

export default defaultTheme
