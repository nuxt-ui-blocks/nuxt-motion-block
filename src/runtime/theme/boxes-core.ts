import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'absolute -top-1/4 left-1/4 z-0 flex h-full w-full -translate-x-1/2 -translate-y-1/2 p-4',
    row: 'relative h-8 w-16 border-l',
    cell: 'relative h-8 w-16 border-t border-r',
    plusSign: 'pointer-events-none absolute -top-[14px] -left-[22px] h-6 w-10 stroke-[1px]',
  },
}

export type BoxesCoreTheme = typeof defaultTheme

export type BoxesCoreConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'boxesCore', 'ui'>

export default defaultTheme
