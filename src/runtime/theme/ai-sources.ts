import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'w-full',
    trigger: 'flex w-full cursor-pointer items-center gap-2 rounded-lg py-1 text-left text-sm text-muted transition-colors hover:text-default',
    stack: 'flex items-center',
    chip: 'ai-sources-chip relative block',
    overflow: 'ml-1 tabular-nums',
    chevron: 'flex size-4 items-center justify-center',
    body: 'ai-sources-body',
    list: 'mt-1 min-h-0 list-none overflow-hidden',
    link: 'flex items-start gap-2.5 rounded-lg px-1 py-1.5 no-underline transition-colors hover:bg-muted',
    favicon: 'mt-0.5 block shrink-0',
    rowText: 'min-w-0',
    rowTitle: 'block truncate text-sm font-medium text-default',
    rowSnippet: 'block truncate text-xs text-muted',
    faviconBase: 'flex items-center justify-center overflow-hidden rounded-full border border-border bg-muted text-muted',
    faviconMark: 'flex size-full items-center justify-center *:size-full *:fill-foreground *:object-cover',
  },
}

export type AiSourcesTheme = typeof defaultTheme

export type AiSourcesConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'aiSources', 'ui'>

export default defaultTheme
