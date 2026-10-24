<script setup lang="ts">
import { computed, useSlots } from 'vue'

export interface ContentSkeletonProps {
  /** Extra classes for the wrapper, or for the block when there is no slot. */
  class?: string
  /** Show the skeleton. When false the children render normally. */
  loading?: boolean
}

const props = withDefaults(defineProps<ContentSkeletonProps>(), {
  class: undefined,
  loading: true,
})

const slots = useSlots()
const hasChildren = computed(() => Boolean(slots.default))
</script>

<template>
  <slot v-if="!props.loading" />

  <div
    v-else-if="hasChildren"
    aria-busy="true"
    aria-live="polite"
    :class="['relative', props.class]"
  >
    <div
      aria-hidden="true"
      class="invisible"
      inert
    >
      <slot />
    </div>

    <div
      aria-hidden="true"
      class="absolute inset-0 animate-pulse rounded-[inherit] bg-muted motion-reduce:animate-none"
    />

    <span class="sr-only">Loading</span>
  </div>

  <div
    v-else
    aria-busy="true"
    :class="['h-4 w-full animate-pulse rounded-md bg-muted motion-reduce:animate-none', props.class]"
  >
    <span class="sr-only">Loading</span>
  </div>
</template>
