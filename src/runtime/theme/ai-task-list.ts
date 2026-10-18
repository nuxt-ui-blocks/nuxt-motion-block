import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'w-full rounded-xl border border-default bg-elevated p-3',
    header: 'mb-1.5 flex items-baseline justify-between',
    label: 'font-medium text-default text-sm',
    count: 'text-muted text-xs tabular-nums',
    list: 'list-none',
    row: 'list-none',
    rowInner: 'relative flex items-start gap-2 py-1',
    box: 'mt-0.5 flex size-3.5 shrink-0 items-center justify-center',
    boxSvg: 'size-3.5',
    boxDraw: 'ai-task-draw',
    text: 'min-w-0 flex-1 text-default text-sm leading-snug',
    note: 'shrink-0 text-muted text-xs tabular-nums',
    underline: 'pointer-events-none absolute inset-x-0 bottom-0 h-px',
  },
}

export type AiTaskListTheme = typeof defaultTheme

export type AiTaskListConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'aiTaskList', 'ui'>

export default defaultTheme
