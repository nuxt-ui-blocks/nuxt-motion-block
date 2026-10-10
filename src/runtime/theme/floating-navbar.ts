import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'fixed top-4 left-1/2 z-50 flex items-center gap-6 px-6 py-3 rounded-full border border-default shadow-lg',
    brand: 'font-bold text-lg whitespace-nowrap',
    nav: 'hidden md:flex items-center gap-1',
    link: 'px-3 py-1.5 rounded-full text-sm font-medium hover:bg-muted transition-colors',
  },
  variants: {
    blur: {
      true: {
        root: 'bg-background/70 backdrop-blur-xl',
      },
      false: {
        root: 'bg-background',
      },
    },
  },
}

export type FloatingNavbarTheme = typeof defaultTheme

export type FloatingNavbarConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'floatingNavbar', 'ui'>

export default defaultTheme
