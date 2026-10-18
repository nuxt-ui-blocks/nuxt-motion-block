import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'inline-flex cursor-pointer select-none items-center gap-2',
    checkbox: 'inline-flex',
    label: 'text-sm',
  },
}

export type CheckboxTheme = typeof defaultTheme

export type CheckboxConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'checkbox', 'ui'>

export default defaultTheme
