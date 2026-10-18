import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    wrapper: 'relative',
    front: 'w-full',
    back: 'w-full',
    card: '',
  },
}

export type SwitchboardCardTheme = typeof defaultTheme
export type SwitchboardCardConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'switchboardCard', 'ui'>
export default defaultTheme
