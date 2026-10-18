---
title: Orbital Image Wheel
description: A draggable, momentum-spun ring of thumbnails with keyboard stepping and snap-to-item.
navigation:
  icon: i-lucide-rotate-3d
---

# Orbital Image Wheel

A ring of thumbnails you can spin. Drag to rotate, release to keep coasting, and
it settles on the nearest item. Arrow keys step one position at a time, and
clicking any thumbnail brings it to the top.

There is no animation library involved — the wheel is `requestAnimationFrame`,
pointer events and trigonometry. That is deliberate: the interaction is a
continuous physical drag with momentum, which belongs on a frame loop rather
than in a transition.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="orbital-image-wheel-basic" />
  :::
#code
```vue
<template>
  <div class="flex flex-col items-center gap-3 py-6">
    <MOrbitalImageWheel :items="items" snap />

    <p class="text-xs text-muted">
      Drag to spin · <kbd class="rounded border border-default px-1">←</kbd>
      <kbd class="rounded border border-default px-1">→</kbd> to step · click a
      thumbnail to bring it to the top
    </p>
  </div>
</template>

<script setup lang="ts">
const items = [
  { alt: 'Ridge', id: 'ridge', image: swatch('#38bdf8', '#0ea5e9', 'R') },
  { alt: 'Tide', id: 'tide', image: swatch('#34d399', '#059669', 'T') },
  { alt: 'Salt', id: 'salt', image: swatch('#fbbf24', '#d97706', 'S') },
  { alt: 'Birch', id: 'birch', image: swatch('#a3e635', '#65a30d', 'B') },
  { alt: 'Glacier', id: 'glacier', image: swatch('#818cf8', '#4f46e5', 'G') },
  { alt: 'Arch', id: 'arch', image: swatch('#f472b6', '#db2777', 'A') },
]

// Inline SVG thumbnails keep this example self-contained — no network, no
// placeholder service.
function swatch(from: string, to: string, glyph: string) {
  const svg
    = `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80">`
    + `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">`
    + `<stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/>`
    + `</linearGradient></defs>`
    + `<rect width="80" height="80" fill="url(#g)"/>`
    + `<text x="40" y="52" font-family="system-ui,sans-serif" font-size="34"`
    + ` font-weight="600" fill="white" fill-opacity=".9" text-anchor="middle">${glyph}</text>`
    + `</svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}
</script>
```
::

## Props

::field-group
  ::field{name="items" type="OrbitalImageWheelItem[]"}
  The ring's contents. Each item needs `id`, `image` and `alt`; `label` overrides
  the button's accessible name when `alt` is not descriptive enough.
  ::
  ::field{name="radius" type="number" default="160"}
  Circle radius in px. The rendered box is always `radius * 2 + 80`, where the
  trailing 80 is the thumbnail diameter — a fixed constant, not a prop.
  ::
  ::field{name="snap" type="boolean" default="false"}
  Snap to the nearest item when a drag or a momentum coast settles.
  ::
  ::field{name="autoRotate" type="boolean" default="false"}
  Rotate continuously.
  ::
  ::field{name="autoRotateSpeed" type="number" default="12"}
  Degrees per second while auto-rotating. Negative values run the other way.
  ::
  ::field{name="faceOutward" type="boolean" default="false"}
  Tilt each thumbnail to face outward from the center, like a ferris-wheel
  gondola.
  ::
  ::field{name="activeId" type="string"}
  Force a specific item to be highlighted, overriding top-of-circle detection.
  Useful for pairing the wheel with an external list or timeline.
  ::
  ::field{name="rotation" type="number"}
  Controlled rotation in degrees. Omit to let the wheel own its rotation.
  ::
  ::field{name="label" type="string" default="'Orbital image wheel'"}
  Accessible name for the wheel itself.
  ::
  ::field{name="class" type="string"}
  Merged onto the wheel root.
  ::
::

## Events

::field-group
  ::field{name="rotationChange" type="(rotation: number) => void"}
  Fired with the normalized rotation in degrees after every change — drag,
  momentum, snap tween, key press and auto-rotate alike.
  ::
::

## Auto-rotation

Auto-rotate is off by default. When on, it stops for three reasons, because a
spinning wheel that keeps spinning while you are trying to look at it is worse
than no wheel at all:

- the pointer is over the wheel — but only on devices that actually report a
  hover-capable pointer, so a touch drag does not pause the thing it is dragging;
- focus is anywhere inside the wheel;
- the document is hidden, so a backgrounded tab does not burn frames.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="orbital-image-wheel-auto-rotate" />
  :::
