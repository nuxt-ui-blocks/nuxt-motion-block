---
title: Background Lines
description: Animated SVG background with customizable colored lines that move across the screen.
navigation:
  icon: i-lucide-waves
---

# Background Lines

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
  <div class="relative h-96 w-full overflow-hidden rounded-lg border bg-gray-900">
    <MBackgroundLines :colors="['#46A5CA', '#8C2F2F', '#4FAE4D']">
      <div class="relative z-10 h-full flex flex-col items-center justify-center text-white">
        <h2 class="text-3xl font-bold mb-4">Background Lines</h2>
        <p class="text-lg mb-6 text-center max-w-md text-gray-300">
          Animated SVG lines with customizable colors
        </p>
        <button class="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors">
          Explore
        </button>
      </div>
    </MBackgroundLines>
  </div>
</template>
```
::

## Props

::field-group
  ::field{name="svgOptions" type="object" default="{}"}
  Options for the SVG animation including duration.
  ::
  
  ::field{name="colors" type="string[]" default="['#46A5CA', '#8C2F2F', '#4FAE4D', '#D6590C', '#811010', '#247AFB', '#A534A0', '#A8A438', '#D6590C', '#46A29C', '#670F6D', '#D7C200', '#59BBEB', '#504F1C', '#55BC54', '#4D3568', '#9F39A5', '#363636', '#860909', '#6A286F', '#604483']"}
  Array of colors for the lines.
  ::
  
  ::field{name="class" type="string" default="''"}
  CSS classes to apply to the container.
  ::
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
  <div class="relative h-64 w-full overflow-hidden rounded-lg border bg-gray-900">
    <MBackgroundLines>
      <div class="relative z-10 h-full flex items-center justify-center text-white">
        <h3 class="text-xl font-bold">Basic Lines</h3>
      </div>
    </MBackgroundLines>
  </div>
</template>
```
::

### Custom Colors

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="background-lines-custom-colors" />
  :::
#code
```vue
<template>
  <div class="relative h-64 w-full overflow-hidden rounded-lg border bg-gray-900">
    <MBackgroundLines 
      :colors="['#FF5733', '#33FF57', '#3357FF', '#F1C40F', '#9B59B6']"
      :svg-options="{ duration: 15 }"
    >
      <div class="relative z-10 h-full flex flex-col items-center justify-center text-white space-y-4">
        <h3 class="text-2xl font-bold">Custom Colors</h3>
        <p class="text-center max-w-md text-gray-300">
          Lines with custom colors and animation duration
        </p>
      </div>
    </MBackgroundLines>
  </div>
</template>
```
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.backgroundLines` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `'relative'` |
| `svg` | `'absolute inset-0 w-full h-full'` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.backgroundLines` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `relative` |
| `svg` | `absolute inset-0 w-full h-full` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.backgroundLines` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `relative` |
| `svg` | `absolute inset-0 w-full h-full` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.backgroundLines` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `relative` |
| `svg` | `absolute inset-0 w-full h-full` |
