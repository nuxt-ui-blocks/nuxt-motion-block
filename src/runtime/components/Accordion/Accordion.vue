<template>
  <UAccordion
    :model-value="openValues"
    :type="type"
    :items="items"
    :collapsible="collapsible"
    :disabled="disabled"
    :unmount-on-hide="unmountOnHide"
    :trailing-icon="trailingIcon"
    :value-key="valueKey"
    :label-key="labelKey"
    :class="props.class"
    :ui="resolvedUi"
    @update:model-value="onUpdate"
  >
    <template #default="slotProps">
      <slot
        name="default"
        v-bind="slotProps"
      />
    </template>

    <template #content="slotProps">
      <div
        :ref="(el) => registerPanelFromRef(slotProps.index, el)"
        class="m-accordion__panel overflow-hidden"
        :inert="!isItemOpen(slotProps.item, slotProps.index)"
      >
        <slot
          name="content"
          v-bind="slotProps"
        >
          <div
            data-slot="body"
            :class="bodyClass(slotProps)"
          >
            <slot
              name="body"
              v-bind="slotProps"
            >
              {{ slotProps.item.content }}
            </slot>
          </div>
        </slot>
      </div>
    </template>

    <template #leading="slotProps">
      <slot
        name="leading"
        v-bind="slotProps"
      />
    </template>

    <template #trailing="slotProps">
      <slot
        name="trailing"
        v-bind="slotProps"
      />
    </template>
  </UAccordion>
</template>

<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from 'vue'
import { animate, useReducedMotion } from 'motion-v'

export interface AccordionItem {
  label?: string
  icon?: string
  trailingIcon?: string
  content?: string
  value?: string
  disabled?: boolean
  slot?: string
  class?: any
  ui?: Record<string, any>
  [key: string]: any
}

export interface AccordionProps {
  /** The panels. Each item's `label` fills the trigger and its `content` the panel. */
  items?: AccordionItem[]
  /**
   * Controlled open `value`(s). Bindable with `v-model`. Reka emits `undefined` on a collapsible
   * close; this component normalizes that to `''` so the bound ref never becomes `undefined`.
   */
  modelValue?: string | string[]
  /** Uncontrolled initial open `value`(s). */
  defaultValue?: string | string[]
  type?: 'single' | 'multiple'
  /** Whether the open item can be toggled shut again in `single` mode. */
  collapsible?: boolean
  disabled?: boolean
  /**
   * When closed, the panel stays mounted (`false`, default) so its height can
   * spring back down; `true` unmounts it for the classic "no exit motion" trade.
   */
  unmountOnHide?: boolean
  trailingIcon?: string
  valueKey?: string
  labelKey?: string
  /** Deprecated alias for `modelValue`, kept for parity with the pre-Nuxt-UI API. */
  expandedValue?: string | number | null
  /** Deprecated callback fired with the newly open `value` (or `null`) — `update:modelValue` replaces it. */
  onValueChange?: (value: string | number | null | string[]) => void
  class?: string
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<AccordionProps>(), {
  type: 'single',
  collapsible: true,
  disabled: false,
  unmountOnHide: false,
})

defineSlots<{
  default?: (props: { item: any, index: number, open: boolean }) => any
  content?: (props: { item: any, index: number, open: boolean, ui: object }) => any
  body?: (props: { item: any, index: number, open: boolean, ui: object }) => any
  leading?: (props: { item: any, index: number, open: boolean, ui: object }) => any
  trailing?: (props: { item: any, index: number, open: boolean, ui: object }) => any
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string | string[] | undefined]
}>()

const shouldReduceMotion = useReducedMotion()

/*
 * The `content` slot of `UAccordion` (Reka's `AccordionContent` wrapper) is replaced here so the
 * panel height can be driven by motion-v instead of Nuxt UI's CSS keyframes. Nuxt UI still owns the
 * trigger, the state and the region semantics; only the expanding element is swapped.
 *
 * `unmountOnHide` defaults to `false` (mounted by default) so the closing spring is visible —
 * Reka marks the closed wrapper `hidden="until-found"`, and the unlayered rules below clear that so
 * the shrink can animate, then `inert` removes the collapsed content from the a11y tree and tab order.
 *
 * motion-v's Vue `<motion.div animate>` cannot interpolate `height: 'auto'`, so the panel height is
 * animated imperatively with explicit pixel keyframes: `scrollHeight` is measured (content stays laid
 * out thanks to the `content-visibility` override) and the spring runs 0 -> px on open, px -> 0 on
 * close. The height is restored to `auto` once the opening spring lands, keeping the panel fluid.
 *
 * `Ui.content` is left to the theme wrapper; its own `data-[state]` keyframe animation is cancelled
 * in CSS so only this spring runs. The body fallback chain (`content` -> `body` -> `item.content`)
 * is rebuilt by hand because overriding the slot swallows UAccordion's default body.
 */
