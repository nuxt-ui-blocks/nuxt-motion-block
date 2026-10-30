import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'relative mx-auto',
    frame: 'relative rounded-[3rem] border-[10px] border-neutral-900 bg-neutral-950 shadow-2xl ring-1 ring-white/10 dark:border-neutral-700 dark:bg-neutral-800',
    screen: 'relative aspect-[9/19.5] overflow-hidden rounded-[2.35rem] bg-background',
    island: 'pointer-events-none absolute left-1/2 top-2 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-neutral-950',
  },
}

export type IPhone15ProTheme = typeof defaultTheme

export type IPhone15ProConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'iPhone15Pro', 'ui'>

export default defaultTheme
