<template>
  <div class="flex w-full flex-col items-center gap-3 p-6">
    <MInteractiveImageSelector
      :images="images"
      :selected-images="selected"
      selectable
      @delete="status = `Deleted ${$event.length} image(s)`"
      @share="status = `Shared ${$event.length} image(s)`"
      @update:selected-images="selected = $event"
    />

    <p class="text-sm text-muted">
      {{ status }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selected = ref<number[]>([])
const status = ref('Pick a few images, then share or delete them.')

const images = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&h=400&fit=crop',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&h=400&fit=crop',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=400&h=400&fit=crop',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&h=400&fit=crop',
  },
]
</script>
