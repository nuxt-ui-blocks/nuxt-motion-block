<script setup lang="ts">
import { ref } from 'vue'

type EmbossVariant = 'emboss' | 'deboss' | 'plaster' | 'metal-stamp'

const variant = ref<EmbossVariant>('emboss')
const depth = ref(2)
const softness = ref(0.5)
const lightAngle = ref(135)
const interactive = ref(true)

const variants: Array<{ label: string, value: EmbossVariant }> = [
  { label: 'Emboss', value: 'emboss' },
  { label: 'Deboss', value: 'deboss' },
  { label: 'Plaster', value: 'plaster' },
  { label: 'Metal stamp', value: 'metal-stamp' },
]

// The reference passes no `color` at all, so the surfaces sit on the background
// token and blend into the page — the relief reads purely from the shadows. Give
// them a colour of their own and the material stops looking like the page.
const color = ref('var(--ui-bg)')
</script>

<template>
  <div class="space-y-12">
    <UPageHeader
      title="EmbossSurface"
      description="Relief lighting driven by an angle rather than by a shadow. The pointer only ever sets a direction: depth is a property of the material, so the light must not travel further just because the cursor did."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Four materials
        </p>
        <p class="text-muted">
          <code>plaster</code> is the outlier: it renders a real SVG filter
          chain — blur the alpha into a height field, light that field, clip back
          to the silhouette. A stack of box-shadows can only ever darken, so it
          cannot produce a lit surface.
        </p>
      </template>

      <div class="grid gap-6 sm:grid-cols-2">
        <div
          v-for="entry in variants"
          :key="entry.value"
          class="space-y-2"
        >
          <p class="text-sm font-medium capitalize">
            {{ entry.label }}
          </p>
          <MEmbossSurface
            class="flex h-40 items-center justify-center rounded-2xl border border-foreground/10 p-6"
            :color="color"
            :depth="depth"
            :interactive="interactive"
            :light-angle="lightAngle"
            :softness="entry.value === 'plaster' ? 0.8 : softness"
            :variant="entry.value"
          >
            <p class="text-2xl font-semibold tracking-tight">
              {{ entry.label }}
            </p>
          </MEmbossSurface>
        </div>
      </div>

      <div class="mt-6 grid gap-4 sm:grid-cols-2">
        <div class="space-y-1.5">
          <p class="text-sm font-medium">
            Material
          </p>
          <USelectMenu
            v-model="variant"
            :items="variants"
            value-key="value"
            class="w-full"
          />
        </div>

        <div class="space-y-1.5">
          <p class="text-sm font-medium">
            Base colour
          </p>
          <USelectMenu
            v-model="color"
            :items="[{ label: 'Neutral', value: 'var(--color-muted)' }, { label: 'Paper', value: '#f5f0e6' }, { label: 'Slate', value: '#475569' }, { label: 'Gold', value: '#c9a227' }]"
            value-key="value"
            class="w-full"
          />
        </div>

        <div class="space-y-1.5">
          <p class="text-sm font-medium">
            Depth — {{ depth }}px
          </p>
          <USlider
            v-model="depth"
            :max="10"
            :min="0.5"
            :step="0.5"
          />
        </div>

        <div class="space-y-1.5">
          <p class="text-sm font-medium">
            Softness — {{ softness.toFixed(2) }}
          </p>
          <USlider
            v-model="softness"
            :max="1"
            :min="0"
            :step="0.05"
          />
        </div>

        <div class="space-y-1.5 sm:col-span-2">
          <p class="text-sm font-medium">
            Light angle — {{ lightAngle }}°
          </p>
          <USlider
            v-model="lightAngle"
            :max="360"
            :min="0"
            :step="5"
          />
        </div>

        <div class="space-y-2 pt-2 sm:col-span-2">
          <USwitch
            v-model="interactive"
            label="Light follows pointer (hover devices only)"
          />
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          As a wrapper
        </p>
        <p class="text-muted">
          <code>as</code> accepts any element or component, and the relief is
          applied to the wrapper rather than to the text.
        </p>
      </template>

      <MEmbossSurface
        as="section"
        class="space-y-4 rounded-2xl border border-foreground/10 p-8"
        :color="color"
        :depth="4"
        :interactive="true"
        :light-angle="45"
        :softness="0.3"
        :variant="variant"
      >
        <p class="text-2xl font-semibold tracking-tight">
          Rendered as a section
        </p>
        <p class="text-muted max-w-prose text-sm">
          The same component, a different element. Because the light is written
          to CSS custom properties on the surface, every child inherits the
          current angle without any of them needing to know about it.
        </p>
        <UButton
          label="Nested action"
          icon="i-lucide-arrow-right"
        />
      </MEmbossSurface>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Struck in metal
        </p>
        <p class="text-muted">
          <code>metal-stamp</code> is the only variant with a hard edge: it adds
          two zero-blur layers at 1.8x the offset, so the relief reads as a struck
          plate rather than a soft press. A low
          <code>softness</code> and a low
          <code>lightAngle</code> sell that; pointing the light from the left
          makes the stamp read as concave.
        </p>
      </template>

      <div class="flex items-center justify-center p-8">
        <MEmbossSurface
          class="flex items-center justify-center gap-3 rounded-2xl border border-foreground/10 p-8"
          :color="color"
          :depth="2"
          :light-angle="45"
          :softness="0.35"
          variant="metal-stamp"
        >
          <UIcon
            name="i-lucide-fingerprint"
            class="size-8"
          />
          <span class="text-lg font-semibold">Struck in metal</span>
        </MEmbossSurface>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Interactive relief
        </p>
        <p class="text-muted">
          With <code>interactive</code> the light follows the pointer, but only
          its <em>direction</em>. Distance stays pinned to
          <code>depth</code> — letting the light travel further with the cursor
          would make the same surface look like a different material. Renders
          as an <code>h2</code> here, so the relief lands on the heading itself.
        </p>
      </template>

      <div class="flex items-center justify-center p-8">
        <MEmbossSurface
          as="h2"
          class="rounded-2xl border border-foreground/10 p-8 text-center text-3xl font-bold tracking-tight"
          :color="color"
          :depth="3"
          :interactive="true"
          variant="emboss"
        >
          Move your pointer
        </MEmbossSurface>
      </div>
    </UCard>
  </div>
</template>
