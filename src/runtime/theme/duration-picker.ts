import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'inline-flex flex-col gap-1.5',
    label: 'text-xs font-medium text-muted',
    group: 'inline-flex items-center gap-0.5 rounded-lg border border-default bg-default/40 px-2 py-1.5',
    separator: 'mx-0.5 text-muted select-none',
    segment: 'relative flex select-none items-center justify-center rounded-md px-1 py-0.5 font-medium text-highlighted tabular-nums outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-ns-resize',
    digit: 'relative overflow-hidden text-center',
    digitChar: 'absolute inset-0 flex items-center justify-center',
  },
}

export type DurationPickerTheme = typeof defaultTheme

export type DurationPickerConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'durationPicker', 'ui'>

export default defaultTheme
