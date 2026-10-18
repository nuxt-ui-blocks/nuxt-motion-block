import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: '',
    header: 'flex items-start justify-between cursor-pointer',
    headerContent: 'flex-1 min-w-0',
    title: 'text-lg font-semibold text-highlighted',
    preview: 'text-sm text-muted mt-1 truncate',
    chevron: 'ml-2 flex-shrink-0 text-muted',
    chevronIcon: 'w-5 h-5',
    body: 'overflow-hidden',
    bodyInner: 'pt-4',
    bodyText: 'text-muted',
  },
}

export type MailCardTheme = typeof defaultTheme

export type MailCardConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'mailCard', 'ui'>

export default defaultTheme
