import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'w-full overflow-hidden',
    content: 'infinite-slider-content',
  },
}

export type InfiniteSliderTheme = typeof defaultTheme

export type InfiniteSliderConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'infiniteSlider', 'ui'>

export default defaultTheme
