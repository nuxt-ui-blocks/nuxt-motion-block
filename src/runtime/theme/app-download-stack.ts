import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'flex h-auto flex-col items-center justify-center',
    wrapper: 'flex flex-col items-center justify-center',
    trigger: 'group relative isolate flex h-16 w-16 cursor-pointer items-center justify-center',
    stackIcon: 'absolute inset-0 rounded-xl border-none',
    selector: 'flex flex-col items-center gap-2',
    selectorHeader: 'flex w-full cursor-pointer items-center justify-between px-0.5',
    title: 'my-0 font-medium leading-none text-highlighted',
    countWrap: 'flex items-center gap-1',
    count: 'my-0 font-medium leading-none text-highlighted',
    chevron: 'size-4 text-muted',
    grid: 'grid grid-cols-2 gap-3',
    tile: 'relative flex h-[80px] w-[80px]',
    check: 'pointer-events-none absolute top-2 right-2 z-[1] flex h-4 w-4 items-center justify-center rounded-full border border-solid',
    checkmark: 'z-[1] h-3 w-3',
    app: 'group flex h-full w-full cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-transparent bg-default/80 p-2 transition-all duration-200 hover:border-primary',
    appIcon: 'rounded-lg',
    appName: 'font-medium text-highlighted text-xs',
    download: 'mt-4 w-full cursor-pointer rounded-lg bg-primary px-4 py-2 font-semibold text-inverted shadow transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50',
    downloading: 'flex flex-col items-center gap-4',
    downloadingWrap: 'relative flex h-16 w-16 items-center justify-center',
    shine: 'absolute inset-0 rounded-xl bg-primary/20',
    downloadingIcon: 'absolute inset-0 rounded-xl border-none',
    downloadingLabel: 'font-semibold text-primary',
    complete: 'flex flex-col items-center gap-4',
    completeLabel: 'font-semibold text-success',
  },
}

export type AppDownloadStackTheme = typeof defaultTheme

export type AppDownloadStackConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'appDownloadStack', 'ui'>

export default defaultTheme
