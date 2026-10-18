import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'w-full',
    body: '!pt-0 text-sm text-muted',
    trace: 'border-default border-l pl-4 leading-relaxed text-muted',
  },
}

export type AiReasoningTheme = typeof defaultTheme

export type AiReasoningConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'aiReasoning', 'ui'>

export default defaultTheme
