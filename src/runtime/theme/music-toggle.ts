import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'inline-flex items-center gap-3',
    recordFrame: 'relative shrink-0',
    seek: 'pointer-events-none absolute inset-0 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-default',
    ring: 'h-full w-full -rotate-90',
    ringTrack: 'text-dimmed',
    ringProgress: 'text-primary',
    disc: 'absolute inset-[10%] overflow-hidden rounded-full border border-default bg-muted',
    cover: 'h-full w-full object-cover',
    coverFallback: 'h-full w-full bg-gradient-to-br from-primary/40 to-primary/10',
    discCenter: 'absolute inset-[38%] rounded-full bg-default',
    toggle: 'absolute inset-[38%] z-10 flex items-center justify-center rounded-full bg-default text-highlighted shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-default',
    iconWrapper: 'absolute inset-0 flex items-center justify-center',
    icon: 'size-4 fill-current',
    info: 'flex flex-col gap-1.5',
    text: 'flex flex-col',
    title: 'text-sm font-medium text-highlighted',
    artist: 'text-xs text-muted',
    bars: 'flex h-5 items-end gap-[2px]',
    bar: 'w-[2px] rounded-full bg-inverted/70',
  },
}

export type MusicToggleTheme = typeof defaultTheme

export type MusicToggleConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'musicToggle', 'ui'>

export default defaultTheme
