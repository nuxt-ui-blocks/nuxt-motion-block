import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'relative inline-flex flex-col-reverse items-center gap-2',
    bar: 'flex items-center gap-1 h-12 px-2 rounded-2xl bg-default/80 dark:bg-default/80 backdrop-blur-xl border border-default/10 dark:border-default/10 shadow-2xl shadow-black/20',
    button: 'flex items-center justify-center w-10 h-10 rounded-xl',
    panel: 'w-full rounded-2xl bg-default/90 dark:bg-default/90 backdrop-blur-xl border border-default/10 dark:border-default/10 shadow-2xl shadow-black/20 overflow-hidden',
    panelContent: 'p-4',
    content: 'text-sm text-muted dark:text-muted',
  },
  variants: {
    active: {
      true: {
        button: 'bg-muted/10 dark:bg-muted/10',
      },
      false: {
        button: '',
      },
    },
  },
}

export type ToolbarExpandableTheme = typeof defaultTheme

export type ToolbarExpandableConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'toolbarExpandable', 'ui'>

export default defaultTheme
