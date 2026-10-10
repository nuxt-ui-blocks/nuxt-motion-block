import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'relative mx-auto h-full w-full max-w-4xl',
    beam: 'absolute top-3 -left-4 md:-left-20',
    dot: 'border-default ml-[27px] flex h-4 w-4 items-center justify-center rounded-full border shadow-sm',
    dotInner: 'h-2 w-2 rounded-full border border-default bg-default',
    svg: 'ml-4 block',
    content: '',
  },
}

export type TracingBeamTheme = typeof defaultTheme

export type TracingBeamConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'tracingBeam', 'ui'>

export default defaultTheme
