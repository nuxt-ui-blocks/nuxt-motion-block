import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'relative',
    card: 'absolute bottom-0 left-0 cursor-pointer overflow-hidden rounded-2xl rounded-bl-none bg-default shadow-[0px_0px_0.5px_0px_rgb(0_0_0/0.18),0px_3px_8px_0px_rgb(0_0_0/0.1),0px_1px_3px_0px_rgb(0_0_0/0.1)] outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-default',
    avatar: 'absolute z-10',
    avatarImage: 'size-6 rounded-full object-cover',
    avatarFallback: 'flex size-6 items-center justify-center rounded-full bg-muted text-[10px] leading-none font-semibold text-inverted',
    measure: 'pointer-events-none absolute',
    measureInner: 'flex flex-col items-start gap-0.5 py-3 pr-4 pl-11',
    meta: 'flex items-start gap-0.5',
    author: 'text-[11px] leading-4 font-semibold text-highlighted',
    timestamp: 'text-[11px] leading-4 font-medium text-muted',
    message: 'text-left text-[11px] leading-4 font-medium text-highlighted',
    content: 'absolute inset-0 flex flex-col items-start gap-0.5 py-3 pr-4 pl-11',
  },
}

export type FigmaCommentTheme = typeof defaultTheme

export type FigmaCommentConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'figmaComment', 'ui'>

export default defaultTheme
