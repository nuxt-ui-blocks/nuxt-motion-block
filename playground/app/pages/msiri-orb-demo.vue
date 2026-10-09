<template>
  <div class="space-y-12">
    <UPageHeader
      title="SiriOrb"
      description="A state-reactive orb. One prop picks a motion motif, a bloom strength, a saturation and a base scale; another, `amplitude`, lets a live audio level tighten the gradient. Translated from smoothui's siri-orb."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          States
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Each state owns a distinct motif, so states are told apart by
        <em>what</em> moves rather than by how fast: <code class="font-mono">idle</code>
        breathes, <code class="font-mono">error</code> shakes once and desaturates,
        and everything else sits at rest while the gradient churns faster.
      </p>

      <div class="mb-8 flex flex-wrap gap-2">
        <UButton
          v-for="option in states"
          :key="option"
          :label="option"
          :variant="state === option ? 'solid' : 'outline'"
          :data-testid="`state-${option}`"
          @click="state = option"
        />
      </div>

      <div class="mb-8 flex flex-wrap items-center justify-center gap-10 rounded-2xl bg-(--ui-bg-muted) py-12">
        <!--
          The orb's own root is a `<Motion>`, so a template ref on it hands back a
          component instance. Wrapping it in a plain element keeps the demo's DOM
          reads on a real node.
        -->
        <div ref="stage">
          <MSiriOrb
            :amplitude="amplitude"
            :animation-duration="animationDuration"
            :state="state"
            :size="size"
            :data-testid="`orb-${size}`"
          />
        </div>

        <dl class="grid w-full max-w-sm grid-cols-2 gap-x-4 gap-y-1 text-xs">
          <dt class="text-muted">
            motif
          </dt>
          <dd class="font-mono">
            {{ stateMotion.motif }}
          </dd>
          <dt class="text-muted">
            glow
          </dt>
          <dd class="font-mono">
            {{ stateMotion.glow }}
          </dd>
          <dt class="text-muted">
            scale
          </dt>
          <dd class="font-mono">
            {{ stateMotion.scale }}
          </dd>
          <dt class="text-muted">
            speed
          </dt>
          <dd class="font-mono">
            {{ stateMotion.speed }}
          </dd>
          <dt class="text-muted">
            reactivity
          </dt>
          <dd class="font-mono">
            {{ stateMotion.reactivity }}
          </dd>
          <dt class="text-muted">
            saturation
          </dt>
          <dd class="font-mono">
            {{ stateMotion.saturation }}
          </dd>
          <dt class="text-muted">
            hue rotate
          </dt>
          <dd class="font-mono">
            {{ stateMotion.hueRotate }}
          </dd>
        </dl>
      </div>

      <div class="space-y-4">
        <div class="flex flex-wrap gap-2">
          <UButton
            label="simulated"
            :variant="source === 'simulated' ? 'solid' : 'outline'"
            data-testid="source-simulated"
            @click="source = 'simulated'"
          />
          <UButton
            :label="microphoneActive ? 'stop microphone' : 'microphone'"
            :variant="source === 'microphone' ? 'solid' : 'outline'"
            data-testid="source-microphone"
            @click="toggleMicrophone"
          />
        </div>

        <div class="flex flex-wrap gap-2">
          <UButton
            v-for="option in sizes"
            :key="option"
            :label="option"
            :variant="size === option ? 'solid' : 'outline'"
            :data-testid="`size-${option}`"
            @click="size = option"
          />
        </div>

        <div class="grid gap-4 sm:grid-cols-2">
          <UFormField
            label="gain"
            :hint="gainAmount.toFixed(2)"
          >
            <USlider
              v-model="gainAmount"
              :max="1.5"
              :min="0"
              :step="0.01"
            />
          </UFormField>

          <UFormField
            label="animation duration"
            :hint="`${animationDuration}s`"
          >
            <USlider
              v-model="animationDuration"
              :max="40"
              :min="2"
              :step="1"
            />
          </UFormField>
        </div>

        <p class="text-sm text-muted">
          The default signal is <code class="font-mono">useSimulatedAmplitude()</code>,
          so the demo needs no permission prompt.
          <code class="font-mono">useAudioAmplitude()</code> is the same contract
          against a real microphone, and leaves the amplitude at zero if permission
          is refused — the orb then falls back to its ambient animation.
        </p>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Size tiers
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        One <code class="font-mono">size</code> prop rescales the whole orb: blur,
        contrast, dot pitch, inset shadow and rim are all derived from the
        diameter, each with a floor so a small orb keeps visible structure. The
        mask that hides the dot grid's centre is pulled in at the lower tiers —
        and removed below 30px, where it would read as a dark hole.
      </p>

      <div class="flex flex-wrap items-end gap-8">
        <div
          v-for="option in sizes"
          :key="option"
          class="space-y-2 text-center"
        >
          <MSiriOrb
            :amplitude="amplitude"
            :state="state"
            :size="option"
          />
          <p class="text-xs text-muted">
            <code class="font-mono">{{ option }}</code>
          </p>
          <p class="text-xs text-muted">
            mask {{ resolveOrbMetrics(option).maskRadius }}
          </p>
          <p class="text-xs text-muted">
            blur {{ resolveOrbMetrics(option).blurAmount }}px
          </p>
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Palette
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        <code class="font-mono">colors</code> merges over the defaults, so a single
        channel can be swapped without restating the rest. The bloom always borrows
        <code class="font-mono">c2</code>: the glow has to read as light escaping the
        orb rather than as a theme colour sitting behind it.
      </p>

      <div class="flex flex-wrap items-center gap-8">
        <div class="space-y-2 text-center">
          <MSiriOrb
            :amplitude="amplitude"
            :state="state"
            size="160px"
          />
          <p class="text-xs text-muted">
            default
          </p>
        </div>
        <div class="space-y-2 text-center">
          <MSiriOrb
            :amplitude="amplitude"
            :colors="warmPalette"
            :state="state"
            size="160px"
          />
          <p class="text-xs text-muted">
            warm
          </p>
        </div>
        <div class="space-y-2 text-center">
          <MSiriOrb
            :amplitude="amplitude"
            :colors="coldPalette"
            :state="state"
            size="160px"
          />
          <p class="text-xs text-muted">
            cold
          </p>
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Environment
        </p>
      </template>

      <p class="mb-4 text-sm text-muted">
        Read back from the rendered element rather than from component internals —
        every value here is what the browser is actually painting.
      </p>

      <div class="grid gap-x-8 gap-y-1 text-sm sm:grid-cols-2">
        <p>
          Reduced motion:
          <code
            class="font-mono"
            data-demo-reduced-motion
          >{{ reducedMotion ? 'yes' : 'no' }}</code>
        </p>
        <p>
          Microphone:
          <code
            class="font-mono"
            data-demo-audio-status
          >{{ microphone.status }}</code>
        </p>
        <p>
          Amplitude:
          <code
            class="font-mono"
            data-demo-amplitude
          >{{ liveAmplitude.toFixed(3) }}</code>
        </p>
        <p>
          Rotation period:
          <code
            class="font-mono"
            data-demo-animation-duration
          >{{ readouts.animationDuration }}</code>
        </p>
        <p>
          Blur amount:
          <code
            class="font-mono"
            data-demo-blur-amount
          >{{ readouts.blurAmount }}</code>
        </p>
        <p>
          Contrast amount:
          <code
            class="font-mono"
            data-demo-contrast-amount
          >{{ readouts.contrastAmount }}</code>
        </p>
        <p>
          Dot size:
          <code
            class="font-mono"
            data-demo-dot-size
          >{{ readouts.dotSize }}</code>
        </p>
        <p>
          Rim:
          <code
            class="font-mono"
            data-demo-rim
          >{{ readouts.rim }}</code>
        </p>
        <p>
          Mask radius:
          <code
            class="font-mono"
            data-demo-mask-radius
          >{{ readouts.maskRadius }}</code>
        </p>
        <p>
          Disc filter:
          <code
            class="font-mono"
            data-demo-filter
          >{{ readouts.filter }}</code>
        </p>
        <p>
          Bloom opacity:
          <code
            class="font-mono"
            data-demo-bloom-opacity
          >{{ readouts.bloomOpacity }}</code>
        </p>
        <p>
          Gradient angle:
          <code
            class="font-mono"
            data-demo-angle
          >{{ readouts.angle }}</code>
        </p>
        <p>
          DOM reads:
          <code
            class="font-mono"
            data-demo-poll
          >{{ readouts.poll }}</code>
        </p>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { useMotionValue, useMotionValueEvent, useReducedMotion, useTransform } from 'motion-v'
