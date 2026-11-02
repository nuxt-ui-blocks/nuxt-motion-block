<template>
  <div class="flex w-full items-center justify-center py-10">
    <h1 class="text-5xl font-semibold tracking-tighter text-balance sm:text-6xl">
      Ship
      <MLineShadowText
        text="Fast"
        class="italic"
        :shadow-color="shadowColor"
      />
    </h1>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useColorMode } from '#imports'

const colorMode = useColorMode()
const shadowColor = computed(() => colorMode.value === 'dark' ? 'white' : 'black')
</script>
