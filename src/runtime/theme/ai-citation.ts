import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'relative inline-block align-super',
    pill: 'inline-flex h-4 min-w-4 items-center justify-center rounded-full border border-border bg-muted px-1 text-[10px] font-medium text-muted no-underline transition-colors hover:border-accented hover:text-highlighted',
    card: 'absolute bottom-full left-1/2 z-50 -ml-36 mb-1.5 block w-72 rounded-xl border border-border bg-elevated p-3 text-left align-baseline shadow-lg',
    header: 'mb-1 flex items-center gap-1.5',
    host: 'truncate text-xs text-muted',
    icon: 'ml-auto text-muted',
    title: 'block text-sm leading-snug font-medium text-highlighted',
    description: 'mt-1 block text-xs leading-relaxed text-muted',
  },
}

export type AiCitationTheme = typeof defaultTheme

export type AiCitationConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'aiCitation', 'ui'>

export default defaultTheme
