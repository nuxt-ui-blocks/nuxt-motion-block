<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <MVideoModal
      v-model:open="open"
      :src="src"
      :poster="poster"
    >
      <UButton
        label="Watch the tour"
        icon="i-lucide-play"
      />
    </MVideoModal>

    <p class="text-xs text-muted">
      The element mounts with the modal and is told to play on open, pause on close.
    </p>
  </div>
</template>

<script setup lang="ts">
const open = ref(false)

const src = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
const poster = 'https://picsum.photos/seed/video-modal-poster/800/450'
</script>
