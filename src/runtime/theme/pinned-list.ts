import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'flex flex-col',
    list: 'flex flex-col gap-0.5 p-1',
    item: 'list-none',
    divider: 'my-1 list-none border-t border-default',
    emptyBadge: 'w-full justify-center border border-dashed',
    pinnedInner: 'relative',
    rail: 'absolute left-0 h-5 w-[3px] rounded-r-full z-10',
    railFill: 'h-full w-full rounded-r-full bg-primary',
    pinnedButton: 'relative justify-start gap-3 rounded-xl border shadow-sm',
    unpinnedButton: 'relative justify-start gap-3 rounded-xl border border-transparent',
    content: 'min-w-0 flex-1 text-left',
    title: 'truncate font-medium text-sm text-highlighted',
    meta: 'truncate text-xs text-muted',
    pinIcon: 'w-4 h-4 text-highlighted',
    unpinIcon: 'w-4 h-4 text-muted',
    pinGlyph: 'flex items-center justify-center',
    pinGlyphIcon: 'size-4 fill-current',
    unpinGlyph: 'size-4 text-muted',
  },
}

export type PinnedListTheme = typeof defaultTheme

export type PinnedListConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'pinnedList', 'ui'>

export default defaultTheme
