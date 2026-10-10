import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'will-change-transform',
    body: 'flex items-start gap-3',
    content: 'flex-1 min-w-0',
    header: 'flex items-center gap-2',
    author: 'font-semibold text-highlighted truncate',
    handle: 'text-sm text-muted truncate',
    time: 'text-xs text-muted ml-auto whitespace-nowrap',
    text: 'mt-2 text-sm leading-relaxed',
    meta: 'flex items-center gap-4 mt-3 text-sm text-muted',
    stat: 'inline-flex items-center gap-1',
    statIcon: 'w-4 h-4',
  },
}

export type TweetCardTheme = typeof defaultTheme

export type TweetCardConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'tweetCard', 'ui'>

export default defaultTheme
