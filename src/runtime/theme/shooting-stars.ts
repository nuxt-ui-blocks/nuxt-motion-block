import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'w-full h-full absolute inset-0',
  },
}

export type ShootingStarsTheme = typeof defaultTheme

export type ShootingStarsConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'shootingStars', 'ui'>

export default defaultTheme
