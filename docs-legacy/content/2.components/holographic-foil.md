---
title: Holographic Foil
description: A card that tilts toward the pointer under a banded holographic foil, with a looping sheen and a device-tilt mode.
navigation:
  icon: i-lucide-sparkles
---

# Holographic Foil

A card that leans toward the pointer while a banded foil, a drifting specular
blob and a looping sheen move across it. The foil is a real gradient stack
blended with `mix-blend-mode`, not a texture: it is masked to a diagonal band so
it *travels* over the surface rather than tinting the whole card.

Useful wherever a surface should look physical — a product tile, a collectible
card, a pricing panel, a badge that rewards being hovered.

## Usage

The card owns its own dark background, border and corner radius. Give it a
height; everything inside is yours.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="holographic-foil-basic" />
  :::
#code
```vue
<template>
  <MHolographicFoil class="h-72 w-full max-w-sm">
    <div class="flex h-full flex-col justify-end gap-1 p-6">
      <p class="text-xs font-medium uppercase tracking-widest text-white/50">
        Series 04
      </p>
      <p class="text-2xl font-semibold text-white">
        Holographic Foil
      </p>
      <p class="text-sm text-white/60">
        Move the pointer across the card.
      </p>
    </div>
  </MHolographicFoil>
</template>
```
::

:::tip
The card paints itself `oklch(0.17 0.015 274)`, so content is expected to be
light. If you need a light card, override the background through `class` and
raise `glare` a little — the foil and sheen are `soft-light`/`screen` blends and
lose most of their range on white.
:::

## Materials

`pattern` picks one of four gradients. Each is a `repeating-linear-gradient` of
hue bands **with gaps**, laid over a low-alpha wash: a uniform wash reads as a
tinted rectangle rather than a foil, and without the base layer the card goes
black between the bands.

| Pattern | Character | Hue swing | Saturation |
| --- | --- | --- | --- |
| `prism` *(default)* | Cyan, violet, magenta, capped with one gold band | ±34° | 1.1 |
| `gold` | Gold through amber into magenta | ±24° | 1 |
| `aurora` | Blue through violet into cyan | ±20° | 1 |
| `oil` | Wide spread at very low chroma — an oil film | ±30° | 0.7 |

The hue swing is the peak `hue-rotate` at the extremes of pointer travel, and
saturation is a multiplier on the derived filter, which is why `oil` stays
muted while `prism` is the most aggressive of the four.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="holographic-foil-materials" />
  :::
#code
```vue
<template>
  <div class="grid w-full max-w-2xl gap-4 sm:grid-cols-2">
    <MHolographicFoil
      v-for="material in materials"
      :key="material"
      class="h-40"
      :pattern="material"
    >
      <div class="flex h-full items-end p-4">
        <span class="text-sm font-semibold capitalize text-white/90">
          {{ material }}
        </span>
      </div>
    </MHolographicFoil>
  </div>
</template>

<script setup lang="ts">
const materials = ['prism', 'gold', 'aurora', 'oil'] as const
</script>
```
::

Switching `pattern` at runtime takes effect immediately — it does not wait for
the pointer to move again.

## Blend order

`foilOver` is the decision that matters most. The sheet is placed **before** or
**after** your content in the DOM, never lifted with `z-index`:

```vue
<!-- under: the foil blends with the card background -->
<MHolographicFoil class="h-64">
  <p class="p-6 text-white">Behind the light</p>
</MHolographicFoil>

<!-- over: the artwork itself catches the light -->
<MHolographicFoil class="h-64" foil-over>
  <div class="h-full bg-gradient-to-br from-#4c1d95 to-#0ea5e9 p-6">
    <p class="text-white">Caught by the light</p>
  </div>
</MHolographicFoil>
```

This is not cosmetic. A `z-index` would make the foil a stacking context of its
own, and `mix-blend-mode` would then apply to *that context* instead of to the
artwork underneath — which is the difference between "the artwork catches the
light" and "a text scrim stays stubbornly opaque".

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="holographic-foil-over" />
  :::
