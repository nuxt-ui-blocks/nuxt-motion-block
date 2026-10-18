import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'flex flex-wrap items-center gap-2',
    button: 'relative inline-flex cursor-pointer select-none items-center rounded-full border font-medium transition-[background-color,border-color,box-shadow,color] duration-150 ease-out outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-default before:absolute before:-inset-1 before:content-[\'\']',
    emojiWrap: 'relative inline-flex items-center justify-center',
    emoji: 'block leading-none',
    burst: 'pointer-events-none absolute inset-0 flex items-center justify-center',
    burstRing: 'absolute size-6 rounded-full border border-primary/50',
    burstParticle: 'absolute rounded-full bg-primary',
    countWrap: 'relative inline-flex h-[1.15em] items-center overflow-hidden text-center tabular-nums leading-none',
    count: 'block leading-none',
    pickerWrapper: 'relative inline-flex',
    trigger: 'inline-flex cursor-pointer items-center justify-center rounded-full border border-default/60 bg-default text-muted transition-[background-color,border-color,color] duration-150 ease-out hover:border-default hover:bg-muted/50 hover:text-highlighted outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-default',
    triggerIcon: 'size-4',
    srOnly: 'sr-only',
    pickerPanel: 'absolute bottom-full left-1/2 z-20 block -translate-x-1/2 pb-2',
    menu: 'flex gap-1 rounded-2xl border border-default bg-default p-1.5 shadow-lg shadow-black/5',
    menuItem: 'flex size-9 cursor-pointer items-center justify-center rounded-xl text-lg outline-none transition-colors duration-150 ease-out hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary',
  },
  variants: {
    size: {
      sm: {
        button: 'h-7 gap-1 px-2 text-xs',
        emoji: 'text-sm',
        trigger: 'size-7',
      },
      md: {
        button: 'h-9 gap-1.5 px-3 text-sm',
        emoji: 'text-base',
        trigger: 'size-9',
      },
      lg: {
        button: 'h-11 gap-2 px-4 text-base',
        emoji: 'text-xl',
        trigger: 'size-11',
      },
    },
    reacted: {
      true: {
        button: 'border-default bg-muted/60 text-highlighted shadow-[inset_0_1px_2px_rgb(0_0_0/0.10)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.45)]',
      },
      false: {
        button: 'border-default/60 bg-default text-muted shadow-[0_1px_1px_rgb(0_0_0/0.04)] hover:border-default hover:bg-muted/50 hover:text-highlighted dark:shadow-none',
      },
    },
  },
}

export type EmojiReactionTheme = typeof defaultTheme

export type EmojiReactionConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'emojiReaction', 'ui'>

export default defaultTheme
