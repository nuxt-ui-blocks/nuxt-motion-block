<template>
  <div class="space-y-12">
    <UPageHeader
      title="AiOrbFaceMouth"
      description="The orb with a face that has a mouth. A mood picks the eyes and the mouth together, so happy, thinking, sleeping and confused are complete reads rather than combinations you have to tune."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Moods
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Every mood is eyes plus mouth plus an optional accent. Move the pointer
        around the orb to watch the gaze follow it.
      </p>

      <div class="mb-8 flex flex-wrap gap-2">
        <UButton
          v-for="option in moods"
          :key="option"
          :label="option"
          :variant="mood === option ? 'solid' : 'outline'"
          @click="mood = option"
        />
      </div>

      <div class="mb-8 flex flex-wrap items-center justify-center gap-10 rounded-2xl bg-(--ui-bg-muted) py-12">
        <MAiOrbFaceMouth
          :mood="mood"
          :size="224"
          class="cursor-crosshair"
          :aria-label="`Assistant character, ${mood}`"
        />

        <dl class="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
          <dt class="text-muted">
            mood
          </dt>
          <dd class="font-mono font-semibold">
            {{ mood }}
          </dd>
          <dt class="text-muted">
            eyes
          </dt>
          <dd class="font-mono">
            {{ activeMood.eye }}
          </dd>
          <dt class="text-muted">
            mouth
          </dt>
          <dd class="font-mono">
            {{ activeMood.mouth }}
          </dd>
          <dt class="text-muted">
            accent
          </dt>
          <dd class="font-mono">
            {{ activeMood.accent ?? 'none' }}
          </dd>
        </dl>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Gallery
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        All eight moods at once, which is the quickest way to check that none of
        them collapse into the same face.
      </p>

      <div class="grid grid-cols-2 gap-6 sm:grid-cols-4">
        <div
          v-for="option in moods"
          :key="option"
          class="flex flex-col items-center gap-2 rounded-2xl bg-(--ui-bg-muted) py-6"
        >
          <MAiOrbFaceMouth :mood="option" :size="112" />
          <span class="font-mono text-xs text-muted">{{ option }}</span>
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          States
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        An assistant state picks the mood for you. Listening and streaming also
        carry a simulated speech amplitude, so the interior of the orb stirs.
      </p>

      <div class="mb-8 flex flex-wrap gap-2">
        <UButton
          v-for="option in states"
          :key="option"
          :label="option"
          :variant="state === option ? 'solid' : 'outline'"
          @click="state = option"
        />
      </div>

      <div class="flex flex-wrap items-center justify-center gap-10 rounded-2xl bg-(--ui-bg-muted) py-12">
        <MAiOrbFaceMouth
          :state="state"
          :amplitude="amplitude"
          :size="224"
          class="cursor-crosshair"
          :aria-label="`Assistant character, ${state}`"
        />

        <dl class="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
          <dt class="text-muted">
            state
          </dt>
          <dd class="font-mono font-semibold">
            {{ state }}
          </dd>
          <dt class="text-muted">
            mood
          </dt>
          <dd class="font-mono">
            {{ stateMood }}
          </dd>
          <dt class="text-muted">
            mouth
          </dt>
          <dd class="font-mono">
            {{ AI_ORB_FACE_MOUTH_MOODS[stateMood].mouth }}
          </dd>
        </dl>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Palettes
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The same face on three colour sets. Features stay legible against the
        sphere because they are mixed away from the body colour.
      </p>

      <div class="flex flex-wrap items-center justify-center gap-8 rounded-2xl bg-(--ui-bg-muted) py-12">
        <MAiOrbFaceMouth :mood="mood" :size="144" aria-label="Assistant character, themed" />
        <MAiOrbFaceMouth
          :mood="mood"
          :size="144"
          :colors="{ body: 'oklch(72% 0.19 250)', bodyEdge: 'oklch(97% 0.02 250)', feature: 'oklch(24% 0.04 260)' }"
          aria-label="Assistant character, blue palette"
        />
        <MAiOrbFaceMouth
          :mood="mood"
          :size="144"
          :colors="{ body: 'oklch(78% 0.16 85)', bodyEdge: 'oklch(98% 0.03 95)', feature: 'oklch(28% 0.06 70)' }"
          aria-label="Assistant character, warm palette"
        />
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { AIState } from '../../../src/runtime/composables/useAiState'
import { useSimulatedAmplitude } from '../../../src/runtime/composables/useAiState'
import type { AiOrbFaceMouthMood } from '../../../src/runtime/components/AiOrbFaceMouth.vue'
import {
  AI_ORB_FACE_MOUTH_MOODS,
  AI_ORB_FACE_MOUTH_STATE_MOOD,
} from '../../../src/runtime/components/AiOrbFaceMouth.vue'

const moods = Object.keys(AI_ORB_FACE_MOUTH_MOODS) as AiOrbFaceMouthMood[]
const states: AIState[] = ['idle', 'listening', 'thinking', 'streaming', 'done', 'error']

const mood = ref<AiOrbFaceMouthMood>('idle')
const state = ref<AIState>('idle')

const activeMood = computed(() => AI_ORB_FACE_MOUTH_MOODS[mood.value])
const stateMood = computed(() => AI_ORB_FACE_MOUTH_STATE_MOOD[state.value])

const amplitude = useSimulatedAmplitude(state)
</script>
