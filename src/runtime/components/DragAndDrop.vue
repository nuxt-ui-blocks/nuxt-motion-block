<template>
  <div
    ref="containerRef"
    :class="ui.root({ layout: props.layout, class: [uiProps.ui?.root, uiProps.class, gridGapClasses] })"
    @dragover.prevent
    @drop="handleDrop"
  >
    <!-- @vue-ignore -->
    <template
      v-for="(item, index) in sortedItems"
      :key="item.id"
    >
      <Motion
        :layout-id="String(item.id)"
        :initial="false"
        :animate="getItemAnimation(index)"
        :transition="itemTransition"
        :class="ui.item({ class: [uiProps.ui?.item, getItemStateClasses(item, index), props.itemClass] })"
        :style="getItemStyles()"
        :draggable="!disabled"
        @dragstart="handleDragStart($event, item, index)"
        @dragend="handleDragEnd"
        @dragenter="handleDragEnter($event, index)"
        @dragover.prevent="handleItemDragOver($event, index)"
        @dragleave="handleDragLeave"
        @mousedown="handleMouseDown($event, item)"
        @click="handleItemClick(item)"
      >
        <slot
          :item="item"
          :index="index"
          :is-dragging="dragState.draggedIds.has(item.id)"
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

        <!-- Inline drop indicator. Absolutely positioned so revealing or moving
             it never reflows the list — the source of the drag jitter. -->
        <div
          v-if="showIndicatorFor(index)"
          :class="ui.dropIndicator({ class: uiProps.ui?.dropIndicator })"
          class="pointer-events-none absolute inset-x-0 z-10"
          :style="indicatorStyle(index)"
          aria-hidden="true"
        />
      </Motion>
    </template>

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
  draggedItems: [] as DragItem[],
  draggedIds: new Set<string | number>(),
  draggedIndex: -1,
  dropTarget: -1,
  dropIndex: -1,
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

  if (dragState.draggedIds.has(item.id)) {
    classes.push('opacity-50', 'scale-105', 'z-50')
  }

  if (props.layout !== 'list' && dragState.dropTarget === index) {
    classes.push('ring-2', 'ring-primary/50')
  }

  if (isSelected(item)) {
    classes.push('ring-2', 'ring-blue-500')
  }

  if (props.disabled) {
    classes.push('cursor-not-allowed', 'opacity-50')
  }

  return classes.join(' ')
}

const showIndicatorFor = (index: number) => {
  if (props.layout !== 'list' || !dragState.isDragging) return false

  const lastIndex = sortedItems.value.length - 1

  return dragState.dropIndex === index
    || (dragState.dropIndex === sortedItems.value.length && index === lastIndex)
}

