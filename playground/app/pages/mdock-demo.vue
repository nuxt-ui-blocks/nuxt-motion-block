<template>
  <div class="space-y-12 pb-56">
    <UPageHeader
      title="Dock"
      description="A macOS-style toolbar pinned to the viewport, where each icon swells as the pointer passes over it."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Live dock
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The dock is <code class="font-mono">position: fixed</code> — one instance owns the viewport
        edge, so everything below drives a single dock rather than stacking several. Hover it: each
        item sizes itself from its own distance to the pointer
        (<code class="font-mono">40px</code> at rest up to <code class="font-mono">magnification</code>px),
        and the panel grows to make room. Clicking an item records it in the readout below.
      </p>

      <MDock
        data-testid="dock"
        :variant="variant"
        :size="size"
        :background="background"
        :magnification="magnification"
        :distance="distance"
        :panel-height="panelHeight"
        aria-label="Demo dock"
      >
        <MDockItem
          v-for="app in apps"
          :key="app.name"
          v-slot="{ width, isHovered, scale }"
          :aria-label="app.name"
          :data-testid="`dock-item-${app.name}`"
          @click="lastAction = app.name"
        >
          <MDockLabel :is-hovered="isHovered">
            {{ app.name }}
          </MDockLabel>
          <MDockIcon
            :width="width"
            :scale="scale"
            :name="app.icon"
            class="text-highlighted"
          />
        </MDockItem>
      </MDock>

      <div class="mt-6 grid gap-4 sm:grid-cols-2">
        <UFormField
          label="magnification"
          :max="140"
          :min="50"
          :step="5"
        >
          <USlider
            v-model="magnification"
            :max="140"
            :min="50"
            :step="5"
            data-testid="slider-magnification"
          />
        </UFormField>
        <UFormField
          label="distance (px)"
          :max="300"
          :min="50"
          :step="10"
        >
          <USlider
            v-model="distance"
            :max="300"
            :min="50"
            :step="10"
            data-testid="slider-distance"
          />
        </UFormField>
        <UFormField
          label="panelHeight (px)"
          :max="120"
          :min="40"
          :step="4"
        >
          <USlider
            v-model="panelHeight"
            :max="120"
            :min="40"
            :step="4"
            data-testid="slider-panel"
          />
        </UFormField>
        <div class="flex flex-wrap items-end gap-2">
          <UButton
            v-for="option in variants"
            :key="option"
            :label="option"
            :variant="variant === option ? 'solid' : 'outline'"
            size="sm"
            :data-testid="`variant-${option}`"
            @click="variant = option"
          />
        </div>
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          variant
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-variant"
        >
          {{ variant }}
        </dd>
        <dt class="text-muted">
          position
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-position"
        >
          {{ positionFor(variant) }}
        </dd>
        <dt class="text-muted">
          orientation
        </dt>
        <dd class="font-mono">
          {{ ['left', 'right'].includes(variant) ? 'vertical' : 'horizontal' }}
        </dd>
        <dt class="text-muted">
          last click
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-action"
        >
          {{ lastAction ?? 'none yet' }}
        </dd>
        <dt class="text-muted">
          magnification
        </dt>
        <dd class="font-mono">
          {{ magnification }}px
        </dd>
        <dt class="text-muted">
          distance
        </dt>
        <dd class="font-mono">
          {{ distance }}px
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Surface and size
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        <code class="font-mono">background</code> swaps the panel between a blurred
        <code class="font-mono">bg-white/80</code> glass, a solid surface and a fully transparent
        one — the border, radius and shadow are applied on top of whichever you pick, so
        <code class="font-mono">none</code> still reads as a floating outline. Every prop is read
        when the dock renders, so the controls are not keyed: the panel restyles in place.
      </p>

      <div class="mb-6 flex flex-wrap gap-2">
        <UButton
          v-for="option in backgrounds"
          :key="option"
          :label="`background: ${option}`"
          :variant="background === option ? 'solid' : 'outline'"
          size="sm"
          :data-testid="`background-${option}`"
          @click="background = option"
        />
        <UButton
          v-for="option in sizes"
          :key="option"
          :label="`size: ${option}`"
          :variant="size === option ? 'solid' : 'outline'"
          size="sm"
          :data-testid="`size-${option}`"
          @click="size = option"
        />
      </div>

      <dl class="grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          background
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-background"
        >
          {{ background }}
        </dd>
        <dt class="text-muted">
          size
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-size"
        >
          {{ size }}
        </dd>
        <dt class="text-muted">
          panel chrome
        </dt>
        <dd class="font-mono">
          backdrop-blur-xl · rounded-2xl
        </dd>
        <dt class="text-muted">
          spring
        </dt>
        <dd class="font-mono">
          mass 0.1 · stiffness 150 · damping 12
        </dd>
        <dt class="text-muted">
          hover height
        </dt>
        <dd class="font-mono">
          max(128, mag + mag ÷ 2 + 4)
        </dd>
        <dt class="text-muted">
          rest item size
        </dt>
        <dd class="font-mono">
          40px (base 48px)
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Items, labels and keys
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        An item hands its slot three values — <code class="font-mono">width</code>,
        <code class="font-mono">is-hovered</code> and <code class="font-mono">scale</code> — and
        the tooltip is just <code class="font-mono">MDockLabel</code> bound to
        <code class="font-mono">is-hovered</code>. The toolbar itself is focusable: Tab onto it and
        arrow through the items, Home and End jump to the ends, Escape blurs the dock.
      </p>

      <div class="grid gap-6 md:grid-cols-2">
        <div class="flex items-center rounded-2xl border border-dashed border-default p-6">
          <dl class="grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs">
            <dt class="text-muted">
              item slot props
            </dt>
            <dd class="font-mono">
              width · is-hovered · scale
            </dd>
            <dt class="text-muted">
              item attrs
            </dt>
            <dd class="font-mono">
              aria-label + tabindex 0
            </dd>
            <dt class="text-muted">
              item events
            </dt>
            <dd
              class="font-mono"
              data-testid="readout-events"
            >
              click · Enter · Space
            </dd>
            <dt class="text-muted">
              label
            </dt>
            <dd class="font-mono">
              tooltip above icon, 200ms
            </dd>
            <dt class="text-muted">
              toolbar
            </dt>
            <dd class="font-mono">
              role=toolbar + aria-orientation
            </dd>
            <dt class="text-muted">
              keys
            </dt>
            <dd class="font-mono">
              ← → ↑ ↓ · Home · End · Esc
            </dd>
          </dl>
        </div>

        <div class="rounded-2xl bg-(--ui-bg-muted) p-6 text-xs text-muted">
          <p class="font-semibold text-highlighted">
            Caveats
          </p>
          <p class="mt-2">
            <code class="font-mono">showLabels</code> and <code class="font-mono">animation</code>
            are accepted by the component but never read — labels render whenever you put an
            <code class="font-mono">MDockLabel</code> in the slot.
          </p>
          <p class="mt-2">
            <code class="font-mono">size</code> builds its gap and padding as dynamic
            <code class="font-mono">gap-…</code> / <code class="font-mono">px-…</code> strings, so
            those utilities are not in the stylesheet and the base
            <code class="font-mono">gap-3 px-4</code> wins.
          </p>
          <p class="mt-2">
            For <code class="font-mono">left</code> / <code class="font-mono">right</code> variants
            the pointer offset is measured down the panel but each item measures itself across it,
            so magnification tracks the vertical position imperfectly.
          </p>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

