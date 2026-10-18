<template>
  <div class="flex flex-col items-center space-y-8 p-8">
    <div class="text-center max-w-3xl">
      <h1 class="text-4xl md:text-5xl font-bold mb-6">
        Building
        <MTextMorph
          :text="currentCategory"
          as="span"
          class="text-blue-600 dark:text-blue-400 inline-block"
        />
        Experiences
      </h1>

      <p class="text-xl text-gray-600 dark:text-gray-300 mb-8">
        Create stunning interfaces with our collection of animated components that
        <MTextMorph
          :text="currentFeature"
          as="span"
          class="text-purple-600 dark:text-purple-400 font-semibold"
        />
        the way users interact with your applications.
      </p>

      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6">
          <div class="flex-1 text-center md:text-left">
            <h3 class="text-lg font-semibold mb-2">
              Real-time Preview
            </h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm">
              See changes instantly as you type with our live preview feature
            </p>
          </div>
          <MTextMorph
            :text="currentStat"
            as="div"
            class="text-3xl font-bold text-green-600 dark:text-green-400"
          />
        </div>
      </div>
    </div>

    <div class="flex flex-wrap justify-center gap-4 mt-8">
      <UButton
        size="lg"
        color="primary"
      >
        Get Started
      </UButton>
      <UButton
        size="lg"
        variant="outline"
      >
        View Documentation
      </UButton>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

// Categories that rotate
const categories = ['Modern', 'Innovative', 'Beautiful', 'Interactive']
const categoryIndex = ref(0)

// Features that rotate
const features = ['transform', 'enhance', 'revolutionize', 'elevate']
const featureIndex = ref(0)

// Stats that rotate
const stats = ['99.9%', '10x', '50ms', '24/7']
const statIndex = ref(0)

// Current values
const currentCategory = computed(() => categories[categoryIndex.value])
const currentFeature = computed(() => features[featureIndex.value])
const currentStat = computed(() => stats[statIndex.value])

// Rotate through values periodically
let categoryTimer, featureTimer, statTimer

onMounted(() => {
  categoryTimer = setInterval(() => {
    categoryIndex.value = (categoryIndex.value + 1) % categories.length
  }, 2000)

  featureTimer = setInterval(() => {
    featureIndex.value = (featureIndex.value + 1) % features.length
  }, 2500)

  statTimer = setInterval(() => {
    statIndex.value = (statIndex.value + 1) % stats.length
  }, 3000)
})

onBeforeUnmount(() => {
  clearInterval(categoryTimer)
  clearInterval(featureTimer)
  clearInterval(statTimer)
})
</script>
