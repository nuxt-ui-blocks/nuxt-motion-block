---
title: Background Lines
description: Animated SVG background with customizable colored lines that move across the screen.
---

The BackgroundLines component creates an animated SVG background with customizable colored lines that move across the screen. It features smooth animations with configurable colors, duration, and timing for dynamic visual effects.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="background-lines-example" />
  :::
#code
```vue
<template>
  <div class="relative h-96 w-full overflow-hidden rounded-lg border bg-accented">
    <MBackgroundLines
      class="h-full"
      :colors="['primary', 'secondary', 'error']"
    >
      <div class="relative z-10 h-full flex flex-col items-center justify-center text-highlighted">
        <h2 class="text-3xl font-bold mb-4">
          Background Lines
        </h2>
        <p class="text-lg mb-6 text-center max-w-md text-dimmed">
          Animated SVG lines with customizable colors
        </p>
        <button class="px-6 py-3 bg-default/10 backdrop-blur-sm rounded-full hover:bg-default/20 transition-colors">
          Explore
        </button>
      </div>
    </MBackgroundLines>
  </div>
</template>

<script setup>
// This component will be registered globally in the documentation app
</script>
```
::

## Examples

### Basic Background Lines

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="background-lines-basic" />
  :::
#code
```vue
<template>
  <div class="relative h-96 w-full overflow-hidden rounded-xl border bg-accented">
    <MBackgroundLines class="h-full">
      <div class="relative z-10 h-full flex flex-col items-center justify-center text-center p-6">
        <div class="mb-6">
          <div class="w-20 h-20 rounded-full bg-primary flex items-center justify-center mx-auto">
            <UIcon
              name="i-lucide-grid-3x3"
              class="w-10 h-10 text-inverted"
            />
          </div>
        </div>
        <h2 class="text-4xl font-bold text-highlighted mb-4">
          Grid System
        </h2>
        <p class="text-dimmed max-w-md mb-8">
          Enhance your layouts with dynamic grid lines that create structure and visual rhythm in your designs
        </p>
        <div class="flex flex-col sm:flex-row gap-4">
          <UButton
            color="primary"
            variant="solid"
            size="lg"
          >
            Learn More
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
    </MBackgroundLines>
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
    <component-example name="background-lines-custom" />
  :::
#code
  <PlaygroundCode name="BackgroundLines" />
::

## Props

::component-props
  ::component-prop{name="svgOptions" type="object" default="{}"}
  Options for the SVG animation including duration.
  ::
  
  ::component-prop{name="colors" type="string[]" default="['primary', 'secondary', 'success', 'info', 'warning', 'error']"}
  Array of colors for the lines. Each entry can be a theme token (`primary`, `var(--ui-primary)`) or any CSS colour.
  ::
  
  ::component-prop{name="class" type="string" default="''"}
  CSS classes to apply to the container.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.backgroundLines` in `app.config.ts`.

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
  `absolute inset-0 w-full h-full`
  ::
::

