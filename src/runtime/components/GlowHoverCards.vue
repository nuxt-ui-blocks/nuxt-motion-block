<template>
  <div :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })">
    <UCard
      v-for="(card, index) in items"
      :key="index"
      :ui="{ root: ui.card({ class: uiProps.ui?.card }) }"
      :style="{ background: glowBackground(index) }"
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
        <div :class="ui.content({ class: uiProps.ui?.content })">
          <h3 :class="ui.title({ class: uiProps.ui?.title })">
            {{ card.title }}
          </h3>
          <p
            v-if="card.description"
            :class="ui.description({ class: uiProps.ui?.description })"
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
import { ref } from 'vue'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import { useResolvedColor } from '../composables/useThemeColor'
import glowHoverCards from '../theme/glow-hover-cards'

defineOptions({ inheritAttrs: false })

interface CardItem {
  title: string
  description?: string
  [key: string]: any
}

interface Props {
  class?: string
  ui?: Record<string, any>
  items: CardItem[]
  glowColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  class: undefined,
  ui: undefined,
  glowColor: 'var(--ui-primary)',
})

const { props: uiProps, ui } = useMotionBlockUI({
  name: 'glowHoverCards',
  props,
  theme: glowHoverCards,
})

const glowPositions = ref<Record<number, { x: number, y: number }>>({})

const resolvedGlowColor = useResolvedColor(() => props.glowColor)

function glowBackground(index: number) {
  const position = glowPositions.value[index]
  if (!position) {
    return undefined
  }

  return `radial-gradient(600px circle at ${position.x}px ${position.y}px, color-mix(in srgb, ${resolvedGlowColor.value} 8%, transparent), transparent 40%)`
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
