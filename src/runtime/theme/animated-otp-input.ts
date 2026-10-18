import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'relative inline-block rounded-md',
    underlay: 'an-otp inline-flex',
    overlay: 'pointer-events-none absolute left-0 top-0 flex h-full items-center gap-1.5',
    cell: 'relative flex size-9 items-center justify-center rounded-md border border-accented bg-elevated shadow-xs transition-[border-color,box-shadow] duration-150',
    cellText: 'font-medium text-highlighted',
    glyph: 'block',
    caret: 'pointer-events-none absolute inset-0 flex items-center justify-center',
    caretBar: 'h-4 w-px bg-inverted',
    separator: 'text-dimmed absolute',
    separatorLine: 'block h-px w-2 bg-dimmed',
  },
}

export type AnimatedOTPInputTheme = typeof defaultTheme

export type AnimatedOTPInputConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'animatedOTPInput', 'ui'>

export default defaultTheme
