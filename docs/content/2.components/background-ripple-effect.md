---
title: Background Ripple Effect
description: Interactive background ripple effect with customizable grid size and cell dimensions.
navigation:
  icon: i-lucide-waves
---

# Background Ripple Effect

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
        <UCard class="backdrop-blur-sm bg-white/85 dark:bg-gray-900/85 border">
          <template #header>
            <div class="flex items-center justify-between">
              <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
                Tailwind CSS 4 Ripple
              </h1>
              <UColorModeButton />
            </div>
          </template>

          <p class="text-gray-600 dark:text-gray-300 mb-4">
            Click the background to see the new Tailwind 4 ripple effect!
          </p>
        </UCard>
      </UContainer>
    </div>
  </div>
</template>
```
::

## Props

::field-group
  ::field{name="rows" type="number" default="8"}
  Number of rows in the grid.
  ::
  
  ::field{name="cols" type="number" default="27"}
  Number of columns in the grid.
  ::
  
  ::field{name="cellSize" type="number" default="56"}
  Size of each cell in pixels.
  ::
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
  <div class="relative h-64 rounded-lg overflow-hidden">
    <MBackgroundRippleEffect
      :rows="6"
      :cols="12"
      :cell-size="30"
    />
    <div class="relative z-10 h-full flex items-center justify-center">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white">Basic Ripple Effect</h3>
    </div>
  </div>
</template>
```
::

### Custom Grid Size

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="background-ripple-effect-custom" />
  :::
#code
```vue
<template>
  <div class="relative h-64 rounded-lg overflow-hidden">
    <MBackgroundRippleEffect
      :rows="15"
      :cols="25"
      :cell-size="20"
    />
    <div class="relative z-10 h-full flex items-center justify-center">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white">Custom Ripple Effect</h3>
    </div>
  </div>
</template>
```
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.backgroundRippleEffect` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `'background-ripple-effect absolute inset-0 h-full w-full [--cell-border-color:var(--color-neutral-300)] [--cell-fill-color:var(--color-neutral-100)] [--cell-shadow-color:var(--color-neutral-500)] dark:[--cell-border-color:var(--color-neutral-700)] dark:[--cell-fill-color:var(--color-neutral-900)] dark:[--cell-shadow-color:var(--color-neutral-800)]'` |
| `inner` | `'relative h-auto w-auto overflow-hidden'` |
| `mask` | `'pointer-events-none absolute inset-0 z-[2] h-full w-full overflow-hidden'` |
| `grid` | `'mask-radial-from-20% mask-radial-at-top opacity-600'` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.backgroundRippleEffect` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `background-ripple-effect absolute inset-0 h-full w-full [--cell-border-color:var(--color-neutral-300)] [--cell-fill-color:var(--color-neutral-100)] [--cell-shadow-color:var(--color-neutral-500)] dark:[--cell-border-color:var(--color-neutral-700)] dark:[--cell-fill-color:var(--color-neutral-900)] dark:[--cell-shadow-color:var(--color-neutral-800)]` |
| `inner` | `relative h-auto w-auto overflow-hidden` |
| `mask` | `pointer-events-none absolute inset-0 z-[2] h-full w-full overflow-hidden` |
| `grid` | `mask-radial-from-20% mask-radial-at-top opacity-600` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.backgroundRippleEffect` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `background-ripple-effect absolute inset-0 h-full w-full [--cell-border-color:var(--color-neutral-300)] [--cell-fill-color:var(--color-neutral-100)] [--cell-shadow-color:var(--color-neutral-500)] dark:[--cell-border-color:var(--color-neutral-700)] dark:[--cell-fill-color:var(--color-neutral-900)] dark:[--cell-shadow-color:var(--color-neutral-800)]` |
| `inner` | `relative h-auto w-auto overflow-hidden` |
| `mask` | `pointer-events-none absolute inset-0 z-[2] h-full w-full overflow-hidden` |
| `grid` | `mask-radial-from-20% mask-radial-at-top opacity-600` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.backgroundRippleEffect` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `background-ripple-effect absolute inset-0 h-full w-full [--cell-border-color:var(--color-neutral-300)] [--cell-fill-color:var(--color-neutral-100)] [--cell-shadow-color:var(--color-neutral-500)] dark:[--cell-border-color:var(--color-neutral-700)] dark:[--cell-fill-color:var(--color-neutral-900)] dark:[--cell-shadow-color:var(--color-neutral-800)]` |
| `inner` | `relative h-auto w-auto overflow-hidden` |
| `mask` | `pointer-events-none absolute inset-0 z-[2] h-full w-full overflow-hidden` |
| `grid` | `mask-radial-from-20% mask-radial-at-top opacity-600` |
