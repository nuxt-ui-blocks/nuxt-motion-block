import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'rounded-full',
  },
}

export type AgentAvatarTheme = typeof defaultTheme

export type AgentAvatarConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'agentAvatar', 'ui'>

export default defaultTheme
