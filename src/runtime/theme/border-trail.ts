import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]',
    trail: 'absolute aspect-square bg-accented',
  },
}

export type BorderTrailTheme = typeof defaultTheme

export type BorderTrailConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'borderTrail', 'ui'>

export default defaultTheme
