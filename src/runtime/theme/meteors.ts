import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'relative h-full w-full overflow-hidden',
    meteor: 'meteor',
  },
}

export type MeteorsTheme = typeof defaultTheme

export type MeteorsConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'meteors', 'ui'>

export default defaultTheme
