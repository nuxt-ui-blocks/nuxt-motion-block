---
title: Depth layers
description: Scroll-driven multi-depth parallax with optional pointer tracking.
navigation:
  icon: i-lucide-layers
---

# Depth layers

`ParallaxLayers` renders a stack of absolutely-positioned layers that drift at
different rates as the scene scrolls through the viewport, and optionally lean
with the pointer. Each layer declares a `depth`, and its travel is derived from
that depth — so a rig is described entirely as data, and the content of each
layer comes from a slot.

Scroll progress is smoothed with a physical spring, so a fast flick or a
trackpad fling settles rather than snapping to the end position.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="parallax-layers-basic" />
  :::
#code
```vue
<template>
  <MParallaxLayers class="h-64 rounded-xl border border-default" :layers="layers">
    <template #layer="{ layer }">
      <div
        v-if="layer.id === 'sky'"
        class="grid h-full place-items-center bg-gradient-to-b from-#1e293b to-#0f172a"
      >
        <span class="text-3xl font-bold text-white">Sky · depth 0</span>
      </div>
      <div
        v-else-if="layer.id === 'hills'"
        class="grid h-full place-items-center bg-#1e40af/70"
      >
        <span class="text-2xl font-bold text-white">Hills · depth 0.5</span>
      </div>
      <div
        v-else
        class="grid h-full place-items-center bg-#0ea5e9/80"
      >
        <span class="text-xl font-bold text-white">Foreground · depth 1</span>
      </div>
    </template>
  </MParallaxLayers>
</template>

<script setup lang="ts">
const layers = [
  { id: 'sky', depth: 0 },
  { id: 'hills', depth: 0.5 },
  { id: 'foreground', depth: 1 },
]
</script>
```
::

## Sizing

Every layer is absolutely positioned, so the root has **no in-flow children** to
give it height. A `min-h-64` floor is applied so the scene cannot collapse, and
`overflow-hidden` keeps layers from bleeding outside the box. Pass a `class` with
your own `h-*` or `min-h-*` to size the rig properly — yours wins.

## Props

