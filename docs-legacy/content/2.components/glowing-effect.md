---
title: Glowing Effect
description: Interactive glowing effect with customizable colors, blur, and proximity detection.
navigation:
  icon: i-lucide-sparkles
---

# Glowing Effect

The GlowingEffect component creates an interactive glowing effect that responds to mouse proximity. It features customizable colors, blur effects, and smooth animations that follow the cursor movement.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="glowing-effect-example" />
  :::
#code
```vue
<template>
  <div class="min-h-screen bg-slate-900 p-8">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
      <div class="relative rounded-xl bg-slate-800/50 border border-slate-700/50 p-6 h-48">
        <MGlowingEffect
          :blur="0"
          :border-width="3"
          :spread="80"
          :glow="true"
          :disabled="false"
          :proximity="64"
          :inactive-zone="0.01"
          class="rounded-xl"
        />
        <div class="relative z-10 h-full flex flex-col justify-between">
          <h3 class="text-lg font-bold text-white">
            Default Glow
          </h3>
          <p class="text-slate-400 text-sm">
            Multi-color gradient effect
          </p>
        </div>
      </div>
      <div class="relative rounded-xl bg-slate-800/50 border border-slate-700/50 p-6 h-48">
        <MGlowingEffect
          :blur="0"
          :border-width="3"
          :spread="80"
          :glow="true"
          :disabled="false"
          :proximity="64"
          :inactive-zone="0.01"
          variant="white"
          class="rounded-xl"
        />
        <div class="relative z-10 h-full flex flex-col justify-between">
          <h3 class="text-lg font-bold text-white">
            White Glow
          </h3>
          <p class="text-slate-400 text-sm">
            Clean monochrome effect
          </p>
        </div>
      </div>
      <div class="relative rounded-xl bg-slate-800/50 border border-slate-700/50 p-6 h-48">
        <MGlowingEffect
          :blur="8"
          :border-width="3"
          :spread="120"
          :glow="true"
          :disabled="false"
          :proximity="64"
          :inactive-zone="0.01"
          class="rounded-xl"
        />
        <div class="relative z-10 h-full flex flex-col justify-between">
          <h3 class="text-lg font-bold text-white">
            Wide Blur Glow
          </h3>
          <p class="text-slate-400 text-sm">
            Larger spread area with blur
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
```
::

## Props

::field-group
  ::field{name="blur" type="number" default="0"}
  Amount of blur to apply to the glow effect in pixels.
  ::
  
  ::field{name="inactiveZone" type="number" default="0.7"}
  Size of the inactive zone in the center where the effect is disabled (0-1).
  ::
  
  ::field{name="proximity" type="number" default="0"}
  Distance from the element edge where the effect activates.
  ::
  
  ::field{name="spread" type="number" default="20"}
  Spread angle of the glow effect in degrees.
  ::
  
  ::field{name="variant" type="string" default="'default'"}
  Color variant: 'default' or 'white'.
  ::
  
  ::field{name="glow" type="boolean" default="false"}
  Whether the glow effect is enabled.
  ::
  
  ::field{name="class" type="string" default="''"}
  CSS classes to apply to the effect container.
  ::
  
  ::field{name="disabled" type="boolean" default="true"}
  Whether the effect is disabled.
  ::
  
  ::field{name="movementDuration" type="number" default="2"}
  Duration of the movement animation in seconds.
  ::
  
  ::field{name="borderWidth" type="number" default="1"}
  Width of the glow border in pixels.
  ::
  
  ::field{name="colors" type="string[]" default="['#dd7bbb', '#d79f1e', '#5a922c', '#4c7894']"}
  Array of four gradient stop colors used for the default (non-white) variant.
  ::
::

## Examples

### Basic Glowing Effect

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="glowing-effect-basic" />
  :::
#code
```vue
<template>
  <div class="relative rounded-xl bg-slate-800/50 border border-slate-700/50 p-6 h-48 w-full max-w-md mx-auto">
    <MGlowingEffect
      :glow="true"
      :disabled="false"
      class="rounded-xl"
    />
    <div class="relative z-10 h-full flex flex-col justify-between">
      <h3 class="text-lg font-bold text-white">
        Basic Glowing Effect
      </h3>
      <p class="text-slate-400 text-sm">
        Default glowing effect
      </p>
    </div>
  </div>
</template>
```
::

### Color Variants

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="glowing-effect-color" />
  :::
#code
```vue
<template>
  <div class="relative rounded-xl bg-slate-800/50 border border-slate-700/50 p-6 h-48 w-full max-w-md mx-auto">
    <MGlowingEffect
      :glow="true"
      :disabled="false"
      variant="white"
      class="rounded-xl"
    />
    <div class="relative z-10 h-full flex flex-col justify-between">
      <h3 class="text-lg font-bold text-white">
        White Variant
      </h3>
      <p class="text-slate-400 text-sm">
        Monochrome glowing effect
      </p>
    </div>
  </div>
</template>
```
::

### With Blur

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="glowing-effect-blur" />
  :::
#code
```vue
<template>
  <div class="relative rounded-xl bg-slate-800/50 border border-slate-700/50 p-6 h-48 w-full max-w-md mx-auto">
    <MGlowingEffect
      :glow="true"
      :disabled="false"
      :blur="6"
      class="rounded-xl"
    />
    <div class="relative z-10 h-full flex flex-col justify-between">
      <h3 class="text-lg font-bold text-white">
        Blurred Glow
      </h3>
      <p class="text-slate-400 text-sm">
        Glowing effect with blur
      </p>
    </div>
  </div>
</template>
```
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.glowingEffect` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` |  |
| `border` | `pointer-events-none absolute -inset-px hidden rounded-[inherit] border opacity-0 transition-opacity` |
| `container` | `pointer-events-none absolute inset-0 rounded-[inherit] opacity-100 transition-opacity` |
| `glow` | `glow rounded-[inherit] after:content-[\'\'] after:rounded-[inherit] after:absolute after:inset-[calc(-1*var(--glowingeffect-border-width))] after:[border:var(--glowingeffect-border-width)_solid_transparent] after:[background:var(--gradient)] after:[background-attachment:fixed] after:opacity-[var(--active)] after:transition-opacity after:duration-300 after:[mask-clip:padding-box,border-box] after:[mask-composite:intersect] after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))]` |
