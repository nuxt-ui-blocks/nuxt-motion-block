---
title: Dotted Glow Background
description: Animated dotted background with glowing effects and customizable colors.
navigation:
  icon: i-lucide-sparkles
---

# Dotted Glow Background

The DottedGlowBackground component creates an animated dotted background with glowing effects and customizable colors. It's perfect for creating visually appealing backgrounds with subtle animations.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="dotted-glow-background-example" />
  :::
#code
```vue
<template>
  <UContainer class="min-h-screen relative">
    <MDottedGlowBackground
      :gap="16"
      :radius="2"
      color-light-var="--color-gray-900"
      color-dark-var="--color-gray-100"
      glow-color-light-var="--color-primary-500"
      glow-color-dark-var="--color-primary-400"
      class="background"
    />

    <div class="relative z-10 py-12">
      <UCard class="max-w-2xl mx-auto backdrop-blur-sm bg-white/80 dark:bg-gray-900/80">
        <template #header>
          <div class="flex items-center justify-between">
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
              Welcome to Nuxt UI
            </h1>
            <UColorModeButton />
          </div>
        </template>
      </UCard>
    </div>
  </UContainer>
</template>
```
::

## Props

::field-group
  ::field{name="class" type="string" default="''"}
  CSS classes to apply to the container.
  ::
  
  ::field{name="style" type="object" default="{}"}
  Inline styles to apply to the container.
  ::
  
  ::field{name="gap" type="number" default="12"}
  Gap between dots in pixels.
  ::
  
  ::field{name="radius" type="number" default="2"}
  Radius of each dot in pixels.
  ::
  
  ::field{name="color" type="string" default="'rgba(0,0,0,0.7)'"}
  Color of the dots in light mode.
  ::
  
  ::field{name="darkColor" type="string" default="undefined"}
  Color of the dots in dark mode.
  ::
  
  ::field{name="glowColor" type="string" default="'rgba(0, 170, 255, 0.85)'"}
  Glow color of the dots in light mode.
  ::
  
  ::field{name="darkGlowColor" type="string" default="undefined"}
  Glow color of the dots in dark mode.
  ::
  
  ::field{name="colorLightVar" type="string" default="undefined"}
  CSS variable for dot color in light mode.
  ::
  
  ::field{name="colorDarkVar" type="string" default="undefined"}
  CSS variable for dot color in dark mode.
  ::
  
  ::field{name="glowColorLightVar" type="string" default="undefined"}
  CSS variable for glow color in light mode.
  ::
  
  ::field{name="glowColorDarkVar" type="string" default="undefined"}
  CSS variable for glow color in dark mode.
  ::
  
  ::field{name="opacity" type="number" default="0.6"}
  Opacity of the dots (0-1).
  ::
  
  ::field{name="backgroundOpacity" type="number" default="0"}
  Opacity of the background gradient (0-1).
  ::
  
  ::field{name="speedMin" type="number" default="0.4"}
  Minimum animation speed.
  ::
  
  ::field{name="speedMax" type="number" default="1.3"}
  Maximum animation speed.
  ::
  
  ::field{name="speedScale" type="number" default="1"}
  Scale factor for animation speed.
  ::
::

## Examples

### Basic Dotted Glow Background

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="dotted-glow-background-basic" />
  :::
#code
```vue
<template>
  <div class="relative h-64 rounded-lg overflow-hidden">
    <MDottedGlowBackground
      :gap="12"
      :radius="1.5"
      class="background"
    />
    <div class="relative z-10 h-full flex items-center justify-center">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white">Basic Dotted Glow</h3>
    </div>
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
    <component-example name="dotted-glow-background-custom" />
  :::
#code
```vue
<template>
  <div class="relative h-64 rounded-lg overflow-hidden">
    <MDottedGlowBackground
      :gap="20"
      :radius="3"
      :opacity="0.8"
      glow-color="rgba(236, 72, 153, 0.85)"
      class="background"
    />
    <div class="relative z-10 h-full flex items-center justify-center">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white">Custom Dotted Glow</h3>
    </div>
  </div>
</template>
```
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.dottedGlowBackground` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `''` |
| `canvas` | `''` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.dottedGlowBackground` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` |  |
| `canvas` |  |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.dottedGlowBackground` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` |  |
| `canvas` |  |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.dottedGlowBackground` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` |  |
| `canvas` |  |