import type { AIState } from '../../../src/runtime/composables/useAiState'
import { getAIStateMotion, useAudioAmplitude, useSimulatedAmplitude } from '../../../src/runtime/composables/useAiState'
import { resolveOrbMetrics } from '../../../src/runtime/components/SiriOrb/constants'

const states: AIState[] = ['idle', 'listening', 'thinking', 'streaming', 'done', 'error']
const sizes = ['24px', '48px', '96px', '192px', '280px']

const state = ref<AIState>('idle')
const source = ref<'simulated' | 'microphone'>('simulated')
const gainAmount = ref(0.8)
const animationDuration = ref(20)
const size = ref('192px')

const warmPalette = { bg: 'oklch(94% 0.04 70)', c1: 'oklch(70% 0.19 40)', c2: 'oklch(76% 0.17 75)', c3: 'oklch(66% 0.2 20)', c4: 'oklch(74% 0.18 95)' }
const coldPalette = { bg: 'oklch(94% 0.02 230)', c1: 'oklch(64% 0.2 230)', c2: 'oklch(68% 0.19 195)', c3: 'oklch(60% 0.21 265)', c4: 'oklch(74% 0.15 215)' }

const stage = ref<HTMLElement | null>(null)
const reducedMotion = useReducedMotion()

const simulated = useSimulatedAmplitude(state)
const microphone = useAudioAmplitude()
const gain = useMotionValue(gainAmount.value)
const sourceWeight = useMotionValue(source.value === 'microphone' ? 1 : 0)

