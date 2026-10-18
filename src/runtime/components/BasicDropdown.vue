<template>
  <!--
    The component is a single `USelect`, so Vue *can* auto-inherit fallthrough attributes
    straight onto `USelect` — but `USelect` itself declares `inheritAttrs: false` and forwards
    `$attrs` to its `SelectTrigger`, which is what the reference exposes as the interactive
    element. That is also where a caller's `class` has to end up, and because `class` is a
    *declared* prop here it never appears in `$attrs`: Vue consumes it, so it has to be handed to
    `USelect` explicitly for its own `ui.base` merge to place it on the trigger.
  -->
  <USelect
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
    :model-value="internalId"
    :items="props.items"
    :value-key="VALUE_KEY"
    :placeholder="props.label"
    :aria-label="triggerLabel"
    aria-haspopup="listbox"
    :content="content"
    :ui="selectUi"
    v-bind="$attrs"
    @update:model-value="onUpdateValue"
  >
    <!--
      The reference renders a row as `<li role="option">` > `<button>`, with the selected check as an
      inline 16px SVG whose first child is `<title>Selected</title>` — the reference's docs call that
      title out as a screen-reader feature. `USelect`'s default row draws that check with `UIcon`,
      which renders a bare `<span class="iconify">` and structurally cannot host a `<title>`, so the
      row content is rebuilt here to match the reference. Only the *content* is replaced: `RSelectItem`
      still owns the row element, so Reka's `data-state` / `data-highlighted` / `aria-selected` wiring
      and all keyboard handling are untouched. Nuxt UI's theme classes for these slots are re-stated
      rather than inherited, because the default `itemTrailingIcon` span is gone.
    -->
    <template #item="{ item }">
      <UIcon
        v-if="item.icon"
        :name="item.icon"
        data-slot="itemLeadingIcon"
        :class="ui.itemLeadingIcon({ class: uiProps.ui?.itemLeadingIcon })"
      />

      <span
        data-slot="itemWrapper"
        :class="ui.itemWrapper({ class: uiProps.ui?.itemWrapper })"
      >
        <SelectItemText
          data-slot="itemLabel"
          :class="ui.itemLabel({ class: uiProps.ui?.itemLabel })"
        >{{ item.label }}</SelectItemText>
      </span>

      <span
        data-slot="itemTrailing"
        :class="ui.itemTrailing({ class: uiProps.ui?.itemTrailing })"
      >
        <span
          v-if="item.id === internalId"
          data-slot="itemTrailingIcon"
          :class="ui.itemTrailingIcon({ class: uiProps.ui?.itemTrailingIcon })"
        >
          <svg
            :class="ui.checkIcon({ class: uiProps.ui?.checkIcon })"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <title>Selected</title>
            <path
              d="M5 13l4 4L19 7"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            />
          </svg>
        </span>
      </span>
    </template>

    <template #trailing="{ open }">
      <motion.div
        :animate="{ rotate: open ? ROTATION_ANGLE_OPEN : 0 }"
        :transition="{ duration: shouldReduceMotion ? 0 : ROTATION_DURATION }"
      >
        <UIcon
          name="i-lucide-chevron-down"
          :class="ui.chevronIcon({ class: uiProps.ui?.chevronIcon })"
        />
      </motion.div>
    </template>
  </USelect>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { motion, useReducedMotion } from 'motion-v'
// Reka's own `SelectItemText`, which owns the id that the row's `aria-labelledby` points at. The
// label has to keep using it (rather than a plain span) so that the selected row's accessible name
// stays the label alone: the check SVG's `<title>Selected</title>` lives in the same subtree and
// would otherwise be folded into the name, giving "Option 2 Selected".
import { SelectItemText } from 'reka-ui'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import basicDropdown from '../theme/basic-dropdown'

const ROTATION_ANGLE_OPEN = 180
const ROTATION_DURATION = 0.2
const DROPDOWN_OFFSET = 4

// `DropdownItem` is keyed on `id`, so the value/label lookups are pointed at it directly instead
// of at `USelect`'s `value`/`label` defaults. Nothing has to be remapped in either direction.
const VALUE_KEY = 'id'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<Props>(), {
  class: undefined,
  ui: undefined,
  // `undefined` (not `null`) is the default so that "no `v-model` bound" stays distinguishable
  // from "`v-model` bound to `null`". Only the latter is a controlled empty state.
  modelValue: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'basicDropdown', props, theme: basicDropdown })

const emit = defineEmits<{
  'change': [item: DropdownItem]
  'update:modelValue': [value: DropdownItem | null]
}>()

const shouldReduceMotion = useReducedMotion()