const rootMarker = 'm-accordion'

const resolvedUi = computed(() => ({
  ...(props.ui ?? {}),
  root: [rootMarker, props.ui?.root].filter(Boolean),
}))

function bodyClass(slotProps: { item?: any, ui?: any }): string {
  return slotProps.ui?.body?.({ class: [props.ui?.body, slotProps.item?.ui?.body].filter(Boolean) }) ?? ''
}

// Value ground truth. This component is always "controlled" toward UAccordion/Reka: `openValues` is
// a plain string/array that is never `undefined`, so Reka never falls into its passive (no-emit)
// mode and `modelValue` never flips into a different mode between open and close.
//
// Why the normalization matters: Reka emits `undefined` when a `collapsible` single item is toggled
// shut (useSingleOrMultipleValue), and a `v-model` consumer would store that `undefined`. On the next
// open Reka would then be *passive* (its props forbade nothing, but our old code passed
// `model-value="undefined"`), reka's own state stayed closed while our watcher sprang the panel open —
// the divergence observed before this rework. Mapping `undefined -> ''` keeps the whole chain stable.
const parentValue = computed<string | string[] | undefined>(() => {
  if (props.modelValue !== undefined) {
    return props.modelValue
  }
  if (props.expandedValue !== undefined) {
    return props.expandedValue == null ? '' : String(props.expandedValue)
  }
  return undefined
})

const hasParentValue = computed(() => parentValue.value !== undefined)

const openValues = ref<string | string[]>('')
if (parentValue.value !== undefined) {
  openValues.value = parentValue.value
}
else if (props.defaultValue !== undefined) {
  openValues.value = props.defaultValue
}
else {
  openValues.value = props.type === 'multiple' ? [] : ''
}

watch(parentValue, (value) => {
  // Parent-driven control: mirrors the bound value back into the always-defined `openValues`.
  if (value !== undefined) {
    openValues.value = value
  }
})

function normalizeEmitted(value: string | string[] | undefined): string | string[] {
  return Array.isArray(value) ? value : (value === undefined ? '' : value)
}

function onUpdate(value: string | string[] | undefined) {
  openValues.value = normalizeEmitted(value)
  if (hasParentValue.value) {
    emit('update:modelValue', openValues.value)
  }
  if (props.onValueChange) {
    props.onValueChange(normalizeLegacy(openValues.value))
  }
}

function normalizeLegacy(value: string | string[] | undefined): string | number | null | string[] {
  if (Array.isArray(value)) {
    return value.length ? value : null
  }
  if (value === undefined || value === '') {
    return null
  }
  return value
}

function itemValue(item: AccordionItem | undefined, index: number): string {
  if (!item) {
    return String(index)
  }
  return String(item[props.valueKey ?? 'value'] ?? index)
}

function isItemOpen(item: AccordionItem | undefined, index: number): boolean {
  const value = openValues.value
  const key = itemValue(item, index)
  return Array.isArray(value) ? value.includes(key) : value === key
}

/*
 * Reka marks a closed panel's content wrapper with `hidden=""`, and browsers apply
 * `[hidden] { display: none !important }` in the UA sheet — no author rule can un-hide it, so the
 * content inside is never laid out and the panel's `scrollHeight` is 0 (a spring to 0px looks dead).
 * `hidden="until-found"` renders as `content-visibility: hidden` instead of `display: none`, which
 * keeps the content's layout boxes intact; the unlayered rules below then make it fully visible.
 * This must happen synchronously before any height measurement, so the conversion is done here —
 * on mount and on every toggle — rather than in a post-render observer.
 */
function ensureVisible(el: HTMLElement) {
  const wrapper = el.closest('[data-slot="content"]')
  if (wrapper?.getAttribute('hidden') === '') {
    wrapper.setAttribute('hidden', 'until-found')
  }
}

