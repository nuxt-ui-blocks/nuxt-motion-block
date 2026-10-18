import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'ai-message-root',
    action: 'ai-message-action cursor-pointer rounded-lg p-1.5 text-muted hover:bg-muted hover:text-default aria-pressed:bg-muted aria-pressed:text-default',
    actionIcon: 'ai-message-pop',
  },
  variants: {
    side: {
      left: {
        action: 'ai-message-action-agent',
      },
      right: {
        action: 'ai-message-action-user',
      },
    },
    active: {
      true: {
        action: 'text-default',
      },
    },
  },
}

export type AiMessageTheme = typeof defaultTheme

export type AiMessageConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'aiMessage', 'ui'>

export default defaultTheme
