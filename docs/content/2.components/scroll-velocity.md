---
title: Scroll Velocity
description: Text animation that responds to scroll velocity with customizable speed and damping.
navigation:
  icon: i-lucide-move-diagonal
---

# Scroll Velocity

The ScrollVelocity component creates text animations that respond to scroll velocity with customizable speed, damping, and stiffness. It's perfect for creating dynamic text effects that react to user scrolling.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="scroll-velocity-example" />
  :::
#code
```vue
<template>
  <div class="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
    <h3 class="text-lg font-bold mb-4 text-gray-900 dark:text-white">Scroll Velocity</h3>
    <MScrollVelocity
      :texts="['Nuxt Motion Block', 'Scroll Down']"
      :velocity="100"
      :damping="50"
      :stiffness="400"
      :num-copies="6"
    />
  </div>
</template>
```
::

## Props

::field-group
  ::field{name="scrollContainerRef" type="any" default="undefined"}
  Reference to the scroll container element.
  ::
  
  ::field{name="texts" type="string[]" default="[]"}
  Array of texts to display.
  ::
  
  ::field{name="velocity" type="number" default="100"}
  Base velocity of the animation.
  ::
  
  ::field{name="class" type="string" default="''"}
  CSS classes to apply to the text elements.
  ::
  
  ::field{name="damping" type="number" default="50"}
  Damping factor for the spring animation.
  ::
  
  ::field{name="stiffness" type="number" default="400"}
  Stiffness factor for the spring animation.
  ::
  
  ::field{name="numCopies" type="number" default="6"}
  Number of copies of the text to display.
  ::
  
  ::field{name="velocityMapping" type="object" default="{ input: [0, 1000], output: [0, 5] }"}
  Mapping of scroll velocity to animation speed.
  ::
  
  ::field{name="parallaxClass" type="string" default="''"}
  CSS classes to apply to the parallax container.
  ::
  
  ::field{name="scrollerClass" type="string" default="''"}
  CSS classes to apply to the scroller container.
  ::
  
  ::field{name="parallaxStyle" type="object" default="{}"}
  Inline styles to apply to the parallax container.
  ::
  
  ::field{name="scrollerStyle" type="object" default="{}"}
  Inline styles to apply to the scroller container.
  ::
::

## Examples

### Basic Scroll Velocity

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="scroll-velocity-basic" />
  :::
#code
```vue
<template>
  <div class="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
    <h3 class="text-lg font-bold mb-4 text-gray-900 dark:text-white">Basic Scroll Velocity</h3>
    <MScrollVelocity
      :texts="['Scroll Effect']"
      :velocity="50"
    />
  </div>
</template>
```
::

### Custom Scroll Velocity

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="scroll-velocity-custom" />
  :::
#code
```vue
<template>
  <div class="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
    <h3 class="text-lg font-bold mb-4 text-gray-900 dark:text-white">Custom Scroll Velocity</h3>
    <MScrollVelocity
      :texts="['Fast Scroll', 'Effect']"
      :velocity="200"
      :damping="30"
      :stiffness="600"
      :num-copies="8"
      class="text-5xl font-bold text-purple-600 dark:text-purple-400"
    />
  </div>
</template>
```
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.scrollVelocity` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` |  |
| `parallax` | `relative overflow-hidden` |
| `scroller` | `flex whitespace-nowrap text-center font-sans text-4xl font-bold tracking-[-0.02em] drop-shadow md:text-[5rem] md:leading-[5rem]` |
| `text` | `flex-shrink-0` |
