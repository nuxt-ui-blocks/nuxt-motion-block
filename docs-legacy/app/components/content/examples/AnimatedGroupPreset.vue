<template>
  <div class="p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl max-w-md mx-auto">
    <div class="text-center mb-6">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
        Preset Animation
      </h3>
      <p class="text-gray-600 dark:text-gray-400 text-sm">
        Using built-in animation presets
      </p>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
      <MAnimatedGroup
        :key="currentPreset"
        :preset="currentPreset"
        :stagger-children="0.05"
        class="flex flex-wrap gap-2"
      >
        <UBadge
          v-for="i in 8"
          :key="i"
          color="primary"
          variant="solid"
          size="lg"
          class="m-1 inline-block"
        >
          Item {{ i }}
        </UBadge>
      </MAnimatedGroup>
    </div>

    <div class="mt-4 flex justify-center gap-3">
      <UButton
        :color="currentPreset === 'bounce' ? 'primary' : 'gray'"
        size="xs"
        @click="changePreset('bounce')"
      >
        Bounce
      </UButton>
      <UButton
        :color="currentPreset === 'slide' ? 'primary' : 'gray'"
        size="xs"
        @click="changePreset('slide')"
      >
        Slide
      </UButton>
      <UButton
        :color="currentPreset === 'scale' ? 'primary' : 'gray'"
        size="xs"
        @click="changePreset('scale')"
      >
        Scale
      </UButton>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentPreset = ref('bounce')

const changePreset = (preset) => {
  currentPreset.value = preset
}
</script>
