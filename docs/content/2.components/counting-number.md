---
title: Counting Number
description: Number counter with various animation effects.
navigation:
  icon: i-lucide-hash
---

# Counting Number

The CountingNumber component creates animated number counters with various animation effects. It's perfect for displaying statistics, metrics, and any numerical data that benefits from a counting animation.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="counting-number-with-formatting" />
  :::
#code
```vue
<template>
  <MCountingNumber :to="1000" />
</template>
```
::

## Props

::field-group
  ::field{name="from" type="number" default="0"}
  Starting number.
  ::
  
  ::field{name="to" type="number" default="100"}
  Ending number.
  ::
  
  ::field{name="duration" type="number" default="2"}
  Animation duration in seconds.
  ::
  
  ::field{name="delay" type="number" default="0"}
  Animation delay in milliseconds.
  ::
  
  ::field{name="class" type="string" default="''"}
  CSS classes to apply to the component.
  ::
  
  ::field{name="startOnView" type="boolean" default="true"}
  Whether to start animation when element enters viewport.
  ::
  
  ::field{name="once" type="boolean" default="false"}
  Whether to animate only once.
  ::
  
  ::field{name="inViewMargin" type="string" default="'0px'"}
  Margin for viewport detection.
  ::
  
  ::field{name="format" type="function" default="undefined"}
  Custom formatting function.
  ::
::

## Events

::field-group
  ::field{name="complete" type="() => void"}
  Emitted when animation completes.
  ::
::

## Examples

### Basic Counting Number

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="counting-number-basic" />
  :::
#code
```vue
<template>
  <MCountingNumber :to="1500" />
</template>
```
::

### With Custom Duration

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="counting-number-duration" />
  :::
#code
```vue
<template>
  <MCountingNumber :from="100" :to="5000" :duration="3" />
</template>
```
::

### With Custom Styling

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="counting-number-styling" />
  :::
#code
```vue
<template>
  <MCountingNumber :to="75" class="text-3xl font-bold text-blue-600" />
</template>
```
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.countingNumber` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `'inline-block'` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.countingNumber` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `inline-block` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.countingNumber` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `inline-block` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.countingNumber` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `inline-block` |