/**
 * `USelect` is bound through `:model-value` in both modes, so this single ref is the value the
 * trigger renders. In controlled mode it only ever mirrors `props.modelValue`; in uncontrolled
 * mode it is the source of truth.
 */
const internalId = ref<DropdownItem['id'] | undefined>(undefined)

const isControlled = computed(() => props.modelValue !== undefined)

const selectedItem = computed<DropdownItem | undefined>(() =>
  isControlled.value
    ? props.modelValue ?? undefined
    : props.items.find(item => item.id === internalId.value),
)

watch(() => props.modelValue, (value) => {
  internalId.value = value?.id
}, { immediate: true })

const triggerLabel = computed(() =>
  selectedItem.value ? `${props.label}: ${selectedItem.value.label}` : props.label,
)

function findItem(id: unknown): DropdownItem | undefined {
  return props.items.find(item => item.id === id)
}

function onUpdateValue(id: unknown) {
  const item = findItem(id)
  // Controlled: the prop stays the single source of truth, so the value is not mirrored here.
  // Writing it back would desync if the parent refuses the change, and `USelect` would render a
  // selection that `modelValue` does not agree with.
  if (isControlled.value) {
    emit('update:modelValue', item ?? null)
    return
  }
  internalId.value = item?.id
  if (item) {
    emit('change', item)
  }
}

/**
 * The exit animation rides on Reka's `usePresence`, which — on `open` going false — re-reads the
 * content node's computed `animation-name` one tick later and, if it changed, holds the node in an
 * `unmountSuspended` state until `animationend`. So flipping `data-state` to `closed` is enough to
 * make the panel-out keyframes below play in full before it is removed from the DOM.
 *
 * `forceMount` is deliberately NOT set. It would make `present` permanently true, so every instance
 * would mount its popper for the lifetime of the page, and `SelectContentImpl` runs
 * `useBodyScrollLock` and `useHideOthers` on mount — that is `body { pointer-events: none }` plus
 * `aria-hidden` on every sibling of the content, for closed dropdowns included.
 *
 * `collisionPadding: 8` is a deliberate divergence: the reference hard-positions the panel with
 * inline `left`/`top` from the trigger's own rect and applies no collision handling at all, so a
 * trigger near a viewport edge gets a panel that runs off-screen. Floating UI re-measures and
 * flips/clamps instead, and the padding is the 8px breathing room kept between the panel and the
 * viewport edge. Set it to `0` for the reference's unguarded placement.
 */
const content = {
  side: 'bottom' as const,
  sideOffset: DROPDOWN_OFFSET,
  collisionPadding: 8,
  position: 'popper' as const,
}

/**
 * The animation class names have to survive the portalled render, so they are attached through the
 * `ui` prop rather than through a `scoped` style block: the content is teleported to `<body>` and
 * rendered by `USelect`, so no scope attribute is ever added to it.
 */
const selectUi = computed(() => ({
  // `text-left` and `gap-2` are the reference's own trigger declarations. `text-left` matters: the
  // Nuxt UI theme puts `text-center` on the trigger and its `pe-2.5` + `pr-9` on the trailing slot,
  // so without it the selected label is centred instead of flush-left and the chevron sits 10px from
  // the edge rather than the reference's 16px. `trailing: pe-4` restores that inset.
  base: ui.value.base({ class: uiProps.ui?.base }),
  trailing: ui.value.trailing({ class: uiProps.ui?.trailing }),
  content: ui.value.content({ class: uiProps.ui?.content }),
  group: ui.value.group({ class: uiProps.ui?.group }),
  item: ui.value.item({ class: uiProps.ui?.item }),
  itemLabel: ui.value.itemLabel({ class: uiProps.ui?.itemLabel }),
  viewport: ui.value.viewport({ class: uiProps.ui?.viewport }),
}))
</script>

<script lang="ts">
export interface DropdownItem {
  id: string | number
  icon?: string
  label: string
}

export interface Props {
  class?: string
  ui?: Record<string, any>
  items: DropdownItem[]
  label: string
  modelValue?: DropdownItem | null
}
</script>

<style>
/*
 * Unlayered on purpose: Nuxt UI's `content` slot ships its own `data-[state=open]:animate-[scale-in…]`
 * inside Tailwind's `utilities` cascade layer, and unlayered CSS always wins over layered CSS. That
 * makes these rules authoritative over the built-in scale animation they replace.
 *
 * The reference runs springs, not eased tweens, and every value below is framer-motion's own solution
 * to the matching spring, generated with `motion-dom`'s solver and emitted as the `linear()` easing its
 * `spring.toString()` produces. They are baked in rather than computed at runtime so the stylesheet
 * stays static. The `linear()` stop lists visibly overshoot (1.0015 for the panel, 1.0043 for the item,
 * 1.1079 for the check) — that is the spring character, not a rounding artefact.
 */
