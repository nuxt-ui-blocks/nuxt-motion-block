<template>
  <div class="p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl max-w-md mx-auto">
    <div class="text-center mb-6">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
        Basic Animated Group
      </h3>
      <p class="text-gray-600 dark:text-gray-400 text-sm">
        Items animate in sequence with staggered delays
      </p>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
      <MAnimatedGroup
        :stagger-children="0.1"
        :variants="{
          item: {
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          },
        }"
        class="flex flex-wrap gap-2"
      >
        <div
          v-for="i in 6"
          :key="i"
          class="h-12 w-12 rounded-lg bg-primary flex items-center justify-center text-white font-bold m-1"
        >
          {{ i }}
        </div>
      </MAnimatedGroup>
    </div>

    <div class="mt-4 text-center">
      <UButton
        color="primary"
        variant="outline"
        size="sm"
        class="flex items-center mx-auto"
        @click="refresh"
      >
        <UIcon
          name="i-lucide-refresh-cw"
          class="w-4 h-4 mr-1"
        />
        Refresh Animation
      </UButton>
    </div>
  </div>
</template>

<script setup>
const refresh = () => {
  // This will trigger a re-render and restart the animation
  window.location.reload()
}
</script>
