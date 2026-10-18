---
title: Stars Background
description: Animated starfield background with customizable density and twinkling effects.
---

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
      <h3 class="text-2xl font-bold text-white mb-2">
        Stars Background
      </h3>
      <p class="text-dimmed">
        Animated starfield background
      </p>
    </div>
  </div>
</template>
```
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
  <div class="relative h-96 w-full overflow-hidden rounded-xl border bg-gradient-to-br from-gray-900 to-black">
    <MStarsBackground />
    <div class="relative z-10 h-full flex flex-col items-center justify-center text-center p-8">
      <div class="mb-8">
        <div class="w-20 h-20 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center mx-auto">
          <UIcon
            name="i-lucide-sparkles"
            class="w-10 h-10 text-white"
          />
        </div>
      </div>
      <h2 class="text-4xl font-bold text-white mb-6">
        Starfield Background
      </h2>
      <p class="text-dimmed max-w-md mb-8 text-lg">
        Create an immersive starfield background with twinkling stars for a cosmic user experience
      </p>
      <div class="flex flex-col sm:flex-row gap-4">
        <UButton
          color="primary"
          variant="solid"
          size="lg"
        >
          Explore Universe
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
    <component-example name="stars-background-custom" />
  :::
#code
  <PlaygroundCode name="StarsBackground" />
::

## Props

::component-props
  ::component-prop{name="starDensity" type="number" default="0.00015"}
  Density of stars in the background (stars per pixel).
  ::
  
  ::component-prop{name="allStarsTwinkle" type="boolean" default="true"}
  Whether all stars should twinkle.
  ::
  
  ::component-prop{name="twinkleProbability" type="number" default="0.7"}
  Probability that a star will twinkle (0-1).
  ::
  
  ::component-prop{name="minTwinkleSpeed" type="number" default="0.5"}
  Minimum twinkling speed.
  ::
  
  ::component-prop{name="maxTwinkleSpeed" type="number" default="1"}
  Maximum twinkling speed.
  ::
  
  ::component-prop{name="class" type="string" default="''"}
  CSS classes to apply to the canvas container.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.starsBackground` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `h-full w-full absolute inset-0`
  ::
::

