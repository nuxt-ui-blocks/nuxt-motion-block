<template>
  <div
    ref="boundsRef"
    :class="cn(floating ? 'pointer-events-none absolute inset-0 z-10' : 'relative z-10', props.class)"
  >
    <div :class="floating ? 'absolute inset-x-0 top-4 flex justify-center' : undefined">
      <Motion
        :drag="floating"
        :drag-constraints="floating ? boundsRef ?? undefined : undefined"
        :drag-elastic="0"
        :drag-momentum="false"
        :class="floating ? 'pointer-events-auto touch-none' : undefined"
      >
        <div
          :class="[
            PANEL_SURFACE,
            'relative flex gap-1 p-1.5',
            isHorizontal ? 'flex-row items-center' : 'flex-col items-center',
          ]"
          role="toolbar"
          :aria-label="props.ariaLabel"
          :aria-orientation="props.orientation"
          @keydown="onToolbarKeydown"
        >
          <div
            v-for="tool in props.tools"
            :key="tool.id"
            :data-tool-cell="tool.id"
            class="relative size-9 shrink-0"
          >
            <Motion
              v-if="tool.id === activeOwnerId"
              :layout-id="pillLayoutId"
              :transition="pillTransition"
              class="absolute inset-0 rounded-xl bg-inverted/10"
            />

            <button
              :ref="el => setToolButtonRef(tool.id, el)"
              type="button"
              :class="[TOOL_CLASS, tool.id === activeOwnerId ? 'text-highlighted' : '']"
              :tabindex="tool.id === focusedToolId ? 0 : -1"
              :aria-label="toolLabel(tool)"
              :aria-pressed="tool.id === activeOwnerId"
              :aria-expanded="tool.items?.length ? openFlyoutId === tool.id : undefined"
              :aria-controls="
                tool.items?.length && openFlyoutId === tool.id ? flyoutId(tool.id) : undefined
              "
              :aria-haspopup="tool.items?.length ? 'menu' : undefined"
              :title="toolTitle(tool)"
              @click="onToolClick(tool)"
              @pointerdown="onToolPointerDown(tool)"
              @pointerup="clearLongPressTimer"
              @pointerleave="clearLongPressTimer"
              @pointercancel="clearLongPressTimer"
              @contextmenu.prevent
            >
              <UIcon
                :name="toolIcon(tool)"
                class="size-4"
              />
            </button>

            <button
              v-if="tool.items?.length"
              type="button"
              tabindex="-1"
              :aria-label="`${tool.label} options`"
              :aria-expanded="openFlyoutId === tool.id"
              :aria-controls="openFlyoutId === tool.id ? flyoutId(tool.id) : undefined"
              aria-haspopup="menu"
              class="absolute right-0 bottom-0 flex size-4 cursor-pointer items-end justify-end rounded-br-xl pr-[3px] pb-[3px] text-muted transition-colors hover:text-highlighted focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              @click.stop="toggleCorner(tool)"
              @contextmenu.prevent
            >
              <svg
                viewBox="0 0 6 6"
                class="size-1.5"
                aria-hidden="true"
              >
                <path
                  d="M6 0v6H0z"
                  fill="currentColor"
                />
              </svg>
            </button>

            <Transition name="toolbar-pop">
              <div
                v-if="openFlyoutId === tool.id && tool.items?.length"
                :id="flyoutId(tool.id)"
                :ref="setFlyoutPanel"
                :class="[
                  PANEL_SURFACE,
                  'absolute z-30 flex min-w-44 flex-col gap-0.5 p-1.5',
                  isHorizontal
                    ? 'top-full left-1/2 mt-2 -translate-x-1/2'
                    : 'top-0 left-full ml-2',
                ]"
                :style="{ transformOrigin: isHorizontal ? 'top center' : 'left center' }"
                role="menu"
                :aria-label="`${tool.label} options`"
                @keydown="onFlyoutKeydown($event, tool)"
              >
                <span
                  class="absolute size-2 rotate-45 border-default bg-default"
                  :class="
                    isHorizontal
                      ? '-top-1 left-1/2 -translate-x-1/2 border-t border-l'
                      : 'top-4 -left-1 border-b border-l'
                  "
                  aria-hidden="true"
                />

                <button
                  v-for="item in tool.items"
                  :key="item.id"
                  :ref="el => setFlyoutItemRef(tool.id, item.id, el)"
                  type="button"
                  tabindex="-1"
                  role="menuitemradio"
                  :aria-label="item.label"
                  :class="[
                    FLYOUT_ITEM_CLASS,
                    item.id === resolvedActiveTool ? 'bg-inverted/10 text-highlighted' : '',
                  ]"
                  :aria-checked="item.id === resolvedActiveTool"
                  @click="selectFlyoutItem(tool, item)"
                >
                  <UIcon
                    :name="item.icon"
                    class="size-4 shrink-0"
                  />
                  <span class="flex-1">{{ item.label }}</span>
                  <span
                    v-if="item.shortcut"
                    class="text-[10px] font-medium tracking-wide text-dimmed uppercase"
                  >
                    {{ item.shortcut }}
                  </span>
                  <UIcon
                    v-if="item.id === resolvedActiveTool"
                    name="i-lucide-check"
                    class="size-3.5 text-primary"
                  />
                </button>
              </div>
            </Transition>
          </div>

          <Transition name="toolbar-pop">
            <div
              v-if="$slots.properties"
              :class="[
                PANEL_SURFACE,
                'absolute z-20 w-max p-2',
                isHorizontal ? 'top-full left-1/2 mt-1.5 -translate-x-1/2' : 'top-full left-0 mt-1.5',
              ]"
              role="group"
              aria-label="Tool properties"
            >
              <slot name="properties" />
            </div>
          </Transition>
        </div>
      </Motion>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Motion, useReducedMotion, type Transition } from 'motion-v'
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  useId,
  watch,
} from 'vue'
import { cn } from '../utils/merge'
import { SPRING_DEFAULT, SPRING_REDUCED } from '../utils/motion-tokens'

