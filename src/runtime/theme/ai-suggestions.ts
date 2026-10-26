import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'flex w-full flex-col gap-2',
    label: 'text-[10px] font-medium uppercase tracking-wide text-muted',
    list: 'flex list-none flex-wrap gap-2 p-0',
    item: 'list-none',
    /**
     * `h-auto` and `font-normal` undo the button defaults: a chip is a suggestion,
     * not a call to action, and the pill shape already carries the clickability.
     */
    chip: 'h-auto px-3 py-1.5 font-normal',
  },
}

export type AiSuggestionsTheme = typeof defaultTheme

export type AiSuggestionsConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'aiSuggestions', 'ui'>

export default defaultTheme
