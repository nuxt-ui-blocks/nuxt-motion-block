<script setup lang="ts">
const photos = [
  {
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
    alt: 'Mountain ridge at dawn',
  },
  {
    src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    alt: 'Snow-covered peaks',
  },
  {
    src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
    alt: 'Forest canopy',
  },
]
</script>

<template>
  <div class="grid grid-cols-3 gap-3">
    <MMorphingDialog
      v-for="photo in photos"
      :key="photo.src"
      layout-id
    >
      <MMorphingDialogTrigger class="overflow-hidden rounded-xl border border-default">
        <img
          :src="photo.src"
          :alt="photo.alt"
          class="h-24 w-full object-cover"
        >
      </MMorphingDialogTrigger>

      <template #content="{ close }">
        <figure class="w-full">
          <img
            :src="photo.src"
            :alt="photo.alt"
            class="max-h-[65vh] w-full object-cover"
          >
          <figcaption class="flex items-center justify-between gap-4 p-4">
            <span class="text-sm text-muted">{{ photo.alt }}</span>
            <UButton
              label="Close"
              color="neutral"
              variant="outline"
              @click="close"
            />
          </figcaption>
        </figure>
      </template>
    </MMorphingDialog>
  </div>
</template>
