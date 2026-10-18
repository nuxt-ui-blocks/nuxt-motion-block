import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'background-ripple-effect absolute inset-0 h-full w-full [--cell-border-color:var(--color-neutral-300)] [--cell-fill-color:var(--color-neutral-100)] [--cell-shadow-color:var(--color-neutral-500)] dark:[--cell-border-color:var(--color-neutral-700)] dark:[--cell-fill-color:var(--color-neutral-900)] dark:[--cell-shadow-color:var(--color-neutral-800)]',
    inner: 'relative h-auto w-auto overflow-hidden',
    mask: 'pointer-events-none absolute inset-0 z-[2] h-full w-full overflow-hidden',
    grid: 'mask-radial-from-20% mask-radial-at-top opacity-600',
  },
}

export type BackgroundRippleEffectTheme = typeof defaultTheme

export type BackgroundRippleEffectConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'backgroundRippleEffect', 'ui'>

export default defaultTheme
