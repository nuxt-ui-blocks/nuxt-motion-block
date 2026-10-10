import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: '',
    left: 'flex items-center gap-2',
    title: 'font-bold text-lg',
    menu: 'hidden lg:flex',
    body: 'lg:hidden p-4',
    button: 'w-full justify-start',
  },
}

export type ExpandableNavbarTheme = typeof defaultTheme

export type ExpandableNavbarConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'expandableNavbar', 'ui'>

export default defaultTheme