export interface VectorToolItem {
  /** UIcon name, e.g. `i-lucide-square`. */
  icon: string
  /** Stable id, emitted when this tool or variant is selected. */
  id: string
  /** Accessible name and visible label in the variant flyout. */
  label: string
  /** Single-key shortcut. Matched case-insensitively. */
  shortcut?: string
}

export interface VectorTool extends VectorToolItem {
  /** Variants hidden behind this tool. */
  items?: VectorToolItem[]
}

export interface VectorEditorToolbarProps {
  /** Controlled active tool id. Leave undefined to let the toolbar own it. */
  activeTool?: string
  /** Accessible name for the toolbar. */
  ariaLabel?: string
  /** Extra classes for the root. */
  class?: string
  /** Tool selected when `activeTool` is not bound. Defaults to the first tool. */
  defaultTool?: string
  /** Pins the toolbar near the top of the nearest positioned ancestor and makes it draggable. */
  floating?: boolean
  /** Toolbar axis. Flyouts open below a horizontal bar and to the right of a vertical one. */
  orientation?: 'horizontal' | 'vertical'
  /** Enables single-key shortcuts bound on `document`. */
  shortcutsEnabled?: boolean
  tools: VectorTool[]
}

const props = withDefaults(defineProps<VectorEditorToolbarProps>(), {
  activeTool: undefined,
  ariaLabel: 'Vector editor tools',
  class: undefined,
  defaultTool: undefined,
  floating: false,
  orientation: 'horizontal',
  shortcutsEnabled: true,
})

const emit = defineEmits<{
  'change': [toolId: string]
  'update:activeTool': [toolId: string]
}>()

defineSlots<{
  /** Content for the contextual properties panel below the toolbar. */
  properties?: () => unknown
}>()

const LONG_PRESS_MS = 450
const PANEL_SURFACE
  = 'rounded-2xl border border-default bg-default/80 shadow-[0_0_0.5px_rgba(0,0,0,0.18),0_8px_24px_-8px_rgba(0,0,0,0.28),0_2px_6px_-2px_rgba(0,0,0,0.12)] backdrop-blur-xl'
const TOOL_CLASS
  = 'absolute inset-0 flex size-9 cursor-pointer items-center justify-center rounded-xl text-muted transition-[color,transform] duration-150 ease-out hover:text-highlighted active:scale-[0.92] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-default focus-visible:outline-none motion-reduce:transition-none motion-reduce:active:scale-100'
const FLYOUT_ITEM_CLASS
  = 'flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-left text-sm text-muted transition-colors ease-out hover:bg-muted hover:text-highlighted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:outline-none'

const EDITABLE_TAGS = new Set(['INPUT', 'TEXTAREA', 'SELECT'])

function findOwnerTool(tools: VectorTool[], id: string | undefined) {
  if (!id) return undefined
  return tools.find(tool => tool.id === id || tool.items?.some(item => item.id === id))
}

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false
  return EDITABLE_TAGS.has(target.tagName) || target.isContentEditable
}

const shouldReduceMotion = useReducedMotion()
const uid = useId()
const pillLayoutId = `${uid}-pill`

