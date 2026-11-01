import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'group relative flex flex-col justify-end overflow-hidden rounded-xl border border-default bg-default',
    background: 'absolute inset-0 overflow-hidden',
    content: 'pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-transform duration-300 ease-out',
    icon: 'size-8 text-highlighted',
    name: 'text-xl font-semibold text-highlighted',
    description: 'max-w-lg text-sm text-muted',
    cta: 'pointer-events-none absolute bottom-0 z-20 flex w-full transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 ease-out',
    overlay: 'pointer-events-none absolute inset-0 transform-gpu transition-colors duration-300',
  },
  variants: {
    interactive: {
      true: {
        content: 'group-hover:-translate-y-10',
        cta: 'group-hover:translate-y-0 group-hover:opacity-100 group-hover:pointer-events-auto',
        overlay: 'group-hover:bg-elevated/40',
        root: 'cursor-pointer',
      },
      false: {
        content: '',
        cta: '',
        overlay: '',
        root: '',
      },
    },
    colSpan: {
      1: { root: 'md:col-span-1' },
      2: { root: 'md:col-span-2' },
      3: { root: 'md:col-span-3' },
      4: { root: 'md:col-span-4' },
      5: { root: 'md:col-span-5' },
      6: { root: 'md:col-span-6' },
    },
    rowSpan: {
      1: { root: 'md:row-span-1' },
      2: { root: 'md:row-span-2' },
      3: { root: 'md:row-span-3' },
    },
  },
  defaultVariants: {
    interactive: true as const,
    colSpan: 1 as const,
    rowSpan: 1 as const,
  },
}

export type BentoCardTheme = typeof defaultTheme

export type BentoCardConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'bentoCard', 'ui'>

export default defaultTheme
