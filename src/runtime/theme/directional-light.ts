import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'animate-spotlight pointer-events-none absolute z-[1] h-[169%] w-[138%] lg:w-[84%] opacity-0',
  },
}

export type DirectionalLightTheme = typeof defaultTheme

export type DirectionalLightConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'directionalLight', 'ui'>

export default defaultTheme
