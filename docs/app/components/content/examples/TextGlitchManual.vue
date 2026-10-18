<template>
  <div class="flex flex-col items-center gap-4 p-8">
    <MTextGlitch
      ref="glitch"
      text="MANUAL"
      trigger="manual"
      intensity="extreme"
      :duration="1"
      auto-start
      class="text-5xl font-black"
    />
    <UButton
      color="primary"
      variant="subtle"
      @click="glitch?.trigger()"
    >
      Trigger glitch
    </UButton>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const glitch = ref()
</script>
