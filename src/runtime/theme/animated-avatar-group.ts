import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'm-avatar-group',
  },
}

export type AnimatedAvatarGroupTheme = typeof defaultTheme

export type AnimatedAvatarGroupConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'animatedAvatarGroup', 'ui'>

export default defaultTheme
