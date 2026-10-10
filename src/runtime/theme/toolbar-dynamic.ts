import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'relative flex items-center h-12 rounded-2xl bg-default/80 dark:bg-default/80 backdrop-blur-xl border border-default/10 dark:border-default/10 shadow-2xl shadow-black/20 overflow-hidden',
    inner: 'flex items-center justify-center h-full shrink-0 overflow-hidden whitespace-nowrap',
    toggle: 'flex items-center justify-center w-12 h-full shrink-0',
    collapsed: 'flex items-center gap-1 pr-3 shrink-0',
    expanded: 'flex-1 flex items-center h-full px-4',
  },
}

export type ToolbarDynamicTheme = typeof defaultTheme

export type ToolbarDynamicConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'toolbarDynamic', 'ui'>

export default defaultTheme
