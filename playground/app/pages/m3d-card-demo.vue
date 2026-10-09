<template>
  <div class="space-y-12">
    <UPageHeader
      title="3D Card"
      description="A card that tilts toward the cursor while its layers lift off the surface on hover."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Basic
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The outer wrapper owns the <code class="font-mono">perspective</code>, the card owns the
        rotation and every <code class="font-mono">M3DItem</code> is a layer that only holds a
        transform while the pointer is inside. <code class="font-mono">intensity</code> divides the
        offset from the centre, so a higher value gives smaller rotations.
      </p>

      <div class="mb-8 grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-6 py-10">
        <M3DCard
          data-testid="card-basic"
          class="w-full max-w-md"
          :intensity="intensity"
        >
          <template #header>
            <M3DItem
              data-testid="layer-header"
              :translate-z="40"
            >
              <div class="flex items-center gap-3">
                <div class="flex size-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <UIcon
                    name="i-lucide-cube"
                    class="size-6"
                  />
                </div>
                <div>
                  <p class="text-lg font-semibold text-highlighted">
                    Depth header
                  </p>
                  <p class="text-xs text-muted">
                    translateZ 40px
                  </p>
                </div>
              </div>
            </M3DItem>
          </template>

          <M3DItem
            data-testid="layer-body"
            :translate-z="20"
            class="space-y-3"
          >
            <p class="text-sm text-muted">
              This paragraph sits at 20px, so it trails the header by half as much while the card
              tilts. Each layer only renders its transform while the card is hovered.
            </p>
            <div class="flex flex-wrap gap-2">
              <UButton
                label="Primary action"
                data-testid="card-action"
              />
              <UButton
                label="Secondary"
                variant="outline"
                data-testid="card-secondary"
              />
            </div>
          </M3DItem>

          <template #footer>
            <M3DItem
              data-testid="layer-footer"
              :translate-z="30"
              class="flex items-center justify-between"
            >
              <span class="text-xs text-muted">footer layer · translateZ 30px</span>
              <UBadge
                variant="subtle"
                data-testid="card-badge"
              >
                3 layers
              </UBadge>
            </M3DItem>
          </template>
        </M3DCard>
      </div>

      <dl class="mb-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          intensity
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-intensity"
        >
          {{ intensity }}
        </dd>
        <dt class="text-muted">
          rotation formula
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-range"
        >
          offset ÷ {{ intensity }}
        </dd>
        <dt class="text-muted">
          layers in card
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-layers"
        >
          {{ layers.length }}
        </dd>
        <dt class="text-muted">
          layer offsets
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-offsets"
        >
          {{ layerOffsets }}
        </dd>
        <dt class="text-muted">
          perspective
        </dt>
        <dd class="font-mono">
          1000px (wrapper)
        </dd>
        <dt class="text-muted">
          idle transform
        </dt>
        <dd class="font-mono">
          none
        </dd>
      </dl>

      <UFormField
        class="mt-2"
        label="intensity"
        :max="60"
        :min="5"
        :step="1"
      >
        <USlider
          v-model="intensity"
          :max="60"
          :min="5"
          :step="1"
          data-testid="slider-intensity"
        />
      </UFormField>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Depth ramp
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Three cards at the same intensity but with a single layer each. The readout under every
        card is that layer's <code class="font-mono">translateZ</code>, which is what decides how
        far it separates from the surface as the card rotates.
      </p>

      <div class="grid gap-6 md:grid-cols-3">
        <div
          v-for="step in depthSteps"
          :key="step.z"
          class="space-y-3"
        >
          <div class="grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-4 py-8">
            <M3DCard
              :key="`${step.z}-${intensity}`"
              :data-testid="`depth-card-${step.z}`"
              class="w-full"
              :intensity="intensity"
            >
              <M3DItem
                :translate-z="step.z"
                class="space-y-2"
              >
                <p class="text-2xl font-bold text-highlighted">
                  {{ step.label }}
                </p>
                <p class="text-xs text-muted">
                  one layer, translateZ {{ step.z }}px
                </p>
              </M3DItem>
            </M3DCard>
          </div>
          <p
            class="text-center font-mono text-xs text-muted"
            :data-testid="`readout-depth-${step.z}`"
          >
            translateZ {{ step.z }}px
          </p>
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Slots
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The header, body and footer are ordinary slots on the underlying card, so a layer can wrap
        whatever sits inside them. The layer has to wrap the content itself — placing
        <code class="font-mono">translateZ</code> on the card would flatten the effect.
      </p>

      <div class="grid gap-6 md:grid-cols-2">
        <div class="grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-6 py-8">
          <M3DCard
            data-testid="card-compact"
            class="w-full"
            :intensity="intensity"
          >
            <template #header>
              <M3DItem :translate-z="25">
                <p class="text-sm font-semibold text-highlighted">
                  Header slot
                </p>
              </M3DItem>
            </template>

            <M3DItem
              :translate-z="15"
              class="text-sm text-muted"
            >
              Body slot — the shallowest layer.
            </M3DItem>
          </M3DCard>
        </div>

        <div class="grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-6 py-8">
          <M3DCard
            data-testid="card-intense"
            class="w-full"
            :intensity="10"
          >
            <template #header>
              <M3DItem :translate-z="55">
                <p class="text-sm font-semibold text-primary">
                  Low intensity
                </p>
              </M3DItem>
            </template>

            <M3DItem
              :translate-z="35"
              class="text-sm text-muted"
            >
              <code class="font-mono">intensity</code> 10 rotates harder for the same pointer travel.
            </M3DItem>
          </M3DCard>
        </div>
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          compact intensity
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-compact"
        >
          {{ intensity }}
        </dd>
        <dt class="text-muted">
          hard intensity
        </dt>
        <dd class="font-mono">
          10
        </dd>
        <dt class="text-muted">
          tilt source
        </dt>
        <dd class="font-mono">
          pointer − centre
        </dd>
      </dl>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const intensity = ref(25)

const layers = ['header · 40px', 'body · 20px', 'footer · 30px']
const layerOffsets = '40 / 20 / 30 px'

const depthSteps = [
  { z: 10, label: 'Shallow' },
  { z: 40, label: 'Middle' },
  { z: 70, label: 'Deep' },
] as const
</script>
