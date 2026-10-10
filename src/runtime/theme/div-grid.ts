import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'div-grid relative z-[3]',
    cell: 'cell relative border-[0.5px] opacity-40 transition-opacity duration-150 will-change-transform hover:opacity-80 dark:shadow-[0px_0px_40px_1px_var(--cell-shadow-color)_inset]',
  },
}

export type DivGridTheme = typeof defaultTheme

export type DivGridConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'divGrid', 'ui'>

export default defaultTheme
