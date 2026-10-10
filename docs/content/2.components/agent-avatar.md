---
title: Agent Avatar
description: A deterministic, animated pixel avatar generated from a string seed.
navigation:
  icon: i-lucide-fingerprint
---

# Agent Avatar

An avatar for an agent, derived from a string. The same seed always produces the
same picture ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â a hashed palette, a hashed 6ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â6 grid of cell brightness, colour
and phase ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â so you can store one string per agent instead of uploading one image.

Nothing about it is random at render time. Two processes, a string hash and a
`mulberry32` generator, turn the seed into the full pixel field before the first
frame, which is why the avatar is stable across reloads, across tabs and across
SSR hydration.

Each cell then animates on its own phase: a slow lightness pulse, a diagonal
sweep travelling across the grid, a shared global breath and the occasional
sparkle. The whole canvas breathes in size as well as brightness, and a soft
screened ring sits on top of the silhouette.

## Usage

Pass a stable `seed` ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â an agent id, a slug, an email ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â and nothing else. The
avatar resizes and re-animates itself when `seed`, `size` or `animated` changes;
it does not watch anything else.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="agent-avatar-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <div class="flex flex-wrap items-center justify-center gap-5 rounded-2xl border border-default p-6">
      <MAgentAvatar
        v-for="seed in seeds"
        :key="seed"
        :animated="animated"
        :seed="seed"
        :size="size"
      />
    </div>

    <div class="flex items-center gap-4">
      <USwitch
        v-model="animated"
        class="shrink-0"
        label="animated"
      />
      <USlider
        v-model="size"
        class="flex-1"
        :max="112"
        :min="40"
      />
    </div>

    <p class="text-xs text-muted">
      {{ size }}px ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â four seeds, four permanently distinct avatars.
    </p>
  </div>
</template>

<script setup lang="ts">
const seeds = ['atlas', 'ember', 'kestrel', 'nimbus']
const animated = ref(true)
const size = ref(72)
</script>
```
::

## Props

::field-group
  ::field{name="seed" type="string"}
  Required. Hashed with a 32-bit string hash, then used to seed a `mulberry32`
  generator twice: once for a three-stop hue-family palette, once for the 6ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â6
  cell grid. Change it and the renderer restarts around a completely new picture.
  ::
  ::field{name="size" type="number" default="64"}
  Diameter in pixels, applied to both the CSS box and the backing store (the
  latter scaled by `devicePixelRatio`). Changing it re-creates the grid.
  ::
  ::field{name="animated" type="boolean" default="true"}
  Runs the frame loop. `false` still draws ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â one static frame at time zero ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â so
  the avatar is never blank, just still. Ignored under
  `prefers-reduced-motion: reduce`.
  ::
  ::field{name="class" type="string"}
  Merged onto the canvas alongside `rounded-full`, which the component always
  applies to clip the field to a circle.
  ::
::

## Accessibility

The canvas carries `role="img"` and an `aria-label` of `Avatar for <seed>` ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â the
raw seed, not a friendly name. If the seed is an opaque id (`usr_8f21`), pass a
readable one or render the name next to the avatar; the component has no prop
for a separate label.

Under `prefers-reduced-motion: reduce` the animation stops even when `animated`
is `true`, and the listener re-checks the preference live, so flipping the OS
setting mid-session switches the avatar to a single static frame without a
remount.

## Performance

- A 6ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â6 field is 36 `fillRect` calls per frame with a per-cell shadow blur, on a
  2D context sized to the component ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â cost scales with `sizeÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â²`, not with the
  number of avatars on the page.
- The grid and palette are generated once per renderer start, inside the draw
  closure. They are not reactive, so no Vue update can invalidate them.
- `watch` covers exactly the three inputs the effect depends on ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â `seed`, `size`,
  `animated` ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â with `flush: 'post'`, so the canvas is measured after layout.
- A restart replaces the previous teardown wholesale: the old frame callback is
  cancelled and its `matchMedia` listener removed before a new one is attached,
  so repeatedly changing `seed` cannot leak listeners.
- The device-pixel-ratio scale is applied once via `ctx.scale`, so every draw
  call stays in CSS pixels.

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.agentAvatar` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `'rounded-full'` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.agentAvatar` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `rounded-full` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.agentAvatar` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `rounded-full` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.agentAvatar` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `rounded-full` |