#code
```vue
<template>
  <MHolographicFoil class="h-64 w-full max-w-sm" pattern="aurora" foil-over>
    <div class="flex h-full flex-col justify-center gap-2 bg-gradient-to-br from-#4c1d95 via-#7c3aed to-#0ea5e9 p-6">
      <p class="text-xl font-semibold text-white">
        Foil over content
      </p>
      <p class="text-sm text-white/80">
        The sheet is blended after the artwork, so the gradient itself catches
        the light instead of sitting behind it.
      </p>
    </div>
  </MHolographicFoil>
</template>
```
::

## Tuning

`intensity` and `glare` control different parts of the effect and are not two
handles on the same knob:

- **`intensity`** is the foil: its opacity, and the `saturate`/`contrast` on the
  filter. At `0` the sheet drops to a 0.05 floor rather than disappearing, so the
  card never goes flat-black.
- **`glare`** is the light: the drifting white blob **and** the sheen band, both
  scaled from it. This is deliberate — a surface with a moving reflection and
  none of the foil reads as plastic.

`sheenSpeed` multiplies the sweep rate of a six-second loop.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="holographic-foil-intensity" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-sm flex-col gap-4">
    <MHolographicFoil
      class="h-48"
      :intensity="intensity"
      :glare="glare"
      :sheen-speed="sheenSpeed"
    >
      <div class="flex h-full items-center justify-center p-6">
        <span class="text-sm font-semibold text-white/80">
          intensity {{ intensity.toFixed(2) }}
        </span>
      </div>
    </MHolographicFoil>

    <div class="flex flex-col gap-3">
      <label class="flex items-center gap-3 text-xs text-muted">
        <span class="w-16">intensity</span>
        <USlider v-model="intensity" :min="0" :max="1" :step="0.05" class="flex-1" />
      </label>
      <label class="flex items-center gap-3 text-xs text-muted">
        <span class="w-16">glare</span>
        <USlider v-model="glare" :min="0" :max="1" :step="0.05" class="flex-1" />
      </label>
      <label class="flex items-center gap-3 text-xs text-muted">
        <span class="w-16">sheen</span>
        <USlider v-model="sheenSpeed" :min="0.2" :max="3" :step="0.1" class="flex-1" />
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
const intensity = ref(0.6)
const glare = ref(0.5)
const sheenSpeed = ref(1)
</script>
```
::

## Props

::field-group
  ::field{name="pattern" type="'aurora' | 'gold' | 'oil' | 'prism'" default="'prism'"}
  Which foil material to paint. Takes effect immediately when changed;
  see [Materials](#materials).
  ::

  ::field{name="intensity" type="number" default="0.6"}
  Strength of the foil, the sheen and the glare together, `0..1`. Clamped.
  ::

  ::field{name="glare" type="number" default="0.5"}
  Strength of the white specular blob, `0..1`. Clamped. Scales the sheen band
  as well as the blob; see [Tuning](#tuning).
  ::

  ::field{name="foilOver" type="boolean" default="false"}
  Blend the foil over the content instead of under it. Decided by DOM order,
  never by `z-index`; see [Blend order](#blend-order).
  ::

  ::field{name="tilt" type="boolean" default="true"}
  Tilt the card toward the pointer. Turning this off leaves the foil, sheen and
  glare drifting with the pointer but the card itself flat.
  ::

  ::field{name="sheenSpeed" type="number" default="1"}
  Multiplier on the sheen sweep rate, over a 6-second base loop. The divisor is
  floored, so a value of `0` slows the loop down rather than stopping it.
  ::

  ::field{name="useDeviceOrientation" type="boolean" default="false"}
  Drive the tilt from device orientation instead of the pointer, behind a
  permission prompt on platforms that require one.
  ::

  ::field{name="class" type="string"}
  Classes merged onto the card root.
  ::
::

## Interaction model

Pointer tilt is gated on `(hover: hover) and (pointer: fine)`. On a touch
device the pointer path never arms, so the card is a static image of the
material rather than a card that twitches on every tap.

Two inputs write the same axis values, so they are mutually exclusive: while
device orientation is live, pointer movement is ignored entirely. Otherwise the
two would fight each other and the card would oscillate.

The pointer is mapped from the card's *unrotated* geometry, captured once when
the pointer enters. Measuring while the card is already tilted feeds the
transform back into itself and makes a held-still cursor drift; the cached box
is dropped on scroll, where it would otherwise be stale.

Turning tracking off — reduced motion switched on mid-gesture, a coarse pointer
replacing a fine one — resets the axes rather than leaving the card frozen at
whatever angle it had reached.

## Device orientation

`useDeviceOrientation` swaps the pointer for `gamma`/`beta`, mapped from ±32°.

On iOS 13 and later the events are gated behind an explicit, user-initiated
grant, so the card renders its own **Enable tilt** button in the corner and only
tilt once that has been answered. Everywhere else the events already arrive and
there is nothing to ask for, so the card responds on mount and no button
appears. If the request is denied the card falls back to static rather than
asking again.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="holographic-foil-device-tilt" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-sm flex-col items-center gap-3">
    <MHolographicFoil
      class="h-56 w-full"
      pattern="oil"
      use-device-orientation
    >
      <div class="flex h-full flex-col items-center justify-center gap-1 p-6 text-center">
        <p class="text-lg font-semibold text-white">
          Tilt your device
        </p>
        <p class="text-sm text-white/60">
          On iOS a permission button appears on the card.
        </p>
      </div>
    </MHolographicFoil>
    <p class="text-center text-xs text-muted">
      On desktop there is no prompt to answer: orientation events already
      arrive, so the card responds as soon as it mounts.
    </p>
  </div>
</template>
```
::

