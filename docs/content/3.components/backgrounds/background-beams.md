---
title: Background Beams
description: Animated SVG background with customizable beam paths and gradient colors.
---

The BackgroundBeams component creates an animated SVG background with customizable beam paths and gradient colors. It's perfect for creating dynamic background effects with smooth animations.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="background-beams-example" />
  :::
#code
```vue
<template>
  <UCard class="relative overflow-hidden">
    <template #header>
      <h2 class="text-xl font-semibold">
        Background Beams
      </h2>
    </template>
    <p class="text-muted mb-4">
      Animated background beams effect
    </p>
    <MBackgroundBeams
      class="h-64 w-full"
      :num-paths="25"
      :stroke-opacity="1"
    />
  </UCard>
</template>
```
::

## Examples

### Basic Background Beams

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="background-beams-basic" />
  :::
#code
```vue
<template>
  <div class="relative h-96 rounded-xl overflow-hidden border border-default bg-gradient-to-br from-gray-900 to-black">
    <MBackgroundBeams
      class="h-full w-full"
      :num-paths="15"
      :stroke-opacity="0.7"
    />
    <div class="relative z-10 h-full flex flex-col items-center justify-center text-center p-6">
      <div class="mb-6">
        <div class="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center mx-auto">
          <UIcon
            name="i-lucide-zap"
            class="w-10 h-10 text-white"
          />
        </div>
      </div>
      <h2 class="text-4xl font-bold text-white mb-4">
        Beam Network
      </h2>
      <p class="text-dimmed max-w-md mb-8">
        Connect your interface with dynamic beam effects that create a futuristic and engaging user experience
      </p>
      <div class="flex flex-col sm:flex-row gap-4">
        <UButton
          color="primary"
          variant="solid"
          size="lg"
        >
          Explore Features
        </UButton>
        <UButton
          color="neutral"
          variant="outline"
          size="lg"
        >
          View Documentation
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
    <component-example name="background-beams-custom" />
  :::
#code
  <PlaygroundCode name="BackgroundBeams" />
::

## Props

::component-props
  ::component-prop{name="className" type="string" default="''"}
  CSS classes to apply to the container.
  ::
  
  ::component-prop{name="gradientColors" type="string[]" default="['#18CCFC', '#18CCFC', '#6344F5', '#AE48FF']"}
  Colors for the beam gradient. Each value accepts a [Nuxt UI color token](/getting-started/theming) (e.g. `primary`) or any CSS color.
  ::
  
  ::component-prop{name="strokeOpacity" type="number" default="0.4"}
  Opacity of the beam strokes (0-1).
  ::
  
  ::component-prop{name="numPaths" type="number" default="50"}
  Number of beam paths to display.
  ::
  
  ::component-prop{name="duration" type="array" default="[10, 20]"}
  Min and max duration for animations.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.backgroundBeams` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `absolute inset-0 flex h-full w-full items-center justify-center [mask-repeat:no-repeat] [mask-size:40px]`
  ::
  ::component-slot-row{name="svg"}
  `pointer-events-none absolute z-0 h-full w-full`
  ::
::

