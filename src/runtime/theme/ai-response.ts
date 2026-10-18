import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'text-pretty text-default text-sm leading-relaxed',
    citation: 'mr-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full border border-default bg-muted px-1 align-super font-medium text-[10px] text-muted no-underline',
    word: 'inline-block',
    caret: 'ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.15em] rounded-full bg-current align-baseline',
  },
}

export type AiResponseTheme = typeof defaultTheme

export type AiResponseConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'aiResponse', 'ui'>

export default defaultTheme
