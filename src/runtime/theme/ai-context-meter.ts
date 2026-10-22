import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'relative inline-block',
    trigger: 'flex items-center gap-1.5 rounded-lg px-1 py-0.5 text-xs text-muted tabular-nums transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none',
    /**
     * The ring is rotated here rather than in the component: it is a property of
     * the drawing, not of the state, and a `-rotate-90` sitting in the template
     * would be the one class in the file not owned by the theme.
     */
    ring: 'size-4 shrink-0 -rotate-90',
    track: 'opacity-20',
    progress: 'transition-[color,stroke-dasharray] duration-300 ease-out motion-reduce:transition-none',
    text: '',
    popover: 'absolute bottom-full left-0 z-50 mb-1.5 w-56 rounded-xl border border-default bg-elevated p-2.5 text-left shadow-lg',
    list: 'space-y-1',
    item: 'flex items-baseline justify-between gap-3 text-xs',
    itemLabel: 'truncate text-muted',
    itemValue: 'shrink-0 text-highlighted tabular-nums',
  },
  variants: {
    /**
     * Without a breakdown there is nothing to open, so the trigger is not a
     * control at all: no pointer, no hover colour. The component swaps the
     * element rather than disabling a button, because a disabled button is
     * skipped by the keyboard and its label is never announced.
     */
    interactive: {
      true: {
        trigger: 'cursor-pointer hover:text-default',
      },
    },
  },
}

export type AiContextMeterTheme = typeof defaultTheme

export type AiContextMeterConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'aiContextMeter', 'ui'>

export default defaultTheme