.m-basic-dropdown__content {
  --m-basic-dropdown-ease-panel: linear(0, 0.36, 0.7414, 0.9221, 0.984, 0.9995, 1.0015, 1);
  --m-basic-dropdown-ease-item: linear(0, 0.1137, 0.3303, 0.5435, 0.7137, 0.8342, 0.9124, 0.9591, 0.9848, 0.9976, 1.0029, 1.0043, 1.004, 1.0031, 1.0022, 1.0014, 1.0008, 1);
  --m-basic-dropdown-ease-check: linear(0, 0.1154, 0.3627, 0.6292, 0.8502, 1.0006, 1.0815, 1.1079, 1.0996, 1.0743, 1.0451, 1.02, 1.0022, 0.9922, 0.9885, 0.9889, 0.9914, 0.9946, 0.9974, 0.9995, 1.0007, 1);
}

/*
 * The reference pads the list with `py-2` and leaves the sides flush, then gives each row `px-4 py-2`
 * and a 44px minimum. Nuxt UI's theme puts `p-1` on the `group` and `p-1.5` on each `item`, which works
 * out at 4px of list padding and a 32px row, so both are corrected here. The reference's 15px row
 * (44px minus `py-2` top and bottom) is 20px tall and centred; the theme's `items-start` is not.
 */
.m-basic-dropdown__group {
  padding: 0.5rem 0;
}

/*
 * The reference lets a highlighted row overhang the panel by 5px, because its `<ul>` has no scroll
 * container at all. Nuxt UI's viewport is `overflow-y: auto`, and per spec that forces the x axis to
 * `auto` as well — so the shift opens a horizontal scrollbar that takes 15px off the bottom of the
 * list. `hidden` keeps the shift on screen and drops the phantom scrollbar.
 *
 * The `min-height` is the reference's `py-2` carried onto the viewport instead of the group, because
 * the group is where Nuxt UI keeps it and there is no group at all when `items` is empty. Without this
 * an empty dropdown collapses to a 0px sliver where the reference still shows a 16px panel; it can
 * never bind on a populated list, whose height is always 44px per row plus those 16px.
 *
 * `1rem` and not `2rem` because these styles use bare `rem` everywhere: the reference's own
 * Tailwind scale is rem-based, and every other length in this block (0.5rem padding, 44px row,
 * 0.25rem offsets) was converted at the same 16px root, so the floor has to match that conversion.
 */
.m-basic-dropdown__viewport {
  min-height: 1rem;
  overflow-x: hidden;
}

.m-basic-dropdown__item {
  align-items: center;
  gap: 0.5rem;
  min-height: 44px;
  padding: 0.5rem 1rem;
  /* 5px — the reference's HOVER_SHIFT, which is a spring there too, so it reuses the item curve. */
  transition: transform 550ms var(--m-basic-dropdown-ease-item);
}

/*
 * The reference's row is `<button class="flex ... items-center">` holding the icon, the label text and
 * an `ml-auto` check, so the label is left-packed and the check is pushed to the far edge. Nuxt UI
 * reaches the same layout with `flex-1 min-w-0` on an `itemWrapper` around the label; that wrapper is
 * re-declared here because the default item content is replaced, and the check rides in a sibling
 * `itemTrailing` span that the flexible wrapper pushes right.
 */
.m-basic-dropdown__item-wrapper {
  flex: 1;
  min-width: 0;
}

/* The reference marks the selected row with `font-medium text-brand` on its label. */
.m-basic-dropdown__item[data-state='checked'] .m-basic-dropdown__item-label {
  color: var(--ui-primary);
  font-weight: 500;
}

/*
 * `focus-visible:ring-2 ring-ring ring-offset-2` on the trigger and on each row, spelled out. The CSS
 * pseudo-class is load-bearing rather than Reka's `data-highlighted`: Reka marks the highlighted row for
 * pointer *and* keyboard, whereas the reference rings only on keyboard focus (`focus-visible:ring-2`) and
 * backgrounds only on hover (`hover:bg-muted`). Keying on the pseudo-class restores that split. The offset
 * ring is drawn in the surface colour, which is what `ring-offset-2` resolves to inside the reference's own
 * `bg-default` panel — Tailwind's literal default offset colour is a hardcoded white that would ring the
 * dark panel in white.
 *
 * The ring colour is `--ui-primary`, not `--ui-ring`: Nuxt UI's theme declares no `--ui-ring` token,
 * and an undefined `var()` invalidates the whole `box-shadow` at computed-value time — which
 * silently computed to `none` and dropped the ring entirely until this was fixed.
 */
