<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <MAnimatedFileUpload
      v-model="files"
      multiple
      layout="list"
      accept="image/*"
      label="Drop images or click to browse"
      drag-label="Let go to add these files"
      class="w-full min-h-40"
    />

    <p class="text-xs text-muted">
      {{ files.length }} file{{ files.length === 1 ? '' : 's' }} staged. Rows slide in
      staggered and the zone lifts while files are held over it.
    </p>
  </div>
</template>

<script setup lang="ts">
const files = ref<File[]>([])
</script>
