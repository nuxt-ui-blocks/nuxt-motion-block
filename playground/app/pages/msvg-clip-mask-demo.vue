<script setup lang="ts">
import { ref } from 'vue'

const shape = ref<'blob' | 'arch' | 'diamond' | 'wave'>('blob')
const animate = ref<'none' | 'morph' | 'scroll' | 'hover'>('morph')
const duration = ref(0.5)

const shapes = [
  { label: 'Blob', value: 'blob' },
  { label: 'Arch', value: 'arch' },
  { label: 'Diamond', value: 'diamond' },
  { label: 'Wave', value: 'wave' },
] as const

const modes = [
  { label: 'None', value: 'none' },
  { label: 'Morph loop', value: 'morph' },
  { label: 'Scroll', value: 'scroll' },
  { label: 'Hover', value: 'hover' },
] as const

const swatches = [
  'var(--color-brand)',
  'var(--color-success)',
  'var(--color-warning)',
  'var(--color-error)',
]
</script>

<template>
  <div class="space-y-12">
    <UPageHeader
      title="SvgClipMask"
      description="A clip path defined in object bounding box units, so one set of 0-to-1 path data masks content at any size. Scroll mode steps through a list of paths rather than interpolating between them."
    />

    <div class="h-[20vh]" />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Masking an image
        </p>
        <p class="text-muted">
          Change the shape and the mask re-fits without touching the image — the
          path is relative to the box, not to pixels.
        </p>
      </template>

      <div class="flex justify-center">
        <MSvgClipMask
          :animate="animate"
          class="h-80 w-full max-w-xl"
          :duration="duration"
          :shape="shape"
        >
          <div class="grid h-full w-full grid-cols-2 gap-1">
            <img
              src="https://picsum.photos/seed/clipmask-amber/600/400"
              alt=""
              class="h-full w-full object-cover"
            >
            <img
              src="https://picsum.photos/seed/clipmask-cobalt/600/400"
              alt=""
              class="h-full w-full object-cover"
            >
          </div>
        </MSvgClipMask>
      </div>

      <div class="mt-6 grid gap-4 sm:grid-cols-2">
        <div class="space-y-1.5">
          <p class="text-sm font-medium">
            Shape
          </p>
          <USelectMenu
            v-model="shape"
            :items="shapes"
            value-key="value"
            class="w-full"
          />
        </div>

        <div class="space-y-1.5">
          <p class="text-sm font-medium">
            Animate
          </p>
          <USelectMenu
            v-model="animate"
            :items="modes"
            value-key="value"
            class="w-full"
          />
        </div>

        <div class="space-y-1.5">
          <p class="text-sm font-medium">
            Duration — {{ duration.toFixed(2) }}s
          </p>
          <USlider
            v-model="duration"
            :max="2"
            :min="0.1"
            :step="0.05"
          />
        </div>
      </div>

      <p class="text-muted mt-4 text-sm">
        <code>morph</code> interpolates <code>d</code> continuously, which needs
        matching command counts. <code>scroll</code> steps discretely between
        paths, so it works with shapes that have nothing in common.
      </p>
    </UCard>

    <div class="h-[40vh]" />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Every shape, side by side
        </p>
        <p class="text-muted">
          All four presets at the same rendered size, to show the path data
          scaling independently of the box.
        </p>
      </template>

      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="(entry, index) in shapes"
          :key="entry.value"
          class="space-y-2"
        >
          <p class="text-sm font-medium">
            {{ entry.label }}
          </p>
          <MSvgClipMask
            :animate="animate === 'morph' ? 'morph' : 'none'"
            class="h-32 w-full"
            :duration="0.4 + index * 0.2"
            :shape="entry.value"
          >
            <div
              class="flex h-full w-full items-center justify-center"
              :style="{ background: `linear-gradient(135deg, ${swatches[index]}, var(--color-muted))` }"
            >
              <span class="font-semibold text-white mix-blend-difference">
                {{ entry.label }}
              </span>
            </div>
          </MSvgClipMask>
        </div>
      </div>
    </UCard>

    <div class="h-[30vh]" />
  </div>
</template>
