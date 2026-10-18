<script setup lang="ts">
import { ref } from 'vue'

const files = ref<File[]>([])
const single = ref<File | undefined>(undefined)
</script>

<template>
  <div class="space-y-12">
    <UPageHeader
      title="AnimatedFileUpload"
      description="File upload that lifts its icon and scales the drop zone while files are dragged over it, then staggers new file rows in from the left."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Multiple files
        </p>
        <p class="text-muted">
          Drag a file over the upload area to see the icon lift and the border turn primary, then drop it to see the row slide in.
        </p>
      </template>
      <MAnimatedFileUpload
        v-model="files"
        multiple
        accept="image/*,.pdf"
      />
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Single file
        </p>
        <p class="text-muted">
          The label swaps between the idle and drop copy while a file is held over the zone.
        </p>
      </template>
      <MAnimatedFileUpload
        v-model="single"
        label="Choose a file"
        drag-label="Release to upload"
      />
    </UCard>
  </div>
</template>
