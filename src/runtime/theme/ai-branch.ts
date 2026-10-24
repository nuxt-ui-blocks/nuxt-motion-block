import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'flex w-full flex-col gap-3',
    message: 'flex max-w-full flex-col items-end gap-1.5 self-end',
    /**
     * The user bubble inverts rather than tinting: it is the anchor the branches
     * hang off, and it has to be the same bubble in every branch.
     */
    bubbleUser: 'max-w-full rounded-2xl rounded-br-md bg-inverted px-3.5 py-2.5 text-sm leading-relaxed text-inverted',
    controls: 'flex items-center gap-0.5',
    control: 'text-muted',
    page: 'min-w-10 text-center text-xs tabular-nums text-muted',
    response: 'flex justify-start',
    bubbleAssistant: 'max-w-[80%] rounded-2xl rounded-bl-md bg-muted px-3.5 py-2.5 text-sm leading-relaxed text-default',
  },
}

export type AiBranchTheme = typeof defaultTheme

export type AiBranchConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'aiBranch', 'ui'>

export default defaultTheme
