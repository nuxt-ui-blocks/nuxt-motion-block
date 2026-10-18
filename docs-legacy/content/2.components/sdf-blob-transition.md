---
title: SDF Blob Transition
description: A metaball blob that grows over the panel and swaps the content behind its edge.
navigation:
  icon: i-lucide-circle-dot
---

# SDF Blob Transition

A content-swap transition drawn as signed distance fields: a blob grows from a
hairline point until it covers the panel, and the content changes behind its
edge. Shapes blend with `smin`, so two circles fillet into one blob instead of
intersecting in a crease — that blend width is what makes the transition read as
liquid rather than as geometry.

Vue slots have no midpoint, so the slot already holds the new content on the
first frame. The component hides that behind a cover painted from the shader's
own rose/apricot mid-tone: fully opaque on frame one, cleared while the blob's
edge is still wide, deliberately shorter than the shared default so the cover
never reads as a flat colour panel.

## Usage

Change the content and bump `transitionKey` on the same tick.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="sdf-blob-transition-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <MSdfBlobTransition
      :transition-key="transitionKey"
      class="overflow-hidden rounded-2xl"
      @rest="rested = true"
    >
      <div
        class="flex h-44 flex-col items-center justify-center gap-1 text-center"
        :class="queued ? 'bg-rose-600 text-white' : 'bg-zinc-900 text-zinc-300'"
      >
        <span class="text-xs font-medium uppercase tracking-widest opacity-70">
          {{ queued ? 'Export queued' : 'No exports' }}
        </span>
        <span class="text-xl font-semibold">
          {{ queued ? '3 renders in the queue' : 'Queue is empty' }}
        </span>
      </div>
    </MSdfBlobTransition>

    <div class="flex items-center gap-3">
      <UButton
        :label="queued ? 'Clear queue' : 'Queue renders'"
        icon="i-lucide-arrow-left-right"
        @click="swap"
      />
      <span class="text-xs text-muted">{{ status }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const queued = ref(false)
const transitionKey = ref(0)
const rested = ref(false)

const status = computed(() => {
  if (transitionKey.value === 0) return 'idle'
  return rested.value ? 'rested' : 'sweeping…'
})

function swap() {
  // The slot updates immediately; the cover that opens the sweep is fully
  // opaque on the first frame, so content and key change on the same tick.
  queued.value = !queued.value
  rested.value = false
  transitionKey.value++
}
</script>
```
::

## Variants

Five blobs in one branch chain:

| Variant | Shape |
| --- | --- |
| `final` *(default)* | Every field blended together — the largest, busiest blob |
| `circle` | A single noisy disc expanding from the centre |
| `warped` | A disc whose radius is displaced by ring noise |
| `radial` | Two rings of lobes, three and five, merged into a rosette |
| `merge` | Two lobes blended into one figure-eight blob |

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="sdf-blob-transition-variants" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <MSdfBlobTransition
      :transition-key="transitionKey"
      :variant="variant"
      class="h-44 rounded-2xl"
    >
      <div class="grid h-full place-items-center bg-gradient-to-br from-rose-500 to-pink-950 text-center text-white">
        <div class="space-y-1 px-6">
          <p class="text-xs uppercase tracking-widest text-white/60">
            {{ variant }}
          </p>
          <p class="text-2xl font-semibold">
            Signed distance blobs
          </p>
        </div>
      </div>
    </MSdfBlobTransition>

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
const variants = ['circle', 'final', 'merge', 'radial', 'warped'] as const

type Variant = typeof variants[number]

const variant = ref<Variant>('final')
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
  ::field{name="variant" type="'circle' | 'final' | 'merge' | 'radial' | 'warped'" default="'final'"}
  Which blob to grow. Written to a `uVariant` uniform — one program serves all
  five, so switching variant mid-sweep takes effect on the next frame without a
  recompile.
  ::
  ::field{name="duration" type="number" default="1120"}
  Total sweep time in milliseconds, eased with `easeOutQuart`. Clamped up to
  `80` — below that a sweep finishes inside a single frame and reads as a jump
  cut rather than as motion.
  ::
  ::field{name="transitionKey" type="string | number" default="0"}
  Change it to play the transition. Bump it on the same tick as your content
  swap; the cover that opens the sweep is what hides the jump.
  ::
  ::field{name="class" type="string"}
  Merged onto the root, which is `relative isolate overflow-hidden` — the blob,
  the cover and the canvas all clip to it.
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

The blob, the cover and the canvas are `aria-hidden="true"` — the transition
contributes nothing to the accessibility tree beyond your own slot content.
Announce a content swap yourself if the new state is meaningful.

Under `prefers-reduced-motion` the sweep does not run: the content swaps
immediately and `rest` fires synchronously.

## Performance

- One compiled WebGL1 program for all five variants, selected by a single float
  uniform. A variant picker never triggers a recompile.
- The overlay caps at `0.9` alpha: anything approaching opaque would hide the
  swap entirely, and the visitor would see a solid panel clear rather than a
  sweep pass over changing content.
- The blob holds at full size for the last quarter of the sweep before it
  fades — without the hold, the last thing on screen would be a shrinking edge
  rather than the finished shape.
- The blob starts as a hairline point, so the fill fades in over the first 18%
  of the sweep; without that the first frame would be invisible and the sweep
  would appear to start from nothing.
- Replaying mid-sweep restarts cleanly: the previous playback is cancelled and
  its frame callback released before the new one begins.
- If the browser refuses a WebGL context, a radial gradient scales and fades on
  the same timing and `rest` still fires — the edge cannot be reproduced in
  CSS, but the timing and the answer are preserved.

::tip
The cover clears at 16% of the sweep — shorter than the shared 22% — because a
longer cover shows as a flat colour panel rather than as the edge of a blob.
::
