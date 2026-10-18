import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'relative w-full',
    label: 'mb-1 font-medium text-sm',
    track: 'pointer-events-none absolute left-0 overflow-hidden',
    bar: 'h-full overflow-hidden',
    shimmer: 'absolute inset-y-0 left-0',
  },
}

export type AnimatedProgressBarTheme = typeof defaultTheme

export type AnimatedProgressBarConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'animatedProgressBar', 'ui'>

export default defaultTheme
