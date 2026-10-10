import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: '',
    border: 'pointer-events-none absolute -inset-px hidden rounded-[inherit] border opacity-0 transition-opacity',
    container: 'pointer-events-none absolute inset-0 rounded-[inherit] opacity-100 transition-opacity',
    glow: 'glow rounded-[inherit] after:content-[\'\'] after:rounded-[inherit] after:absolute after:inset-[calc(-1*var(--glowingeffect-border-width))] after:[border:var(--glowingeffect-border-width)_solid_transparent] after:[background:var(--gradient)] after:[background-attachment:fixed] after:opacity-[var(--active)] after:transition-opacity after:duration-300 after:[mask-clip:padding-box,border-box] after:[mask-composite:intersect] after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))]',
  },
  variants: {
    variant: {
      white: {
        border: 'border-white',
      },
    },
    glow: {
      true: {
        border: 'opacity-100',
        container: 'opacity-100',
      },
    },
    blur: {
      true: {
        container: 'blur-[var(--blur)]',
      },
    },
    disabled: {
      true: {
        border: '!block',
        container: '!hidden',
      },
    },
  },
}

export type GlowingEffectTheme = typeof defaultTheme

export type GlowingEffectConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'glowingEffect', 'ui'>

export default defaultTheme
