import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'bg-transparent rounded-lg overflow-hidden group/card relative cursor-pointer',
    inner: 'relative h-full w-full overflow-hidden',
    imageWrapper: 'h-full w-full relative z-10',
    image: 'h-full w-full object-cover min-w-[110%] min-h-[110%] absolute inset-0',
    overlay: 'absolute inset-0 bg-default/40 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 z-20',
    content: 'text-inverted absolute bottom-4 left-4 z-30',
    contentBody: 'space-y-2',
    title: 'text-xl font-bold',
    description: 'text-inverted/80',
  },
}

export type DirectionAwareHoverNewTheme = typeof defaultTheme

export type DirectionAwareHoverNewConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'directionAwareHoverNew', 'ui'>

export default defaultTheme
