import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    wrapper: 'relative w-full',
    card: 'isolate aspect-[1.586] overflow-hidden rounded-[16px] bg-[linear-gradient(145deg,oklch(0.5_0.13_268),oklch(0.25_0.08_268))] text-white shadow-[0_1px_2px_rgba(0,0,0,0.10),0_10px_20px_-10px_rgba(0,0,0,0.28)]',
    grain: 'pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-overlay opacity-[0.14]',
    sheen: 'pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-soft-light transition-opacity duration-500 bg-[radial-gradient(120%_90%_at_28%_18%,rgba(255,255,255,0.28),rgba(255,255,255,0.05)_45%,transparent_72%)]',
    edge: 'absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/12',
    body: 'relative flex h-full w-full flex-col justify-between p-5',
    top: 'flex items-start justify-between gap-3',
    media: 'flex items-center gap-3',
    label: 'text-[11px] font-medium tracking-[0.04em] text-white/70',
    center: 'space-y-3',
    balance: 'block text-3xl font-semibold leading-none tabular-nums',
    cardNumber: 'block text-base font-medium tracking-[0.14em] tabular-nums text-white/85',
    bottom: 'flex items-end justify-between gap-3',
    meta: 'flex min-w-0 items-end gap-5',
    metaLabel: 'block text-[8px] uppercase tracking-[0.14em] text-white/45',
    metaValue: 'block truncate text-xs font-medium uppercase tracking-[0.04em] text-white/90',
    network: 'shrink-0',
  },
}

export type WalletCardTheme = typeof defaultTheme

export type WalletCardConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'walletCard', 'ui'>

export default defaultTheme
