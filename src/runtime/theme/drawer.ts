import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: '',
    overlay: 'bg-default/50 backdrop-blur-sm',
    content: 'flex flex-1 flex-col',
    handle: 'mx-auto mt-4 h-1.5 w-12 shrink-0 rounded-full bg-accented',
    header: 'px-6 py-4 border-b border-default',
    body: 'flex-1 overflow-y-auto px-6 py-4',
    footer: 'px-6 py-4 border-t border-default',
    headerContent: 'flex flex-col gap-1',
    title: 'text-lg font-semibold text-highlighted',
    description: 'text-sm text-muted',
  },
}

export type DrawerTheme = typeof defaultTheme

export type DrawerConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'drawer', 'ui'>

export default defaultTheme
