import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'w-full rounded-xl border border-default bg-default p-3.5',
    question: 'text-sm font-medium text-highlighted',
    detail: 'mt-1 text-xs leading-relaxed text-muted',
    body: 'mt-3',
    resolved: 'flex items-center gap-2 rounded-lg px-3 py-2 text-sm',
    resolvedIcon: 'flex size-4 shrink-0 items-center justify-center',
    resolvedLabel: 'font-medium',
    resolvedDetail: 'ml-auto text-xs opacity-70',
    options: 'flex flex-col gap-1.5',
    option: 'flex w-full cursor-pointer items-center gap-2 rounded-lg border border-default px-3 py-2 text-left text-sm text-default transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none',
    optionLabel: 'font-medium',
    optionDetail: 'ml-auto text-xs text-muted',
  },
  variants: {
    /**
     * The destructive option is not a second colour on the same button: it is
     * the same button with a border that says "this one costs something". The
     * label still carries the words, so the colour is never the only signal.
     */
    destructive: {
      true: {
        option: 'border-error/30 text-error hover:bg-error/10',
        optionDetail: 'text-error/80',
      },
    },
    /**
     * The resolved row is a statement, so the neutral decision inverts to the
     * page's strongest contrast and the destructive one stays in its warning
     * hue. Both are chosen by what was decided, not by what the card looked
     * like before.
     */
    tone: {
      neutral: {
        resolved: 'bg-inverted text-inverted',
      },
      destructive: {
        resolved: 'bg-error/10 text-error',
      },
    },
  },
}

export type AiApprovalTheme = typeof defaultTheme

export type AiApprovalConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'aiApproval', 'ui'>

export default defaultTheme
