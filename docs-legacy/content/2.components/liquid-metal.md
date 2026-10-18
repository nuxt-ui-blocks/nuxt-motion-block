---
title: Liquid Metal
description: A WebGL2 surface that flows like metal — chrome, gold, mercury or iridescent oil.
navigation:
  icon: i-lucide-droplet
---

# Liquid Metal

An ambient surface rather than a transition: a domain-warped fBm height field
read as a normal, lit by a single key light with a Fresnel rim. Ported from
smoothui's liquid-metal.

Every variant is the same shader with a different (low, high, tint) triple, so
switching `variant` is a uniform write — never a recompile. The field flows
continuously, eases toward the pointer, and can also be masked into text, where
a gradient travels along the glyphs instead.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="liquid-metal-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-md flex-col gap-3">
    <MLiquidMetal class="h-48">
      <div class="grid h-full place-items-center">
        <span class="text-5xl font-extrabold tracking-tighter text-white">
          LIQUID
        </span>
      </div>
    </MLiquidMetal>
    <p class="text-xs text-muted">
      Chrome flow · move the pointer over the surface to push the field around
    </p>
  </div>
</template>
```
::

## Variants, masking and distortion

Four palettes — `chrome` *(default)*, `gold`, `mercury` and `oil` (the oil
sheen is an iridescent mix the other three do not have). With `mask-text`, the
component renders its slot as `background-clip: text` over a linear gradient
that sweeps the glyphs on a nine-second loop, shifted by the pointer — a
conic gradient would read as a rotating disc behind the text rather than as
light travelling across it.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="liquid-metal-variants" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <div
      v-if="!maskText"
      class="h-48"
    >
      <MLiquidMetal
        :distortion="distortion"
        :variant="variant"
        class="h-full"
      >
        <div class="grid h-full place-items-center">
          <span class="text-5xl font-extrabold tracking-tighter text-white">
            METAL
          </span>
        </div>
      </MLiquidMetal>
    </div>
    <div
      v-else
      class="grid h-48 place-items-center rounded-2xl bg-(--ui-bg-muted)"
    >
      <MLiquidMetal
        :distortion="distortion"
        mask-text
        :variant="variant"
        class="text-5xl font-extrabold tracking-tighter"
      >
        METAL
      </MLiquidMetal>
    </div>

    <div class="flex flex-wrap items-center gap-2">
      <UButton
        v-for="name in variants"
        :key="name"
        size="sm"
        :label="name"
        color="neutral"
        :variant="variant === name ? 'solid' : 'outline'"
        @click="variant = name"
      />
    </div>

    <div class="flex items-center justify-between gap-4">
      <UButton
        size="sm"
        :label="maskText ? 'Box mode' : 'Mask text'"
        icon="i-lucide-type"
        variant="outline"
        @click="maskText = !maskText"
      />
      <label class="flex flex-1 items-center gap-3 text-xs text-muted">
        <span class="w-16">distortion</span>
        <USlider
          v-model="distortion"
          :min="0"
          :max="3"
          :step="0.1"
          class="flex-1"
        />
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
const variants = ['chrome', 'gold', 'mercury', 'oil'] as const

type Variant = typeof variants[number]

const variant = ref<Variant>('chrome')
const maskText = ref(false)
const distortion = ref(1)
</script>
```
::

## Props

::field-group
  ::field{name="variant" type="'chrome' | 'gold' | 'mercury' | 'oil'" default="'chrome'"}
  Which palette the shader mixes between. A uniform write — one program serves
  all four, so a live variant control never forces a recompile.
  ::
  ::field{name="distortion" type="number" default="1"}
  Strength of the domain warp, clamped to `0..3`. The upper bound is where the
  warp field folds onto itself: past it the normals stop varying smoothly and
  the surface tears into visible seams.
  ::
  ::field{name="speed" type="number" default="1"}
  Multiplier on the flow clock. `0` freezes the field where it stands; values
  above `1` accelerate it. Frame deltas are capped, so a backgrounded tab
  resumes from where it paused instead of jumping forward.
  ::
  ::field{name="paused" type="boolean" default="false"}
  Stops the clock without tearing down the context. Resuming clears the
  accumulated gap, so the surface continues from the frame it paused on.
  ::
  ::field{name="pointerInfluence" type="boolean" default="true"}
  When enabled the field eases toward the pointer (about `0.08` per frame —
  weighted, but still tracking) and pushes the warp in front of it.
  ::
  ::field{name="maskText" type="boolean" default="false"}
  Renders the slot as masked text instead of layering it over the canvas: the
  glyphs become the surface, filled by a sweeping gradient along their own
  axis. The slot content must then be plain text.
  ::
  ::field{name="class" type="string"}
  Merged onto the root. In box mode the canvas sits at `z-0` and the slot at
  `z-10`; with `mask-text` it styles the text itself.
  ::
::

## Events

None — the surface is ambient. There is no `rest` to wait for.

## Slots

::field-group
  ::field{name="default"}
  Box mode: content layered over the flow. `mask-text`: the glyphs to fill.
  ::
::

## Accessibility

The canvas is `aria-hidden="true"` and contributes nothing to the
accessibility tree; masked text stays real text in the DOM, so it is still
read and selected normally despite its transparent fill.

Under `prefers-reduced-motion` the flow does not run: the component paints the
static CSS stand-in for the current variant — a conic sweep for box mode (the
closest CSS primitive to a reflection off a curved surface; a linear gradient
reads as a flat banner, not as metal) and a linear sweep for text.

## Performance

- One compiled WebGL2 program for all four variants; `variant`, `distortion`
  and pointer are uniforms.
- The clock caps frame deltas at `1/20`s, so returning to a backgrounded tab
  does not advance the flow by however long the tab was hidden.
- The clock also stops while the element is scrolled out of view, while
  `paused`, and under reduced motion — each path resumes from the same frame
  rather than from a jump.
- The shader requires WebGL2 (`#version 300 es`). On a WebGL1-only context it
  will not compile, and the component takes its static fallback instead — the
  correct outcome, not an error to surface.

::tip
Distortion past `2.5` is where most displays start showing the fold seams. The
range goes to `3` so you can see the boundary yourself — stay at or below `2`
for a surface that reads as liquid rather than as crumpled foil.
::