const internalActiveTool = ref(
  props.activeTool
  || (props.defaultTool && findOwnerTool(props.tools, props.defaultTool)
    ? props.defaultTool
    : props.tools[0]?.id)
  || '',
)
const isControlled = computed(() => Boolean(props.activeTool))
const resolvedActiveTool = computed(() =>
  isControlled.value ? props.activeTool! : internalActiveTool.value,
)
const activeOwner = computed(
  () => findOwnerTool(props.tools, resolvedActiveTool.value) ?? props.tools[0],
)
const activeOwnerId = computed(() => activeOwner.value?.id ?? '')
const isHorizontal = computed(() => props.orientation === 'horizontal')

const focusedToolId = ref(activeOwnerId.value)
const openFlyoutId = ref<string | null>(null)
const flyoutFocusedIndex = ref(0)

const boundsRef = ref<HTMLElement | null>(null)
const flyoutPanelRef = ref<HTMLElement | null>(null)
const toolButtonRefs = new Map<string, HTMLButtonElement>()
const flyoutItemRefs = new Map<string, HTMLButtonElement>()

let longPressTimer: ReturnType<typeof setTimeout> | null = null
let longPressTriggered = false

const pillTransition = computed<Transition>(() =>
  shouldReduceMotion.value ? SPRING_REDUCED : SPRING_DEFAULT,
)

watch(activeOwnerId, (id) => {
  focusedToolId.value = id
})

watch(
  () => props.tools,
  (tools) => {
    if (!tools.length) {
      openFlyoutId.value = null
      internalActiveTool.value = ''
      return
    }

    if (!findOwnerTool(tools, resolvedActiveTool.value) && !isControlled.value) {
      internalActiveTool.value = tools[0]?.id ?? ''
    }

    if (openFlyoutId.value && !tools.some(tool => tool.id === openFlyoutId.value)) {
      openFlyoutId.value = null
    }
  },
)

watch([openFlyoutId, flyoutFocusedIndex], async ([id, index]) => {
  if (!id) return
  await nextTick()
  const tool = props.tools.find(candidate => candidate.id === id)
  const item = tool?.items?.[index]
  if (item) flyoutItemRefs.get(`${id}:${item.id}`)?.focus()
})

watch(openFlyoutId, (id, _previous, onCleanup) => {
  if (!id) return
  document.addEventListener('pointerdown', onDocumentPointerDown)
  onCleanup(() => document.removeEventListener('pointerdown', onDocumentPointerDown))
})

function onDocumentPointerDown(event: PointerEvent) {
  const id = openFlyoutId.value
  if (!id) return

  const target = event.target
  if (!(target instanceof Node)) return
  if (flyoutPanelRef.value?.contains(target)) return

  if (target instanceof Element) {
    const cell = target.closest('[data-tool-cell]')
    if (cell?.getAttribute('data-tool-cell') === id) return
  }

  openFlyoutId.value = null
}

function clearLongPressTimer() {
  if (longPressTimer !== null) {
    clearTimeout(longPressTimer)
    longPressTimer = null
  }
}

function selectTool(id: string) {
  if (!isControlled.value) internalActiveTool.value = id
  emit('update:activeTool', id)
  emit('change', id)
  openFlyoutId.value = null
}

function openFlyout(toolId: string) {
  openFlyoutId.value = toolId
  flyoutFocusedIndex.value = 0
}

function focusTool(id: string) {
  focusedToolId.value = id
  toolButtonRefs.get(id)?.focus()
}

function toggleCorner(tool: VectorTool) {
  clearLongPressTimer()
  if (openFlyoutId.value === tool.id) {
    openFlyoutId.value = null
    return
  }
  openFlyout(tool.id)
}

function onToolPointerDown(tool: VectorTool) {
  longPressTriggered = false
  if (!tool.items?.length) return
  clearLongPressTimer()
  longPressTimer = setTimeout(() => {
    longPressTriggered = true
    longPressTimer = null
    openFlyout(tool.id)
  }, LONG_PRESS_MS)
}

function onToolClick(tool: VectorTool) {
  if (longPressTriggered) {
    longPressTriggered = false
    return
  }

  if (tool.items?.length && tool.id === activeOwnerId.value) {
    openFlyout(tool.id)
    return
  }

  selectTool(tool.id)
}

function activeItem(tool: VectorTool) {
  return tool.items?.find(item => item.id === resolvedActiveTool.value)
}

function toolIcon(tool: VectorTool) {
  return (tool.id === activeOwnerId.value && activeItem(tool)?.icon) || tool.icon
}

function toolLabel(tool: VectorTool) {
  return (tool.id === activeOwnerId.value && activeItem(tool)?.label) || tool.label
}

