import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'relative inline-block',
    trigger: 'rounded font-medium text-primary text-sm underline-offset-2 hover:underline',
    card: 'absolute left-1/2 z-30 w-80 -translate-x-1/2 overflow-hidden rounded-2xl border border-default bg-default shadow-xl',
    loading: 'animate-pulse p-4',
    loadingBanner: 'h-16 rounded-lg bg-muted',
    loadingBody: 'mt-3 flex items-center gap-3',
    loadingAvatar: 'size-12 rounded-full bg-muted',
    loadingText: 'flex-1 space-y-2',
    loadingLineWide: 'h-3 w-2/3 rounded bg-muted',
    loadingLineNarrow: 'h-3 w-1/3 rounded bg-muted',
    loadingLineFull: 'mt-4 h-3 w-full rounded bg-muted',
    loadingLineShort: 'mt-2 h-3 w-4/5 rounded bg-muted',
    banner: 'h-16 w-full object-cover',
    bannerFallback: 'h-16 w-full bg-gradient-to-r from-primary/40 to-primary/10',
    body: 'p-4',
    header: 'flex items-start justify-between gap-3',
    identity: 'flex items-center gap-3',
    avatar: 'size-12 shrink-0 rounded-full border-2 border-default object-cover',
    info: 'min-w-0',
    nameRow: 'flex items-center gap-1',
    nameLink: 'truncate font-semibold text-highlighted text-sm hover:underline',
    name: 'truncate font-semibold text-highlighted text-sm',
    verifiedIcon: 'size-4 shrink-0 text-primary',
    verifiedLabel: 'sr-only',
    handle: 'truncate text-muted text-xs',
    action: 'shrink-0',
    followButton: 'rounded-full',
    followLabel: 'inline-block',
    bio: 'mt-3 text-highlighted/80 text-sm leading-relaxed',
    stats: 'mt-4 flex items-center gap-4',
    stat: 'flex flex-col',
    statValue: 'font-semibold text-highlighted text-sm',
    statLabel: 'text-muted text-xs',
  },
  variants: {
    placement: {
      top: {
        card: 'bottom-full mb-2',
      },
      bottom: {
        card: 'top-full mt-2',
      },
    },
  },
}

export type SocialHoverCardTheme = typeof defaultTheme

export type SocialHoverCardConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'socialHoverCard', 'ui'>

export default defaultTheme
