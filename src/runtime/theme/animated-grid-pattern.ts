import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'animated-grid-pattern pointer-events-none absolute inset-0 h-full w-full',
    grid: 'fill-transparent',
    squares: 'overflow-visible',
    square: 'animated-grid-pattern-square',
  },
}

export type AnimatedGridPatternTheme = typeof defaultTheme

export type AnimatedGridPatternConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'animatedGridPattern', 'ui'>

export default defaultTheme
