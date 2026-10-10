---
title: AI Orb
description: A WebGL2 sphere with colour marbling inside it, lit like a real material.
navigation:
  icon: i-lucide-circle-dot
---

# AI Orb

A configurable WebGL2 orb ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â a lit sphere with colour marbling inside it. Every
pixel derives a normal from its distance to the centre, which is what lets a
rim, a highlight and a shaded side exist at all. A radial gradient has no
surface, and that is the entire difference between this and a coloured circle.

Two ideas carry the whole thing:

- **The loop is seamless by construction.** Every point walks a circle in a flow
  field whose angle advances by exactly one turn per loop, so the displacement
  returns to where it started. Neighbouring points begin at different angles,
  and that is what reads as swirling ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â offset the whole domain by one shared
  vector instead and you get a pulse.
- **Colour is mixed in OkLab.** The midpoint between two stops stays clean instead
  of going muddy through sRGB, each picked colour reproduces exactly at its own
  stop, and the hue ripple is a real rotation in the `a`/`b` plane.

There is no `state` prop here on purpose. State lives in the character layer ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â
see [AI Orb Face](/docs/components/ai-orb-face), which composes this material.

## Usage

Give it `colors` ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â one to four hex values, mixed in OkLab ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â and let it run. Every
other prop tunes the material; `paused` and `reducedMotion` exist so you can stop
it in a screenshot test or honour the OS preference from your own code.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="ai-orb-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-lg flex-col gap-6">
    <div class="flex flex-wrap items-center justify-center gap-6 rounded-2xl border border-default p-8">
      <MAiOrb
        :colors="['#f25aed', '#ffffff']"
        :glow="glow"
        :size="140"
        :turbulence="turbulence"
      />
      <MAiOrb
        :colors="['#4cc9f0', '#4361ee', '#3f37c9']"
        :flow="flow"
        :glow="glow"
        :iridescence="0.6"
        :size="140"
        :turbulence="turbulence"
      />
      <MAiOrb
        :colors="['#ff9f1c', '#ffbf69']"
        :glow="glow"
        :paused="paused"
        :size="140"
        :wobble="0.6"
      />
    </div>

    <div class="flex flex-wrap items-center gap-5">
      <USwitch
        v-model="paused"
        class="shrink-0"
        label="paused"
      />
      <label class="flex flex-1 items-center gap-3 text-xs text-muted">
        flow
        <USlider
          v-model="flow"
          class="flex-1"
          :max="1.6"
          :min="0"
          :step="0.05"
        />
      </label>
      <label class="flex flex-1 items-center gap-3 text-xs text-muted">
        turbulence
        <USlider
          v-model="turbulence"
          class="flex-1"
          :max="1.2"
          :min="0"
          :step="0.05"
        />
      </label>
      <label class="flex flex-1 items-center gap-3 text-xs text-muted">
        glow
        <USlider
          v-model="glow"
          class="flex-1"
          :max="1"
          :min="0"
          :step="0.05"
        />
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
const paused = ref(false)
const flow = ref(0.6)
const turbulence = ref(0.4)
const glow = ref(0)
</script>
```
::

## Props

Every field below is optional; omit one and the default in the right-hand column
applies. They are resolved once per change into a plain config object and pushed
as shader uniforms ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â changing one never rebuilds the WebGL context.

::field-group
  ::field{name="size" type="number | string" default="240"}
  Rendered size. A number is pixels; any CSS length string (`'100%'`, `'4rem'`)
  passes through unchanged. The backing store follows the element's actual
  device-pixel box, capped at 2ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â DPR.
  ::
  ::field{name="colors" type="string[]" default="['#f25aed', '#ffffff']"}
  Two to four stops, converted to the shader once per change and never per frame.
  Two stops read as a material; four read as iridescent. The non-WebGL fallback
  uses the same stops.
  ::
  ::field{name="duration" type="number" default="7"}
  Seconds for one full, seamless loop.
  ::
  ::field{name="flow" type="number" default="0.6"}
  How far the flow field carries the field over a loop.
  ::
  ::field{name="turbulence" type="number" default="0.4"}
  Strength of the second, nested warp ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â marbling rather than blobs.
  ::
  ::field{name="blobScale" type="number" default="3"}
  Interior cell size. Small is busy; large is one slow swell.
  ::
  ::field{name="rim" type="number" default="1.3"}
  Fresnel edge brightness. This is the prop that makes the orb read as glass.
  ::
  ::field{name="specular" type="number" default="0.2"}
  Specular highlight strength.
  ::
  ::field{name="inner" type="number" default="0.38"}
  Internal scatter, offset away from the highlight. Fake subsurface scattering.
  ::
  ::field{name="refraction" type="number" default="0.25"}
  Bends the noise lookup by the surface normal.
  ::
  ::field{name="iridescence" type="number" default="0"}
  Fresnel-driven hue rotation ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â thin-film sheen.
  ::
  ::field{name="aberration" type="number" default="0.8"}
  Rim dispersion. Splits the palette lookup per channel toward the edge, the way
  a lens fringes.
  ::
  ::field{name="chroma" type="number" default="1"}
  Hue ripple through the palette.
  ::
  ::field{name="contrast" type="number" default="1"}
  Lightness contrast around the midpoint.
  ::
  ::field{name="balance" type="number" default="0.5"}
  Which colour dominates. `0.5` is even; below favours the first stop.
  ::
  ::field{name="shift" type="number" default="0.23"}
  Rotates the palette.
  ::
  ::field{name="shading" type="number" default="0.05"}
  Blends the palette toward plain diffuse shading.
  ::
  ::field{name="glow" type="number" default="0"}
  A halo cast outside the silhouette. `0` is none.
  ::
  ::field{name="grain" type="number" default="0.6"}
  Film grain. Also hides the banding large soft gradients show.
  ::
  ::field{name="softness" type="number" default="0.005"}
  Edge feather. `0` still resolves to about 1.5 device pixels, so the silhouette
  never aliases.
  ::
  ::field{name="lightX" type="number" default="-0.6"}
  Light direction, x. With `lightY` it also decides which corner the fallback
  gradient is lit from.
  ::
  ::field{name="lightY" type="number" default="-1"}
  Light direction, y.
  ::
  ::field{name="wobble" type="number" default="0"}
  Silhouette deformation, so the orb reads as a drop rather than a ball.
  ::
  ::field{name="paused" type="boolean" default="false"}
  Freeze on the current frame. Props still apply, and a single frame is drawn
  after every change ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â a paused orb is never stale.
  ::
  ::field{name="class" type="string"}
  Merged onto the canvas, or onto the fallback `<div>` when WebGL2 is
  unavailable.
  ::
::

## Accessibility

The canvas is `aria-hidden="true"` and `tabindex="-1"` ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â it is decorative by
construction, and an animation nobody asked for should not be an announced
event. If the orb carries meaning, give it meaning in the DOM around it: a
status label beside it, or an `aria-label` on a wrapping element. For a
character with a name and an accessible description, use
[AI Orb Face](/docs/components/ai-orb-face), which takes an `ariaLabel`.

Under `prefers-reduced-motion: reduce` the loop stops and the phase is pinned to
`0`, so you get one static frame of the orb rather than a moving one. The
`matchMedia` listener is live, so changing the OS setting mid-session stops the
loop without a remount.

When WebGL2 is unavailable ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â an older browser, a blocklisted driver, or too many
contexts ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â the component renders a CSS `radial-gradient` instead of a canvas.
That fallback is a flat disc, not a lit sphere. It is `aria-hidden`, lit from the
same corner as the shader so the character does not appear to change which way
it faces, and it is deliberately *not* an error state: nothing is logged and
nothing is thrown. A machine that cannot render the real thing still gets a
coloured orb rather than a hole in the layout.

## Performance

- One `requestAnimationFrame` loop per instance, capped at 60fps. Ambient motion
  gains nothing from a 120 Hz display.
- The context is requested with `powerPreference: 'low-power'`, and with
  `depth`, `stencil` and `antialias` all off ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â the covering triangle has no
  geometric edges to sample.
- The fullscreen triangle is built from `gl_VertexID`, so there is no vertex
  buffer and no attribute state to manage.
- Config changes push uniforms on the live program; the GL context, program and
  shader objects survive every prop change. Only `colors` is converted, and only
  once per change.
- `ResizeObserver` is used with `device-pixel-content-box` when available and
  falls back to plain `observe`, with DPR clamped to 2.
- An `IntersectionObserver` with a 120px `rootMargin` stops the loop entirely
  when the orb scrolls out of view. This is the common case, and nothing is
  gained by burning GPU on an orb nobody can see.
- `onBeforeUnmount` disconnects both observers, removes the `matchMedia`
  listener and deletes the program. It deliberately does *not* call
  `WEBGL_lose_context`: Vue re-runs mount hooks in development, the second pass
  gets the same canvas back with a context that is already lost, and the program
  then fails to link and the component latches into its fallback permanently.

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.aiOrb` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `'block'` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.aiOrb` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `block` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.aiOrb` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `block` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.aiOrb` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `block` |
