import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'space-y-3',
    cardRoot: '',
    cardBody: '',
    header: 'flex items-start justify-between cursor-pointer',
    headerContent: 'flex-1 min-w-0',
    title: 'text-lg font-semibold text-highlighted',
    chevron: 'ml-2 flex-shrink-0 text-muted',
    chevronIcon: 'w-5 h-5',
    collapsible: 'overflow-hidden',
    content: 'pt-4',
    contentText: 'text-muted',
  },
}

export type ExpandableCardsTheme = typeof defaultTheme

export type ExpandableCardsConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'expandableCards', 'ui'>

export default defaultTheme
