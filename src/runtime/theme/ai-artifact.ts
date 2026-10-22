import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'w-full overflow-hidden rounded-xl border border-default bg-default',
    header: 'flex items-center gap-2 border-b border-default px-2 py-1.5',
    title: 'min-w-0 truncate px-1 text-xs font-medium text-highlighted',
    /**
     * The tabs share one indicator element that slides, so the container is the
     * track rather than four separately styled buttons.
     */
    tabs: 'ml-auto flex items-center gap-0.5 rounded-lg bg-muted p-0.5',
    tab: 'relative cursor-pointer rounded-md px-2 py-1 text-xs capitalize transition-colors text-muted hover:text-highlighted focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none',
    indicator: 'absolute inset-0 rounded-md bg-default shadow-sm',
    tabLabel: 'relative',
    copy: 'text-muted',
    body: 'relative overflow-hidden',
    pane: '',
    preview: 'p-3',
    code: 'overflow-x-auto p-3 font-mono text-xs leading-relaxed text-highlighted',
  },
  variants: {
    active: {
      true: {
        tab: 'text-highlighted',
      },
    },
    copied: {
      true: {
        copy: 'text-success',
      },
    },
    /**
     * With one pane there is no tablist, and the copy action is the only thing
     * on the right, so it takes the `ml-auto` the tabs would have had.
     */
    lonely: {
      true: {
        copy: 'ml-auto',
      },
    },
  },
}

export type AiArtifactTheme = typeof defaultTheme

export type AiArtifactConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'aiArtifact', 'ui'>

export default defaultTheme
