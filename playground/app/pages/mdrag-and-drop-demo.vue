<template>
  <div class="space-y-12">
    <UPageHeader
      title="Drag and Drop"
      description="Reorder a list, move items into drop zones and toggle selection with one motion-enabled component."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Sort a list
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Each row is a <code class="font-mono">Motion</code> element keyed by
        <code class="font-mono">item.id</code>, so when a drop reorders the array the layout
        animation carries every row to its new slot. The component keeps its own copy of the data
        and emits the result — you have to write it back yourself or the next render resets the
        order. Rows must carry string ids because they become
        <code class="font-mono">layout-id</code>.
      </p>

      <MDragAndDrop
        data-testid="dnd-sort"
        :items="sortItems"
        item-class="cursor-grab"
        class="rounded-xl border border-dashed border-default p-3"
        @change="onChange"
        @drag-end="onDragEnd"
      >
        <template #default="slot">
          <div
            class="flex items-center gap-3 rounded-lg border border-default bg-default px-3 py-2.5"
            :class="isDragging(slot) ? 'opacity-60 scale-[1.02]' : ''"
            :data-testid="`row-${slot.item.id}`"
          >
            <UIcon
              name="i-lucide-grip-vertical"
              class="size-4 shrink-0 text-dimmed"
            />
            <span class="flex-1 text-sm font-medium">
              {{ slot.item.label }}
            </span>
            <UBadge
              size="sm"
              variant="subtle"
            >
              {{ slot.item.owner }}
            </UBadge>
          </div>
        </template>
      </MDragAndDrop>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          order
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-order"
        >
          {{ order }}
        </dd>
        <dt class="text-muted">
          last drop
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-dragend"
        >
          {{ lastDrag }}
        </dd>
        <dt class="text-muted">
          layout
        </dt>
        <dd class="font-mono">
          list → space-y-2
        </dd>
        <dt class="text-muted">
          transition
        </dt>
        <dd class="font-mono">
          spring · bounce 0.2 · 0.3s
        </dd>
        <dt class="text-muted">
          source array
        </dt>
        <dd class="font-mono">
          written back on change
        </dd>
        <dt class="text-muted">
          ids
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-ids"
        >
          {{ sortItems.length }} strings
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Move mode with drop zones
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Anything other than <code class="font-mono">sort</code> renders three dashed zones under
        the list. In <code class="font-mono">move</code> mode a drop removes the item from the list
        and the component emits both <code class="font-mono">drop</code> and
        <code class="font-mono">change</code>; in <code class="font-mono">copy</code> mode the list
        is left alone and only the zone event fires. Masonry adds
        <code class="font-mono">break-inside: avoid</code> plus a margin per item so columns pack.
      </p>

      <MDragAndDrop
        data-testid="dnd-move"
        :items="moveItems"
        mode="move"
        layout="masonry"
        class="rounded-xl border border-dashed border-default p-3"
        @change="onMoveChange"
        @drop="onZoneDrop"
      >
        <template #default="slot">
          <div
            class="rounded-lg border border-default bg-default px-3 py-2.5 text-sm"
            :class="isDragging(slot) ? 'opacity-60' : ''"
            :data-testid="`chip-${slot.item.id}`"
          >
            {{ slot.item.label }}
          </div>
        </template>
      </MDragAndDrop>

      <div class="mt-4 flex flex-wrap gap-2">
        <UButton
          label="Restore chips"
          icon="i-lucide-rotate-ccw"
          variant="outline"
          size="sm"
          data-testid="restore-move"
          @click="moveItems = [...moveSeed]"
        />
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          mode
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-mode"
        >
          move
        </dd>
        <dt class="text-muted">
          zones
        </dt>
        <dd class="font-mono">
          3 · rendered only off sort
        </dd>
        <dt class="text-muted">
          last zone drop
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-zone"
        >
          {{ lastZone }}
        </dd>
        <dt class="text-muted">
          remaining
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-remaining"
        >
          {{ moveItems.map(item => item.label).join(', ') || 'all dropped' }}
        </dd>
        <dt class="text-muted">
          layout
        </dt>
        <dd class="font-mono">
          masonry → columns-2/3/4
        </dd>
        <dt class="text-muted">
          gap
        </dt>
        <dd class="font-mono">
          16px margin-bottom
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Handles, selection and lockout
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        <code class="font-mono">show-handle</code> reveals a grip that swallows its own
        <code class="font-mono">mousedown</code>, <code class="font-mono">allow-multi-select</code>
        makes a plain click (or Ctrl/Cmd-click) ring the item and emit
        <code class="font-mono">select</code>, and <code class="font-mono">disabled</code> greys the
        rows out and refuses to start a drag.
      </p>

      <MDragAndDrop
        :key="`toggles-${showHandle}-${allowMultiSelect}-${disabled}`"
        data-testid="dnd-toggles"
        :items="toggleItems"
        :show-handle="showHandle"
        :allow-multi-select="allowMultiSelect"
        :disabled="disabled"
        item-class="cursor-grab"
        class="rounded-xl border border-dashed border-default p-3"
        @select="onSelect"
      >
        <template #default="slot">
          <div
            class="flex items-center gap-3 rounded-lg border bg-default px-3 py-2.5 text-sm"
            :class="[isSelected(slot) ? 'border-primary ring-2 ring-primary/40' : 'border-default', disabled ? 'opacity-50' : '']"
            :data-testid="`toggle-row-${slot.item.id}`"
          >
            <span class="flex-1">
              {{ slot.item.label }}
            </span>
            <UBadge
              v-if="isSelected(slot)"
              size="sm"
              data-testid="selected-badge"
            >
              selected
            </UBadge>
          </div>
        </template>
      </MDragAndDrop>

      <div class="mt-4 flex flex-wrap gap-2">
        <UButton
          :label="`showHandle: ${showHandle ? 'on' : 'off'}`"
          variant="outline"
          size="sm"
          data-testid="toggle-handle"
          @click="showHandle = !showHandle"
        />
        <UButton
          :label="`multiSelect: ${allowMultiSelect ? 'on' : 'off'}`"
          variant="outline"
          size="sm"
          data-testid="toggle-multi"
          @click="allowMultiSelect = !allowMultiSelect"
        />
        <UButton
          :label="`disabled: ${disabled ? 'on' : 'off'}`"
          variant="outline"
          size="sm"
          data-testid="toggle-disabled"
          @click="disabled = !disabled"
        />
        <UButton
          label="Clear selection"
          icon="i-lucide-x"
          variant="soft"
          size="sm"
          data-testid="clear-selection"
          @click="selected = []"
        />
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          showHandle
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-handle"
        >
          {{ showHandle ? 'grip visible' : 'hidden' }}
        </dd>
        <dt class="text-muted">
          multiSelect
        </dt>
        <dd class="font-mono">
          {{ allowMultiSelect ? 'click toggles' : 'off' }}
        </dd>
        <dt class="text-muted">
          disabled
        </dt>
        <dd class="font-mono">
          {{ disabled ? 'drag refused' : 'draggable' }}
        </dd>
        <dt class="text-muted">
          selected
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-selected"
        >
          {{ selected.length ? selected.join(', ') : 'none' }}
        </dd>
        <dt class="text-muted">
          events
        </dt>
        <dd class="font-mono">
          change · dragStart · dragEnd · drop · select
        </dd>
        <dt class="text-muted">
          snapToGrid
        </dt>
        <dd class="font-mono">
          true (default)
        </dd>
      </dl>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface SortItem {
  id: string
  label: string
  owner: string
}

