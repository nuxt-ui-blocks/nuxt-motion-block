<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <div
      v-if="!maskText"
      class="h-48"
    >
      <MLiquidMetal
        :distortion="distortion"
        :variant="variant"
        class="h-full"
      >
        <div class="grid h-full place-items-center">
          <span class="text-5xl font-extrabold tracking-tighter text-white">
            METAL
          </span>
        </div>
      </MLiquidMetal>
    </div>
    <div
      v-else
      class="grid h-48 place-items-center rounded-2xl bg-(--ui-bg-muted)"
    >
      <MLiquidMetal
        :distortion="distortion"
        mask-text
        :variant="variant"
        class="text-5xl font-extrabold tracking-tighter"
      >
        METAL
      </MLiquidMetal>
    </div>

    <div class="flex flex-wrap items-center gap-2">
      <UButton
        v-for="name in variants"
        :key="name"
        size="sm"
        :label="name"
        color="neutral"
        :variant="variant === name ? 'solid' : 'outline'"
        @click="variant = name"
      />
    </div>

    <div class="flex items-center justify-between gap-4">
      <UButton
        size="sm"
        :label="maskText ? 'Box mode' : 'Mask text'"
        icon="i-lucide-type"
        variant="outline"
        @click="maskText = !maskText"
      />
      <label class="flex flex-1 items-center gap-3 text-xs text-muted">
        <span class="w-16">distortion</span>
        <USlider
          v-model="distortion"
          :min="0"
          :max="3"
          :step="0.1"
          class="flex-1"
        />
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
const variants = ['chrome', 'gold', 'mercury', 'oil'] as const

type Variant = typeof variants[number]

const variant = ref<Variant>('chrome')
const maskText = ref(false)
const distortion = ref(1)
</script>
