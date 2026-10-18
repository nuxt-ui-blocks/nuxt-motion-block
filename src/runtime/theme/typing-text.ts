import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'typing-text-container whitespace-pre-wrap',
    text: 'inline-flex items-center',
    cursor: 'typing-cursor inline-block ms-1 font-normal select-none w-px',
  },
}

export type TypingTextTheme = typeof defaultTheme

export type TypingTextConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'typingText', 'ui'>

export default defaultTheme
