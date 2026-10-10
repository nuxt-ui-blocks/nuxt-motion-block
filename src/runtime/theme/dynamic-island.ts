import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'h-[200px]',
    inner: 'relative flex h-full w-full flex-col justify-center',
    pill: 'mx-auto w-fit min-w-[100px] overflow-hidden rounded-full bg-black',
    content: '',
    track: 'absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 justify-center gap-1 rounded-full border bg-default p-1',
    dot: 'flex size-8 cursor-pointer items-center justify-center rounded-full border border-default bg-primary px-2 text-inverted',
    dotIcon: 'size-3',
  },
}

export type DynamicIslandTheme = typeof defaultTheme

export type DynamicIslandConfig = ComponentConfig<
  typeof defaultTheme,
  Record<string, any>,
  'dynamicIsland',
  'ui'
>

export default defaultTheme