::field-group
  ::field{name="layers" type="ParallaxLayerConfig[]"}
  The layer stack, in back-to-front paint order. Each entry is `{ id, depth }` plus optional `blur` and `opacity`. A `depth` of `0` stays fixed.
  ::

  ::field{name="direction" type="'vertical' | 'horizontal' | 'both'" default="'vertical'"}
  Which axes scroll travel is applied to. Pointer tracking is applied to the
  axis *not* selected here, so a `vertical` rig still leans with the pointer
  without gaining horizontal scroll drift.
  ::

  ::field{name="range" type="number" default="80"}
  Peak travel in pixels at `depth` `1`, before the pointer contribution. Both
  directions scale this by `range * depth`, so a depth of `2` at the default
  range travels 160px.
  ::

  ::field{name="pointerParallax" type="boolean" default="false"}
  Add pointer-driven travel. Gated behind a
  `(hover: hover) and (pointer: fine)` media query, so touch devices never
  attach the listener.
  ::

  ::field{name="container" type="HTMLElement | Ref<HTMLElement | null>"}
  Drive scroll off this element instead of the window. Use it when the rig
  sits inside a scrollable panel rather than the document.
  ::

  ::field{name="class" type="string" default="''"}
  Classes for the bounding box. See [Sizing](#sizing).
  ::
::

## Slots

::field-group
  ::field{name="layer"="{ layer, index }"}
  Content for one layer, scoped with its `layer` config and its `index`. Since
  every layer shares the same geometry, branch on `layer.id` (or `index`) to
  decide what each one renders.
  ::
::

## Examples

### Pointer parallax

Setting `direction="both"` lets scroll *and* pointer drive the same axes. The
pointer contribution is capped at 20px and is independent of `range`, so it
reads as a lean rather than a second scroll axis.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="parallax-layers-pointer" />
  :::
#code
```vue
<template>
  <MParallaxLayers
    class="h-64 rounded-xl border border-default"
    direction="both"
    pointer-parallax
    :layers="layers"
  >
    <template #layer="{ layer }">
      <div
        v-if="layer.id === 'back'"
        class="grid h-full place-items-center bg-gradient-to-br from-#312e81 to-#0f172a"
      >
        <span class="text-sm font-semibold text-white/80">back · depth 0.2</span>
      </div>
      <div
        v-else-if="layer.id === 'mid'"
        class="grid h-full place-items-center bg-#7c3aed/60"
      >
        <span class="text-sm font-semibold text-white/90">mid · depth 0.6</span>
      </div>
      <div
        v-else
        class="grid h-full place-items-center bg-#f472b6/70"
      >
        <span class="text-sm font-semibold text-white">front · depth 1</span>
      </div>
    </template>
  </MParallaxLayers>
</template>

<script setup lang="ts">
const layers = [
  { id: 'back', depth: 0.2 },
  { id: 'mid', depth: 0.6 },
  { id: 'front', depth: 1 },
]
</script>
```
::

### Depth with blur and opacity

`blur` and `opacity` are plain CSS values applied to each layer's own element —
not motion values — so they cost nothing per frame. Combined with a wider
`range`, a small depth spread is enough to read as real separation.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="parallax-layers-depth" />
  :::
#code
```vue
<template>
  <MParallaxLayers
    class="h-72 rounded-xl border border-default"
    :layers="layers"
    :range="140"
  >
    <template #layer="{ layer }">
      <div
        v-if="layer.id === 'far'"
        class="grid h-full place-items-center bg-#334155"
      >
        <span class="text-sm font-semibold text-white/70">
          far · depth 0.3 · blur 6px · opacity 0.5
        </span>
      </div>
      <div
        v-else-if="layer.id === 'mid'"
        class="grid h-full place-items-center bg-#0d9488/70"
      >
        <span class="text-sm font-semibold text-white/90">
          mid · depth 0.7 · blur 2px
        </span>
      </div>
      <div
        v-else
        class="grid h-full place-items-center bg-#f59e0b/80"
      >
        <span class="text-sm font-semibold text-white">near · depth 1.4</span>
      </div>
    </template>
  </MParallaxLayers>
</template>

<script setup lang="ts">
const layers = [
  { id: 'far', depth: 0.3, blur: 6, opacity: 0.5 },
  { id: 'mid', depth: 0.7, blur: 2 },
  { id: 'near', depth: 1.4 },
]
</script>
```
::

### Horizontal parallax

With `direction="horizontal"` the scroll axis is X, and the pointer drives Y.
Layers can be narrower than the rig so the parallax is visible against the
edges.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="parallax-layers-direction" />
  :::
#code
```vue
<template>
  <MParallaxLayers
    class="h-64 rounded-xl border border-default"
    direction="horizontal"
    :layers="layers"
  >
    <template #layer="{ layer }">
      <div
        v-if="layer.id === 'left'"
        class="grid h-full w-1/2 place-items-center bg-gradient-to-r from-#dc2626 to-#7f1d1d"
      >
        <span class="text-sm font-semibold text-white">left panel</span>
      </div>
      <div
        v-else
        class="grid h-full w-1/2 place-items-center bg-gradient-to-r from-#1d4ed8 to-#172554"
      >
        <span class="text-sm font-semibold text-white">right panel</span>
      </div>
    </template>
  </MParallaxLayers>
</template>

<script setup lang="ts">
const layers = [
  { id: 'left', depth: 0.8 },
  { id: 'right', depth: 1.2 },
]
</script>
```
::

## Accessibility

Respects `prefers-reduced-motion`. When the user has asked for reduced motion,
both scroll and pointer travel are pinned to `0` — layers stay in place but the
scene keeps its full opacity and layout, rather than collapsing to a single
point.

The scroll window is deliberately narrow: progress is tracked from
`start 0.95` to `end 0.6`, so travel is concentrated on the stretch where the
scene is actually on screen. Over a full enter-to-exit range most of the
separation would be spent off-view.

## Notes

Layer configs are plain structural types, so a literal array is enough — import
`ParallaxLayerConfig` only if you want the compiler to check the shape.

Scroll progress is read through `useScroll`, which in `motion-v` 2 attempts a
native CSS `ViewTimeline` first and falls back to JS scroll tracking when the
offset pattern isn't recognised.