#code
```vue
<template>
  <div class="flex flex-col items-center gap-4 py-6">
    <MOrbitalImageWheel
      auto-rotate
      :auto-rotate-speed="speed"
      :items="items"
      snap
    />

    <div class="flex w-full max-w-xs flex-col gap-3">
      <label class="flex items-center gap-3 text-xs text-muted">
        <span class="w-28">speed {{ speed }}°/s</span>
        <USlider v-model="speed" :min="-90" :max="90" :step="6" class="flex-1" />
      </label>
      <p class="text-xs text-muted">
        Auto-rotate pauses while the pointer is over the wheel, while focus is
        inside it, and while the tab is hidden.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const speed = ref(18)

const items = ['Ridge', 'Tide', 'Salt', 'Birch', 'Glacier', 'Arch'].map(
  (name, index) => ({
    alt: name,
    id: name.toLowerCase(),
    image: swatch(index),
  }),
)

function swatch(index: number) {
  const svg
    = `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80">`
    + `<circle cx="40" cy="40" r="34" fill="hsl(${(index * 58 + 196) % 360} 72% 58%)"/>`
    + `<text x="40" y="50" font-family="system-ui,sans-serif" font-size="28"`
    + ` font-weight="600" fill="white" fill-opacity=".92" text-anchor="middle">${index + 1}</text>`
    + `</svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}
</script>
```
::

## Controlled rotation

Pass `rotation` to own the angle yourself. The wheel still runs its own tweens —
it reports the value it computed through `rotationChange` and renders whatever
you give back. If you ignore the event, the tiles visibly do not move even
though the internal gesture tracking ran.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="orbital-image-wheel-controlled" />
  :::
#code
```vue
<template>
  <div class="flex flex-col items-center gap-4 py-6">
    <MOrbitalImageWheel
      :items="items"
      :rotation="rotation"
      snap
      @rotation-change="onRotationChange"
    />

    <p class="text-xs text-muted">
      rotation = <span class="font-medium">{{ rotation.toFixed(1) }}°</span> ·
      current =
      <span class="font-medium">{{ currentLabel }}</span>
    </p>

    <UButton
      color="neutral"
      label="Recenter"
      size="sm"
      variant="outline"
      @click="rotation = 0"
    />
  </div>
</template>

<script setup lang="ts">
const items = ['Ridge', 'Tide', 'Salt', 'Birch', 'Glacier', 'Arch'].map(
  (name, index) => ({
    alt: name,
    id: name.toLowerCase(),
    image: swatch(index),
  }),
)

// Controlled: the wheel never mutates its own rotation. It tweens, then
// *reports* the value through `rotationChange`; you decide whether to accept
// it. Drop the handler and the wheel turns but the tiles never move — which is
// the correct behaviour for an input you are not willing to accept.
const rotation = ref(0)

const onRotationChange = (next: number) => {
  rotation.value = next
}

const currentLabel = computed(() => {
  const step = 360 / items.length
  const normalized = ((rotation.value % 360) + 360) % 360
  let best = items[0]!.alt
  let bestDistance = Number.POSITIVE_INFINITY
  items.forEach((item, position) => {
    const angle = (position * step + normalized) % 360
    const distance = Math.min(angle, 360 - angle)
    if (distance < bestDistance) {
      bestDistance = distance
      best = item.alt
    }
  })
  return best
})

function swatch(index: number) {
  const svg
    = `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80">`
    + `<rect width="80" height="80" rx="40" fill="hsl(${(index * 40 + 24) % 360} 68% 54%)"/>`
    + `<circle cx="40" cy="30" r="11" fill="white" fill-opacity=".85"/>`
    + `</svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}
</script>
```
::

## Face outward

`face-outward` rotates each thumbnail by its own angle, so the ring reads as a
ferris wheel rather than a flat carousel. Combine it with a smaller `radius` and
more items to see the effect properly.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="orbital-image-wheel-face-outward" />
  :::
#code
```vue
<template>
  <div class="flex flex-wrap items-center justify-center gap-12 py-6">
    <div
      v-for="preset in presets"
      :key="preset.name"
      class="flex flex-col items-center gap-3"
    >
      <MOrbitalImageWheel
        face-outward
        :items="preset.items"
        :radius="preset.radius"
        snap
      />
      <span class="text-xs text-muted">
        {{ preset.name }} · r={{ preset.radius }} ·
        {{ preset.items.length }} items
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
// `face-outward` rotates each thumbnail by its own angle, so the images tilt
// away from the centre like ferris-wheel gondolas. The wheel's box is always
// `radius * 2 + 80` — the fixed 80 is the thumbnail diameter, which is
// deliberately not configurable.
const presets = [
  { name: 'gondola', radius: 120, count: 6 },
  { name: 'tight ring', radius: 90, count: 10 },
  { name: 'single', radius: 100, count: 1 },
].map((preset) => ({
  name: preset.name,
  radius: preset.radius,
  items: Array.from({ length: preset.count }, (_, index) => ({
    alt: `Item ${index + 1}`,
    id: `${preset.name}-${index}`,
    image: swatch(index, preset.radius),
  })),
}))

function swatch(index: number, radius: number) {
  const svg
    = `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80">`
    + `<rect width="80" height="80" fill="hsl(${(index * 61 + radius) % 360} 64% 52%)"/>`
    + `<path d="M20 60 L40 22 L60 60 Z" fill="white" fill-opacity=".82"/>`
    + `</svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}
</script>
```
::

