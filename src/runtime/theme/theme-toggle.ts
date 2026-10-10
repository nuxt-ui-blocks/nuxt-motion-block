import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: '',
    iconWrapper: 'inline-flex items-center justify-center',
    icon: 'w-5 h-5',
  },
}

export type ThemeToggleTheme = typeof defaultTheme

export type ThemeToggleConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'themeToggle', 'ui'>

export default defaultTheme
