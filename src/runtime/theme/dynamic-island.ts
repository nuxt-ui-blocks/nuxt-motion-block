import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'h-[200px]',
    inner: 'relative flex h-full w-full flex-col justify-center',
    pill: 'mx-auto w-fit min-w-[100px] overflow-hidden rounded-full bg-black',
    content: '',
    idle: 'flex items-center gap-2 px-3 py-2',
    idleIcon: 'h-5 w-5 text-white',
    temperature: 'flex items-center gap-1 overflow-hidden text-white',
    temperatureIcon: 'h-3 w-3',
    temperatureValue: 'pointer-events-none whitespace-nowrap text-white text-xs',
    ring: 'flex w-64 items-center gap-3 overflow-hidden px-4 py-2 text-white',
    timer: 'flex w-64 items-center gap-3 overflow-hidden px-4 py-2 text-white',
    notification: 'flex w-64 items-center gap-3 overflow-hidden px-4 py-2 text-white',
    music: 'flex w-72 items-center gap-3 overflow-hidden px-4 py-2 text-white',
    track: 'absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 justify-center gap-1 rounded-full border bg-default p-1',
    dot: 'flex size-8 cursor-pointer items-center justify-center rounded-full border border-default bg-primary px-2 text-inverted',
    dotIcon: 'size-3',
  },
}

export type DynamicIslandTheme = typeof defaultTheme

export type DynamicIslandConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'dynamicIsland', 'ui'>

export default defaultTheme
