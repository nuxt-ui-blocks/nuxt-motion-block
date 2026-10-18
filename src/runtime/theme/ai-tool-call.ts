import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: '',
    status: 'sr-only',
    tool: 'w-full',
    detail: 'space-y-2 text-xs',
    detailLabel: 'mb-1 text-[10px] uppercase tracking-wide text-muted',
    args: 'overflow-x-auto font-mono text-highlighted',
    result: 'overflow-x-auto text-highlighted',
    label: 'font-mono text-xs font-medium text-highlighted',
    leading: '!size-5',
    leadingIcon: '!static !inset-auto !size-5 !opacity-100',
  },
}

export type AiToolCallTheme = typeof defaultTheme

export type AiToolCallConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'aiToolCall', 'ui'>

export default defaultTheme
