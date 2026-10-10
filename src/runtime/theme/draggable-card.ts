import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: '[perspective:3000px] w-fit h-fit',
    card: 'w-full h-full',
    cardRoot: 'relative min-h-96 w-80 overflow-hidden rounded-md bg-default dark:bg-default p-6 shadow-2xl transform-3d',
    cardBody: 'relative z-10',
    cardHeader: 'relative z-10',
    cardFooter: 'relative z-10',
    glare: 'pointer-events-none absolute inset-0 bg-white select-none z-20',
  },
}

export type DraggableCardTheme = typeof defaultTheme

export type DraggableCardConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'draggableCard', 'ui'>

export default defaultTheme
