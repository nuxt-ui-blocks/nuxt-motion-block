import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'pointer-events-none absolute inset-0 h-full w-full transform-gpu',
  },
  variants: {
    blur: {
      softest: {
        root: 'blur-xs',
      },
      soft: {
        root: 'blur-sm',
      },
      medium: {
        root: 'blur-md',
      },
      strong: {
        root: 'blur-lg',
      },
      stronger: {
        root: 'blur-xl',
      },
      strongest: {
        root: 'blur-2xl',
      },
      none: {
        root: 'blur-none',
      },
    },
  },
}

export type GlowEffectTheme = typeof defaultTheme

export type GlowEffectConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'glowEffect', 'ui'>

export default defaultTheme
