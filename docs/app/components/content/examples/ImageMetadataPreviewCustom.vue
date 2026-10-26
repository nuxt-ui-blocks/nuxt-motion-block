<template>
  <div class="flex flex-col items-center gap-4">
    <div class="relative mx-auto h-[600px] w-full max-w-sm overflow-hidden rounded-3xl bg-muted">
      <MImageMetadataPreview
        alt="A studio desk"
        description="Desk setup photographed for the launch post"
        filename="studio-desk-final-v3.png"
        image-src="https://picsum.photos/seed/imagemeta-custom/300/437"
        :metadata="metadata"
        :on-share="handleShare"
      />
    </div>

    <p
      aria-live="polite"
      class="h-5 text-sm text-muted"
    >
      {{ status }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const metadata = {
  by: 'Studio North',
  created: '02 Mar 2024',
  source: '/library/studio/2024/studio-desk-final-v3.png',
  updated: '18 Jan 2026',
}

const status = ref('')

async function handleShare() {
  try {
    await navigator.clipboard.writeText(window.location.href)
    status.value = 'Link copied'
  }
  catch {
    status.value = 'Sharing unavailable'
  }
}
</script>
