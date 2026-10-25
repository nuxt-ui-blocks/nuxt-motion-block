import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'flex items-center justify-center',
    track: 'relative h-14 w-56 overflow-hidden rounded-full border border-default bg-muted',
    /**
     * `pl-8` offsets the label from the resting handle so the two never share a
     * pixel; otherwise the label runs under the thumb and looks cut off. The
     * `track-sheen` class is the scoped sweep defined in the component.
     */
    label: 'track-sheen pointer-events-none absolute inset-0 flex items-center justify-center pl-8 text-sm font-medium select-none',
    handle: 'absolute top-1 left-1 z-10 flex size-12 cursor-grab touch-none items-center justify-center rounded-full bg-default text-error shadow-md ring-1 ring-default focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:cursor-grabbing disabled:cursor-not-allowed disabled:opacity-50',
    icon: 'size-6',
    shutdown: 'flex h-14 w-56 items-center justify-center text-center text-xl font-light text-highlighted',
  },
}

export type PowerOffSlideTheme = typeof defaultTheme

export type PowerOffSlideConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'powerOffSlide', 'ui'>

export default defaultTheme
