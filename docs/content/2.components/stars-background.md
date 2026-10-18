---
title: Stars Background
description: Animated starfield background with customizable density and twinkling effects.
navigation:
  icon: i-lucide-stars
---

# Stars Background

The StarsBackground component creates an animated starfield background with customizable star density and twinkling effects. It's perfect for adding a cosmic background to your UI.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="stars-background-example" />
  :::
#code
```vue
<template>
  <div class="relative h-64 w-full overflow-hidden rounded-lg border bg-gradient-to-br from-gray-900 to-black">
    <MStarsBackground />
    <div class="relative z-10 h-full flex flex-col items-center justify-center text-center p-4">
      <h3 class="text-2xl font-bold text-white mb-2">Stars Background</h3>
      <p class="text-gray-300">Animated starfield background</p>
    </div>
  </div>
</template>
```
::

## Props

::field-group
  ::field{name="starDensity" type="number" default="0.00015"}
  Density of stars in the background (stars per pixel).
  ::
  
  ::field{name="allStarsTwinkle" type="boolean" default="true"}
  Whether all stars should twinkle.
  ::
  
  ::field{name="twinkleProbability" type="number" default="0.7"}
  Probability that a star will twinkle (0-1).
  ::
  
  ::field{name="minTwinkleSpeed" type="number" default="0.5"}
  Minimum twinkling speed.
  ::
  
  ::field{name="maxTwinkleSpeed" type="number" default="1"}
  Maximum twinkling speed.
  ::
  
  ::field{name="class" type="string" default="''"}
  CSS classes to apply to the canvas container.
  ::
::

## Examples

### Basic Stars Background

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="stars-background-basic" />
  :::
#code
```vue
<template>
  <div class="relative h-64 w-full overflow-hidden rounded-lg border bg-gradient-to-br from-gray-900 to-black">
    <MStarsBackground />
    <div class="relative z-10 h-full flex items-center justify-center">
      <h3 class="text-xl font-bold text-white">Basic Stars</h3>
    </div>
  </div>
</template>
```
::

### Custom Density and Twinkling

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="stars-background-custom" />
  :::
#code
```vue
<template>
  <div class="relative h-64 w-full overflow-hidden rounded-lg border bg-gradient-to-br from-blue-900 to-purple-900">
    <MStarsBackground
      :star-density="0.0003"
      :twinkle-probability="0.9"
      :min-twinkle-speed="0.2"
      :max-twinkle-speed="0.8"
    />
    <div class="relative z-10 h-full flex flex-col items-center justify-center text-center p-4">
      <h3 class="text-xl font-bold text-white mb-2">Dense Twinkling Stars</h3>
      <p class="text-gray-300">More stars with faster twinkling</p>
    </div>
  </div>
</template>
```
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.starsBackground` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `h-full w-full absolute inset-0` |
