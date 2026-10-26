---
title: Aurora Curtain
description: A WebGL aurora of folding light ribbons with film grain, drifting behind any content.
---

An aurora curtain paints a handful of light ribbons behind whatever you put
inside it. Each ribbon follows its own three-octave meander, pinches towards
both ends and breathes on a slow swell, so the field folds along its length
instead of sliding across as a rigid bar. A second, much wider halo wraps every
core, which is what turns a line into light.

The whole thing is one fullscreen fragment shader on a single canvas. It draws
only while the wrapper is on screen and the document is visible, and it holds a
still frame when the reader prefers reduced motion.

## Usage

Wrap the content that should sit above the curtain. The component is positioned
and clips its own overflow, so give it a size — usually through the content's
height or a `class`.

::code-preview
---
label: Preview
---

  :::div{class="w-full"}
    <component-example name="aurora-curtain-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full justify-center">
    <MAuroraCurtain class="w-full rounded-2xl border border-default">
      <div class="flex min-h-[340px] flex-col items-center justify-center gap-3 px-6 py-16 text-center">
        <p class="text-[11px] font-medium tracking-[0.28em] text-muted uppercase">
          Northern lights
        </p>
        <h3 class="max-w-md text-2xl font-semibold text-balance text-highlighted">
          Colour that drifts like weather
        </h3>
        <p class="max-w-sm text-sm text-balance text-muted">
          Three ribbons fold, pinch and breathe over a layer of film grain, all
          inside one canvas that stops as soon as it leaves the screen.
        </p>
      </div>
    </MAuroraCurtain>
  </div>
</template>
```
::

The default palette is the theme's primary, info and secondary colours, probed
from the surrounding page, so the curtain follows a customised Nuxt UI theme
without any extra configuration.

## Customize

`bands` sets how many ribbons are drawn, `blur` widens and softens each one, and
`intensity` scales the whole field. `direction="down"` flips the falloff so the
light hangs from the top edge instead of rising from the bottom.

`noise` adds film grain across the entire surface — not only where there is
light — and `true` is shorthand for `0.6`. `speed` scales the drift, and
`paused` freezes the current frame without unmounting the canvas.

`colors` takes any CSS colour, a `var(--token)` reference, or a bare custom
property name such as `--color-brand`. Colours are resolved against the active
theme once per palette change, then handed to the shader as sRGB.

::code-preview
---
label: Preview
---

  :::div{class="w-full"}
    <component-example name="aurora-curtain-custom" />
  :::
#code
```vue
<template>
  <div class="flex w-full flex-col items-center gap-4">
    <MAuroraCurtain
      :bands="2"
      :blur="0.85"
      :colors="colors"
      :intensity="0.9"
      :noise="0.45"
      :paused="paused"
      :speed="0.6"
      direction="down"
      class="w-full rounded-2xl border border-default"
    >
      <div class="flex min-h-[340px] flex-col items-center justify-center gap-4 px-6 py-16 text-center">
        <span
          class="rounded-full border border-default bg-default/60 px-3 py-1 text-xs font-medium text-muted backdrop-blur-sm"
        >
          {{ paused ? 'Paused' : 'Live' }}
        </span>
        <h3 class="max-w-sm text-2xl font-semibold text-balance text-highlighted">
          Two ribbons, heavier grain
        </h3>
        <p class="max-w-sm text-sm text-balance text-muted">
          Light falls from the top edge, the blur softens every ribbon and the
          grain moves even where there is no light.
        </p>
        <UButton
          :label="paused ? 'Resume' : 'Pause'"
          :icon="paused ? 'i-lucide-play' : 'i-lucide-pause'"
          color="neutral"
          variant="outline"
          size="sm"
          @click="paused = !paused"
        />
      </div>
    </MAuroraCurtain>

    <p class="text-xs text-muted">
      The gradient underneath is a CSS fallback for browsers without WebGL2.
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const paused = ref(false)
const colors = ['var(--ui-info)', 'var(--ui-primary)']
</script>
```
::

## Props

::component-props
  ::component-prop{name="bands" type="number" default="4"}
  Number of ribbons, clamped to 1-8.
  ::
  ::component-prop{name="blur" type="number" default="0.5"}
  Softness of every ribbon edge, from 0 (crisp) to 1 (very diffuse).
  ::
  ::component-prop{name="colors" type="string[]" default="theme primary, info, secondary"}
  Ribbon colours, cycled across the bands. Accepts a CSS colour, a
  `var(--token)` or a bare `--token`.
  ::
  ::component-prop{name="direction" type="'up' | 'down'" default="'up'"}
  Direction the light flows towards.
  ::
  ::component-prop{name="intensity" type="number" default="1"}
  Overall brightness multiplier, from 0 to 1.
  ::
  ::component-prop{name="noise" type="number | boolean" default="0"}
  Film-grain strength from 0 to 1. `true` is shorthand for `0.6`.
  ::
  ::component-prop{name="paused" type="boolean" default="false"}
  Freezes the animation on the current frame.
  ::
  ::component-prop{name="speed" type="number" default="1"}
  Drift speed multiplier.
  ::
  ::component-prop{name="class" type="string"}
  Extra classes for the positioned wrapper.
  ::
::

## Slots

::component-props
  ::component-prop{name="default" type="slot"}
  Foreground content, painted above the curtain on its own layer.
  ::
::

## Accessibility

- Every decorative layer — the canvas and the CSS gradient under it — is
  `aria-hidden` and `pointer-events-none`, so the curtain contributes no content
  and never intercepts a click meant for the page behind it.
- Nothing is conveyed by the animation alone: the aurora is atmosphere, and the
  slot carries all of the real content at full contrast on its own layer.
- A `prefers-reduced-motion` preference stops the loop and paints a single
  frame. The result is a still aurora rather than a blank box, and the change is
  driven by the media query instead of a duration-zero transition.
- The animation also stops when the wrapper scrolls out of view or the document
  is hidden, which keeps a background surface from burning a core behind a tab
  nobody is looking at.

## Performance

- The surface is a single WebGL2 canvas with one draw call per frame. The
  ribbons are a loop inside the fragment shader, not separate layers, so the
  band count changes cost rather than structure.
- The drawing buffer is capped at 2x device pixel ratio. Beyond that the fill
  cost doubles for no visible gain, and the grain cell is measured in CSS pixels
  so the texture stays the same size on a retina display.
- Theme colours are resolved once per palette change and uploaded as a uniform
  array. Nothing reads computed styles or touches the DOM inside the render
  loop.
- Pausing, scrolling away and hiding the tab all cancel the animation frame, and
  the accumulated clock only advances while the loop is running, so resuming
  continues the drift instead of jumping ahead by the paused interval.
- Browsers without WebGL2 keep a static CSS gradient built from the same
  colours, so the component degrades to a still wash rather than an empty
  rectangle.
