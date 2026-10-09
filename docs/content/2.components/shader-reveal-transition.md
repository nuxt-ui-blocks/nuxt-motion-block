---
title: Shader Reveal Transition
description: Eight reveal shapes — from a noise gate to a barcode shutter — in one compiled shader.
navigation:
  icon: i-lucide-eye
---

# Shader Reveal Transition

A content-swap transition whose overlay is drawn by one fragment shader in eight
different shapes: a turbulent noise gate, a zoom lens, an iris, a blade wipe,
ribboned luminance, a spiral, a barcode shutter and a vertical push. Ported from
smoothui's shader-reveal-transition.

All eight share a single compiled program. Each branch writes a `mask` (how much
of this pixel is covered) and a `glow` (a bright leading edge), and a shared
`paint` function turns those into premultiplied output — which is why a live
variant control never forces a shader recompile on the frame it changes.

Like the other shader transitions, Vue's slot updates immediately, so the swap
happens behind a cover that opens the sweep fully opaque and clears over the
first fifth of it.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="shader-reveal-transition-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <MShaderRevealTransition
      :transition-key="transitionKey"
      class="overflow-hidden rounded-2xl"
      @rest="rested = true"
    >
      <div
        class="flex h-44 flex-col items-start justify-end gap-1 p-6"
        :class="sent ? 'bg-sky-600 text-white' : 'bg-zinc-900 text-zinc-300'"
      >
        <span class="text-xs font-medium uppercase tracking-widest opacity-70">
          {{ sent ? 'Sent' : 'Compose' }}
        </span>
        <span class="text-xl font-semibold">
          {{ sent ? 'Message delivered' : 'Draft message' }}
        </span>
      </div>
    </MShaderRevealTransition>

    <div class="flex items-center gap-3">
      <UButton
        :label="sent ? 'New draft' : 'Send message'"
        icon="i-lucide-arrow-left-right"
        @click="swap"
      />
      <span class="text-xs text-muted">{{ status }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const sent = ref(false)
const transitionKey = ref(0)
const rested = ref(false)

const status = computed(() => {
  if (transitionKey.value === 0) return 'idle'
  return rested.value ? 'rested' : 'sweeping…'
})

function swap() {
  // The slot updates immediately; the cover that opens the sweep is fully
  // opaque on the first frame, so content and key change on the same tick.
  sent.value = !sent.value
  rested.value = false
  transitionKey.value++
}
</script>
```
::

## Variants

Eight shapes in one branch chain, each with its own colour logic:

| Variant | Shape |
| --- | --- |
| `noise` *(default)* | A chunky, organic gate torn open by a noise threshold |
| `zoom` | A large central lens rather than a sweep |
| `circle` | A noisy iris expanding from the centre |
| `wipe` | A narrow blade with a displaced, noisy edge |
| `luma` | Horizontal ribbons pulled vertically by luminance |
| `planetary` | A spiral vortex of displaced arms |
| `stripes` | A barcode shutter opening under a diagonal sweep |
| `push` | Vertical bands pushed and pulled by directional pressure |

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="shader-reveal-transition-variants" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <MShaderRevealTransition
      :transition-key="transitionKey"
      :variant="variant"
      class="h-44 rounded-2xl"
    >
      <div class="grid h-full place-items-center bg-gradient-to-br from-sky-500 to-blue-950 text-center text-white">
        <div class="space-y-1 px-6">
          <p class="text-xs uppercase tracking-widest text-white/60">
            {{ variant }}
          </p>
          <p class="text-2xl font-semibold">
            Eight reveals, one program
          </p>
        </div>
      </div>
    </MShaderRevealTransition>

    <div class="flex flex-wrap gap-2">
      <UButton
        v-for="name in variants"
        :key="name"
        size="sm"
        :label="name"
        color="neutral"
        :variant="variant === name ? 'solid' : 'outline'"
        @click="select(name)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const variants = [
  'noise',
  'zoom',
  'circle',
  'luma',
  'planetary',
  'push',
  'stripes',
  'wipe'
] as const

type Variant = typeof variants[number]

const variant = ref<Variant>('noise')
const transitionKey = ref(0)

function select(name: Variant) {
  variant.value = name
  transitionKey.value++
}
</script>
```
::

## Props

::field-group
  ::field{name="variant" type="'circle' | 'luma' | 'noise' | 'planetary' | 'push' | 'stripes' | 'wipe' | 'zoom'" default="'noise'"}
  Which reveal to sweep. Written to a `uVariant` uniform — one program serves
  all eight, so switching variant mid-sweep takes effect on the next frame
  without a recompile.
  ::
  ::field{name="duration" type="number" default="1080"}
  Total sweep time in milliseconds, eased with `easeOutQuart`. Clamped up to
  `80` — below that a sweep finishes inside a single frame and reads as a jump
  cut rather than as motion.
  ::
  ::field{name="transitionKey" type="string | number" default="0"}
  Change it to play the transition. Bump it on the same tick as your content
  swap; the cover that opens the sweep is what hides the jump.
  ::
  ::field{name="class" type="string"}
  Merged onto the root, which is `relative isolate overflow-hidden` — the
  overlay and the canvas clip to it.
  ::
::

## Events

::field-group
  ::field{name="rest" type="() => void"}
  Fired once, after the sweep, the closing fade and the content swap have all
  settled. Under `prefers-reduced-motion` it fires immediately, because the
  swap still has to complete even though the sweep does not run.
  ::
::

## Slots

::field-group
  ::field{name="default"}
  The panel's content. Replaced while the cover is opaque.
  ::
::

## Accessibility

The overlay, the cover and the canvas are `aria-hidden="true"`, so the
transition contributes nothing to the accessibility tree beyond your own slot
content — and a content swap should read the same way to a screen reader as it
does on screen. Announce the new state yourself if it is meaningful.

Under `prefers-reduced-motion` the sweep does not run: the content swaps
immediately and `rest` fires synchronously.

## Performance

- One compiled WebGL1 program for all eight variants, selected by a single
  float uniform. A variant picker never triggers a recompile.
- The overlay deliberately stops short of full opacity (it caps at `0.92`), so
  the content underneath stays faintly legible through the densest part of the
  sweep — pushed to `1.0` it would read as a flat panel wiping across rather
  than as a reveal passing over live content.
- The reveal holds at full coverage until three-quarters of the sweep has
  passed, then fades — without that hold, the last thing on screen would be a
  dissolving shape instead of the finished reveal.
- Replaying mid-sweep restarts cleanly: the previous playback is cancelled and
  its frame callback released before the new one begins.
- If the browser refuses a WebGL context, a skewed gradient wipes across the
  panel on the same timing and `rest` still fires — a noise threshold cannot be
  expressed in CSS, but the transition still happens, still takes the requested
  time, and still answers its caller.
