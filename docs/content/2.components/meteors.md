---
title: Meteors
description: Animated meteor shower effect with customizable density and timing.
navigation:
  icon: i-lucide-star
---

# Meteors

The Meteors component creates an animated meteor shower effect with customizable density and timing. It's perfect for adding dynamic background animations to your UI.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="meteors-example" />
  :::
#code
```vue
<template>
  <div class="relative h-64 w-full overflow-hidden rounded-lg border bg-gradient-to-br from-gray-900 to-black">
    <MMeteors :count="30" />
    <div class="relative z-10 h-full flex flex-col items-center justify-center text-center p-4">
      <h3 class="text-2xl font-bold text-white mb-2">Meteor Shower</h3>
      <p class="text-gray-300">Animated meteor shower effect</p>
    </div>
  </div>
</template>
```
::

## Props

::field-group
  ::field{name="count" type="number" default="10"}
  Number of meteors to display in the shower.
  ::

  ::field{name="speed" type="number" default="1"}
  Multiplier for the fall speed. Higher values make the meteors fall faster, `2` is twice as fast.
  ::
  
  ::field{name="class" type="string" default="''"}
  CSS classes to apply to the container. The container fills its parent, so give the parent a height.
  ::
::

## Examples

### Basic Meteor Shower

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="meteors-basic" />
  :::
#code
```vue
<template>
  <div class="relative h-64 w-full overflow-hidden rounded-lg border bg-gradient-to-br from-gray-900 to-black">
    <MMeteors />
    <div class="relative z-10 h-full flex items-center justify-center">
      <h3 class="text-xl font-bold text-white">Basic Meteor Shower</h3>
    </div>
  </div>
</template>
```
::

### Custom Meteor Count

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="meteors-custom-count" />
  :::
#code
```vue
<template>
  <div class="relative h-64 w-full overflow-hidden rounded-lg border bg-gradient-to-br from-gray-900 to-black">
    <MMeteors :count="50" />
    <div class="relative z-10 h-full flex flex-col items-center justify-center text-center p-4">
      <h3 class="text-xl font-bold text-white mb-2">Dense Meteor Shower</h3>
      <p class="text-gray-300">50 meteors for a more intense effect</p>
    </div>
  </div>
</template>
```
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.meteors` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `'relative h-full w-full overflow-hidden'` |
| `meteor` | `'meteor'` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.meteors` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `relative h-full w-full overflow-hidden` |
| `meteor` | `meteor` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.meteors` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `relative h-full w-full overflow-hidden` |
| `meteor` | `meteor` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.meteors` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `relative h-full w-full overflow-hidden` |
| `meteor` | `meteor` |
