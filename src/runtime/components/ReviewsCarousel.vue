<template>
  <div
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
    @mouseenter="pauseAutoScroll = true"
    @mouseleave="pauseAutoScroll = false"
  >
    <div
      ref="scrollContainer"
      :class="ui.scroller({ class: uiProps.ui?.scroller })"
      style="-ms-overflow-style: none; scrollbar-width: none;"
    >
      <motion.div
        v-for="(review, index) in reviews"
        :key="index"
        :initial="{ opacity: 0, y: 30 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ type: 'spring', stiffness: 300, damping: 25, delay: index * 0.1 }"
        :class="ui.card({ class: uiProps.ui?.card })"
      >
        <UCard>
          <div :class="ui.cardHeader({ class: uiProps.ui?.cardHeader })">
            <img
              v-if="review.avatar"
              :src="review.avatar"
              :alt="review.author"
              :class="ui.avatar({ class: uiProps.ui?.avatar })"
            >
            <div :class="ui.authorInfo({ class: uiProps.ui?.authorInfo })">
              <p :class="ui.authorName({ class: uiProps.ui?.authorName })">
                {{ review.author }}
              </p>
              <div :class="ui.stars({ class: uiProps.ui?.stars })">
                <svg
                  v-for="star in 5"
                  :key="star"
                  :class="[ui.star({ class: uiProps.ui?.star }), star <= review.rating ? 'text-yellow-500' : 'text-default-300']"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
            </div>
          </div>
          <p :class="ui.content({ class: uiProps.ui?.content })">
            {{ review.content }}
          </p>
        </UCard>
      </motion.div>
    </div>

    <button
      :class="ui.prevButton({ class: uiProps.ui?.prevButton })"
      @click="scroll(-1)"
    >
      <svg
        :class="ui.chevron({ class: uiProps.ui?.chevron })"
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
      :class="ui.nextButton({ class: uiProps.ui?.nextButton })"
      @click="scroll(1)"
    >
      <svg
        :class="ui.chevron({ class: uiProps.ui?.chevron })"
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
import { ref, onMounted, onUnmounted } from 'vue'
import { motion } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import reviewsCarousel from '../theme/reviews-carousel'

defineOptions({ inheritAttrs: false })

interface Review {
  author: string
  rating: number
  content: string
  avatar?: string
}

interface Props {
  class?: string
  ui?: Record<string, any>
  reviews: Review[]
}

const props = withDefaults(defineProps<Props>(), {
  class: undefined,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({
  name: 'reviewsCarousel',
  props,
  theme: reviewsCarousel,
})

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
