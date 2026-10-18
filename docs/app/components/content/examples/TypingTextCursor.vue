<template>
  <div class="flex flex-col items-center gap-4 p-8">
    <MTypingText
      text="npm run deploy --production"
      class="font-mono text-lg text-default"
      :speed="70"
      cursor="▊"
      cursor-class="text-primary"
      @complete="completed = true"
    />
    <p class="text-sm text-muted">
      {{ completed ? 'Deploy finished — the complete event fired.' : 'Typing a deploy command at 70ms per character…' }}
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const completed = ref(false)
</script>
