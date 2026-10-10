import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'relative overflow-hidden',
    card: 'h-full',
    body: 'space-y-4',
    balance: 'text-2xl font-bold text-highlighted',
    cardNumber: 'text-sm text-muted font-mono tracking-wider',
    shine: 'absolute inset-0 pointer-events-none z-20 transition-opacity duration-500',
    shineBeam: 'absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shine_0.8s_ease-out_forwards]',
  },
}

export type WalletCardTheme = typeof defaultTheme

export type WalletCardConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'walletCard', 'ui'>

export default defaultTheme
