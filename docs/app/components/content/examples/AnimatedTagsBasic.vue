<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <MAnimatedTags
      v-model="tags"
      :max="6"
      placeholder="Add a skill and press Enter"
      class="w-full"
    />

    <p class="text-xs text-muted">
      {{ tags.length }} of 6 tags — click a chip to remove it
    </p>
  </div>
</template>

<script setup lang="ts">
const tags = ref(['Motion', 'Nuxt UI', 'TypeScript'])
</script>
