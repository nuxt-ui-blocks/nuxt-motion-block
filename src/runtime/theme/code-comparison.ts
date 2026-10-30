import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'relative grid overflow-hidden rounded-xl border border-default bg-elevated',
    pane: 'col-start-1 row-start-1 min-w-0 overflow-hidden',
    header: 'flex items-center justify-between gap-2 border-b border-default px-4 py-2 text-xs font-medium text-muted',
    code: 'block overflow-x-auto p-4 font-mono text-xs leading-relaxed text-highlighted',
    divider: 'pointer-events-none absolute inset-y-0 z-10 w-px -translate-x-1/2 bg-primary',
    handle: 'absolute left-1/2 top-1/2 flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-default bg-default text-muted shadow-md',
    slider: 'absolute inset-0 z-20 size-full cursor-ew-resize appearance-none bg-transparent opacity-0',
  },
}

export type CodeComparisonTheme = typeof defaultTheme

export type CodeComparisonConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'codeComparison', 'ui'>

export default defaultTheme