function toolShortcut(tool: VectorTool) {
  return (tool.id === activeOwnerId.value && activeItem(tool)?.shortcut) || tool.shortcut
}

function toolTitle(tool: VectorTool) {
  const label = toolLabel(tool)
  const shortcut = toolShortcut(tool)
  return shortcut ? `${label} (${shortcut.toUpperCase()})` : label
}

function flyoutId(toolId: string) {
  return `${uid}-flyout-${toolId.replace(/[^\w-]/g, '-')}`
}

function setToolButtonRef(id: string, el: unknown) {
  if (el instanceof HTMLButtonElement) toolButtonRefs.set(id, el)
  else toolButtonRefs.delete(id)
}

function setFlyoutItemRef(toolId: string, itemId: string, el: unknown) {
  const key = `${toolId}:${itemId}`
  if (el instanceof HTMLButtonElement) flyoutItemRefs.set(key, el)
  else flyoutItemRefs.delete(key)
}

function setFlyoutPanel(el: unknown) {
  flyoutPanelRef.value = el instanceof HTMLElement ? el : null
}

function selectFlyoutItem(tool: VectorTool, item: VectorToolItem) {
  selectTool(item.id)
  focusTool(tool.id)
}

function onToolbarKeydown(event: KeyboardEvent) {
  if (openFlyoutId.value || !props.tools.length) return

  const nextKey = isHorizontal.value ? 'ArrowRight' : 'ArrowDown'
  const prevKey = isHorizontal.value ? 'ArrowLeft' : 'ArrowUp'
  const openKey = isHorizontal.value ? 'ArrowDown' : 'ArrowRight'

  if (event.key === openKey) {
    const tool = props.tools.find(candidate => candidate.id === focusedToolId.value)
    if (tool?.items?.length) {
      event.preventDefault()
      openFlyout(tool.id)
    }
    return
  }

  if (event.key === 'Home' || event.key === 'End') {
    event.preventDefault()
    const tool = event.key === 'Home' ? props.tools[0] : props.tools[props.tools.length - 1]
    if (tool) focusTool(tool.id)
    return
  }

  if (event.key !== nextKey && event.key !== prevKey) return
  event.preventDefault()

  const currentIndex = props.tools.findIndex(tool => tool.id === focusedToolId.value)
  const delta = event.key === nextKey ? 1 : -1
  const nextIndex = (currentIndex + delta + props.tools.length) % props.tools.length
  const nextTool = props.tools[nextIndex]
  if (nextTool) focusTool(nextTool.id)
}

function onFlyoutKeydown(event: KeyboardEvent, tool: VectorTool) {
  const items = tool.items ?? []
  if (!items.length) return

  if (event.key === 'Escape') {
    event.preventDefault()
    openFlyoutId.value = null
    focusTool(tool.id)
    return
  }

  if (event.key === 'Tab') {
    openFlyoutId.value = null
    return
  }

  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault()
    const delta = event.key === 'ArrowDown' ? 1 : -1
    flyoutFocusedIndex.value
      = (flyoutFocusedIndex.value + delta + items.length) % items.length
    return
  }

  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    const item = items[flyoutFocusedIndex.value]
    if (!item) return
    selectTool(item.id)
    focusTool(tool.id)
  }
}

function onDocumentKeydown(event: KeyboardEvent) {
  if (!props.shortcutsEnabled) return
  if (isEditableTarget(event.target)) return
  if (event.metaKey || event.ctrlKey || event.altKey) return

  const key = event.key.toLowerCase()

  for (const tool of props.tools) {
    if (tool.shortcut?.toLowerCase() === key) {
      selectTool(tool.id)
      return
    }

    for (const item of tool.items ?? []) {
      if (item.shortcut?.toLowerCase() === key) {
        selectTool(item.id)
        return
      }
    }
  }
}

onMounted(() => {
  document.addEventListener('keydown', onDocumentKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onDocumentKeydown)
  clearLongPressTimer()
})
</script>

<style scoped>
.toolbar-pop-enter-active {
  transition:
    opacity 220ms cubic-bezier(0.23, 1, 0.32, 1),
    transform 220ms cubic-bezier(0.23, 1, 0.32, 1);
}

.toolbar-pop-leave-active {
  transition:
    opacity 140ms cubic-bezier(0.23, 1, 0.32, 1),
    transform 140ms cubic-bezier(0.23, 1, 0.32, 1);
}

.toolbar-pop-enter-from,
.toolbar-pop-leave-to {
  opacity: 0;
  transform: scale(0.96);
}

@media (prefers-reduced-motion: reduce) {
  .toolbar-pop-enter-active,
  .toolbar-pop-leave-active {
    transition: none;
  }
}
</style>
