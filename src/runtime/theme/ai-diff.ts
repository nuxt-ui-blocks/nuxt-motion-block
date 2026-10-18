import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'w-full overflow-hidden rounded-xl border border-border bg-elevated',
    header: 'flex items-center gap-2 border-b border-border px-3 py-2',
    title: 'min-w-0 truncate font-mono text-xs text-default',
    stats: 'ml-auto flex shrink-0 items-center gap-1.5 text-xs tabular-nums',
    statAdded: 'text-[oklch(58%_0.17_150)]',
    statRemoved: 'text-destructive',
    body: 'overflow-hidden',
    pre: 'overflow-x-auto py-1 font-mono text-xs leading-relaxed',
    line: 'flex gap-3 px-3',
    lineNumber: 'w-6 shrink-0 select-none text-right tabular-nums text-muted',
    linePrefix: 'w-2 shrink-0 select-none',
    lineContent: 'whitespace-pre text-default',
    actions: 'flex items-center justify-end gap-2 border-t border-border px-3 py-2',
    reject: 'cursor-pointer rounded-lg px-2.5 py-1 text-xs text-muted transition-colors hover:bg-muted hover:text-default',
    accept: 'cursor-pointer rounded-lg bg-foreground px-2.5 py-1 text-xs text-background',
    decision: 'border-t border-border px-3 py-2 text-xs capitalize text-muted',
  },
  variants: {
    kind: {
      added: {
        line: 'bg-[oklch(72%_0.17_150_/_0.12)]',
        linePrefix: 'text-[oklch(52%_0.17_150)]',
      },
      removed: {
        line: 'bg-[oklch(63%_0.21_25_/_0.1)]',
        linePrefix: 'text-destructive',
      },
      context: {
        linePrefix: 'text-muted',
      },
    },
  },
}

export type AiDiffTheme = typeof defaultTheme

export type AiDiffConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'aiDiff', 'ui'>

export default defaultTheme
