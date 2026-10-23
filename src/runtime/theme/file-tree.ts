import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'select-none text-sm',
    row: 'flex cursor-pointer select-none items-center gap-1.5 rounded-md px-1.5 py-1 outline-none transition-[background-color,box-shadow] duration-150 ease-out focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-default',
    chevronBox: 'flex h-4 w-4 shrink-0 items-center justify-center',
    chevron: 'flex',
    icon: 'flex shrink-0 items-center',
    label: 'flex-1 truncate text-sm text-highlighted',
    badge: 'ml-auto shrink-0 text-xs text-muted',
    group: 'relative',
  },
  variants: {
    selected: {
      true: {
        row: 'bg-default shadow-sm ring-1 ring-default dark:bg-elevated',
        label: 'font-medium',
      },
      false: {
        row: 'hover:bg-elevated/60',
      },
    },
    lines: {
      true: {
        group: 'before:absolute before:inset-y-0 before:left-0 before:w-px before:bg-default before:content-[\'\']',
      },
    },
  },
  defaultVariants: {
    selected: false,
    lines: false,
  },
}

export type FileTreeTheme = typeof defaultTheme

export type FileTreeConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'fileTree', 'ui'>

export default defaultTheme
