import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    /** Reserves the open panel's footprint so the morph never shifts the page. */
    root: 'relative flex h-[200px] w-[360px] max-w-full items-end justify-center',
    surface: 'relative flex flex-col items-center overflow-hidden border border-default bg-default shadow-sm',
    dock: 'flex h-11 items-center gap-2 px-3',
    /** Two theme hues, not a brand gradient: the orb means "AI", not "our brand". */
    orb: 'size-5 shrink-0 rounded-full bg-gradient-to-br from-primary via-info to-success',
    trigger: 'rounded-full px-1 text-sm font-medium whitespace-nowrap text-highlighted outline-none focus-visible:underline',
    panel: 'flex h-[200px] w-[360px] max-w-full flex-col p-1',
    header: 'flex items-center justify-between px-2 py-1',
    title: 'flex items-center gap-2 text-xs font-medium text-muted',
    hint: 'flex items-center gap-1 text-muted',
    kbd: 'flex h-5 min-w-5 items-center justify-center rounded border border-default bg-muted px-1 font-sans text-[11px] text-muted',
    textarea: 'min-h-0 w-full flex-1 resize-none rounded-xl bg-elevated p-3 text-sm leading-relaxed text-highlighted outline-none placeholder:text-muted',
    actions: 'flex items-center justify-between px-2 py-1',
    count: 'text-[11px] tabular-nums text-muted',
  },
}

export type MorphSurfaceTheme = typeof defaultTheme

export type MorphSurfaceConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'morphSurface', 'ui'>

export default defaultTheme
