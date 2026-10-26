import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    /**
     * `isolate` gives the plate somewhere to go. It is absolutely positioned
     * and the rows are not, so without a stacking context the plate would paint
     * over the row it is meant to sit behind.
     */
    root: 'relative isolate',
    /**
     * One step above the surface it sits on, not a tint of the text: a
     * translucent foreground would tint differently on every background the
     * list is dropped onto.
     */
    highlight: 'pointer-events-none absolute top-0 left-0 -z-10 rounded-lg bg-elevated',
  },
}

export type FluidHoverHighlightTheme = typeof defaultTheme

export type FluidHoverHighlightConfig = ComponentConfig<
  typeof defaultTheme,
  Record<string, any>,
  'fluidHoverHighlight',
  'ui'
>

export default defaultTheme
