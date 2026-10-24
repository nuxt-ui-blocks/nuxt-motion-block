<script setup lang="ts">
import { computed } from 'vue'
import { Motion, useReducedMotion } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import breadcrumb from '../theme/breadcrumb'
import { SPRING_DEFAULT } from '../utils/motion-tokens'

/** A single breadcrumb item. */
export interface BreadcrumbItem {
  /** Display label for the item. */
  label: string
  /** URL the item links to. Omit for the current (last) page. */
  href?: string
}

export interface BreadcrumbProps {
  /** Ordered list of items. The last one is treated as the current page. */
  items: BreadcrumbItem[]
  /**
   * Icon name for the separator between items, e.g. `i-lucide-slash`. Use the
   * `separator` slot when the separator needs markup instead of a glyph.
   */
  separator?: string
  /** Accessible name for the `<nav>` landmark. */
  ariaLabel?: string
  /** Extra classes for the root element. */
  class?: string
  /** Per-slot classes merged over the theme defaults. */
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<BreadcrumbProps>(), {
  separator: 'i-lucide-chevron-right',
  ariaLabel: 'Breadcrumb',
  class: undefined,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({
  name: 'breadcrumb',
  props,
  theme: breadcrumb,
})

const shouldReduceMotion = useReducedMotion()
const isReduced = computed(() => shouldReduceMotion.value === true)

const STAGGER_DELAY = 0.04
const ROW_HIDDEN = Object.freeze({ opacity: 0, x: -4 })
const ROW_SHOWN = Object.freeze({ opacity: 1, x: 0 })
const NO_MOTION = Object.freeze({ duration: 0 })

function transitionFor(index: number) {
  // The hidden state stays the same under reduced motion; only the travel is
  // removed. Collapsing the transition keeps the server and client trees
  // identical and still commits the shown values within one frame.
  if (isReduced.value) {
    return NO_MOTION
  }

  return { ...SPRING_DEFAULT, delay: index * STAGGER_DELAY }
}

function isLast(index: number) {
  return index === props.items.length - 1
}
</script>

<template>
  <nav
    :aria-label="props.ariaLabel"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
  >
    <ol :class="ui.list({ class: uiProps.ui?.list })">
      <Motion
        v-for="(item, index) in props.items"
        :key="`${index}-${item.href ?? item.label}`"
        as="li"
        :class="ui.item({ class: uiProps.ui?.item })"
        :initial="ROW_HIDDEN"
        :animate="ROW_SHOWN"
        :transition="transitionFor(index)"
      >
        <span
          v-if="index > 0"
          aria-hidden="true"
          :class="ui.separator({ class: uiProps.ui?.separator })"
        >
          <slot name="separator">
            <UIcon
              :name="props.separator"
              class="size-3.5"
            />
          </slot>
        </span>

        <span
          v-if="isLast(index)"
          aria-current="page"
          :class="ui.current({ class: uiProps.ui?.current })"
        >
          {{ item.label }}
        </span>
        <a
          v-else-if="item.href"
          :href="item.href"
          :class="ui.link({ class: uiProps.ui?.link })"
        >
          {{ item.label }}
        </a>
        <span
          v-else
          :class="ui.plain({ class: uiProps.ui?.plain })"
        >
          {{ item.label }}
        </span>
      </Motion>
    </ol>
  </nav>
</template>
