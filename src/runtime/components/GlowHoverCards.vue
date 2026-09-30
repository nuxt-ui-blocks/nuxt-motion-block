<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <UCard
      v-for="(card, index) in items"
      :key="index"
      class="relative overflow-hidden transition-shadow duration-300"
      :style="{ background: glowBackground(index) }"
      :class="props.class"
      :ui="props.ui"
      @mousemove="(e: MouseEvent) => handleMouseMove(e, index)"
      @mouseleave="handleMouseLeave(index)"
    >
      <template
        v-if="$slots.header"
        #header
      >
        <slot
          name="header"
          :card="card"
          :index="index"
        />
      </template>

      <slot
        :card="card"
        :index="index"
      >
        <div class="space-y-2">
          <h3 class="text-lg font-semibold text-highlighted">
            {{ card.title }}
          </h3>
          <p
            v-if="card.description"
            class="text-sm text-muted"
          >
            {{ card.description }}
          </p>
        </div>
      </slot>

      <template
        v-if="$slots.footer"
        #footer
      >
        <slot
          name="footer"
          :card="card"
          :index="index"
        />
      </template>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import type { CardProps } from '#ui/components/Card.vue'
import { ref } from 'vue'

defineOptions({ inheritAttrs: false })

interface CardItem {
  title: string
  description?: string
  [key: string]: any
}

interface Props {
  class?: string
  ui?: CardProps['ui']
  items: CardItem[]
  glowColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  glowColor: 'var(--ui-primary)',
})

const glowPositions = ref<Record<number, { x: number, y: number }>>({})

function glowBackground(index: number) {
  const position = glowPositions.value[index]
  if (!position) {
    return undefined
  }

  return `radial-gradient(600px circle at ${position.x}px ${position.y}px, color-mix(in srgb, ${props.glowColor} 8%, transparent), transparent 40%)`
}

function handleMouseMove(e: MouseEvent, index: number) {
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
  glowPositions.value = {
    ...glowPositions.value,
    [index]: { x: e.clientX - rect.left, y: e.clientY - rect.top },
  }
}

function handleMouseLeave(index: number) {
  const { [index]: _, ...rest } = glowPositions.value
  glowPositions.value = rest
}
</script>
