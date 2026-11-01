import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'inline-flex flex-wrap justify-center gap-x-1 text-4xl font-black uppercase tracking-tight',
    char: 'inline-block text-primary [-webkit-text-stroke:2px_var(--ui-bg)] [text-shadow:4px_4px_0_var(--ui-text-dimmed)]',
  },
}

export type ComicTextTheme = typeof defaultTheme

export type ComicTextConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'comicText', 'ui'>

export default defaultTheme
