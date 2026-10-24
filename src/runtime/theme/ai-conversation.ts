import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    /**
     * `min-h-0` is load-bearing: as a flex child, a scroll container without it
     * refuses to shrink below its content, and the thread pushes the composer
     * off the bottom of the page instead of scrolling inside itself.
     */
    root: 'relative min-h-0 w-full',
    viewport: 'h-full overflow-y-auto overscroll-contain',
    jump: 'absolute inset-x-0 bottom-3 mx-auto w-fit',
    jumpButton: 'border-default bg-default/90 text-xs shadow-sm backdrop-blur',
  },
}

export type AiConversationTheme = typeof defaultTheme

export type AiConversationConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'aiConversation', 'ui'>

export default defaultTheme
