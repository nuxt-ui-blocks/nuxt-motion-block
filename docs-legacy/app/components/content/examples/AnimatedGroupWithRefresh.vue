<template>
  <div class="space-y-4">
    <UButton @click="refreshKey++">
      Refresh Animation
    </UButton>
    <MAnimatedGroup
      :key="refreshKey"
      :stagger-children="0.1"
      class="flex flex-wrap gap-4 space-x-3"
    >
      <div
        v-for="i in 5"
        :key="i"
        class="h-16 w-16 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600"
      />
    </MAnimatedGroup>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const refreshKey = ref(0)
</script>
