---
title: Image Generation Panel
description: A prompt composer, a grid of tiles that resolve from mosaic to sharp, and the batch progress around them.
---

A generator's result does not arrive in one frame. It starts as a colour
mosaic, sharpens, and settles — and four results do not land together either.
The panel encodes both: `progress` is a single 0–1 number, and every tile reads
its own window of it, offset by index. A batch therefore looks like four jobs
racing instead of one mask lifting off a single image cut into quarters.

Each tile crossfades a pixelated low-resolution pass into the sharp result,
blurring down as it resolves. A scan sweep and a per-tile percentage run only
while that tile is still resolving, so a finished tile is quiet.

## Usage

Pass `images`, then drive `status` and `progress` from your generator. Omitting
`status` lets the panel queue and start the batch itself, which is enough for a
prototype.

::code-preview
---
label: Preview
---

  :::div{class="w-full"}
    <component-example name="image-generation-panel-basic" />
  :::
#code
```vue
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
```
::

The composer is a real prompt field: type, press enter, and `generate` fires
with the trimmed prompt. While the batch is busy the send button becomes stop,
but only if you listen for `cancel`.

## Customize

`chrome="minimal"` drops the header, the footer and the batch progress rail,
leaving the composer and the tiles. `composerPlacement="bottom"` puts the field
under the grid instead of over it. `count` sets the number of tiles and
`aspectRatios` the shapes offered in the composer; pass `aspectRatio` to control
the choice yourself.

`typing` renders the prompt as read-only text with a blinking caret, for
replaying or streaming a prompt into the field. The overlay borrows the real
textarea's measured box, so the caret sits exactly where the field's own text
would be, whatever the theme's padding.

::code-preview
---
label: Preview
---

  :::div{class="w-full"}
    <component-example name="image-generation-panel-custom" />
  :::
#code
```vue
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
```
::

`presets` are chips that toggle a `, label` suffix on the prompt, and `seed`
shows the batch seed in the composer readout.

## Props

::component-props
  ::component-prop{name="images" type="ImageGenerationImage[]"}
  One entry per result: `{ id, src, alt, preview?, seed? }`. `preview` is a tiny
  version of `src` used for the mosaic pass; it falls back to `src`.
  ::
  ::component-prop{name="status" type="'idle' | 'queued' | 'generating' | 'done' | 'error'"}
  Controlled status. Omit it and the panel queues and starts the batch itself.
  ::
  ::component-prop{name="progress" type="number" default="0"}
  Batch progress, 0–1. Drives every tile's mosaic-to-sharp resolve.
  ::
  ::component-prop{name="prompt" type="string"}
  Controlled draft prompt. Omit it to let the panel own the text.
  ::
  ::component-prop{name="aspectRatio" type="string"}
  Controlled `aspect-ratio` value. Omit it to let the panel own the choice.
  ::
  ::component-prop{name="aspectRatios" type="ImageGenerationAspectRatio[]"}
  The shapes offered in the composer, as `{ id, label, value }`. Defaults to
  1:1, 4:5 and 16:9.
  ::
  ::component-prop{name="count" type="number" default="4"}
  Number of tiles in the grid. One tile gets a single column.
  ::
  ::component-prop{name="chrome" type="'full' | 'minimal'" default="'full'"}
  How much surrounding chrome renders.
  ::
  ::component-prop{name="composerPlacement" type="'top' | 'bottom'" default="'top'"}
  Where the composer sits relative to the tiles.
  ::
  ::component-prop{name="presets" type="ImageGenerationPreset[]"}
  Chips that append their label to the prompt.
  ::
  ::component-prop{name="seed" type="string"}
  Batch seed, shown in the composer readout.
  ::
  ::component-prop{name="model" type="string" default="'motion-diffusion v2'"}
  Model name shown in the header.
  ::
  ::component-prop{name="error" type="string"}
  Message for the failure banner. Also announced when `status` is `error`.
  ::
  ::component-prop{name="typing" type="boolean" default="false"}
  Renders the prompt as read-only text with a blinking caret.
  ::
  ::component-prop{name="class" type="string"}
  Merged onto the panel root.
  ::
::

## Events

::component-events
  ::component-event{name="generate" payload="[prompt: string]"}
  The prompt was submitted. Start your batch here.
  ::
  ::component-event{name="cancel"}
  Stop was pressed while a batch was running. Listening for it is what turns the
  send button into stop.
  ::
  ::component-event{name="retry"}
  Retry was pressed in the failure banner. The button only renders when this
  listener exists.
  ::
  ::component-event{name="select" payload="[image: ImageGenerationImage]"}
  A tile was picked. The tile keeps a primary border while selected.
  ::
  ::component-event{name="variations" payload="[image: ImageGenerationImage]"}
  Make variations was pressed on a resolved tile. The action only renders when
  this listener exists.
  ::
  ::component-event{name="update:prompt" payload="[value: string]"}
  Emitted on every edit, and paired with `v-model:prompt`.
  ::
  ::component-event{name="update:status" payload="[value: ImageGenerationStatus]"}
  Paired with `v-model:status`.
  ::
  ::component-event{name="update:aspectRatio" payload="[value: string]"}
  Paired with `v-model:aspect-ratio`.
  ::
::

## Accessibility

- A single `role="status"` region carries the batch state: queued, generating
  with a percentage, how many images are ready, or the error message. The
  per-tile percentages are decorative and `aria-hidden`, so a batch of four does
  not produce four competing announcements.
- The failure banner is `role="alert"`, so it is announced even when the polite
  status region is still mid-sentence.
- Each tile's sharp image carries its `alt`; the mosaic pass is `aria-hidden`
  with an empty `alt`, because it is the same picture at a lower resolution.
- Tile actions are labelled with the image they act on — "Download Colour
  study 2", "Make variations of Colour study 2" — rather than repeating
  "Download" four times.
- Preset chips and aspect-ratio buttons use `aria-pressed`, and each ratio also
  carries a descriptive `aria-label`, so the pressed state is not the only cue.
- While `typing` is on, the visible text is an `aria-hidden` overlay and the real
  textarea still holds the value, so the prompt is read once and the field stays
  focusable.
- Under `prefers-reduced-motion: reduce` the tile entrance, scan sweep, shimmer,
  caret and status pulse are all switched off in CSS. A post-mount media query
  resolves every tile on its first paint instead of pinning it mid-mosaic.

## Performance

- `progress` is one scalar. Each tile derives its own local progress from its
  index, so a batch of four and a batch of forty cost the same number of
  reactive values.
- The mosaic pass is a tiny image (`preview`) scaled up with
  `image-rendering: pixelated`, so the blur that hides the upscale stays at 2px.
  The sharp pass never blurs past 18px, past which `blur()` gets expensive.
- Motion is CSS keyframes and transitions on `transform` and `opacity`, so the
  scan, shimmer and entrance stay off the main thread; nothing re-renders per
  frame.
- The typing overlay is measured from the real textarea and kept in sync by one
  `ResizeObserver` on the panel, rather than re-measuring on every keystroke.
- Finished tiles stop animating entirely: the scan, the percentage and the
  progress rail all unmount, leaving the two images at rest.
- Tiles are keyed by image id, so a re-render that only moves `progress`
  patches styles in place instead of rebuilding the grid; the only enter and
  exit work is Vue's `<Transition>` on two short labels.
