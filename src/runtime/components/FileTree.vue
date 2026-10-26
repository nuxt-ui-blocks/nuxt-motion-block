<script setup lang="ts">
import { computed, ref } from 'vue'
import { useReducedMotion } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import fileTree from '../theme/file-tree'
import FileTreeRow from './FileTreeRow.vue'
import type { FileTreeItem } from './FileTreeRow.vue'

export type { FileTreeItem } from './FileTreeRow.vue'

export interface FileTreeProps {
  /** Recursive tree data. */
  items: FileTreeItem[]
  /** Controlled list of expanded folder ids. */
  expanded?: string[]
  /** Ids expanded by default when `expanded` is not bound. */
  defaultExpanded?: string[]
  /** Controlled id of the selected node. */
  selected?: string
  /** Indentation per level, in pixels. */
  indent?: number
  /** Draw vertical guide lines connecting nested levels. */
  showLines?: boolean
  /** Extra classes for the root element. */
  class?: string
  /** Per-slot classes merged over the theme defaults. */
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<FileTreeProps>(), {
  expanded: undefined,
  defaultExpanded: () => [],
  selected: undefined,
  indent: 16,
  showLines: false,
  class: undefined,
  ui: undefined,
})

const emit = defineEmits<{
  'update:expanded': [expanded: string[]]
  'update:selected': [id: string]
}>()

const { props: uiProps, ui } = useMotionBlockUI({
  name: 'fileTree',
  props,
  theme: fileTree,
})

const TYPEAHEAD_PATTERN = /^[a-z0-9]$/i

const shouldReduceMotion = useReducedMotion()
const isReduced = computed(() => shouldReduceMotion.value === true)

const isExpandedControlled = computed(() => props.expanded !== undefined)
const internalExpanded = ref<string[]>([...(props.defaultExpanded ?? [])])
const expandedList = computed(() =>
  isExpandedControlled.value ? (props.expanded ?? []) : internalExpanded.value,
)
const expandedSet = computed(() => new Set(expandedList.value))

const isSelectedControlled = computed(() => props.selected !== undefined)
const internalSelected = ref<string | undefined>(undefined)
const selectedId = computed(() =>
  isSelectedControlled.value ? props.selected : internalSelected.value,
)

interface FlatNode {
  item: FileTreeItem
  level: number
  parentId: string | null
}

function flattenVisible(
  nodes: FileTreeItem[],
  openSet: Set<string>,
  level: number,
  parentId: string | null,
): FlatNode[] {
  const result: FlatNode[] = []

  for (const node of nodes) {
    result.push({ item: node, level, parentId })

    if (node.type === 'folder' && node.children?.length && openSet.has(node.id)) {
      result.push(...flattenVisible(node.children, openSet, level + 1, node.id))
    }
  }

  return result
}

const flatList = computed(() => flattenVisible(props.items, expandedSet.value, 1, null))

const flatIndexById = computed(() => {
  const map = new Map<string, number>()

  flatList.value.forEach((entry, index) => {
    map.set(entry.item.id, index)
  })

  return map
})

const focusedId = ref<string | undefined>(undefined)

/**
 * The roving tabindex must land on a row that is actually visible. After a
 * collapse, or when a controlled selection points into a closed folder, the
 * remembered id is no longer in the flat list; falling back to the first
 * visible row keeps Tab from skipping the tree entirely.
 */
const activeFocusId = computed(() => {
  const preferred = focusedId.value ?? selectedId.value

  if (preferred && flatIndexById.value.has(preferred)) {
    return preferred
  }

  return flatList.value[0]?.item.id
})

const rowRefs = new Map<string, HTMLElement>()

function registerRow(id: string, element: HTMLElement | null) {
  if (element) {
    rowRefs.set(id, element)
  }
  else {
    rowRefs.delete(id)
  }
}

function focusRow(id: string | undefined) {
  if (id) {
    rowRefs.get(id)?.focus()
  }
}

function setExpanded(next: string[]) {
  if (!isExpandedControlled.value) {
    internalExpanded.value = next
  }

  emit('update:expanded', next)
}

function toggleExpanded(id: string, force?: boolean) {
  const isOpen = expandedSet.value.has(id)
  const shouldOpen = force ?? !isOpen

  if (shouldOpen === isOpen) {
    return
  }

  setExpanded(
    shouldOpen
      ? [...expandedList.value, id]
      : expandedList.value.filter(existing => existing !== id),
  )

  // Collapsing hides every row beneath the folder. If focus was on one of
  // them, move the roving tabindex back to the folder instead of leaving the
  // tree with no reachable row.
  const current = focusedId.value
  if (!shouldOpen && current && current !== id && !flatIndexById.value.has(current)) {
    focusedId.value = id
  }
}

function handleSelect(id: string) {
  if (!isSelectedControlled.value) {
    internalSelected.value = id
  }

  emit('update:selected', id)
  focusedId.value = id
}

function moveFocusTo(id: string | undefined) {
  if (!id) {
    return
  }

  focusedId.value = id
  focusRow(id)
}

function typeahead(letter: string, fromIndex: number) {
  const lower = letter.toLowerCase()
  const count = flatList.value.length

  for (let offset = 1; offset <= count; offset++) {
    const index = (fromIndex + offset) % count
    const candidate = flatList.value[index]

    if (candidate?.item.name.toLowerCase().startsWith(lower)) {
      moveFocusTo(candidate.item.id)
      return
    }
  }
}

function handleKeydown(event: KeyboardEvent, id: string) {
  const index = flatIndexById.value.get(id)

  if (index === undefined) {
    return
  }

  const entry = flatList.value[index]
  const node = entry.item

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      moveFocusTo(flatList.value[index + 1]?.item.id)
      break
    case 'ArrowUp':
      event.preventDefault()
      moveFocusTo(flatList.value[index - 1]?.item.id)
      break
    case 'ArrowRight':
      event.preventDefault()

      if (node.type === 'folder' && node.children?.length) {
        if (expandedSet.value.has(node.id)) {
          const next = flatList.value[index + 1]

          if (next && next.parentId === node.id) {
            moveFocusTo(next.item.id)
          }
        }
        else {
          toggleExpanded(node.id, true)
        }
      }
      break
    case 'ArrowLeft':
      event.preventDefault()

      if (node.type === 'folder' && node.children?.length && expandedSet.value.has(node.id)) {
        toggleExpanded(node.id, false)
      }
      else if (entry.parentId) {
        moveFocusTo(entry.parentId)
      }
      break
    case 'Home':
      event.preventDefault()
      moveFocusTo(flatList.value[0]?.item.id)
      break
    case 'End':
      event.preventDefault()
      moveFocusTo(flatList.value.at(-1)?.item.id)
      break
    case 'Enter':
    case ' ':
      event.preventDefault()
      handleSelect(node.id)
      break
    default:
      if (TYPEAHEAD_PATTERN.test(event.key)) {
        event.preventDefault()
        typeahead(event.key, index)
      }
      break
  }
}
</script>

<template>
  <div
    role="tree"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
  >
    <FileTreeRow
      v-for="node in props.items"
      :key="node.id"
      :node="node"
      :level="1"
      :indent="props.indent"
      :show-lines="props.showLines"
      :expanded-set="expandedSet"
      :selected-id="selectedId"
      :focused-id="activeFocusId"
      :should-reduce-motion="isReduced"
      :on-toggle="toggleExpanded"
      :on-select="handleSelect"
      :on-keydown="handleKeydown"
      :register-row="registerRow"
      :ui="ui"
      :ui-classes="uiProps.ui"
    />
  </div>
</template>
