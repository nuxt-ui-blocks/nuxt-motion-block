---
title: Prism Sweep Transition
description: A prismatic light band that sweeps across a panel and swaps the content behind it.
navigation:
  icon: i-lucide-move-right
---

# Prism Sweep Transition

A transition that pushes a prismatic band across a panel. The band enters from
one edge, travels to the other with a long ease-out, and the panel's content
changes behind it while an opaque cover hides the swap.

Vue slots have no midpoint: the slot always holds whatever the parent last
rendered, so the old content cannot be held back until the band has crossed.
The component answers that with a cover — fully opaque on the first frame of the
sweep, cleared over the opening stretch, so the swap happens behind a solid
surface instead of in front of the reader.

## Usage

Change the content and bump `transitionKey` on the same tick. The cover opens
the sweep opaque, which is what hides the jump.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="prism-sweep-transition-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <MPrismSweepTransition
      :transition-key="transitionKey"
      class="overflow-hidden rounded-2xl"
      @rest="rested = true"
    >
      <div
        class="flex h-44 flex-col items-end justify-end gap-1 p-6"
        :class="published ? 'bg-emerald-600 text-white' : 'bg-zinc-800 text-zinc-300'"
      >
        <span class="text-xs font-medium uppercase tracking-widest opacity-70">
          {{ published ? 'Live' : 'Draft' }}
        </span>
        <span class="text-xl font-semibold">
          {{ published ? 'Published to production' : 'Waiting for review' }}
        </span>
      </div>
    </MPrismSweepTransition>

    <div class="flex items-center gap-3">
      <UButton
        :label="published ? 'Revert to draft' : 'Publish'"
        icon="i-lucide-arrow-left-right"
        @click="swap"
      />
      <span class="text-xs text-muted">{{ status }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const published = ref(false)
const transitionKey = ref(0)
const rested = ref(false)

const status = computed(() => {
  if (transitionKey.value === 0) return 'idle'
  return rested.value ? 'rested' : 'sweeping…'
})

function swap() {
  // The slot updates immediately; the cover that opens the sweep is fully
  // opaque on the first frame, so content and key change on the same tick.
  published.value = !published.value
  rested.value = false
  transitionKey.value++
}
</script>
```
::

## Directions and tones

`direction` picks the edge the band enters from, `tone` picks the palette and
the shape of the band itself. Both are uniforms, so changing either during a
sweep takes effect on the next frame — no shader recompile, no restart.

| Direction | Enters from | Travels |
| --- | --- | --- |
| `left` *(default)* | Left edge | → right |
| `right` | Right edge | ← left |
| `up` | Bottom edge | ↑ upward |
| `down` | Top edge | ↓ downward |

| Tone | Character |
| --- | --- |
| `prism` *(default)* | Magenta leading into cyan, a wandering full-spectrum ribbon |
| `aperture` | Warm amber and cream, the widest and softest of the four |
| `beam` | A narrow gold beam, barely bends, the strongest bloom |
| `chroma` | Pink leading into teal, bends the most of any tone |

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="prism-sweep-transition-controls" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <MPrismSweepTransition
      :direction="direction"
      :tone="tone"
      :transition-key="transitionKey"
      class="h-44 rounded-2xl"
    >
      <div class="grid h-full place-items-center bg-gradient-to-br from-slate-900 to-indigo-950 text-center text-white">
        <div class="space-y-1">
          <p class="text-xs uppercase tracking-widest text-white/50">
            {{ direction }} · {{ tone }}
          </p>
          <p class="text-2xl font-semibold">
            Prism sweep
          </p>
        </div>
      </div>
    </MPrismSweepTransition>

    <div class="grid grid-cols-2 gap-3">
      <USelect
        v-model="direction"
        :items="directions"
      />
      <USelect
        v-model="tone"
        :items="tones"
      />
    </div>

    <UButton
      label="Replay"
      icon="i-lucide-rotate-ccw"
      variant="outline"
      @click="transitionKey++"
    />
  </div>
</template>

<script setup lang="ts">
const direction = ref('left')
const tone = ref('prism')
const transitionKey = ref(0)

const directions = ['left', 'right', 'up', 'down']
const tones = ['aperture', 'beam', 'chroma', 'prism']
</script>
```
::

## Props

::field-group
  ::field{name="direction" type="'left' | 'right' | 'up' | 'down'" default="'left'"}
  Which edge the band enters from. Written to a uniform, so it can change
  mid-sweep without restarting the transition.
  ::
  ::field{name="tone" type="'aperture' | 'beam' | 'chroma' | 'prism'" default="'prism'"}
  Palette and field behaviour of the band: its colours, half-width, edge
  softness, bend and bloom are all read from this one value — including the
  leading cover and the CSS fallback, which are painted from the same palette so
  they read as one effect rather than two.
  ::
  ::field{name="duration" type="number" default="1240"}
  Total sweep time in milliseconds, eased with the source's own travel curve (a
  cubic ease-out with a longer tail than the shared `easeOutQuart`). Clamped up
  to `80` — below that a sweep finishes inside a single frame and reads as a
  jump cut rather than as motion.
  ::
  ::field{name="transitionKey" type="string | number" default="0"}
  Change it to play the transition. Bump it on the same tick as your content
  swap; the cover that opens the sweep is what hides the jump.
  ::
  ::field{name="class" type="string"}
  Merged onto the root, which is `relative isolate overflow-hidden` — the band,
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

The band, the cover and the canvas are all `aria-hidden="true"` — the
transition contributes nothing to the accessibility tree beyond your own slot
content. A content swap the eye reads as one panel changing should read the same
way to a screen reader: announce the new state yourself if it is meaningful.

Under `prefers-reduced-motion` the sweep does not run at all. The content swaps
immediately and `rest` fires synchronously, so a caller awaiting the event still
gets its answer.

## Performance

- One compiled WebGL1 program for every direction and tone. Variants are
  uniforms, so a live direction or tone control never forces a recompile.
- The sweep, the cover opacity and the closing fade all derive from a single
  eased progress value, so the cover always tracks the band in front of it
  whatever the duration.
- Replaying mid-sweep restarts cleanly: the previous playback is cancelled and
  its frame callback released before the new one begins.
- If the browser refuses a WebGL context, a CSS gradient band still sweeps the
  panel on the same timing and `rest` still fires — the shape is coarser, the
  contract is not.

::tip
The travel curve is the effect's character: it accelerates the band off the far
edge, which is why `duration` feels shorter than it measures. Replacing it with
a linear ramp makes the same geometry read as a wipe.
::
