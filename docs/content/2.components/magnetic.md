---
title: Magnetic
description: Component that creates a magnetic effect, attracting elements toward the cursor.
navigation:
  icon: i-lucide-magnet
---

# Magnetic

The Magnetic component creates a magnetic effect, attracting elements toward the cursor. It's perfect for creating interactive buttons and elements that respond to cursor proximity with smooth, physics-based animations.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="magnetic-example" />
  :::
#code
```vue
<template>
  <MMagnetic>
    <UButton color="primary">Magnetic Button</UButton>
  </MMagnetic>
</template>
```
::

## Props

::field-group
  ::field{name="intensity" type="number" default="0.6"}
  Magnetic intensity/strength.
  ::
  
  ::field{name="range" type="number" default="100"}
  Activation range in pixels.
  ::
  
  ::field{name="actionArea" type="string" default="'self'"}
  Area that triggers the effect ('self', 'parent', 'global').
  ::
  
  ::field{name="springOptions" type="object" default="{ stiffness: 26.7, damping: 4.1, mass: 0.2 }"}
  Spring physics options.
  ::
::

## Examples

### Basic Magnetic

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="magnetic-basic" />
  :::
#code
```vue
<template>
  <MMagnetic>
    <UButton color="secondary">Basic Magnetic</UButton>
  </MMagnetic>
</template>
```
::

### With Custom Intensity

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="magnetic-intensity" />
  :::
#code
```vue
<template>
  <MMagnetic :intensity="1.2" :range="150">
    <UButton color="tertiary">High Intensity</UButton>
  </MMagnetic>
</template>
```
::

### With Parent Action Area

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="magnetic-parent" />
  :::
#code
```vue
<template>
  <MMagnetic action-area="parent">
    <UButton color="primary">Parent Area</UButton>
  </MMagnetic>
</template>
```
::

### With Custom Spring Options

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="magnetic-spring" />
  :::
#code
```vue
<template>
  <MMagnetic :spring-options="{ stiffness: 50, damping: 5, mass: 0.5 }">
    <UButton color="primary" variant="outline">Custom Spring</UButton>
  </MMagnetic>
</template>
```
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.magnetic` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `''` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.magnetic` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` |  |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.magnetic` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` |  |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.magnetic` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` |  |
