<template>
  <div class="space-y-12">
    <UPageHeader
      title="AiOrbFace"
      description="The character layer. State lives here, not in the material, because a state is a behaviour: it wants the whole silhouette, not one shading model of it. The orb underneath is a state-agnostic WebGL2 surface with a CSS fallback."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Six states
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Each state picks an eye shape and a motion motif. Thinking adds
        saccades, listening breathes with whatever amplitude you give it, done
        hops once, and error wobbles while its spirals turn. Move the pointer
        over the orb to watch the gaze follow it.
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

      <div class="mb-8 flex flex-wrap items-end justify-center gap-10 rounded-2xl bg-(--ui-bg-muted) py-12">
        <MAiOrbFace
          :state="state"
          :amplitude="amplitude"
          :size="224"
          class="cursor-crosshair"
          :aria-label="`Assistant character, ${state}`"
          data-testid="face"
        />

        <dl class="grid w-full max-w-sm grid-cols-2 gap-x-4 gap-y-1 text-xs">
          <dt class="text-muted">
            motif
          </dt>
          <dd class="font-mono">
            {{ stateMotion.motif }}
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
            turbulence
          </dt>
          <dd class="font-mono">
            {{ stateMotion.turbulence }}
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

        <div class="space-y-1">
          <label
            class="block text-sm font-medium"
            for="face-gain"
          >
            Gain
            <span class="font-mono text-muted">{{ gainAmount.toFixed(2) }}</span>
          </label>
          <input
            id="face-gain"
            v-model.number="gainAmount"
            class="w-full max-w-sm accent-primary"
            type="range"
            min="0"
            max="1.5"
            step="0.01"
          >
        </div>

        <p class="text-sm text-muted">
          The default signal is <code class="font-mono">useSimulatedAmplitude()</code>,
          so the demo needs no permission prompt.
          <code class="font-mono">useAudioAmplitude()</code> is the same contract
          against a real microphone. Amplitude is quantised to four steps
          before it reaches the material, so a noisy room does not become a
          shimmering one.
        </p>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Nine expressions
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        An expression overrides the state, which is how you get a wink or a
        deadpan without inventing a state for it. Turn the state row off to see
        the expression stand alone.
      </p>

      <div class="mb-6 flex flex-wrap gap-2">
        <UButton
          label="from state"
          :variant="expression === 'state' ? 'solid' : 'outline'"
          data-testid="expression-state"
          @click="expression = 'state'"
        />
        <UButton
          v-for="option in expressionNames"
          :key="option"
          :label="option"
          :variant="expression === option ? 'solid' : 'outline'"
          :data-testid="`expression-${option}`"
          @click="expression = option"
        />
      </div>

      <div class="flex flex-wrap items-center justify-center gap-8 rounded-2xl bg-(--ui-bg-muted) py-12">
        <MAiOrbFace
          :expression="expression === 'state' ? undefined : expression"
          :size="144"
          aria-label="Assistant character, expression preview"
          data-testid="face-expression"
        />
        <MAiOrbFace
          :expression="expression === 'state' ? undefined : expression"
          :size="144"
          :colors="{ body: 'oklch(72% 0.19 250)', bodyEdge: 'oklch(97% 0.02 250)', feature: 'oklch(24% 0.04 260)' }"
          :gaze="false"
          aria-label="Assistant character, alternate palette"
          data-testid="face-expression-alt"
        />
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Size and gaze
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Size accepts any CSS length, not just a number, so the face can be
        driven by its container. Gaze is the one behaviour you can turn off
        outright, and it turns itself off under reduced motion regardless.
      </p>

      <div class="flex flex-wrap items-center gap-8">
        <UButton
          :label="gaze ? 'gaze on' : 'gaze off'"
          :variant="gaze ? 'solid' : 'outline'"
          data-testid="gaze-toggle"
          @click="gaze = !gaze"
        />
        <MAiOrbFace
          v-for="option in [56, 96, 160]"
          :key="option"
          :gaze="gaze"
          :size="option"
          :state="state"
          :aria-label="`Assistant character at ${option} pixels`"
        />
        <div class="grid h-40 w-40 place-items-center rounded-2xl border border-default bg-(--ui-bg-muted)">
          <MAiOrbFace
            :gaze="gaze"
            size="100%"
            :state="state"
            aria-label="Assistant character, filled by its container"
          />
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { useMotionValue, useTransform } from 'motion-v'
import type { AIState } from '../../../src/runtime/composables/useAiState'
import { getAIStateMotion, useAudioAmplitude, useSimulatedAmplitude } from '../../../src/runtime/composables/useAiState'
import { AI_ORB_FACE_EXPRESSIONS } from '../../../src/runtime/components/AiOrbFace.vue'
import type { AiOrbFaceExpressionName } from '../../../src/runtime/components/AiOrbFace.vue'

/**
 * `'state'` is a sentinel, not an expression: it means "let the AI state pick the
 * face". Keeping it in the same ref as the real expressions is what makes the
 * preview honest, but it must never reach the `expression` prop, whose type has
 * no room for it.
 */
type ExpressionChoice = AiOrbFaceExpressionName | 'state'

const states: AIState[] = ['idle', 'listening', 'thinking', 'streaming', 'done', 'error']
const expressionNames = Object.keys(AI_ORB_FACE_EXPRESSIONS) as AiOrbFaceExpressionName[]

const state = ref<AIState>('idle')
const gaze = ref(true)
const expression = ref<ExpressionChoice>('state')
const source = ref<'simulated' | 'microphone'>('simulated')
const gainAmount = ref(0.8)

const simulated = useSimulatedAmplitude(state)
const microphone = useAudioAmplitude()
const gain = useMotionValue(gainAmount.value)

watchEffect(() => gain.set(gainAmount.value))

const stateMotion = computed(() => getAIStateMotion(state.value))

/**
 * `useAudioAmplitude` hands back a ref, and a ref nested inside a plain object
 * is not unwrapped by the template. Reading it through a computed keeps both the
 * button label and the toggle below looking at the same derived boolean.
 */
const microphoneActive = computed(() => microphone.status.value === 'active')

/**
 * Amplitude is a motion value, so the slider and the face read the same signal
 * without the face re-rendering on every audio frame. `useTransform` is what
 * keeps that true: it subscribes to every input and writes a single value.
 * The generics are load-bearing: with three inputs the callback parameters
 * cannot be inferred, so they arrive as `unknown`.
 */
const amplitude = useTransform<number, number>(
  [simulated, microphone.amplitude, gain],
  ([sim, mic, g]) => (source.value === 'microphone' ? mic : sim) * g,
)

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
</script>
