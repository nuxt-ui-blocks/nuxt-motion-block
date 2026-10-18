import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'bg-transparent rounded-lg overflow-hidden group/card relative cursor-pointer',
    imageWrapper: 'absolute inset-0 rounded-lg overflow-hidden',
    image: 'w-full h-full object-cover',
    overlay: 'absolute inset-0 bg-default/40 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500',
    content: 'absolute inset-0 z-10 p-4 flex items-end',
    text: 'text-inverted w-full',
    details: 'space-y-2',
    title: 'text-xl font-bold',
    description: 'text-inverted/80',
    button: 'bg-default text-default hover:bg-default/90',
  },
}

export type DirectionAwareHoverTheme = typeof defaultTheme

export type DirectionAwareHoverConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'directionAwareHover', 'ui'>

export default defaultTheme
