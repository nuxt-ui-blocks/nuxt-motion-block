<template>
  <div
    ref="containerRef"
    :class="containerClasses"
    @dragover.prevent
    @drop="handleDrop"
  >
    <!-- @vue-ignore -->
    <Motion
      v-for="(item, index) in sortedItems"
      :key="item.id"
      :layout-id="item.id"
      :initial="false"
      :animate="getItemAnimation(index)"
      :transition="itemTransition"
      :class="getItemClasses(item, index)"
      :style="getItemStyles(item, index)"
      :draggable="!disabled"
      @dragstart="handleDragStart($event, item, index)"
      @dragend="handleDragEnd"
      @dragenter="handleDragEnter($event, index)"
      @dragleave="handleDragLeave"
      @mousedown="handleMouseDown($event, item, index)"
      @click="handleItemClick(item, index)"
    >
      <slot
        :item="item"
        :index="index"
        :is-dragging="dragState.draggedItem?.id === item.id"
        :is-over="dragState.dropTarget === index"
        :is-selected="isSelected(item)"
      >
        <div class="p-4 bg-default rounded-lg border border-default">
          {{ item.label || item.name || item.id }}
        </div>
      </slot>

      <!-- Drag handle -->
      <div
        v-if="showHandle"
        class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab"
        @mousedown.stop="handleMouseDown($event, item)"
      >
        <UIcon
          name="i-lucide-grip-vertical"
          class="w-4 h-4 text-dimmed"
        />
      </div>
    </Motion>

    <!-- Drop zones -->
    <div
      v-for="(zone, index) in dropZones"
      :key="`drop-zone-${index}`"
      :class="getDropZoneClasses(index)"
      @dragover.prevent
      @dragenter="handleZoneEnter(index)"
      @dragleave="handleZoneLeave"
      @drop="handleZoneDrop($event, index)"
    >
      <div
        v-if="dragState.isDragging"
        class="text-center text-muted"
      >
        <UIcon
          name="i-lucide-plus"
          class="w-6 h-6 mx-auto mb-2"
        />
        Drop here
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Motion } from 'motion-v'
import { ref, computed, reactive, watch } from 'vue'

type LayoutType = 'list' | 'grid' | 'masonry'
type DragMode = 'sort' | 'move' | 'copy'

interface DragItem {
  id: string | number
  [key: string]: any
}

interface DragAndDropProps {
  items: DragItem[]
  layout?: LayoutType
  mode?: DragMode
  disabled?: boolean
  showHandle?: boolean
  columns?: number
  gap?: number
  class?: string
  itemClass?: string
  allowMultiSelect?: boolean
  snapToGrid?: boolean
  animationDuration?: number
}

const props = withDefaults(defineProps<DragAndDropProps>(), {
  layout: 'list',
  mode: 'sort',
  disabled: false,
  showHandle: false,
  columns: 3,
  gap: 16,
  class: '',
  itemClass: '',
  allowMultiSelect: false,
  snapToGrid: true,
  animationDuration: 0.3,
})

const emit = defineEmits<{
  change: [items: DragItem[]]
  dragStart: [item: DragItem, index: number]
  dragEnd: [item: DragItem, oldIndex: number, newIndex: number]
  drop: [item: DragItem, zone: number]
  select: [item: DragItem, selected: boolean]
}>()

const containerRef = ref<HTMLElement>()
const sortedItems = ref([...props.items])
const selectedItems = ref<Set<string | number>>(new Set())

const dragState = reactive({
  isDragging: false,
  draggedItem: null as DragItem | null,
  draggedIndex: -1,
  dropTarget: -1,
  dropZone: -1,
})

// Drop zones for move/copy modes
const dropZones = computed(() => {
  if (props.mode === 'sort') return []
  return Array.from({ length: 3 }, (_, i) => ({ id: i, label: `Zone ${i + 1}` }))
})

const containerClasses = computed(() => {
  const baseClasses = [
    'drag-drop-container',
    'relative',
    'min-h-32',
  ]

  if (props.layout === 'grid') {
    baseClasses.push('grid', `grid-cols-${props.columns}`, `gap-${props.gap / 4}`)
  }
  else if (props.layout === 'list') {
    baseClasses.push('space-y-2')
  }
  else if (props.layout === 'masonry') {
    baseClasses.push('columns-2', 'md:columns-3', 'lg:columns-4', 'gap-4')
  }

  return [baseClasses.join(' '), props.class].filter(Boolean).join(' ')
})

const itemTransition = computed(() => ({
  type: 'spring',
  bounce: 0.2,
  duration: props.animationDuration,
}))

const getItemClasses = (item: DragItem, index: number) => {
  const classes = [
    'drag-item',
    'group',
    'relative',
    'cursor-pointer',
    'transition-all',
    'duration-200',
  ]

  if (dragState.draggedItem?.id === item.id) {
    classes.push('opacity-50', 'scale-105', 'z-50')
  }

  if (dragState.dropTarget === index) {
    classes.push('ring-2', 'ring-primary-500', 'ring-opacity-50')
  }

  if (isSelected(item)) {
    classes.push('ring-2', 'ring-blue-500')
  }

  if (props.disabled) {
    classes.push('cursor-not-allowed', 'opacity-50')
  }

  return [classes.join(' '), props.itemClass].filter(Boolean).join(' ')
}

