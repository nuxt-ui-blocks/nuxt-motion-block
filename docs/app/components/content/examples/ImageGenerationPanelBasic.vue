<template>
  <div class="flex w-full justify-center px-6 py-10">
    <MImageGenerationPanel
      v-model:prompt="prompt"
      class="max-w-2xl"
      :images="images"
      :presets="presets"
      :progress="progress"
      :seed="seed"
      :status="status"
      @generate="run"
    />
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'

type Status = 'idle' | 'queued' | 'generating' | 'done' | 'error'

interface Palette {
  from: string
  glow: string
  to: string
  x: number
  y: number
}

const PALETTES: Palette[] = [
  { from: '#0f172a', glow: '#38bdf8', to: '#1e3a8a', x: 0.3, y: 0.25 },
  { from: '#3b0764', glow: '#f472b6', to: '#831843', x: 0.68, y: 0.32 },
  { from: '#052e16', glow: '#a3e635', to: '#065f46', x: 0.42, y: 0.7 },
  { from: '#431407', glow: '#fbbf24', to: '#7c2d12', x: 0.6, y: 0.62 },
]

const QUEUE_MS = 420
const RAMP_MS = 2600
const TICK_MS = 80

/**
 * Inline SVG studies keep the example self-contained — no network, no
 * placeholder service. Each one is drawn twice: full size for the result and
 * 32px for the pixelated first pass.
 */
function art(palette: Palette, width: number, height: number) {
  const svg
    = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">`
      + `<defs>`
      + `<linearGradient id="g" x1="0" y1="0" x2="1" y2="1">`
      + `<stop offset="0" stop-color="${palette.from}"/>`
      + `<stop offset="1" stop-color="${palette.to}"/>`
      + `</linearGradient>`
      + `<radialGradient id="r" cx="${palette.x}" cy="${palette.y}" r="0.72">`
      + `<stop offset="0" stop-color="${palette.glow}" stop-opacity="0.85"/>`
      + `<stop offset="1" stop-color="${palette.glow}" stop-opacity="0"/>`
      + `</radialGradient>`
      + `</defs>`
      + `<rect width="${width}" height="${height}" fill="url(#g)"/>`
      + `<rect width="${width}" height="${height}" fill="url(#r)"/>`
      + `<circle cx="${width * palette.x}" cy="${height * palette.y}" r="${width * 0.17}" fill="${palette.glow}" opacity="0.35"/>`
      + `</svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

const images = PALETTES.map((palette, index) => ({
  alt: `Colour study ${index + 1}`,
  id: `study-${index + 1}`,
  preview: art(palette, 32, 32),
  seed: (0x8F21 + index * 977).toString(16),
  src: art(palette, 640, 640),
}))

const presets = [
  { id: 'cinematic', label: 'cinematic' },
  { id: 'film-grain', label: 'film grain' },
]

const prompt = ref('Saturated colour fields, heavy optical blur')
const status = ref<Status>('done')
const progress = ref(1)
const seed = ref('8f21')

let queueTimer: ReturnType<typeof setTimeout> | null = null
let rampTimer: ReturnType<typeof setInterval> | null = null

function stop(): void {
  if (queueTimer) clearTimeout(queueTimer)
  if (rampTimer) clearInterval(rampTimer)
  queueTimer = null
  rampTimer = null
}

function run(): void {
  stop()
  status.value = 'queued'
  progress.value = 0
  seed.value = Math.floor(Math.random() * 0xFFFF)
    .toString(16)
    .padStart(4, '0')

  queueTimer = setTimeout(() => {
    status.value = 'generating'
    const startedAt = performance.now()
    rampTimer = setInterval(() => {
      const next = Math.min(1, (performance.now() - startedAt) / RAMP_MS)
      progress.value = next
      if (next >= 1) {
        stop()
        status.value = 'done'
      }
    }, TICK_MS)
  }, QUEUE_MS)
}

onBeforeUnmount(stop)
</script>
