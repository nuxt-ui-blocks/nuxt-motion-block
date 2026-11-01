<template>
  <component
    :is="as"
    :class="ui.root({ interactive, colSpan, rowSpan, class: [uiProps.ui?.root, uiProps.class] })"
  >
    <div :class="ui.background({ class: uiProps.ui?.background })">
      <slot name="background">
        <slot />
      </slot>
    </div>

    <div :class="ui.content({ class: uiProps.ui?.content })">
      <div
        v-if="icon || $slots.icon"
        :class="ui.icon({ class: uiProps.ui?.icon })"
      >
        <slot name="icon">
          <UIcon
            v-if="icon"
            :name="icon"
          />
        </slot>
      </div>

      <h3
        v-if="name || $slots.name"
        :class="ui.name({ class: uiProps.ui?.name })"
      >
        <slot name="name">
          {{ name }}
        </slot>
      </h3>

      <p
        v-if="description || $slots.description"
        :class="ui.description({ class: uiProps.ui?.description })"
      >
        <slot name="description">
          {{ description }}
        </slot>
      </p>
    </div>

    <div
      v-if="$slots.cta"
      :class="ui.cta({ class: uiProps.ui?.cta })"
    >
      <slot name="cta" />
    </div>

    <div
      aria-hidden="true"
      :class="ui.overlay({ class: uiProps.ui?.overlay })"
    />
  </component>
</template>

<script setup lang="ts">
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import bentoCard from '../theme/bento-card'

export interface BentoCardProps {
  /** Element to render the card as. */
  as?: string
  /** Extra classes for the card. */
  class?: string
  /** Columns the card spans from `md` upwards. */
  colSpan?: 1 | 2 | 3 | 4 | 5 | 6
  /** Short line under the title. */
  description?: string
  /** Icon name, rendered with `UIcon` unless the `icon` slot is used. */
  icon?: string
  /** Lift the content and reveal the `cta` slot on hover. */
  interactive?: boolean
  /** Title text. */
  name?: string
  /** Rows the card spans from `md` upwards. */
  rowSpan?: 1 | 2 | 3
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<BentoCardProps>(), {
  as: 'article',
  class: undefined,
  colSpan: 1,
  description: undefined,
  icon: undefined,
  interactive: true,
  name: undefined,
  rowSpan: 1,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'bentoCard', props, theme: bentoCard })
</script>
