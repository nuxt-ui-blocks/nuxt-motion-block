---
title: Spinning Text
description: Text that spins with 3D effects.
navigation:
  icon: i-lucide-loader
---

# Spinning Text

The SpinningText component creates text that spins with 3D effects. It's perfect for creating eye-catching headings and animated text elements.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="p-4 flex justify-center"}
    <component-example name="spinning-text-usage" />
  :::
#code
```vue
<template>
  <MSpinningText children="SPINNING-TEXT-IS-AWESOME" />
</template>
```
::

## Props

::field-group
  ::field{name="children" type="string" :required="true"}
  Text to spin.
  ::
  
  ::field{name="style" type="object" default="undefined"}
  Custom styles to apply to the container.
  ::
  
  ::field{name="duration" type="number" default="10"}
  Animation duration in seconds.
  ::
  
  ::field{name="className" type="string" default="undefined"}
  CSS classes to apply to the container.
  ::
  
  ::field{name="reverse" type="boolean" default="false"}
  Reverse the spinning direction.
  ::
  
  ::field{name="fontSize" type="number" default="1"}
  Font size multiplier.
  ::
  
  ::field{name="radius" type="number" default="5"}
  Radius of the spinning circle.
  ::
  
  ::field{name="transition" type="object" default="{}"}
  Animation transition options.
  ::
  
  ::field{name="variants" type="object" default="{}"}
  Animation variants for container and items.
  ::
::

## Examples

### Basic Spinning Text

::code-preview
---
label: Preview
---
  :::div{class="p-4 flex justify-center"}
    <component-example name="spinning-text-basic" />
  :::
#code
```vue
<template>
  <div class="p-4 flex justify-center">
    <MSpinningText children="HELLO-WORLD-FROM-NUXT-MOTION" />
  </div>
</template>
```
::

### Custom Duration

::code-preview
---
label: Preview
---
  :::div{class="p-4 flex justify-center"}
    <component-example name="spinning-text-custom-duration" />
  :::
#code
```vue
<template>
  <div class="p-4 flex justify-center">
    <MSpinningText children="FAST-SPINNING-TEXT" :duration="3" />
  </div>
</template>
```
::

### Reverse Direction

::code-preview
---
label: Preview
---
  :::div{class="p-4 flex justify-center"}
    <component-example name="spinning-text-reverse" />
  :::
#code
```vue
<template>
  <div class="p-4 flex justify-center">
    <MSpinningText children="REVERSE-SPINNING-TEXT" :reverse="true" />
  </div>
</template>
```
::

### Custom Size and Radius

::code-preview
---
label: Preview
---
  :::div{class="p-4 flex justify-center"}
    <component-example name="spinning-text-custom-size" />
  :::
#code
```vue
<template>
  <div class="p-4 flex justify-center">
    <MSpinningText children="LARGE-SPINNING-TEXT" :font-size="2" :radius="8" />
  </div>
</template>
```
::

### With Custom Styling

::code-preview
---
label: Preview
---
  :::div{class="p-4 flex justify-center"}
    <component-example name="spinning-text-custom-styling" />
  :::
#code
```vue
<template>
  <div class="p-4 flex justify-center">
    <MSpinningText children="STYLED-SPINNING-TEXT" className="text-blue-500 font-bold" />
  </div>
</template>
```
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.spinningText` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `'relative'` |
| `letter` | `'absolute left-1/2 top-1/2 inline-block'` |
| `srLabel` | `'sr-only'` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.spinningText` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `relative` |
| `letter` | `absolute left-1/2 top-1/2 inline-block` |
| `srLabel` | `sr-only` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.spinningText` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `relative` |
| `letter` | `absolute left-1/2 top-1/2 inline-block` |
| `srLabel` | `sr-only` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.spinningText` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `relative` |
| `letter` | `absolute left-1/2 top-1/2 inline-block` |
| `srLabel` | `sr-only` |
