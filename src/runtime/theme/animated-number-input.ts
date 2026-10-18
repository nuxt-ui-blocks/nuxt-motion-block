import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'inline-flex flex-col gap-1.5',
    label: 'text-sm font-medium text-highlighted',
    field: 'animated-number-input-hide relative',
    input: 'w-full',
    overlay: 'pointer-events-none absolute inset-0 flex select-none items-center text-base/5 text-highlighted md:text-sm',
    digit: 'relative inline-block h-[1.2em] w-[0.62em] overflow-hidden text-center align-bottom tabular-nums',
    char: 'absolute inset-0 flex items-center justify-center',
  },
}

export type AnimatedNumberInputTheme = typeof defaultTheme

export type AnimatedNumberInputConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'animatedNumberInput', 'ui'>

export default defaultTheme