interface DndItem {
  id: string | number
  [key: string]: any
}

interface SlotScope {
  'item': DndItem
  'index': number
  'isDragging'?: boolean
  'is-dragging'?: boolean
  'isSelected'?: boolean
  'is-selected'?: boolean
}

const sortSeed: SortItem[] = [
  { id: 'design-tokens', label: 'Design tokens', owner: 'Ana' },
  { id: 'component-audit', label: 'Component audit', owner: 'Ben' },
  { id: 'motion-guidelines', label: 'Motion guidelines', owner: 'Chidi' },
  { id: 'accessibility-pass', label: 'Accessibility pass', owner: 'Dara' },
  { id: 'docs-rewrite', label: 'Docs rewrite', owner: 'Eli' },
]

const moveSeed = [
  { id: 'red', label: 'Red chip' },
  { id: 'amber', label: 'Amber chip' },
  { id: 'teal', label: 'Teal chip' },
  { id: 'violet', label: 'Violet chip' },
]

const toggleItems = [
  { id: 'alpha', label: 'Alpha task' },
  { id: 'beta', label: 'Beta task' },
  { id: 'gamma', label: 'Gamma task' },
]

const sortItems = ref<SortItem[]>([...sortSeed])
const moveItems = ref([...moveSeed])
const lastDrag = ref('none yet')
const lastZone = ref('none yet')

const showHandle = ref(false)
const allowMultiSelect = ref(false)
const disabled = ref(false)
const selected = ref<string[]>([])

const order = computed(() => sortItems.value.map(item => item.label).join(' · '))

const isDragging = (slot: SlotScope) => Boolean(slot.isDragging ?? slot['is-dragging'])
const isSelected = (slot: SlotScope) => Boolean(slot.isSelected ?? slot['is-selected'])

const onChange = (next: DndItem[]) => {
  sortItems.value = [...next] as SortItem[]
}

const onDragEnd = (item: DndItem, oldIndex: number, newIndex: number) => {
  lastDrag.value = oldIndex === newIndex
    ? `${item.label} stayed at index ${newIndex}`
    : `${item.label}: index ${oldIndex} → ${newIndex}`
}

const onMoveChange = (next: DndItem[]) => {
  moveItems.value = [...next] as { id: string, label: string }[]
}

const onZoneDrop = (_item: DndItem, zone: number) => {
  lastZone.value = `zone ${zone + 1}`
}

const onSelect = (item: DndItem, state: boolean) => {
  selected.value = state
    ? [...selected.value, String(item.id)]
    : selected.value.filter(id => id !== item.id)
}
</script>
