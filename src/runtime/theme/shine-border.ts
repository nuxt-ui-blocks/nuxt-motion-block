import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'relative rounded-xl border border-default bg-default',
    shine: 'shine pointer-events-none absolute inset-0 size-full rounded-[inherit] will-change-[background-position]',
  },
}

export type ShineBorderTheme = typeof defaultTheme

export type ShineBorderConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'shineBorder', 'ui'>

export default defaultTheme
