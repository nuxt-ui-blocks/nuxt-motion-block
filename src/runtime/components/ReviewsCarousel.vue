<template>
  <div
    class="relative"
    @mouseenter="pauseAutoScroll = true"
    @mouseleave="pauseAutoScroll = false"
  >
    <div
      ref="scrollContainer"
      class="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide"
      style="-ms-overflow-style: none; scrollbar-width: none;"
    >
      <motion.div
        v-for="(review, index) in reviews"
        :key="index"
        :initial="{ opacity: 0, y: 30 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ type: 'spring', stiffness: 300, damping: 25, delay: index * 0.1 }"
        class="snap-start shrink-0 w-80"
      >
        <UCard>
          <div class="flex items-center gap-3 mb-3">
            <img
              v-if="review.avatar"
              :src="review.avatar"
              :alt="review.author"
              class="w-10 h-10 rounded-full object-cover"
            >
            <div>
              <p class="font-semibold text-highlighted">
                {{ review.author }}
              </p>
              <div class="flex gap-0.5">
                <svg
                  v-for="star in 5"
                  :key="star"
                  class="w-4 h-4"
                  :class="star <= review.rating ? 'text-yellow-500' : 'text-default-300'"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
            </div>
          </div>
          <p class="text-sm text-muted leading-relaxed">
            {{ review.content }}
          </p>
        </UCard>
      </motion.div>
    </div>

    <button
      class="absolute left-0 top-1/2 -translate-y-1/2 -ml-3 w-8 h-8 rounded-full bg-default border border-default shadow-md flex items-center justify-center hover:bg-muted transition-colors"
      @click="scroll(-1)"
    >
      <svg
        class="w-4 h-4 text-highlighted"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          d="M15 18l-6-6 6-6"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
    <button
      class="absolute right-0 top-1/2 -translate-y-1/2 -mr-3 w-8 h-8 rounded-full bg-default border border-default shadow-md flex items-center justify-center hover:bg-muted transition-colors"
      @click="scroll(1)"
    >
      <svg
        class="w-4 h-4 text-highlighted"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          d="M9 18l6-6-6-6"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { CardProps } from '#ui/components/Card.vue'
import { ref, onMounted, onUnmounted } from 'vue'
import { motion } from 'motion-v'

defineOptions({ inheritAttrs: false })

interface Review {
  author: string
  rating: number
  content: string
  avatar?: string
}

interface Props {
  class?: string
  ui?: CardProps['ui']
  reviews: Review[]
}

defineProps<Props>()

const scrollContainer = ref<HTMLElement>()
const pauseAutoScroll = ref(false)
let scrollInterval: ReturnType<typeof setInterval> | null = null

function scroll(direction: number) {
  if (!scrollContainer.value) return
  scrollContainer.value.scrollBy({ left: direction * 320, behavior: 'smooth' })
}

onMounted(() => {
  scrollInterval = setInterval(() => {
    if (pauseAutoScroll.value || !scrollContainer.value) return
    const el = scrollContainer.value
    if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) {
      el.scrollTo({ left: 0, behavior: 'smooth' })
    }
    else {
      el.scrollBy({ left: 320, behavior: 'smooth' })
    }
  }, 4000)
})

onUnmounted(() => {
  if (scrollInterval) clearInterval(scrollInterval)
})
</script>
