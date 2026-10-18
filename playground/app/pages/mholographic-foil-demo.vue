<template>
  <div class="space-y-6 p-6">
    <UPageHeader
      title="Iridescent foil"
      description="A card whose surface picks up a travelling foil, sheen and glare, tilting toward the pointer."
    />

    <UCard>
      <template #header>
        <p class="font-bold text-2xl text-highlighted">
          Live card
        </p>
      </template>

      <div class="space-y-4">
        <MHolographicFoil
          ref="foil"
          class="mx-auto h-72 max-w-md"
          :foil-over="foilOver"
          :glare="glare"
          :intensity="intensity"
          :pattern="pattern"
          :sheen-speed="sheenSpeed"
          :tilt="tilt"
          :use-device-orientation="useDeviceOrientation"
        >
          <div class="grid h-full place-items-center">
            <p class="text-sm font-medium text-white/80">
              Move the pointer across the card
            </p>
          </div>
        </MHolographicFoil>

        <p class="text-sm text-muted">
          The tilt is read from the card's own computed transform, so the readout
          below is the same value the browser is painting — not a mirror of the
          component's internal state.
        </p>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="font-bold text-2xl text-highlighted">
          Controls
        </p>
      </template>

      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <UFormField
          label="pattern"
          :hint="pattern"
        >
          <USelect
            v-model="pattern"
            :items="patternItems"
            class="w-full"
          />
        </UFormField>

        <UFormField
          label="intensity"
          :hint="intensity.toFixed(2)"
        >
          <USlider
            v-model="intensity"
            :max="1"
            :min="0"
            :step="0.05"
          />
        </UFormField>

        <UFormField
          label="glare"
          :hint="glare.toFixed(2)"
        >
          <USlider
            v-model="glare"
            :max="1"
            :min="0"
            :step="0.05"
          />
        </UFormField>

        <UFormField
          label="sheen speed"
          :hint="`${sheenSpeed.toFixed(2)}×`"
        >
          <USlider
            v-model="sheenSpeed"
            :max="3"
            :min="0.1"
            :step="0.1"
          />
        </UFormField>

        <div class="flex flex-col justify-end gap-3">
          <label class="flex items-center gap-2 text-sm">
            <USwitch v-model="tilt" />
            tilt
          </label>
          <label class="flex items-center gap-2 text-sm">
            <USwitch v-model="foilOver" />
            foil over content
          </label>
          <label class="flex items-center gap-2 text-sm">
            <USwitch v-model="useDeviceOrientation" />
            device orientation
          </label>
        </div>

        <UButton
          class="justify-self-start self-end"
          color="neutral"
          variant="outline"
          @click="reset"
        >
          Reset
        </UButton>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="font-bold text-2xl text-highlighted">
          Patterns
        </p>
      </template>

      <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div
          v-for="option in patternItems"
          :key="option.value"
          class="space-y-2"
        >
          <MHolographicFoil
            :class="option.value === pattern ? 'ring-2 ring-primary' : ''"
            class="h-40"
            :intensity="intensity"
            :pattern="option.value"
          >
            <div class="grid h-full place-items-center">
              <p class="text-xs font-medium text-white/80">
                {{ option.value }}
              </p>
            </div>
          </MHolographicFoil>
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="font-bold text-2xl text-highlighted">
          Foil under vs over
        </p>
      </template>

      <div class="space-y-2">
        <p class="text-sm text-muted">
          The layering is expressed in DOM order rather than
          <code>z-index</code>. Both cards have the same foil; only the position
          in the tree differs.
        </p>

        <div class="grid gap-4 sm:grid-cols-2">
          <div class="space-y-2">
            <MHolographicFoil
              class="h-40"
              :intensity="intensity"
              :pattern="pattern"
            >
              <div class="grid h-full place-items-center bg-[oklch(0.25_0.04_280)]">
                <p class="text-xs font-medium text-white/90">
                  foil under
                </p>
              </div>
            </MHolographicFoil>
          </div>

          <div class="space-y-2">
            <MHolographicFoil
              class="h-40"
              foil-over
              :intensity="intensity"
              :pattern="pattern"
            >
              <div class="grid h-full place-items-center bg-[oklch(0.25_0.04_280)]">
                <p class="text-xs font-medium text-white/90">
                  foil over
                </p>
              </div>
            </MHolographicFoil>
          </div>
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="font-bold text-2xl text-highlighted">
          Environment
        </p>
      </template>

      <div class="space-y-2 text-sm text-muted">
        <p>
          Hover capable:
          <code data-demo-hover-device>{{ hoverCapable ? 'yes' : 'no' }}</code>
        </p>
        <p>
          Reduced motion:
          <code data-demo-reduced-motion>{{ reducedMotion ? 'yes' : 'no' }}</code>
        </p>
        <p>
          Pointer tracking live:
          <code data-demo-listeners>{{ tracksPointer ? 'yes' : 'no' }}</code>
        </p>
        <p>
          Orientation API:
          <code data-demo-orientation-api>{{ orientationApi }}</code>
        </p>
        <p>
          Card transform:
          <code data-demo-transform>{{ liveTransform }}</code>
        </p>
        <p>
          Foil filter:
          <code data-demo-filter>{{ liveFilter }}</code>
        </p>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { useReducedMotion } from 'motion-v'

