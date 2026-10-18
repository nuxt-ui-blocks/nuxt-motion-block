import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-default w-full rounded-md z-0',
    inner: 'relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0',
    leftGradient: 'absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] text-highlighted [--conic-position:from_70deg_at_center_top]',
    leftMaskTop: 'absolute w-[100%] left-0 bg-default h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]',
    leftMaskSide: 'absolute w-40 h-[100%] left-0 bg-default bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]',
    rightGradient: 'absolute inset-auto left-1/2 h-56 w-[30rem] text-highlighted [--conic-position:from_290deg_at_center_top]',
    rightMaskSide: 'absolute w-40 h-[100%] right-0 bg-default bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]',
    rightMaskTop: 'absolute w-[100%] right-0 bg-default h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]',
    bgBlur: 'absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-default blur-2xl',
    bgOverlay: 'absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md',
    centerGlow: 'absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full opacity-50 blur-3xl',
    glow: 'absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full blur-2xl',
    line: 'absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem]',
    cover: 'absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-default',
    content: 'relative z-50 flex -translate-y-80 flex-col items-center px-5',
  },
}

export type LampContainerTheme = typeof defaultTheme

export type LampContainerConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'lampContainer', 'ui'>

export default defaultTheme
