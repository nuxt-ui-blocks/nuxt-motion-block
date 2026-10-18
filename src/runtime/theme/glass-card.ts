import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'relative overflow-hidden',
    filter: 'pointer-events-none absolute h-0 w-0',
    body: 'absolute',
    rim: 'absolute inset-0 rounded-[inherit]',
    overlay: 'pointer-events-none absolute inset-0 isolate overflow-hidden rounded-[inherit]',
    chromatic: 'absolute inset-0 rounded-[inherit]',
    specular: 'absolute',
    sweep: 'absolute top-0',
    shade: 'absolute inset-0 rounded-[inherit]',
    ring: 'pointer-events-none absolute inset-0 rounded-[inherit]',
    content: 'relative',
  },
}

export type GlassCardTheme = typeof defaultTheme

export type GlassCardConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'glassCard', 'ui'>

export default defaultTheme
