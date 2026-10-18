import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: '',
  },
}

export type AiMessagesTheme = typeof defaultTheme

export type AiMessagesConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'aiMessages', 'ui'>

export default defaultTheme
