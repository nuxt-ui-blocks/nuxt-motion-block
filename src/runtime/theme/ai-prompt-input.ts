import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'gap-0',
    footer: 'pt-2',
    attachments: 'flex list-none flex-wrap gap-1.5 overflow-hidden py-1.5',
    attachment: 'flex items-center gap-1.5 rounded-lg border border-default bg-muted/50 py-1 pr-1 pl-2 text-xs',
    attachmentName: 'max-w-40 truncate',
    attachmentSize: 'text-muted',
    remove: 'cursor-pointer rounded-md p-0.5 text-muted transition-colors hover:bg-muted hover:text-highlighted',
    removeIcon: 'size-3',
    tools: 'flex min-w-0 items-center gap-1',
    attach: 'cursor-pointer rounded-lg p-2 text-muted transition-colors hover:bg-muted hover:text-highlighted',
    attachIcon: 'size-4',
    actions: 'relative flex items-center gap-2',
    submit: 'flex',
    counter: 'text-xs tabular-nums',
  },
  variants: {
    accent: {
      danger: {
        root: 'ring-error/25',
      },
      success: {
        root: 'ring-success/25',
      },
    },
    overLimit: {
      true: {
        counter: 'text-error',
      },
      false: {
        counter: 'text-muted',
      },
    },
  },
}

export type AiPromptInputTheme = typeof defaultTheme

export type AiPromptInputConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'aiPromptInput', 'ui'>

export default defaultTheme