## Interaction model

**Drag.** Horizontal movement maps to rotation at 0.6° per pixel. Rotation
follows the pointer synchronously — no frame is scheduled for the drag itself —
so the ring tracks your finger exactly. Velocity is smoothed across moves
(`velocity = velocity * 0.65 + instant * 0.35`) rather than taken from the last
sample, which is what stops a single jittery `pointermove` from becoming a
fling.

**Momentum.** On release the wheel coasts, decaying by 0.94 per ~16ms frame and
stopping below 0.02°/ms. With `snap` on, the nearest item angle is then tweened
to over 250ms with an in-out cubic ease.

**Keyboard.** `ArrowRight` and `ArrowLeft` step one item, tweening over 250ms.
The signs are inverted relative to the visual direction — right *subtracts* the
item angle — which is inherited from upstream and left alone deliberately, since
flipping it would change which item "next" means for anyone already using it.

**Clicks.** A drag that travelled more than 4px swallows the click that ends it,
so spinning the wheel never selects whatever happens to be under your finger when
you let go. Taps and keyboard activation both fall through to "bring this item
to the top".

::tip
The click handler lives on the wheel root, not on the tiles. `handlePointerDown`
calls `setPointerCapture` on the root so a drag survives leaving the wheel — and
while a capture is active the browser retargets the derived `click` to the
capture element too, so a per-tile `@click` never fires for a real mouse. The
root handler records the tile on `pointerdown` and falls back to that.
::

## Accessibility

- The wheel is `role="application"` with an `aria-label`, so a screen reader
  announces it as an interactive widget rather than a group of images.
- Every thumbnail is a real `<button>` with an accessible name from `label`, or
  `alt`. `aria-current="true"` marks the item at the top, and only that item.
- A visually hidden `aria-live="polite"` region announces `"<name> selected"`
  whenever the top item changes, so an arrow-key step is spoken.
- Focus pauses auto-rotation, and blur resumes it. The handlers are
  `focusin`/`focusout` rather than `focus`/`blur` because the latter do not
  bubble in the DOM — a focus moving *between* thumbnails would otherwise be
  read as leaving the wheel.
- Images carry `draggable="false"`, so a drag spins the wheel instead of
  dragging the image out of the page.
- Thumbnail size is a fixed 80px, comfortably above the 44px minimum target.

Under `prefers-reduced-motion` there is no momentum coast, no snap tween and no
key-step tween — drags and key presses apply their final rotation immediately,
and auto-rotation does not run at all.

## Performance

- Drag rotation writes one reactive number; the tiles are precomputed in a
  `computed`, so a 60Hz drag does not re-run trigonometry 60 times in the
  template.
- Tile offsets are rounded to four decimals before they reach the style string.
  Without it, SSR and the browser disagree about the last bit of `Math.sin` and
  Nuxt reports a hydration style mismatch on every tile.
- `z-index` is derived from the tile's vertical offset plus the radius, keeping
  the near-over-far ordering while staying non-negative. A raw `Math.round(y)`
  goes negative near the top of the ring, and since the root is not a stacking
  context, those tiles paint behind their own parent and cannot be clicked.
- Every frame handle is cancelled on unmount and before each new animation
  starts, so a rapid drag-and-release cannot leave two loops running at once.

## Notes

- An empty `items` array renders an empty wheel rather than dividing by zero:
  `itemAngle` is `0` when there are no items, and the nearest-angle helpers
  return their input unchanged. A single item always sits at the top and is
  always current.
- Momentum velocity is written back to the shared ref as it decays. Keeping a
  local copy instead means the next gesture replays the previous fling — which
  shows up as a tile click spinning the wheel unexpectedly.
- The root has no `tabindex`. Focus and arrow keys reach it by bubbling from the
  thumbnail buttons, which is where a keyboard user's attention already is.
- Tuning constants (`ROTATE_SENSITIVITY`, `VELOCITY_SMOOTHING`,
  `MOMENTUM_FRICTION`, `SNAP_DURATION` and friends) live in
  `OrbitalImageWheel/constants.ts` and are not props — a wheel whose feel can be
  reconfigured by its caller is a wheel nobody tunes.