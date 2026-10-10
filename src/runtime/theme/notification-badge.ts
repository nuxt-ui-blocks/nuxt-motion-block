import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'relative inline-flex',
    badge: 'absolute -top-2 -right-2 z-10',
    badgeContent: 'rounded-full px-1.5 min-w-[1.25rem] h-5 flex items-center justify-center',
  },
}

export type NotificationBadgeTheme = typeof defaultTheme

export type NotificationBadgeConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'notificationBadge', 'ui'>

export default defaultTheme
