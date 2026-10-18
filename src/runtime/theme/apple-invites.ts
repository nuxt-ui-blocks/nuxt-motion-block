import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'relative flex h-full w-full items-center justify-center',
    card: 'absolute top-1/2 left-1/2 origin-center -translate-y-1/2',
    cardInner: 'relative h-full w-full overflow-hidden rounded-3xl bg-primary',
    background: 'h-full w-full',
    image: 'h-full w-full object-cover',
    badgeWrap: 'absolute z-3',
    badge: 'flex flex-row items-center rounded-full bg-default/30 font-medium text-inverted backdrop-blur-xl',
    content: 'absolute bottom-0 z-3 w-full rounded-b-3xl text-inverted',
    avatars: 'mx-auto flex items-center justify-center',
    avatar: 'rounded-full',
    title: 'wrap-break-word text-center font-bold',
    subtitle: 'wrap-break-word text-center opacity-90',
    location: 'wrap-break-word text-center opacity-90',
    blurWrap: 'absolute inset-x-0 bottom-0 isolate z-2 h-1/2',
    blurLayer: 'absolute inset-0 overflow-hidden rounded-3xl',
  },
}

export type AppleInvitesTheme = typeof defaultTheme

export type AppleInvitesConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'appleInvites', 'ui'>

export default defaultTheme
