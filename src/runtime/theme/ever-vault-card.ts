import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'group/card relative overflow-hidden bg-transparent',
    body: 'w-full h-full bg-default',
    overlay: 'pointer-events-none absolute inset-0',
    mask: 'absolute inset-0 rounded-2xl [mask-image:linear-gradient(white,transparent)] group-hover/card:opacity-50',
    gradient: 'absolute inset-0 rounded-2xl bg-gradient-to-r opacity-0 group-hover/card:opacity-100 backdrop-blur-xl transition duration-500',
    pattern: 'absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay group-hover/card:opacity-100',
    patternText: 'absolute inset-x-0 text-xs break-words whitespace-pre-wrap text-white font-mono font-bold transition duration-500',
  },
}

export type EverVaultCardTheme = typeof defaultTheme

export type EverVaultCardConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'everVaultCard', 'ui'>

export default defaultTheme
