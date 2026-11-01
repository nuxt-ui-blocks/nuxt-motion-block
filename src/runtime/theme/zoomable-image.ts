import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'group relative block cursor-zoom-in overflow-hidden rounded-xl',
    image: 'size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105',
    overlay: 'fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6 backdrop-blur-sm',
    zoomed: 'max-h-full max-w-full cursor-zoom-out rounded-lg object-contain shadow-2xl',
    close: 'absolute right-4 top-4 flex size-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white',
  },
}

export type ZoomableImageTheme = typeof defaultTheme

export type ZoomableImageConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'zoomableImage', 'ui'>

export default defaultTheme
