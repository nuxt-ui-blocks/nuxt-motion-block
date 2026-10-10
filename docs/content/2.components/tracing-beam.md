---
title: Tracing Beam
description: A beam that follows the user's scroll position.
navigation:
  icon: i-lucide-git-branch-plus
---

# Tracing Beam

The Tracing Beam component creates a visual beam that follows the user's scroll position, connecting different sections of a page.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="tracing-beam-example" />
  :::
#code
```vue
<template>
  <MTracingBeam>
    <div class="h-[400px] w-full bg-gray-100 dark:bg-gray-800 rounded-lg mb-8"></div>
    <div class="h-[400px] w-full bg-gray-100 dark:bg-gray-800 rounded-lg mb-8"></div>
    <div class="h-[400px] w-full bg-gray-100 dark:bg-gray-800 rounded-lg mb-8"></div>
  </MTracingBeam>
</template>
```
::

## Props

::field-group
  ::field{name="class" type="string" default="''"}
  CSS classes to apply to the container element.
  ::
  ::field{name="beamColor" type="string[]" default="['#18CCFC', '#6344F5', '#AE48FF']"}
  An array of three colors to customize the beam gradient.
  ::
::

## Examples

### Custom Beam Color

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="tracing-beam-custom" />
  :::
#code
```vue
<template>
  <MTracingBeam :beam-color="['#FF0000', '#00FF00', '#0000FF']">
    <div class="h-[400px] w-full bg-gray-100 dark:bg-gray-800 rounded-.lg mb-8"></div>
    <div class="h-[400px] w-full bg-gray-100 dark:bg-gray-800 rounded-lg mb-8"></div>
    <div class="h-[400px] w-full bg-gray-100 dark:bg-gray-800 rounded-lg mb-8"></div>
  </MTracingBeam>
</template>
```
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.tracingBeam` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `'relative mx-auto h-full w-full max-w-4xl'` |
| `beam` | `'absolute top-3 -left-4 md:-left-20'` |
| `dot` | `'border-default ml-[27px] flex h-4 w-4 items-center justify-center rounded-full border shadow-sm'` |
| `dotInner` | `'h-2 w-2 rounded-full border border-default bg-default'` |
| `svg` | `'ml-4 block'` |
| `content` | `''` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.tracingBeam` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `relative mx-auto h-full w-full max-w-4xl` |
| `beam` | `absolute top-3 -left-4 md:-left-20` |
| `dot` | `border-default ml-[27px] flex h-4 w-4 items-center justify-center rounded-full border shadow-sm` |
| `dotInner` | `h-2 w-2 rounded-full border border-default bg-default` |
| `svg` | `ml-4 block` |
| `content` |  |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.tracingBeam` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `relative mx-auto h-full w-full max-w-4xl` |
| `beam` | `absolute top-3 -left-4 md:-left-20` |
| `dot` | `border-default ml-[27px] flex h-4 w-4 items-center justify-center rounded-full border shadow-sm` |
| `dotInner` | `h-2 w-2 rounded-full border border-default bg-default` |
| `svg` | `ml-4 block` |
| `content` |  |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.tracingBeam` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `relative mx-auto h-full w-full max-w-4xl` |
| `beam` | `absolute top-3 -left-4 md:-left-20` |
| `dot` | `border-default ml-[27px] flex h-4 w-4 items-center justify-center rounded-full border shadow-sm` |
| `dotInner` | `h-2 w-2 rounded-full border border-default bg-default` |
| `svg` | `ml-4 block` |
| `content` |  |
