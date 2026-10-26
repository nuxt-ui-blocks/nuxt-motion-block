<template>
  <div class="flex w-full flex-col items-center gap-3 px-6 py-10">
    <MImageGenerationPanel
      v-model:aspect-ratio="ratio"
      v-model:prompt="prompt"
      class="w-full max-w-xl"
      :chrome="'minimal'"
      :composer-placement="'bottom'"
      :count="1"
      :images="images"
      :progress="progress"
      :seed="seed"
      :status="status"
      :typing="typing"
      @generate="generate"
    />

    <div class="flex items-center gap-2">
      <UButton
        color="neutral"
        icon="i-lucide-rotate-ccw"
        label="Replay"
        size="sm"
        variant="outline"
        @click="replay"
      />
      <span class="text-xs text-muted">{{ hint }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

type Status = 'idle' | 'queued' | 'generating' | 'done' | 'error'

const SCRIPTED_PROMPT
  = 'Saturated colour fields, heavy optical blur, fine film grain'
const TYPE_MS = 26
const LEAD_IN_MS = 400
const HOLD_MS = 500
const QUEUE_MS = 400
const RAMP_MS = 3200
const TICK_MS = 80

const WIDTH = 960
const HEIGHT = 540

const ART = { from: '#111827', glow: '#22d3ee', to: '#4338ca', x: 0.34, y: 0.3 }

function art(width: number, height: number) {
  const svg
    = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">`
      + `<defs>`
      + `<linearGradient id="g" x1="0" y1="0" x2="1" y2="1">`
      + `<stop offset="0" stop-color="${ART.from}"/>`
      + `<stop offset="1" stop-color="${ART.to}"/>`
      + `</linearGradient>`
      + `<radialGradient id="r" cx="${ART.x}" cy="${ART.y}" r="0.7">`
      + `<stop offset="0" stop-color="${ART.glow}" stop-opacity="0.9"/>`
      + `<stop offset="1" stop-color="${ART.glow}" stop-opacity="0"/>`
      + `</radialGradient>`
      + `</defs>`
      + `<rect width="${width}" height="${height}" fill="url(#g)"/>`
      + `<rect width="${width}" height="${height}" fill="url(#r)"/>`
      + `<circle cx="${width * ART.x}" cy="${height * ART.y}" r="${height * 0.2}" fill="${ART.glow}" opacity="0.4"/>`
      + `</svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

const images = [
  {
    alt: 'Wide colour study',
    id: 'wide-study',
    preview: art(24, 14),
    seed: '4b19',
    src: art(WIDTH, HEIGHT),
  },
]

const prompt = ref('')
const typing = ref(true)
const status = ref<Status>('idle')
const progress = ref(0)
const seed = ref('4b19')
const ratio = ref('16 / 9')

const hint = computed(() => {
  if (typing.value) return 'Streaming the prompt'
  if (status.value === 'queued') return 'Queued'
  if (status.value === 'generating') return 'Rendering'
  return 'Ready'
})

let leadTimer: ReturnType<typeof setTimeout> | null = null
let typeTimer: ReturnType<typeof setTimeout> | null = null
let queueTimer: ReturnType<typeof setTimeout> | null = null
let rampTimer: ReturnType<typeof setInterval> | null = null
let cursor = 0

function stop(): void {
  if (leadTimer) clearTimeout(leadTimer)
  if (typeTimer) clearTimeout(typeTimer)
  if (queueTimer) clearTimeout(queueTimer)
  if (rampTimer) clearInterval(rampTimer)
  leadTimer = null
  typeTimer = null
  queueTimer = null
  rampTimer = null
}

function generate(): void {
  if (queueTimer) clearTimeout(queueTimer)
  if (rampTimer) clearInterval(rampTimer)
  status.value = 'queued'
  progress.value = 0

  queueTimer = setTimeout(() => {
    status.value = 'generating'
    const startedAt = performance.now()
    rampTimer = setInterval(() => {
      const next = Math.min(1, (performance.now() - startedAt) / RAMP_MS)
      progress.value = next
      if (next < 1) return
      if (rampTimer) clearInterval(rampTimer)
      rampTimer = null
      status.value = 'done'
    }, TICK_MS)
  }, QUEUE_MS)
}

function typeNext(): void {
  cursor += 1
  prompt.value = SCRIPTED_PROMPT.slice(0, cursor)
  if (cursor < SCRIPTED_PROMPT.length) {
    typeTimer = setTimeout(typeNext, TYPE_MS)
    return
  }
  typing.value = false
  queueTimer = setTimeout(generate, HOLD_MS)
}

function replay(): void {
  stop()
  cursor = 0
  prompt.value = ''
  progress.value = 0
  status.value = 'idle'
  typing.value = true
  leadTimer = setTimeout(typeNext, LEAD_IN_MS)
}

onMounted(replay)
onBeforeUnmount(stop)
</script>
