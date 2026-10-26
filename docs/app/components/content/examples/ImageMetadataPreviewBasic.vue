<template>
  <div class="relative mx-auto h-[600px] w-full max-w-sm overflow-hidden rounded-3xl bg-gradient-to-b from-elevated to-muted">
    <MImageMetadataPreview
      alt="Sunrise over the coast"
      description="Sunrise over the west coast"
      filename="coast-sunrise.jpg"
      image-src="https://picsum.photos/seed/imagemeta-basic/300/437"
      :metadata="metadata"
    />
  </div>
</template>

<script setup lang="ts">
const metadata = {
  by: 'Avery Cole',
  created: '12 Aug 2025',
  source: '/library/coast/coast-sunrise.jpg',
  updated: '04 Sep 2025',
}
</script>