const indicatorStyle = (index: number) => {
  const lastIndex = sortedItems.value.length - 1
  const belowLast = dragState.dropIndex === sortedItems.value.length && index === lastIndex

  return belowLast ? { bottom: '-6px' } : { top: '-6px' }
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
  const itemId = sortedItems.value[index]?.id
  const isDragged = itemId !== undefined && dragState.draggedIds.has(itemId)
  const isPrimary = dragState.draggedItem?.id === itemId

  return {
    y: 0,
    scale: isDragged ? 1.05 : 1,
    rotate: isPrimary ? 2 : 0,
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

  // When multi-select is on and the grabbed item is part of a larger
  // selection, the whole selection travels together rather than just the one
  // item under the pointer.
  const dragsSelection = props.allowMultiSelect
    && selectedItems.value.has(item.id)
    && selectedItems.value.size > 1

  const movingItems = dragsSelection
    ? sortedItems.value.filter(candidate => selectedItems.value.has(candidate.id))
    : [item]

  dragState.isDragging = true
  dragState.draggedItem = item
  dragState.draggedItems = movingItems
  dragState.draggedIds = new Set(movingItems.map(movingItem => movingItem.id))
  dragState.draggedIndex = index

  event.dataTransfer!.effectAllowed = props.mode === 'copy' ? 'copy' : 'move'
  event.dataTransfer!.setData('text/plain', JSON.stringify(movingItems))

  emit('dragStart', item, index)
}

const handleDragEnd = () => {
  const insertAt = dragState.dropIndex
  const primary = dragState.draggedItem

  if (primary && dragState.draggedIds.size > 0 && insertAt !== -1) {
    const draggedIds = dragState.draggedIds

    // The block keeps its current visual order as it moves.
    const orderedBlock = sortedItems.value.filter(candidate => draggedIds.has(candidate.id))
    const remaining = sortedItems.value.filter(candidate => !draggedIds.has(candidate.id))

    // `insertAt` is a gap position (0…n); every dragged item sitting before
    // that gap is removed, shifting the effective insertion point down.
    const removedBefore = sortedItems.value
      .slice(0, insertAt)
      .filter(candidate => draggedIds.has(candidate.id))
      .length
    const target = Math.max(0, insertAt - removedBefore)

    const newItems = [...remaining]
    newItems.splice(target, 0, ...orderedBlock)

    // Skip the emit (and the re-render) when the drop leaves the order intact.
    const unchanged = newItems.length === sortedItems.value.length
      && newItems.every((candidate, i) => candidate.id === sortedItems.value[i]?.id)

    if (!unchanged) {
      const oldIndex = sortedItems.value.findIndex(candidate => candidate.id === primary.id)

      sortedItems.value = newItems
      emit('change', newItems)
      emit('dragEnd', primary, oldIndex, target)
    }
  }

  resetDragState()
}

const resetDragState = () => {
  Object.assign(dragState, {
    isDragging: false,
    draggedItem: null,
    draggedItems: [],
    draggedIds: new Set<string | number>(),
    draggedIndex: -1,
    dropTarget: -1,
    dropIndex: -1,
    dropZone: -1,
  })
}

const handleDragEnter = (event: DragEvent, index: number) => {
  event.preventDefault()
  handleItemDragOver(event, index)
}

const handleItemDragOver = (event: DragEvent, index: number) => {
  if (props.disabled || !dragState.isDragging) return

  // Hovering any item that is already part of the moving block is not a valid
  // drop position — keep the indicator where it is.
  const hoveredItem = sortedItems.value[index]
  if (hoveredItem && dragState.draggedIds.has(hoveredItem.id)) return

  const target = event.currentTarget as HTMLElement | null
  const rect = target?.getBoundingClientRect()

  let nextDropIndex = index

  if (rect) {
    if (props.layout === 'grid') {
      // In a grid the pointer can leave an item through any of its sides, so
      // "after" is decided on the diagonal: past the bottom-right half inserts
      // after the item, otherwise before it.
      const relX = (event.clientX - rect.left) / rect.width
      const relY = (event.clientY - rect.top) / rect.height
      nextDropIndex = relX + relY > 1 ? index + 1 : index
    }
    else {
      // List/masonry flow vertically — top half inserts before, bottom after.
      const bottomHalf = event.clientY > rect.top + rect.height / 2
      nextDropIndex = bottomHalf ? index + 1 : index
    }
  }

  // Skip the write (and the resulting re-render) when the gap has not actually
  // changed — `dragover` fires many times per second during a drag.
  if (dragState.dropTarget === index && dragState.dropIndex === nextDropIndex) return

  dragState.dropTarget = index
  dragState.dropIndex = nextDropIndex
}

const handleDragLeave = (event: DragEvent) => {
  // Clear the target only when the pointer truly leaves the container. Moving
  // between items — or onto a child of one — reports a relatedTarget that is
  // still inside the container, so the indicator stays put instead of blinking.
  const related = event.relatedTarget as Node | null
  if (!related || containerRef.value?.contains(related)) return

  dragState.dropTarget = -1
  dragState.dropIndex = -1
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
