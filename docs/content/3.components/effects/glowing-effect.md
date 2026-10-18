---
title: Glowing Effect
description: Interactive glowing effect with customizable colors, blur, and proximity detection.
---

The `MGlowingEffect` component creates an interactive glow that tracks your pointer. As the cursor moves across the element, a conic/radial gradient sweeps to face it. `proximity` defines how far outside the element the effect stays active, `inactiveZone` suppresses the glow when the pointer is very near the centre, and `movementDuration` controls how smoothly the angle eases. Use `colors` to recolour the trail, `variant="white"` for a monochrome halo, or `blur` to soften it.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="glowing-effect-basic" />
  :::
#code
```vue
﻿<template>
  <div class="relative w-full max-w-xl rounded-2xl border border-default bg-gradient-to-br from-muted/40 to-accented/30 p-6 shadow-sm">
    <MGlowingEffect
      :glow="true"
      :disabled="false"
      :proximity="48"
      :inactive-zone="0.15"
      :spread="60"
      :blur="0"
      class="rounded-2xl"
    />
    <div class="relative z-10 flex flex-col gap-3">
      <div class="flex items-start justify-between gap-3">
        <div>
          <h3 class="text-lg font-semibold text-highlighted">
            Interactive Glow
          </h3>
          <p class="text-sm text-muted">
            Moves smoothly toward your pointer and fades out when near the centre or outside the proximity ring.
          </p>
        </div>
        <UBadge
          color="primary"
          variant="soft"
        >
          Live
        </UBadge>
      </div>
      <div class="flex flex-wrap gap-2">
        <UButton
          color="primary"
          variant="soft"
          size="sm"
        >
          Call to Action
        </UButton>
        <UButton
          color="neutral"
          variant="ghost"
          size="sm"
        >
          Secondary
        </UButton>
      </div>
    </div>
  </div>
</template>
```
::

## Examples

### Variants

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="glowing-effect-example" />
  :::
#code
```vue
﻿<template>
  <div class="grid w-full max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <div class="relative rounded-2xl border border-default bg-accented/40 p-5">
      <MGlowingEffect
        :glow="true"
        :disabled="false"
        :border-width="2"
        :spread="80"
        :proximity="56"
        :inactive-zone="0.05"
        class="rounded-2xl"
      />
      <div class="relative z-10 flex flex-col gap-2">
        <span class="text-sm font-medium text-muted">Default</span>
        <h4 class="text-base font-semibold text-highlighted">
          Multi-colour trail
        </h4>
        <p class="text-sm text-muted">
          Conic + radial stops follow the cursor with a tight, lively sweep.
        </p>
      </div>
    </div>
    <div class="relative rounded-2xl border border-default bg-accented/40 p-5">
      <MGlowingEffect
        :glow="true"
        :disabled="false"
        variant="white"
        :border-width="2"
        :spread="90"
        :proximity="64"
        :inactive-zone="0.08"
        class="rounded-2xl"
      />
      <div class="relative z-10 flex flex-col gap-2">
        <span class="text-sm font-medium text-muted">White</span>
        <h4 class="text-base font-semibold text-highlighted">
          Clean halo
        </h4>
        <p class="text-sm text-muted">
          Monochrome glow that reads crisply on dark surfaces.
        </p>
      </div>
    </div>
    <div class="relative rounded-2xl border border-default bg-accented/40 p-5">
      <MGlowingEffect
        :glow="true"
        :disabled="false"
        :blur="6"
        :border-width="2"
        :spread="120"
        :proximity="72"
        :inactive-zone="0.1"
        :movement-duration="1.2"
        class="rounded-2xl"
      />
      <div class="relative z-10 flex flex-col gap-2">
        <span class="text-sm font-medium text-muted">Soft blur</span>
        <h4 class="text-base font-semibold text-highlighted">
          Large aura
        </h4>
        <p class="text-sm text-muted">
          Wider spread, more blur and faster snap towards the pointer.
        </p>
      </div>
    </div>
    <div class="relative rounded-2xl border border-default bg-accented/40 p-5 sm:col-span-2 lg:col-span-3">
      <MGlowingEffect
        :glow="true"
        :disabled="false"
        :colors="['#60a5fa', '#a78bfa', '#34d399', '#fbbf24']"
        :border-width="2"
        :spread="70"
        :proximity="64"
        :inactive-zone="0.12"
        :movement-duration="1.6"
        class="rounded-2xl"
      />
      <div class="relative z-10 flex flex-col gap-2">
        <span class="text-sm font-medium text-muted">Custom palette</span>
        <h4 class="text-base font-semibold text-highlighted">
          Brand-matched glow
        </h4>
        <p class="text-sm text-muted">
          Pass any four CSS colours (or theme tokens) to recolour the conic trail.
        </p>
      </div>
    </div>
  </div>
</template>
```
::

### Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="glowing-effect-custom" />
  :::
#code
  <PlaygroundCode name="GlowingEffect" />
::

## Props

::component-props
  ::component-prop{name="blur" type="number" default="0"}
  Amount of blur to apply to the glow effect in pixels.
  ::
  ::component-prop{name="inactiveZone" type="number" default="0.7"}
  Size of the inactive zone in the centre where the effect is disabled (0�1). Smaller values keep the glow active closer to the middle.
  ::
  ::component-prop{name="proximity" type="number" default="0"}
  Distance in pixels from the element edges where the effect activates.
  ::
  ::component-prop{name="spread" type="number" default="20"}
  Spread angle of the glow effect in degrees.
  ::
  ::component-prop{name="variant" type="string" default="'default'"}
  Color variant: `'default'` or `'white'`.
  ::
  ::component-prop{name="glow" type="boolean" default="false"}
  Whether the glow effect is rendered/visible.
  ::
  ::component-prop{name="class" type="string" default="''"}
  CSS classes applied to the root/container as needed.
  ::
  ::component-prop{name="disabled" type="boolean" default="true"}
  When `true`, the effect is disabled and pointer tracking is off.
  ::
  ::component-prop{name="movementDuration" type="number" default="2"}
  Duration of the angle easing animation in seconds.
  ::
  ::component-prop{name="borderWidth" type="number" default="1"}
  Width of the glow border in pixels.
  ::
  ::component-prop{name="colors" type="string[]" default="['#dd7bbb', '#d79f1e', '#5a922c', '#4c7894']"}
  Array of four gradient stop colours used for the default variant.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.glowingEffect` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  ::
  ::component-slot-row{name="border"}
  `pointer-events-none absolute -inset-px hidden rounded-[inherit] border opacity-0 transition-opacity`
  ::
  ::component-slot-row{name="container"}
  `pointer-events-none absolute inset-0 rounded-[inherit] opacity-100 transition-opacity`
  ::
  ::component-slot-row{name="glow"}
  `glow rounded-[inherit] after:content-[''] after:rounded-[inherit] after:absolute after:inset-[calc(-1*var(--glowingeffect-border-width))] after:[border:var(--glowingeffect-border-width)_solid_transparent] after:[background:var(--gradient)] after:[background-attachment:fixed] after:opacity-[var(--active)] after:transition-opacity after:duration-300 after:[mask-clip:padding-box,border-box] after:[mask-composite:intersect] after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))]`
  ::
::
