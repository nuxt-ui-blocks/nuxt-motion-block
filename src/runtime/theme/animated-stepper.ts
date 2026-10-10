import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: '',
  },
}

export type AnimatedStepperTheme = typeof defaultTheme

export type AnimatedStepperConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'animatedStepper', 'ui'>

export default defaultTheme
