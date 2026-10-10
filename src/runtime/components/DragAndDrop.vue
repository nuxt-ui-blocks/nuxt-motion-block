<template>
  <div
    ref="containerRef"
    :class="ui.root({ layout: props.layout, class: [uiProps.ui?.root, uiProps.class, gridGapClasses] })"
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
      :class="ui.item({ class: [uiProps.ui?.item, getItemStateClasses(item, index), props.itemClass] })"
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
        <div :class="ui.itemDefault({ class: uiProps.ui?.itemDefault })">
          {{ item.label || item.name || item.id }}
        </div>
      </slot>

      <!-- Drag handle -->
      <div
        v-if="showHandle"
        :class="ui.itemHandle({ class: uiProps.ui?.itemHandle })"
        @mousedown.stop="handleMouseDown($event, item)"
      >
        <UIcon
          name="i-lucide-grip-vertical"
          :class="ui.itemHandleIcon({ class: uiProps.ui?.itemHandleIcon })"
        />
      </div>
    </Motion>

    <!-- Drop zones -->
    <div
      v-for="(zone, index) in dropZones"
      :key="`drop-zone-${index}`"
      :class="ui.dropZone({ class: [uiProps.ui?.dropZone, getDropZoneStateClasses(index)] })"
      @dragover.prevent
      @dragenter="handleZoneEnter(index)"
      @dragleave="handleZoneLeave"
      @drop="handleZoneDrop($event, index)"
    >
      <div
        v-if="dragState.isDragging"
        :class="ui.dropZoneContent({ class: uiProps.ui?.dropZoneContent })"
      >
        <UIcon
          name="i-lucide-plus"
          :class="ui.dropZoneIcon({ class: uiProps.ui?.dropZoneIcon })"
        />
        Drop here
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Motion } from 'motion-v'
import { ref, computed, reactive, watch } from 'vue'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import dragAndDrop from '../theme/drag-and-drop'

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
  ui?: Record<string, any>
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
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'dragAndDrop', props, theme: dragAndDrop })

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

const gridGapClasses = computed(() => {
  if (props.layout === 'grid') {
    return [`grid-cols-${props.columns}`, `gap-${props.gap / 4}`]
  }

  return []
})

const itemTransition = computed(() => ({
  type: 'spring',
  bounce: 0.2,
  duration: props.animationDuration,
}))

const getItemStateClasses = (item: DragItem, index: number) => {
  const classes: string[] = []

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

  return classes.join(' ')
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

const getDropZoneStateClasses = (index: number) => {
  if (dragState.dropZone === index) {
    return 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
  }

  return ''
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
