<template>
  <div class="space-y-12">
    <UPageHeader
      title="MagneticButton"
      description="The button follows the pointer inside a configurable radius and springs back on leave. Translated from smoothui's magnetic-button."
    />

    <UCard>
      <template #header>
        <p class="font-bold text-2xl text-highlighted">
          Defaults
        </p>
      </template>

      <div class="flex flex-col items-center gap-4">
        <p class="text-muted text-sm">
          strength <code>0.3</code> · radius <code>150</code> · spring
          <code>{{ JSON.stringify(DEFAULT_SPRING) }}</code>
          · hover device detected:
          <code data-demo-hover-device>{{ hoverDevice ? 'yes' : 'no' }}</code>
        </p>
        <p class="text-muted text-sm">
          transform:
          <code data-demo-transform>none</code>
        </p>

        <div class="flex w-full items-center justify-center py-10">
          <MMagneticButton data-demo-button>
            <UIcon name="i-lucide-magnet" />
            Pull me
          </MMagneticButton>
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="font-bold text-2xl text-highlighted">
          Variants
        </p>
      </template>

      <div class="flex flex-wrap items-center justify-center gap-4 py-10">
        <MMagneticButton
          v-for="variant in VARIANTS"
          :key="variant"
          :variant="variant"
        >
          {{ variant }}
        </MMagneticButton>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="font-bold text-2xl text-highlighted">
          Sizes
        </p>
      </template>

      <div class="flex flex-wrap items-center justify-center gap-4 py-10">
        <MMagneticButton size="sm">
          small
        </MMagneticButton>
        <MMagneticButton>
          default
        </MMagneticButton>
        <MMagneticButton size="lg">
          large
        </MMagneticButton>
        <MMagneticButton
          size="icon"
          aria-label="Icon only"
        >
          <UIcon name="i-lucide-heart" />
        </MMagneticButton>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="font-bold text-2xl text-highlighted">
          Strength &amp; radius
        </p>
      </template>

      <div class="flex flex-col items-center gap-4">
        <div class="flex flex-wrap items-center justify-center gap-6">
          <label class="flex items-center gap-2 text-sm">
            strength
            <input
              v-model.number="strength"
              class="accent-primary"
              max="1"
              min="0"
              step="0.05"
              type="range"
            >
            <code>{{ strength.toFixed(2) }}</code>
          </label>
          <label class="flex items-center gap-2 text-sm">
            radius
            <input
              v-model.number="radius"
              class="accent-primary"
              max="400"
              min="0"
              step="10"
              type="range"
            >
            <code>{{ radius }}px</code>
          </label>
        </div>

        <div class="flex flex-wrap items-center justify-center gap-6 py-10">
          <MMagneticButton
            :strength="strength"
            :radius="radius"
          >
            strength {{ strength.toFixed(2) }}
          </MMagneticButton>
          <MMagneticButton
            :strength="strength"
            :radius="radius"
            :spring-config="{ bounce: 0.6, duration: 0.8 }"
          >
            bouncy spring
          </MMagneticButton>
          <MMagneticButton
            disabled
            :strength="strength"
            :radius="radius"
          >
            disabled
          </MMagneticButton>
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="font-bold text-2xl text-highlighted">
          asChild
        </p>
      </template>

      <div class="flex flex-col items-center gap-2">
        <p class="text-muted text-sm">
          The single child element becomes the trigger — here a real
          <code>&lt;a&gt;</code> — and the magnetic zone around it carries the
          transform, since the child is not a motion component.
        </p>
        <div class="flex w-full items-center justify-center py-10">
          <MMagneticButton
            as-child
            data-demo-aschild
          >
            <a
              href="#as-child"
              class="no-underline"
            >
              <UIcon name="i-lucide-arrow-right" />
              Link button
            </a>
          </MMagneticButton>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const DEFAULT_SPRING = { bounce: 0.1, duration: 0.4 }

const VARIANTS = [
  'default',
  'destructive',
  'ghost',
  'link',
  'outline',
  'secondary',
] as const

const strength = ref(0.3)
const radius = ref(150)
const hoverDevice = ref(false)

const HOVER_QUERY = '(hover: hover) and (pointer: fine)'

let hoverMedia: MediaQueryList | undefined

function handleHoverChange(event: MediaQueryListEvent) {
  hoverDevice.value = event.matches
}

onMounted(() => {
  if (typeof window.matchMedia !== 'function') {
    return
  }

  hoverMedia = window.matchMedia(HOVER_QUERY)
  hoverDevice.value = hoverMedia.matches
  hoverMedia.addEventListener('change', handleHoverChange)
})

onBeforeUnmount(() => {
  hoverMedia?.removeEventListener('change', handleHoverChange)
})
</script>
