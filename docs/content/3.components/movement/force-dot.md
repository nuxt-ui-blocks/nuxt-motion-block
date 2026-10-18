---
title: Force Dot
description: Interactive particle system with physics-based animations.
---

The ForceDot component creates an interactive particle system with physics-based animations. Dots respond to mouse movement with attraction or repulsion forces, creating dynamic visual effects.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="force-dot-basic" />
  :::
#code
```vue
<template>
  <div class="flex flex-col items-center p-8">
    <div class="text-center mb-8">
      <h3 class="text-2xl font-bold mb-3 text-highlighted">
        Force Dot
      </h3>
      <p class="text-muted max-w-md">
        Interactive physics-based dot that responds to cursor movements with realistic force simulations
      </p>
    </div>

    <div class="relative h-64 w-64 rounded-xl overflow-hidden border bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
      <MForceDot class="w-full h-full" />
    </div>

    <div class="mt-6 flex gap-3">
      <UButton
        color="primary"
        variant="solid"
        size="sm"
      >
        <UIcon
          name="i-lucide-play"
          class="w-4 h-4 mr-2"
        />
        Start Simulation
      </UButton>
      <UButton
        color="gray"
        variant="outline"
        size="sm"
      >
        <UIcon
          name="i-lucide-rotate-ccw"
          class="w-4 h-4 mr-2"
        />
        Reset
      </UButton>
    </div>
  </div>
</template>
```
::

## Examples

### With Custom Count and Size

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="force-dot-custom" />
  :::
#code
```vue
<template>
  <MForceDot
    :count="50"
    :width="400"
    :height="400"
  />
</template>
```
::

### Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="force-dot-playground" />
  :::
#code
  <PlaygroundCode name="ForceDot" />
::

## Props

::component-props
  ::component-prop{name="count" type="number" default="80"}
  Number of dots.
  ::
  
  ::component-prop{name="width" type="number" default="600"}
  Width of the container.
  ::
  
  ::component-prop{name="height" type="number" default="600"}
  Height of the container.
  ::
  
  ::component-prop{name="radius" type="number" default="12"}
  Collision radius of dots.
  ::
  
  ::component-prop{name="repel" type="boolean" default="true"}
  Enable mouse repulsion.
  ::
  
  ::component-prop{name="attract" type="boolean" default="false"}
  Enable mouse attraction.
  ::
  
  ::component-prop{name="influenceRadius" type="number" default="250"}
  Radius of mouse effect in pixels.
  ::
  
  ::component-prop{name="maxForce" type="number" default="3"}
  Strength of mouse effect.
  ::
  
  ::component-prop{name="speed" type="number" default="1"}
  Velocity multiplier.
  ::
  
  ::component-prop{name="dotClass" type="string" default="'fill-neutral-200'"}
  CSS classes for dots.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.forceDot` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `relative`
  ::
  ::component-slot-row{name="svg"}
  `overflow-visible`
  ::
  ::component-slot-row{name="dot"}
  ::
::

