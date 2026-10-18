import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: '',
    container: 'relative',
    video: 'w-full rounded-lg',
  },
}

export type VideoModalTheme = typeof defaultTheme

export type VideoModalConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'videoModal', 'ui'>

export default defaultTheme
