import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'drag-drop-container relative min-h-32',
    item: 'drag-item group relative cursor-pointer transition-all duration-200',
    itemDefault: 'p-4 bg-default rounded-lg border border-default',
    dropIndicator: 'h-1 shrink-0 rounded-full bg-primary shadow-[0_0_0_2px_var(--ui-bg)] animate-pulse',
    itemHandle: 'absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab',
    itemHandleIcon: 'w-4 h-4 text-dimmed',
    dropZone: 'drop-zone min-h-24 border-2 border-dashed border-default dark:border-default rounded-lg flex items-center justify-center transition-all duration-200',
    dropZoneContent: 'text-center text-muted',
    dropZoneIcon: 'w-6 h-6 mx-auto mb-2',
  },
  variants: {
    layout: {
      list: { root: 'space-y-2' },
      grid: { root: 'grid' },
      masonry: { root: 'columns-2 md:columns-3 lg:columns-4 gap-4' },
    },
  },
}

export type DragAndDropTheme = typeof defaultTheme

export type DragAndDropConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'dragAndDrop', 'ui'>

export default defaultTheme
