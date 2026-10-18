import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'w-full overflow-hidden rounded-xl border border-default bg-default',
    header: 'flex items-center gap-2 border-b border-default px-3 py-2',
    title: 'min-w-0 truncate font-mono text-xs text-default',
    stats: 'ml-auto flex shrink-0 items-center gap-1.5 text-xs tabular-nums',
    statAdded: 'text-[oklch(58%_0.17_150)]',
    statRemoved: 'text-error',
    body: 'overflow-hidden',
    actions: 'flex items-center justify-end gap-2 border-t border-default px-3 py-2',
    reject: 'cursor-pointer rounded-lg px-2.5 py-1 text-xs text-muted transition-colors hover:bg-muted hover:text-default',
    accept: 'cursor-pointer rounded-lg bg-inverted px-2.5 py-1 text-xs text-inverted',
    decision: 'border-t border-default px-3 py-2 text-xs capitalize text-muted',
  },
}

export type AiDiffTheme = typeof defaultTheme

export type AiDiffConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'aiDiff', 'ui'>

export default defaultTheme
