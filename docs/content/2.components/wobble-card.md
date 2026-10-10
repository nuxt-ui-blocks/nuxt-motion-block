---
title: Wobble Card
description: Card with a wobble effect that responds to cursor movement.
navigation:
  icon: i-lucide-waves
---

# Wobble Card

The WobbleCard component creates a card with a wobble effect that responds to cursor movement. It's perfect for creating interactive cards with fluid, organic animations.

The card tilts in 3D toward the cursor. `intensity` controls how far it tilts, and `speed` controls how quickly it settles back when the cursor leaves.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="wobble-card-example" />
  :::
#code
```vue
<template>
  <MWobbleCard>
    <template #header>
      <h3 class="text-xl font-bold">Wobble Card</h3>
    </template>
    <p>Move your cursor over this card to see the wobble effect.</p>
  </MWobbleCard>
</template>
```
::

## Props

::field-group
  ::field{name="class" type="string" default="''"}
  CSS classes to apply to the card.
  ::
  
  ::field{name="ui" type="object" default="{}"}
  UI configuration for the underlying UCard component.
  ::

  ::field{name="intensity" type="number" default="10"}
  Maximum tilt in degrees at the edge of the card.
  ::

  ::field{name="speed" type="number" default="300"}
  Duration in milliseconds of the return animation when the cursor leaves.
  ::
::

## Examples

### Basic Wobble Card

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="wobble-card-basic" />
  :::
#code
```vue
<template>
  <MWobbleCard>
    <template #header>
      <h3 class="text-lg font-semibold">Basic Wobble</h3>
    </template>
    <p>This card has a basic wobble effect.</p>
  </MWobbleCard>
</template>
```
::

### With Custom Styling

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="wobble-card-container" />
  :::
#code
```vue
<template>
  <MWobbleCard class="bg-primary w-full h-48">
    <template #header>
      <h3 class="text-lg font-semibold">Custom Styling</h3>
    </template>
    <p>This card applies a custom class to the card surface.</p>
  </MWobbleCard>
</template>
```
::

### With Gradient Styling

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="wobble-card-gradient" />
  :::
#code
```vue
<template>
  <MWobbleCard class="bg-gradient-to-r from-purple-500 to-pink-600 w-full h-48">
    <template #header>
      <h3 class="text-lg font-semibold text-white">Gradient Style</h3>
    </template>
    <p class="text-white">This card has gradient styling.</p>
  </MWobbleCard>
</template>
```
::

### With Dark Theme

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="wobble-card-dark" />
  :::
#code
```vue
<template>
  <MWobbleCard class="bg-indigo-800 w-full h-48">
    <template #header>
      <h3 class="text-lg font-semibold text-white">Dark Theme</h3>
    </template>
    <p class="text-indigo-200">This card uses a dark color scheme.</p>
  </MWobbleCard>
</template>
```
::

### With Slate Background

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="wobble-card-slate" />
  :::
#code
```vue
<template>
  <MWobbleCard class="bg-slate-800 w-full h-48">
    <template #header>
      <h3 class="text-lg font-semibold text-white">Slate Background</h3>
    </template>
    <p class="text-slate-300">This card uses a slate background.</p>
  </MWobbleCard>
</template>
```
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.wobbleCard` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `wrapper` | `'relative'` |
| `card` | `'h-full'` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.wobbleCard` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `wrapper` | `relative` |
| `card` | `h-full` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.wobbleCard` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `wrapper` | `relative` |
| `card` | `h-full` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.wobbleCard` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `wrapper` | `relative` |
| `card` | `h-full` |
