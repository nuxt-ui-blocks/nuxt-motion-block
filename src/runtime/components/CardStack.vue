<template>
  <div :class="['relative', props.class]">
    <Motion
      v-for="(card, index) in cards"
      :key="card.id"
      class="absolute w-full h-full"
      :style="{
        transformOrigin: 'top center',
      }"
      :animate="{
        top: index * -CARD_OFFSET,
        scale: 1 - index * SCALE_FACTOR,
        zIndex: cards.length - index,
      }"
      :transition="{
        duration: 0.5,
        ease: 'easeInOut',
      }"
    >
      <!-- Using Nuxt UI UCard with proper styling -->
      <UCard
        :ui="{
          root: 'h-full rounded-3xl shadow-xl border border-default dark:border-default/10 shadow-black/[0.1] dark:shadow-white/[0.05] flex flex-col justify-between',
          body: 'flex-1 flex flex-col',
          header: 'pb-2',
          footer: 'pt-2',
        }"
      >
        <!-- Header Slot -->
        <template #header>
          <slot
            name="header"
            :card="card"
            :index="index"
          >
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold text-highlighted">
                {{ card.title || `Card ${card.id}` }}
              </h3>
            </div>
          </slot>
        </template>

        <!-- Content Slot -->
        <div class="flex-1 font-normal text-default">
          <slot
            name="content"
            :card="card"
            :index="index"
          >
            {{ card.content }}
          </slot>
        </div>

        <!-- Footer Slot -->
        <template #footer>
          <slot
            name="footer"
            :card="card"
            :index="index"
          >
            <div class="flex items-center gap-2">
              <UAvatar
                :src="card.avatar"
                :alt="card.name"
                size="lg"
                class="rounded-full"
              />
              <div>
                <p class="text-muted font-medium dark:text-inverted">
                  {{ card.name }}
                </p>
                <p class="text-muted font-normal dark:text-default text-sm">
                  {{ card.designation }}
                </p>
              </div>
            </div>
          </slot>
        </template>
      </UCard>
    </Motion>
  </div>
</template>

<script setup lang="ts">
import { Motion } from 'motion-v'
import { onMounted, onUnmounted, ref } from 'vue'

interface Card {
  id: number
  name: string
  designation: string
  content: string
  title?: string
  [key: string]: any
}

const props = withDefaults(defineProps<{
  items: Card[]
  offset?: number
  scaleFactor?: number
  autoRotate?: boolean
  rotateInterval?: number
  class?: string
}>(), {
  offset: 10,
  scaleFactor: 0.06,
  autoRotate: true,
  rotateInterval: 5000,
  class: 'h-60 w-60 md:h-60 md:w-96',
})

// Reactive state
const cards = ref<Card[]>([])
const CARD_OFFSET = ref(props.offset)
const SCALE_FACTOR = ref(props.scaleFactor)

// Initialize cards
onMounted(() => {
  // Only initialize on client side
  if (typeof window !== 'undefined') {
    // Initialize cards with props items
    cards.value = [...props.items]

    if (props.autoRotate) {
      startFlipping()
    }
  }
})

// Auto-rotation
let interval: NodeJS.Timeout | null = null

const startFlipping = () => {
  // Only run on client side
  if (typeof window === 'undefined') return

  interval = setInterval(() => {
    // Only run on client side
    if (typeof window === 'undefined') return

    const newArray = [...cards.value]
    newArray.unshift(newArray.pop()!)
    cards.value = newArray
  }, props.rotateInterval)
}

const stopFlipping = () => {
  if (interval) {
    clearInterval(interval)
    interval = null
  }
}

// Manual controls
const nextCard = () => {
  const newArray = [...cards.value]
  newArray.unshift(newArray.pop()!)
  cards.value = newArray
}

const prevCard = () => {
  const newArray = [...cards.value]
  newArray.push(newArray.shift()!)
  cards.value = newArray
}

// Cleanup
onUnmounted(() => {
  stopFlipping()
})

// Expose methods to parent
defineExpose({
  startFlipping,
  stopFlipping,
  nextCard,
  prevCard,
})
</script>
