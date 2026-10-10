---
title: Shooting Stars
description: Animated shooting stars effect with customizable colors, speed, and timing.
navigation:
  icon: i-lucide-sparkle
---

# Shooting Stars

The ShootingStars component creates an animated shooting stars effect with customizable colors, speed, and timing. It's perfect for adding dynamic background animations to your UI.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="shooting-stars-example" />
  :::
#code
```vue
<template>
  <div class="relative h-64 w-full overflow-hidden rounded-lg border bg-gradient-to-br from-gray-900 to-black">
    <MShootingStars />
    <MStarsBackground />
    <div class="relative z-10 h-full flex flex-col items-center justify-center text-center p-4">
      <h3 class="text-2xl font-bold text-white mb-2">Shooting Stars</h3>
      <p class="text-gray-300">Animated shooting stars with trails</p>
    </div>
  </div>
</template>
```
::

## Props

::field-group
  ::field{name="minSpeed" type="number" default="10"}
  Minimum speed of the shooting stars.
  ::
  
  ::field{name="maxSpeed" type="number" default="30"}
  Maximum speed of the shooting stars.
  ::
  
  ::field{name="minDelay" type="number" default="1200"}
  Minimum delay between shooting stars in milliseconds.
  ::
  
  ::field{name="maxDelay" type="number" default="4200"}
  Maximum delay between shooting stars in milliseconds.
  ::
  
  ::field{name="starColor" type="string" default="'#9E00FF'"}
  Color of the shooting star.
  ::
  
  ::field{name="trailColor" type="string" default="'#2EB9DF'"}
  Color of the shooting star trail.
  ::
  
  ::field{name="starWidth" type="number" default="10"}
  Width of the shooting star.
  ::
  
  ::field{name="starHeight" type="number" default="1"}
  Height of the shooting star.
  ::
  
  ::field{name="class" type="string" default="''"}
  CSS classes to apply to the SVG container.
  ::
::

## Examples

### Basic Shooting Stars

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="shooting-stars-basic" />
  :::
#code
```vue
<template>
  <div class="relative h-64 w-full overflow-hidden rounded-lg border bg-gradient-to-br from-gray-900 to-black">
    <MShootingStars />
    <div class="relative z-10 h-full flex items-center justify-center">
      <h3 class="text-xl font-bold text-white">Basic Shooting Stars</h3>
    </div>
  </div>
</template>
```
::

### Custom Colors and Speed

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="shooting-stars-custom" />
  :::
#code
```vue
<template>
  <div class="relative h-64 w-full overflow-hidden rounded-lg border bg-gradient-to-br from-purple-900 to-blue-900">
    <MShootingStars
      star-color="#FFD700"
      trail-color="#FF4500"
      :min-speed="5"
      :max-speed="20"
      :min-delay="800"
      :max-delay="2000"
    />
    <div class="relative z-10 h-full flex flex-col items-center justify-center text-center p-4">
      <h3 class="text-xl font-bold text-white mb-2">Custom Shooting Stars</h3>
      <p class="text-gray-300">Gold stars with orange trails</p>
    </div>
  </div>
</template>
```
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.shootingStars` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `'w-full h-full absolute inset-0'` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.shootingStars` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `w-full h-full absolute inset-0` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.shootingStars` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `w-full h-full absolute inset-0` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.shootingStars` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `w-full h-full absolute inset-0` |
