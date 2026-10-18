---
title: Background Ripple Effect
description: Interactive background ripple effect with customizable grid size and cell dimensions.
---

The BackgroundRippleEffect component creates an interactive background ripple effect with a grid of cells that respond to clicks. It's perfect for creating engaging backgrounds with visual feedback.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="background-ripple-effect-example" />
  :::
#code
```vue
<template>
  <div class="relative min-h-screen">
    <MBackgroundRippleEffect
      :rows="10"
      :cols="20"
      :cell-size="44"
    />

    <div class="relative z-10 p-8">
      <UContainer>
        <UCard class="backdrop-blur-sm bg-default/85 border">
          <template #header>
            <div class="flex items-center justify-between">
              <h1 class="text-2xl font-bold text-highlighted">
                Tailwind CSS 4 Ripple
              </h1>
              <UColorModeButton />
            </div>
          </template>

          <p class="text-muted mb-4">
            Click the background to see the new Tailwind 4 ripple effect!
          </p>
        </UCard>
      </UContainer>
    </div>
  </div>
</template>
```
::

## Examples

### Basic Background Ripple Effect

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="background-ripple-effect-basic" />
  :::
#code
```vue
<template>
  <div class="relative h-96 rounded-xl overflow-hidden bg-gradient-to-br from-blue-900 to-indigo-900">
    <MBackgroundRippleEffect
      :rows="6"
      :cols="12"
      :cell-size="30"
      class="absolute inset-0"
    />
    <div class="relative z-10 h-full flex flex-col items-center justify-center text-center p-6">
      <div class="mb-6">
        <div class="w-20 h-20 rounded-full bg-default/20 backdrop-blur-sm flex items-center justify-center mx-auto">
          <UIcon
            name="i-lucide-waveform"
            class="w-10 h-10 text-white"
          />
        </div>
      </div>
      <h2 class="text-4xl font-bold text-white mb-4">
        Ripple Effect
      </h2>
      <p class="text-primary max-w-md mb-8">
        Create interactive water-like ripples that respond to user movements for an engaging tactile experience
      </p>
      <div class="flex flex-col sm:flex-row gap-4">
        <UButton
          color="primary"
          variant="solid"
          size="lg"
        >
          Try It Out
        </UButton>
        <UButton
          color="neutral"
          variant="outline"
          size="lg"
        >
          See Demo
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
    <component-example name="background-ripple-effect-custom" />
  :::
#code
  <PlaygroundCode name="BackgroundRippleEffect" />
::

## Props

::component-props
  ::component-prop{name="rows" type="number" default="8"}
  Number of rows in the grid.
  ::
  
  ::component-prop{name="cols" type="number" default="27"}
  Number of columns in the grid.
  ::
  
  ::component-prop{name="cellSize" type="number" default="56"}
  Size of each cell in pixels.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.backgroundRippleEffect` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `background-ripple-effect absolute inset-0 h-full w-full [--cell-border-color:var(--color-neutral-300)] [--cell-fill-color:var(--color-neutral-100)] [--cell-shadow-color:var(--color-neutral-500)] dark:[--cell-border-color:var(--color-neutral-700)] dark:[--cell-fill-color:var(--color-neutral-900)] dark:[--cell-shadow-color:var(--color-neutral-800)]`
  ::
  ::component-slot-row{name="inner"}
  `relative h-auto w-auto overflow-hidden`
  ::
  ::component-slot-row{name="mask"}
  `pointer-events-none absolute inset-0 z-[2] h-full w-full overflow-hidden`
  ::
  ::component-slot-row{name="grid"}
  `mask-radial-from-20% mask-radial-at-top opacity-600`
  ::
::

