<template>
  <div class="min-h-screen bg-default p-8">
    <UCard class="mb-8">
      <template #header>
        <h1 class="text-2xl font-bold">
          MCoverflowCarousel Demo
        </h1>
      </template>

      <div class="space-y-12">
        <div>
          <h2 class="text-lg font-semibold mb-4">
            3D Coverflow Carousel
          </h2>
          <p class="mb-8 text-muted">
            A 3D-fan coverflow: active slide faces the viewer while neighbors fan out
            behind it, rotated and scaled by their distance. Drag or swipe to pan,
            use Prev/Next or the arrow keys, and let autoplay advance it on its own.
          </p>

          <div class="mx-auto w-full max-w-3xl px-4 py-8">
            <MCoverflowCarousel
              autoplay
              autoplay-delay="4000"
              :items="items"
              loop
            />
          </div>
        </div>
      </div>

      <template #footer>
        <p class="text-sm text-muted">
          Component: MCoverflowCarousel (3D coverflow carousel, 3D-fan with rotateY/scale)
        </p>
      </template>
    </UCard>
  </div>
</template>

<script setup lang="ts">
const items = [
  {
    id: '1',
    image: 'https://picsum.photos/seed/coverflow-amber/600/500',
    alt: 'Amber-toned abstract scene',
  },
  {
    id: '2',
    image: 'https://picsum.photos/seed/coverflow-cobalt/600/500',
    alt: 'Cobalt-toned abstract scene',
  },
  {
    id: '3',
    image: 'https://picsum.photos/seed/coverflow-coral/600/500',
    alt: 'Coral-toned abstract scene',
  },
  {
    id: '4',
    image: 'https://picsum.photos/seed/coverflow-cyan/600/500',
    alt: 'Cyan-toned abstract scene',
  },
]
</script>