const getItemStyles = () => {
  const styles: any = {}

  if (props.layout === 'masonry') {
    styles.breakInside = 'avoid'
    styles.marginBottom = `${props.gap}px`
  }

  return styles
}

const getItemAnimation = (index: number) => {
  return {
    y: 0,
    scale: dragState.draggedIndex === index ? 1.05 : 1,
    rotate: dragState.draggedIndex === index ? 2 : 0,
  }
}

const getDropZoneClasses = (index: number) => {
  const classes = [
    'drop-zone',
    'min-h-24',
    'border-2',
    'border-dashed',
    'border-default',
    'dark:border-default',
    'rounded-lg',
    'flex',
    'items-center',
    'justify-center',
    'transition-all',
    'duration-200',
  ]

  if (dragState.dropZone === index) {
    classes.push('border-primary-500', 'bg-primary-50', 'dark:bg-primary-900/20')
  }

  return classes.join(' ')
}

const isSelected = (item: DragItem) => {
  return selectedItems.value.has(item.id)
}

const handleDragStart = (event: DragEvent, item: DragItem, index: number) => {
  if (props.disabled) return

  dragState.isDragging = true
  dragState.draggedItem = item
  dragState.draggedIndex = index

  event.dataTransfer!.effectAllowed = props.mode === 'copy' ? 'copy' : 'move'
  event.dataTransfer!.setData('text/plain', JSON.stringify(item))

  emit('dragStart', item, index)
}

const handleDragEnd = () => {
  const oldIndex = dragState.draggedIndex
  const newIndex = dragState.dropTarget
  const item = dragState.draggedItem

  if (item && oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
    // Reorder items
    const newItems = [...sortedItems.value]
    const movedItem = newItems[oldIndex]

    if (movedItem) {
      newItems.splice(oldIndex, 1)
      newItems.splice(newIndex, 0, movedItem)

      sortedItems.value = newItems
      emit('change', newItems)
      emit('dragEnd', item, oldIndex, newIndex)
    }
  }

  // Reset drag state
  Object.assign(dragState, {
    isDragging: false,
    draggedItem: null,
    draggedIndex: -1,
    dropTarget: -1,
    dropZone: -1,
  })
}

const handleDragEnter = (event: DragEvent, index: number) => {
  event.preventDefault()
  if (dragState.draggedIndex !== index) {
    dragState.dropTarget = index
  }
}

const handleDragLeave = () => {
  // Only reset if not hovering over a child element
  setTimeout(() => {
    if (!dragState.isDragging) return
    dragState.dropTarget = -1
  }, 10)
}

const handleDrop = (event: DragEvent) => {
  event.preventDefault()
  handleDragEnd()
}

const handleZoneEnter = (zoneIndex: number) => {
  dragState.dropZone = zoneIndex
}

const handleZoneLeave = () => {
  dragState.dropZone = -1
}

const handleZoneDrop = (event: DragEvent, zoneIndex: number) => {
  event.preventDefault()

  if (dragState.draggedItem) {
    emit('drop', dragState.draggedItem, zoneIndex)

    if (props.mode === 'move') {
      // Remove item from list
      const newItems = sortedItems.value.filter(item => item.id !== dragState.draggedItem!.id)
      sortedItems.value = newItems
      emit('change', newItems)
    }
  }

  handleDragEnd()
}

const handleMouseDown = (event: MouseEvent, item: DragItem) => {
  if (props.allowMultiSelect && (event.ctrlKey || event.metaKey)) {
    event.preventDefault()
    toggleSelection(item)
  }
}

const handleItemClick = (item: DragItem) => {
  if (props.allowMultiSelect) {
    toggleSelection(item)
  }
}

const toggleSelection = (item: DragItem) => {
  const isCurrentlySelected = selectedItems.value.has(item.id)

  if (isCurrentlySelected) {
    selectedItems.value.delete(item.id)
  }
  else {
    selectedItems.value.add(item.id)
  }

  emit('select', item, !isCurrentlySelected)
}

// Watch for external item changes
watch(() => props.items, (newItems) => {
  sortedItems.value = [...newItems]
}, { immediate: true, deep: true })

// Expose methods
defineExpose({
  clearSelection: () => selectedItems.value.clear(),
  selectAll: () => {
    selectedItems.value.clear()
    props.items.forEach(item => selectedItems.value.add(item.id))
  },
  getSelected: () => Array.from(selectedItems.value),
})
</script>

<style scoped>
.drag-item {
  touch-action: none;
}

.drop-zone {
  transition: all 0.2s ease;
}

.columns-2 .drag-item,
.columns-3 .drag-item,
.columns-4 .drag-item {
  display: inline-block;
  width: 100%;
}
</style>
