import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'relative inline-block [perspective:500px] [--base-color:#a1a1aa] [--base-gradient-color:#000] dark:[--base-color:#71717a] dark:[--base-gradient-color:#ffffff]',
    char: 'inline-block whitespace-pre [transform-style:preserve-3d]',
  },
}

export type TextShimmerWaveTheme = typeof defaultTheme

export type TextShimmerWaveConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'textShimmerWave', 'ui'>

export default defaultTheme
