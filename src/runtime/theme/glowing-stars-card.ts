import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: '',
    stars: 'flex-1 flex items-center justify-center',
    grid: 'h-48 w-full grid grid-cols-18 gap-px',
    cell: 'relative flex items-center justify-center',
    star: 'h-px w-px rounded-full relative z-20',
    glow: 'absolute left-1/2 -translate-x-1/2 z-10 h-1 w-1 rounded-full blur-[1px] shadow-2xl',
    content: '',
  },
}

export type GlowingStarsCardTheme = typeof defaultTheme

export type GlowingStarsCardConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'glowingStarsCard', 'ui'>

export default defaultTheme
