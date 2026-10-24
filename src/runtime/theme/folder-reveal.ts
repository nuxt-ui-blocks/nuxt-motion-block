import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'relative select-none',
    shadow: 'absolute -bottom-4 left-1/2 h-6 w-[88%] -translate-x-1/2 rounded-[50%] bg-inverted/30 blur-lg',
    back: 'absolute inset-0 h-full w-full drop-shadow-[0_1px_1px_rgba(0,0,0,0.12)]',
    tabLabel: 'absolute top-0 left-0 flex items-center truncate px-3 text-[11px] font-semibold tracking-[0.01em]',
    well: 'pointer-events-none absolute inset-x-0 bottom-0 rounded-b-[14px] shadow-[inset_0_14px_16px_-14px_rgba(0,0,0,0.45)]',
    cards: 'pointer-events-none absolute inset-x-0 flex justify-center',
    card: 'absolute bottom-0 origin-bottom overflow-hidden rounded-[10px] bg-default shadow-[0_1px_2px_rgba(0,0,0,0.08),0_8px_18px_-8px_rgba(0,0,0,0.28)] ring-1 ring-default',
    cardLabel: 'flex size-full items-center justify-center p-2 text-center text-xs text-muted',
    flap: 'absolute inset-x-0 bottom-0 cursor-pointer rounded-t-[8px] rounded-b-[14px] outline-none ring-offset-2 ring-offset-default focus-visible:ring-2 focus-visible:ring-primary',
  },
}

export type FolderRevealTheme = typeof defaultTheme

export type FolderRevealConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'folderReveal', 'ui'>

export default defaultTheme
