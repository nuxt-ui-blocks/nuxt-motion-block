<script setup lang="ts">
import type { ComponentPublicInstance } from 'vue'
import { computed, nextTick, ref, watch } from 'vue'
import { Motion } from 'motion-v'
import { EASE_IN_OUT } from '../utils/motion-tokens'

/** A single node in the tree. */
export interface FileTreeItem {
  /** Stable identifier, used for expansion and selection. */
  id: string
  /** Label shown in the row. */
  name: string
  /** Whether the node is a file or a folder. */
  type: 'file' | 'folder'
  /** Child nodes. Folders only. */
  children?: FileTreeItem[]
  /** Icon name for the row. Defaults to a folder or file glyph. */
  icon?: string
  /** Short text shown at the trailing edge, e.g. a size or a status. */
  badge?: string
}

type SlotResolver = (options?: Record<string, any>) => string

interface FileTreeRowProps {
  node: FileTreeItem
  level: number
  indent: number
  showLines: boolean
  expandedSet: Set<string>
  selectedId?: string
  focusedId?: string
  shouldReduceMotion: boolean
  onToggle: (id: string, force?: boolean) => void
  onSelect: (id: string) => void
  onKeydown: (event: KeyboardEvent, id: string) => void
  registerRow: (id: string, element: HTMLElement | null) => void
  ui: Record<string, SlotResolver>
  uiClasses?: Record<string, any>
}

const props = defineProps<FileTreeRowProps>()

defineOptions({ name: 'FileTreeRow' })

const ROTATE_OPEN = 90
const ROTATE_CLOSED = 0
const HEIGHT_DURATION_S = 0.25
const NO_MOTION = Object.freeze({ duration: 0 })
const CHEVRON_SPRING = Object.freeze({ bounce: 0.1, duration: 0.25, type: 'spring' as const })

const isFolder = computed(() => props.node.type === 'folder')
const hasChildren = computed(() => isFolder.value && Boolean(props.node.children?.length))
const isOpen = computed(() => hasChildren.value && props.expandedSet.has(props.node.id))
const isSelected = computed(() => props.selectedId === props.node.id)
const isFocused = computed(() => props.focusedId === props.node.id)

const iconName = computed(() => {
  if (props.node.icon) {
    return props.node.icon
  }

  if (isFolder.value) {
    return isOpen.value ? 'i-lucide-folder-open' : 'i-lucide-folder'
  }

  return 'i-lucide-file'
})

const iconClass = computed(() => {
  if (isFolder.value) {
    return 'size-4 text-primary'
  }

  return isSelected.value ? 'size-4 text-highlighted' : 'size-4 text-muted'
})

const contentRef = ref<HTMLElement | null>(null)
const height = ref<number | 'auto'>(isOpen.value ? 'auto' : 0)

const chevronTransition = computed(() => props.shouldReduceMotion ? NO_MOTION : CHEVRON_SPRING)
const heightTransition = computed(() =>
  props.shouldReduceMotion
    ? NO_MOTION
    : { duration: HEIGHT_DURATION_S, ease: EASE_IN_OUT },
)

function setRowRef(element: Element | ComponentPublicInstance | null) {
  props.registerRow(props.node.id, element instanceof HTMLElement ? element : null)
}

function handleClick() {
  props.onSelect(props.node.id)

  if (hasChildren.value) {
    props.onToggle(props.node.id)
  }
}

function handleAnimationComplete() {
  // `auto` is the resting height once the open animation has landed, so the
  // subtree follows content changes without another measurement.
  if (isOpen.value) {
    height.value = 'auto'
  }
}

watch(isOpen, async (open) => {
  if (!hasChildren.value) {
    return
  }

  if (props.shouldReduceMotion) {
    height.value = open ? 'auto' : 0
    return
  }

  const element = contentRef.value
  const measured = element?.scrollHeight ?? 0

  if (open) {
    height.value = measured
    return
  }

  // Closing from `auto` has no number to animate out of, so the box is pinned
  // to its measured height for one frame before the collapse starts.
  if (height.value === 'auto') {
    height.value = measured
    await nextTick()
  }

  height.value = 0
})
</script>

<template>
  <div role="none">
    <div
      :ref="setRowRef"
      role="treeitem"
      :aria-expanded="hasChildren ? isOpen : undefined"
      :aria-level="level"
      :aria-selected="isSelected"
      :tabindex="isFocused ? 0 : -1"
      :style="{ paddingLeft: `${level * indent}px` }"
      :class="ui.row({ selected: isSelected, class: uiClasses?.row })"
      @click="handleClick"
      @keydown="onKeydown($event, node.id)"
    >
      <span :class="ui.chevronBox({ class: uiClasses?.chevronBox })">
        <Motion
          v-if="isFolder"
          :class="ui.chevron({ class: uiClasses?.chevron })"
          :animate="{ rotate: isOpen ? ROTATE_OPEN : ROTATE_CLOSED }"
          :transition="chevronTransition"
        >
          <UIcon
            name="i-lucide-chevron-right"
            class="size-3.5"
          />
        </Motion>
      </span>

      <span :class="ui.icon({ class: uiClasses?.icon })">
        <UIcon
          :name="iconName"
          :class="iconClass"
        />
      </span>

      <span :class="ui.label({ selected: isSelected, class: uiClasses?.label })">
        {{ node.name }}
      </span>

      <span
        v-if="node.badge"
        :class="ui.badge({ class: uiClasses?.badge })"
      >
        {{ node.badge }}
      </span>
    </div>

    <!--
      The subtree stays mounted so its height can animate. A collapsed box is
      still in the DOM, so `aria-hidden` and `inert` take the rows out of the
      accessibility tree and the tab order until the folder opens again.
    -->
    <Motion
      v-if="hasChildren"
      :animate="{ height }"
      :initial="false"
      :aria-hidden="isOpen ? undefined : 'true'"
      :inert="isOpen ? undefined : true"
      style="overflow: hidden"
      :transition="heightTransition"
      @animation-complete="handleAnimationComplete"
    >
      <div
        ref="contentRef"
        role="group"
        :style="{ marginLeft: `${(level - 1) * indent + indent / 2}px` }"
        :class="ui.group({ lines: showLines, class: uiClasses?.group })"
      >
        <FileTreeRow
          v-for="child in node.children"
          :key="child.id"
          :node="child"
          :level="level + 1"
          :indent="indent"
          :show-lines="showLines"
          :expanded-set="expandedSet"
          :selected-id="selectedId"
          :focused-id="focusedId"
          :should-reduce-motion="shouldReduceMotion"
          :on-toggle="onToggle"
          :on-select="onSelect"
          :on-keydown="onKeydown"
          :register-row="registerRow"
          :ui="ui"
          :ui-classes="uiClasses"
        />
      </div>
    </Motion>
  </div>
</template>