## Accessibility

Every moving layer is `aria-hidden` and `pointer-events-none`, so the effect
never intercepts a click and is not announced. The card adds no role, no tab
stop and no keyboard handler: it is decoration over whatever you put in the
default slot, which keeps its own semantics untouched.

The only focusable thing the component introduces is the permission button, and
it is a real `UButton`, so it is reachable and operable from the keyboard.

Under `prefers-reduced-motion` the card stops moving — no tilt, no drift, no
sheen loop, and the `hue-rotate`/`saturate`/`contrast` filter is dropped
altogether rather than neutralised, leaving a plain gradient. The material is
still painted at your chosen intensity, so the card keeps its identity and loses
only the movement. Dropping the filter rather than setting it to `none` is what
makes a static screenshot of the card look like a still and not like a disabled
widget.

## Performance

- The effect is three compositor-friendly layers: a masked gradient, a sheen
  band and a radial blob. Nothing animates `filter`, `width` or `position`, and
  there is no blur.
- `will-change: transform` is set on the moving layers only, and the sheen
  element is masked rather than scaled around a large box.
- The loop is paused rather than removed when nothing is driving the card, so an
  idle card costs nothing.
- The permission button, the media query listener, the `scroll` listener and the
  `deviceorientation` listener are all torn down on unmount.

## Notes

- The component is **uncontrolled**. It has no `v-model`, emits no events and
  exposes no imperative API — the pointer position is not readable, and the card
  is not a controlled component of any kind.
- `intensity`, `glare` and `sheenSpeed` are clamped rather than validated, so a
  value outside `0..1` is pulled into range instead of rendering something
  broken.
- The sheen sweeps on a deliberately **linear** curve. An eased sheen reads as a
  pulse; a constant rate reads as a reflection being carried across a surface.
- The sheen band is masked on its vertical edges because its gradient is tilted
  — without the mask, the band paints past the top of the card and its box
  boundary shows as a straight vertical cut travelling across the content.
