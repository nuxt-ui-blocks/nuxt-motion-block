<script setup lang="ts">
import { computed, ref } from 'vue'

/**
 * Inlined rather than served from `public/`: a `data:` URL is same-origin, so
 * the canvas is never tainted and `getImageData` succeeds without any CORS
 * negotiation. A remote image would need real `Access-Control-Allow-Origin`
 * headers, not just the `crossorigin` attribute, or the read silently fails and
 * the component falls back to the plain <img>.
 */
const portrait = computed(() => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="360" viewBox="0 0 480 360">
    <defs>
      <radialGradient id="bg" cx="30%" cy="25%" r="90%">
        <stop offset="0%" stop-color="#312e81"/>
        <stop offset="55%" stop-color="#1e1b4b"/>
        <stop offset="100%" stop-color="#09090b"/>
      </radialGradient>
      <radialGradient id="face" cx="38%" cy="30%" r="70%">
        <stop offset="0%" stop-color="#fde68a"/>
        <stop offset="100%" stop-color="#b45309"/>
      </radialGradient>
    </defs>
    <rect width="480" height="360" fill="url(#bg)"/>
    <circle cx="240" cy="190" r="104" fill="url(#face)"/>
    <ellipse cx="196" cy="168" rx="15" ry="17" fill="#0b0b12"/>
    <ellipse cx="284" cy="168" rx="15" ry="17" fill="#0b0b12"/>
    <circle cx="201" cy="162" r="5" fill="#f8fafc"/>
    <circle cx="289" cy="162" r="5" fill="#f8fafc"/>
    <path d="M196 232 Q240 268 284 232" stroke="#0b0b12" stroke-width="9" fill="none" stroke-linecap="round"/>
    <path d="M40 40 h120 v10 H40 z M320 310 h120 v10 H320 z" fill="#818cf8" opacity="0.8"/>
  </svg>`
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
})

const photoSrc = computed(() => portrait.value)

const alt = 'A round illustrated face with two eyes and a smile, on a dark indigo background'
const columns = ref(96)
const fps = ref(24)
const fontSize = ref(7)
const color = ref<'mono' | 'source'>('mono')
const invert = ref(false)
const paused = ref(false)

const charsets = [
  { label: 'Standard ramp', value: '@%#*+=-:. ' },
  { label: 'Blocks', value: 'â–ˆâ–“â–’â–‘ ' },
  { label: 'Binary', value: '01 ' },
  { label: 'Steep ramp', value: '$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,"^`\'. ' },
]

const charsetOptions = ref(charsets[0]!.value)
const charset = computed(() => charsets.find(entry => entry.value === charsetOptions.value)?.value ?? charsets[0]!.value)

const colorModes = [
  { label: 'Monochrome ramp', value: 'mono' },
  { label: 'Sampled from source', value: 'source' },
]
</script>

<template>
  <div class="space-y-12">
    <UPageHeader
      title="AsciiRender"
      description="An image sampled to a character grid. Luminance uses Rec.709 weights, and the chosen glyph is indexed off a density ramp, so the picture survives being reduced to text."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Character grid
        </p>
        <p class="text-muted">
          Check the
          <code>&lt;pre&gt;</code> below the frame â€” it is the accessible copy of
          the image and must never be empty.
        </p>
      </template>

      <MAsciiRender
        :alt="alt"
        :charset="charset"
        class="rounded-2xl border border-default bg-elevated/50 p-4"
        :color="color"
        :columns="columns"
        :font-size="fontSize"
        :fps="fps"
        :invert="invert"
        :paused="paused"
        :source="{ src: photoSrc, type: 'image' }"
      />

      <div class="mt-6 grid gap-4 sm:grid-cols-2">
        <div class="space-y-1.5">
          <p class="text-sm font-medium">
            Columns â€” {{ columns }}
          </p>
          <USlider
            v-model="columns"
            :min="24"
            :max="240"
            :step="4"
          />
        </div>

        <div class="space-y-1.5">
          <p class="text-sm font-medium">
            Frame rate â€” {{ fps }}fps
          </p>
          <USlider
            v-model="fps"
            :min="1"
            :max="60"
            :step="1"
          />
        </div>

        <div class="space-y-1.5">
          <p class="text-sm font-medium">
            Font size â€” {{ fontSize }}px
          </p>
          <USlider
            v-model="fontSize"
            :min="4"
            :max="18"
            :step="1"
          />
        </div>

        <div class="space-y-1.5">
          <p class="text-sm font-medium">
            Charset
          </p>
          <USelectMenu
            v-model="charsetOptions"
            :items="charsets"
            value-key="value"
            class="w-full"
          />
        </div>

        <div class="space-y-1.5">
          <p class="text-sm font-medium">
            Colour
          </p>
          <USelectMenu
            v-model="color"
            :items="colorModes"
            value-key="value"
            class="w-full"
          />
        </div>

        <div class="space-y-2 pt-6">
          <USwitch
            v-model="invert"
            label="Invert ramp"
          />
          <USwitch
            v-model="paused"
            label="Paused"
          />
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Sampled colour
        </p>
        <p class="text-muted">
          In <code>source</code> mode the ramp is unchanged, but each character is
          filled with the pixel it replaced. The canvas is re-used as a
          <code>background-clip: text</code> image, so glyph colour and pixel
          colour can never drift apart.
        </p>
      </template>

      <MAsciiRender
        :alt="alt"
        class="rounded-2xl border border-default bg-elevated/50 p-4"
        color="source"
        :columns="140"
        :font-size="8"
        :fps="24"
        :source="{ src: photoSrc, type: 'image' }"
      />
    </UCard>
  </div>
</template>
