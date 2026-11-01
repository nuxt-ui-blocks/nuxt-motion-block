import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'relative mx-auto',
    frame: 'relative rounded-[2.6rem] border-[8px] border-neutral-900 bg-neutral-950 p-1 shadow-2xl ring-1 ring-white/10 dark:border-neutral-700 dark:bg-neutral-800',
    screen: 'relative aspect-[9/19] overflow-hidden rounded-[2.1rem] bg-background',
    camera: 'pointer-events-none absolute left-1/2 top-2 z-10 size-2.5 -translate-x-1/2 rounded-full bg-neutral-950',
  },
}

export type AndroidTheme = typeof defaultTheme

export type AndroidConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'android', 'ui'>

export default defaultTheme