// Per-index panel elements; the ref callback only seeds the initial height once so a re-render of
// the content slot never clobbers an in-flight animation.
const panels = new Map<number, HTMLElement>()
const initialized = new WeakSet<HTMLElement>()
const openStateByIndex = new Map<number, boolean>()

function registerPanel(index: number, el: HTMLElement | null) {
  if (!el) {
    panels.delete(index)
    openStateByIndex.delete(index)
    return
  }
  panels.set(index, el)
  if (!initialized.has(el)) {
    initialized.add(el)
    ensureVisible(el)
    const open = isItemOpen(props.items?.[index], index)
    openStateByIndex.set(index, open)
    el.style.height = open ? 'auto' : '0px'
    el.style.opacity = open ? '1' : '0'
  }
}

// Template ref callbacks hand back `Element | ComponentPublicInstance | null`; narrow to the
// concrete `HTMLElement` the animation code works on.
function registerPanelFromRef(index: number, el: unknown) {
  registerPanel(index, el instanceof HTMLElement ? el : null)
}

const activeControls = new Set<ReturnType<typeof animate>>()
const currentHeightControls = new Map<number, ReturnType<typeof animate>>()

const SPRING_OPEN = { type: 'spring', stiffness: 500, damping: 40 } as const
const SPRING_CLOSE = { type: 'spring', stiffness: 550, damping: 45 } as const
const OPACITY = { duration: 0.2, ease: 'easeOut' } as const

function animatePanel(el: HTMLElement, index: number, open: boolean) {
  if (shouldReduceMotion.value) {
    ensureVisible(el)
    el.style.height = open ? 'auto' : '0px'
    el.style.opacity = open ? '1' : '0'
    return
  }

  ensureVisible(el)

  const height = el.scrollHeight

  const heightControl = animate(
    el,
    { height: open ? [0, height] : [height, 0] },
    open ? SPRING_OPEN : SPRING_CLOSE,
  )
  const opacityControl = animate(el, { opacity: open ? [0, 1] : [1, 0] }, OPACITY)

  activeControls.add(heightControl)
  activeControls.add(opacityControl)
  currentHeightControls.set(index, heightControl)

  heightControl.finished
    .then(() => {
      // Only the latest animation for this panel may write the end state, so a rapid close that
      // interrupts an opening spring can't leave the height stuck at a mid-flight pixel value.
      if (currentHeightControls.get(index) === heightControl) {
        el.style.height = open ? 'auto' : '0px'
      }
    })
    .catch(() => {})
}

watch(openValues, (value) => {
  panels.forEach((el, index) => {
    const key = itemValue(props.items?.[index], index)
    const open = Array.isArray(value) ? value.includes(key) : value === key
    // Only panels whose open state actually changed get animated — a shared v-model touching every
    // accordion would otherwise re-run the opening spring on already-open panels.
    if (openStateByIndex.get(index) !== open) {
      openStateByIndex.set(index, open)
      animatePanel(el, index, open)
    }
  })
})

onUnmounted(() => {
  activeControls.forEach(control => control.stop())
  activeControls.clear()
})
</script>

<style>
/*
 * Unlayered on purpose, mirroring the BasicDropdown override technique: Nuxt UI's accordion theme
 * puts `animate-[accordion-down/up_200ms…]` on the content element inside Tailwind's `utilities`
 * layer, and unlayered CSS always wins over layered CSS. Both rules are scoped to the `m-accordion`
 * root marker so untouched Nuxt UI accordions elsewhere keep their stock keyframes.
 *
 * 1) The wrapper's own data-state keyframe animation is cancelled.
 * 2) The script above rewrites a closed wrapper's `hidden=""` to `hidden="until-found"` (layout is
 *    otherwise killed by the UA sheet's `[hidden] { display: none !important }`). For `until-found`,
 *    Chromium uses `content-visibility: hidden`; restoring it to `visible` (and `display: block`)
 *    makes the closing spring visible in Chromium, and the non-Chromium `display: none` fallback is
 *    lifted too. The collapsed content is then hidden by motion's `height: 0` + `overflow-hidden`
 *    wrapper plus the `inert` attribute, not by the attribute.
 */
.m-accordion [data-slot='content'] {
  animation: none;
}

.m-accordion [data-slot='content'][hidden] {
  content-visibility: visible !important;
  display: block !important;
}
</style>
