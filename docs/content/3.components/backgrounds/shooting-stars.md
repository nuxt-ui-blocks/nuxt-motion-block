---
title: Shooting Stars
description: Animated shooting stars effect with customizable colors, speed, and timing.
---

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
      <h3 class="text-2xl font-bold text-white mb-2">
        Shooting Stars
      </h3>
      <p class="text-dimmed">
        Animated shooting stars with trails
      </p>
    </div>
  </div>
</template>
```
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
  <div class="relative h-96 w-full overflow-hidden rounded-xl border bg-gradient-to-br from-gray-900 to-black">
    <MShootingStars />
    <div class="relative z-10 h-full flex flex-col items-center justify-center text-center p-8">
      <div class="mb-8">
        <div class="w-20 h-20 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 flex items-center justify-center mx-auto">
          <UIcon
            name="i-lucide-star"
            class="w-10 h-10 text-white"
          />
        </div>
      </div>
      <h2 class="text-4xl font-bold text-white mb-6">
        Shooting Stars
      </h2>
      <p class="text-dimmed max-w-md mb-8 text-lg">
        Add magical shooting star effects to your interface for a whimsical and engaging user experience
      </p>
      <div class="flex flex-col sm:flex-row gap-4">
        <UButton
          color="primary"
          variant="solid"
          size="lg"
        >
          Create Magic
        </UButton>
        <UButton
          color="neutral"
          variant="outline"
          size="lg"
        >
          View Demo
        </UButton>
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
    <component-example name="shooting-stars-custom" />
  :::
#code
  <PlaygroundCode name="ShootingStars" />
::

## Props

::component-props
  ::component-prop{name="minSpeed" type="number" default="10"}
  Minimum speed of the shooting stars.
  ::
  
  ::component-prop{name="maxSpeed" type="number" default="30"}
  Maximum speed of the shooting stars.
  ::
  
  ::component-prop{name="minDelay" type="number" default="1200"}
  Minimum delay between shooting stars in milliseconds.
  ::
  
  ::component-prop{name="maxDelay" type="number" default="4200"}
  Maximum delay between shooting stars in milliseconds.
  ::
  
  ::component-prop{name="starColor" type="string" default="'#9E00FF'"}
  Color of the shooting star.
  ::
  
  ::component-prop{name="trailColor" type="string" default="'#2EB9DF'"}
  Color of the shooting star trail.
  ::
  
  ::component-prop{name="starWidth" type="number" default="10"}
  Width of the shooting star.
  ::
  
  ::component-prop{name="starHeight" type="number" default="1"}
  Height of the shooting star.
  ::
  
  ::component-prop{name="class" type="string" default="''"}
  CSS classes to apply to the SVG container.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.shootingStars` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `w-full h-full absolute inset-0`
  ::
::

