---
title: Force Dot
description: Interactive particle system with physics-based animations.
navigation:
  icon: i-lucide-circle-dot
---

# Force Dot

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
  <MForceDot />
</template>
```
::

## Props

::field-group
  ::field{name="count" type="number" default="80"}
  Number of dots.
  ::
  
  ::field{name="width" type="number" default="600"}
  Width of the container.
  ::
  
  ::field{name="height" type="number" default="600"}
  Height of the container.
  ::
  
  ::field{name="radius" type="number" default="12"}
  Collision radius of dots.
  ::
  
  ::field{name="repel" type="boolean" default="true"}
  Enable mouse repulsion.
  ::
  
  ::field{name="attract" type="boolean" default="false"}
  Enable mouse attraction.
  ::
  
  ::field{name="influenceRadius" type="number" default="250"}
  Radius of mouse effect in pixels.
  ::
  
  ::field{name="maxForce" type="number" default="3"}
  Strength of mouse effect.
  ::
  
  ::field{name="speed" type="number" default="1"}
  Velocity multiplier.
  ::
  
  ::field{name="dotClass" type="string" default="'fill-neutral-200'"}
  CSS classes for dots.
  ::
::

## Examples

### Basic Force Dot

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
  <MForceDot />
</template>
```
::

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
  <MForceDot :count="50" :width="400" :height="400" />
</template>
```
::

### With Attraction Only

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="force-dot-attract" />
  :::
#code
```vue
<template>
  <MForceDot :repel="false" :attract="true" :max-force="5" />
</template>
```
::

### With Custom Styling

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="force-dot-styled" />
  :::
#code
```vue
<template>
  <MForceDot dot-class="fill-blue-500" :radius="8" />
</template>
```
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.forceDot` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `'relative'` |
| `svg` | `'overflow-visible'` |
| `dot` | `''` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.forceDot` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `relative` |
| `svg` | `overflow-visible` |
| `dot` |  |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.forceDot` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `relative` |
| `svg` | `overflow-visible` |
| `dot` |  |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.forceDot` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `relative` |
| `svg` | `overflow-visible` |
| `dot` |  |