.m-basic-dropdown__trigger:focus-visible,
.m-basic-dropdown__item:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--ui-primary), 0 0 0 4px var(--ui-bg);
}

/*
 * Hovering the trigger does nothing. The reference declares `hover:bg-primary`, which in this theme
 * resolves to a saturated green fill under white text — jarring next to a neutral trigger, so it is
 * dropped here. Nuxt UI's own `ui.base` also carries a residual `hover:bg-elevated` on the trigger, so
 * the surface colour is pinned on hover as well; without this the control would still lift on hover.
 * Delete this rule to get Nuxt UI's subtle default hover back.
 */
.m-basic-dropdown__trigger:hover {
  background-color: var(--ui-bg);
}

.m-basic-dropdown__content[data-state='open'] {
  animation: m-basic-dropdown-panel-in 250ms var(--m-basic-dropdown-ease-panel);
}

/*
 * The panel's `exit` is the one transition the reference overrides, down to a plain 0.15s tween on
 * framer-motion's default `easeOut` — so unlike everything else here it is a curve, not a spring.
 */
.m-basic-dropdown__content[data-state='closed'] {
  animation: m-basic-dropdown-panel-out 150ms cubic-bezier(0, 0, 0.58, 1);
}

.m-basic-dropdown__content[data-state='open'] .m-basic-dropdown__item {
  animation: m-basic-dropdown-item-in 550ms var(--m-basic-dropdown-ease-item) backwards;
}

.m-basic-dropdown__content[data-state='closed'] .m-basic-dropdown__item {
  animation: m-basic-dropdown-item-out 550ms var(--m-basic-dropdown-ease-item);
}

.m-basic-dropdown__item:hover,
.m-basic-dropdown__item[data-highlighted] {
  transform: translateX(5px);
}

/*
 * The check has no exit variant in the reference — the whole content block leaves together, so the
 * panel's own opacity carries the close and the check is free to stay at `scale(1)`.
 */
.m-basic-dropdown__content[data-state='open'] .m-basic-dropdown__check {
  animation: m-basic-dropdown-check-in 650ms var(--m-basic-dropdown-ease-check);
}

@keyframes m-basic-dropdown-panel-in {
  from {
    opacity: 0;
    transform: translateY(-10px) scaleY(0.8);
  }

  to {
    opacity: 1;
    transform: translateY(0) scaleY(1);
  }
}

@keyframes m-basic-dropdown-panel-out {
  from {
    opacity: 1;
    transform: translateY(0) scaleY(1);
  }

  to {
    opacity: 0;
    transform: translateY(-10px) scaleY(0.8);
  }
}

@keyframes m-basic-dropdown-item-in {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes m-basic-dropdown-item-out {
  from {
    opacity: 1;
    transform: translateX(0);
  }

  to {
    opacity: 0;
    transform: translateX(-10px);
  }
}

@keyframes m-basic-dropdown-check-in {
  from {
    transform: scale(0);
  }

  to {
    transform: scale(1);
  }
}

/*
 * `none` rather than `0s`: Reka's `usePresence` decides whether to suspend the unmount by comparing
 * the computed `animation-name` before and after the state flip, and it is the change that matters —
 * `none` on both sides resolves to an immediate unmount, which is the reduced-motion behaviour wanted
 * here, and it can never strand the node.
 *
 * The `[data-state]` attribute is load-bearing, not decoration. Every animated selector above is
 * state-scoped — `.m-basic-dropdown__content[data-state='open']` and its item and check descendants
 * carry one more attribute than the plain class selectors would, so a bare `.m-basic-dropdown__content
 * { animation: none }` loses on specificity and the spring keeps playing for users who asked for less
 * motion. Matching the shape with the bare `[data-state]` puts these rules back on equal footing, and
 * being last in the same stylesheet they then win on order. This is why the hover and highlight reset
 * below does *not* need the attribute: those rules are already unscoped.
 */
@media (prefers-reduced-motion: reduce) {
  .m-basic-dropdown__content[data-state],
  .m-basic-dropdown__content[data-state] .m-basic-dropdown__item,
  .m-basic-dropdown__content[data-state] .m-basic-dropdown__check {
    animation: none;
  }

  .m-basic-dropdown__item {
    transition: none;
  }

  .m-basic-dropdown__item:hover,
  .m-basic-dropdown__item[data-highlighted] {
    transform: none;
  }
}
</style>