watchEffect(() => gain.set(gainAmount.value))
watch(source, next => sourceWeight.set(next === 'microphone' ? 1 : 0))

const stateMotion = computed(() => getAIStateMotion(state.value))

const microphoneActive = computed(() => microphone.status.value === 'active')

/**
 * A single stable motion value, so the orb's own signal never changes identity.
 *
 * `useTransform` subscribes to every input and writes one value, which is what
 * keeps a 60fps signal out of the render cycle. `source` is mirrored into a
 * motion value rather than read inside the transformer: a transform only re-runs
 * when one of its *inputs* changes, so a captured `source` would leave the
 * microphone switch looking inert until the next audio frame happened to land.
 *
 * The generics are load-bearing — with three inputs the callback parameters
 * cannot be inferred and arrive as `unknown`.
 */
const amplitude = useTransform<number, number>(
  [simulated, microphone.amplitude, gain, sourceWeight],
  ([sim, mic, g, micSelected]) => (micSelected ? mic : sim) * g,
)

const liveAmplitude = ref(0)
useMotionValueEvent(amplitude, 'change', value => liveAmplitude.value = value)

onBeforeUnmount(() => microphone.stop())

async function toggleMicrophone() {
  if (source.value === 'microphone' && microphoneActive.value) {
    microphone.stop()
    source.value = 'simulated'
    return
  }
  await microphone.start()
  source.value = 'microphone'
}

// ------------------------------------------------------------------- readouts

const readouts = reactive({
  animationDuration: '—',
  blurAmount: '—',
  contrastAmount: '—',
  dotSize: '—',
  rim: '—',
  maskRadius: '—',
  filter: '—',
  bloomOpacity: '—',
  angle: '—',
  poll: 0,
})

/**
 * `--angle` is animated on the disc's `::before`, so it is never an inline
 * value and never appears on the host element's own computed style. The angle
 * the browser is actually painting is the one baked into the resolved conic
 * gradient, so that is what gets read back.
 */
function angleOf(disc: HTMLElement): string {
  const image = getComputedStyle(disc, '::before').backgroundImage
  const match = /from\s+(-?[\d.]+)deg/.exec(image)
  return match ? `${match[1]}deg` : '—'
}

/**
 * Polled rather than bound: the gradient's angle is driven by a CSS keyframe,
 * so it changes without Vue ever hearing about it. The only way to report where
 * the gradient actually is, is to read it back.
 */
let poll: ReturnType<typeof setInterval> | undefined

function readDisc() {
  readouts.poll += 1
  const disc = stage.value?.querySelector<HTMLElement>('.siri-orb')
  if (!disc) return

  const style = getComputedStyle(disc)
  readouts.animationDuration = style.getPropertyValue('--animation-duration').trim() || '—'
  readouts.blurAmount = style.getPropertyValue('--blur-amount').trim() || '—'
  readouts.contrastAmount = style.getPropertyValue('--contrast-amount').trim() || '—'
  readouts.dotSize = style.getPropertyValue('--dot-size').trim() || '—'
  readouts.rim = style.getPropertyValue('--rim').trim() || '—'
  readouts.maskRadius = style.getPropertyValue('--mask-radius').trim() || '—'
  readouts.filter = style.filter === 'none' ? 'none' : style.filter
  readouts.angle = angleOf(disc)

  const bloom = stage.value?.querySelector<HTMLElement>('.siri-orb-bloom')
  readouts.bloomOpacity = bloom ? getComputedStyle(bloom).opacity : '—'
}

onMounted(() => {
  readDisc()
  poll = setInterval(readDisc, 120)
})

onBeforeUnmount(() => {
  if (poll) clearInterval(poll)
})
</script>