type DockVariant = 'bottom' | 'top' | 'left' | 'right' | 'floating' | 'compact'
type DockSize = 'sm' | 'md' | 'lg'
type DockBackground = 'glass' | 'solid' | 'none'

const variants: DockVariant[] = ['bottom', 'top', 'left', 'right', 'floating', 'compact']
const sizes: DockSize[] = ['sm', 'md', 'lg']
const backgrounds: DockBackground[] = ['glass', 'solid', 'none']

const apps = [
  { name: 'Home', icon: 'i-lucide-home' },
  { name: 'Products', icon: 'i-lucide-package' },
  { name: 'Messages', icon: 'i-lucide-message-circle' },
  { name: 'Mail', icon: 'i-lucide-mail' },
  { name: 'Photos', icon: 'i-lucide-image' },
  { name: 'Music', icon: 'i-lucide-music' },
  { name: 'Settings', icon: 'i-lucide-settings' },
]

const positions: Record<DockVariant, string> = {
  bottom: 'fixed bottom-5 left-1/2',
  top: 'fixed top-5 left-1/2',
  left: 'fixed left-5 top-1/2',
  right: 'fixed right-5 top-1/2',
  floating: 'fixed bottom-20 left-1/2',
  compact: 'fixed bottom-3 left-1/2',
}

const positionFor = (value: DockVariant) => positions[value]

const variant = ref<DockVariant>('bottom')
const size = ref<DockSize>('md')
const background = ref<DockBackground>('glass')
const magnification = ref(80)
const distance = ref(150)
const panelHeight = ref(64)
const lastAction = ref<string | null>(null)
</script>