const foil = ref<{ $el?: HTMLElement } | null>(null)

const pattern = ref<'aurora' | 'gold' | 'oil' | 'prism'>('prism')
const intensity = ref(0.6)
const glare = ref(0.5)
const sheenSpeed = ref(1)
const tilt = ref(true)
const foilOver = ref(false)
const useDeviceOrientation = ref(false)

const patternItems = [
  { label: 'Prism', value: 'prism' as const },
  { label: 'Aurora', value: 'aurora' as const },
  { label: 'Gold', value: 'gold' as const },
  { label: 'Oil', value: 'oil' as const },
]

const reducedMotion = useReducedMotion()

const hoverCapable = ref(false)
// Created on mount rather than at setup: `matchMedia` does not exist during SSR.
let hoverQuery: MediaQueryList | undefined

function syncHoverCapable() {
  hoverCapable.value = hoverQuery?.matches ?? false
}

onMounted(() => {
  if (typeof window.matchMedia !== 'function') return

  hoverQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
  syncHoverCapable()
  hoverQuery.addEventListener('change', syncHoverCapable)
})

onBeforeUnmount(() => {
  hoverQuery?.removeEventListener('change', syncHoverCapable)
  if (poll) clearInterval(poll)
})

/**
 * Mirrors the component's own liveness rule. Pointer tracking needs a fine
 * pointer *and* no reduced-motion preference; otherwise the card only responds
 * to device orientation.
 */
const tracksPointer = computed(() => reducedMotion.value !== true && hoverCapable.value)

/**
 * What the *platform* offers, not what the component has been granted.
 *
 * An earlier version of this readout mirrored the component's gate, which
 * looked like evidence about the component but was only an independent
 * estimate: the component keeps its own grant state, so clicking its own
 * "Turn on tilt" button flipped the card while this still read `prompt`.
 * Reading another component's private setup state is fragile, and this page
 * otherwise deliberately reports observable consequences, so the readout now
 * sticks to the one thing the page genuinely knows — whether the API needs a
 * prompt. Whether the grant actually happened is observable instead as the
 * pointer being ignored, which is `card transform: none`.
 */
const orientationApi = ref('none')

function syncOrientationApi() {
  if (typeof window === 'undefined' || !('DeviceOrientationEvent' in window)) {
    orientationApi.value = 'none'
    return
  }
  const api = (window as unknown as {
    DeviceOrientationEvent?: { requestPermission?: unknown }
  }).DeviceOrientationEvent
  orientationApi.value = typeof api?.requestPermission === 'function' ? 'prompt' : 'direct'
}

onMounted(syncOrientationApi)

const liveTransform = ref('none')
const liveFilter = ref('none')

/**
 * The foil sheet is the first child of the root's single layout wrapper, and
 * the content wrapper always follows it — so the position is fixed by render
 * order and needs no QA-only attribute in the component itself.
 */
function foilSheet(element: HTMLElement) {
  return (element.firstElementChild?.firstElementChild ?? null) as HTMLElement | null
}

function readCard() {
  const el = foil.value?.$el
  if (!(el instanceof HTMLElement)) return

  const style = getComputedStyle(el)
  liveTransform.value = style.transform === 'none' ? 'none' : style.transform

  const sheet = foilSheet(el)
  liveFilter.value = sheet ? getComputedStyle(sheet).filter : 'none'
}

let poll: ReturnType<typeof setInterval> | undefined

// The card is spring-driven, so its transform keeps moving after the pointer
// has stopped. Polling is the only way to report where it actually settled.
// Created on mount rather than at setup: `setInterval` has no server
// counterpart, and Nuxt rejects it during SSR.
onMounted(() => {
  readCard()
  poll = setInterval(readCard, 120)
})

function reset() {
  pattern.value = 'prism'
  intensity.value = 0.6
  glare.value = 0.5
  sheenSpeed.value = 1
  tilt.value = true
  foilOver.value = false
  useDeviceOrientation.value = false
}
</script>
