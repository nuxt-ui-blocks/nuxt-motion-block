---
title: Text Reveal
description: Text reveal animation with various effects.
navigation:
  icon: i-lucide-eye
---

# Text Reveal

The TextReveal component animates text with various reveal effects. It's perfect for creating engaging headlines, descriptions, and content sections.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="text-reveal-example" />
  :::
#code
```vue
<template>
  <MTextReveal text="Reveal this text with animation" />
</template>
```
::

## Props

::field-group
  ::field{name="text" type="string" :required="true"}
  Text to reveal.
  ::
  ::field{name="effect" type="'fade' | 'slide' | 'bounce' | 'rotate' | 'scale' | 'blur'" default="'slide'"}
  Reveal effect.
  ::
  ::field{name="direction" type="'up' | 'down' | 'left' | 'right' | 'random'" default="'up'"}
  Reveal direction.
  ::
  ::field{name="duration" type="number" default="0.6"}
  Animation duration in seconds.
  ::
  ::field{name="delay" type="number" default="0"}
  Animation delay in seconds.
  ::
  ::field{name="stagger" type="number" default="0.05"}
  Delay between characters in seconds.
  ::
::

## Examples

### Fade Effect

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="text-reveal-fade" />
  :::
#code
```vue
<template>
  <MTextReveal effect="fade" text="This text fades in character by character" />
</template>
```
::

### Slide Effect

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="text-reveal-slide" />
  :::
#code
```vue
<template>
  <MTextReveal effect="slide" :duration="0.8" text="This text slides in from below" />
</template>
```
::

### Typewriter Effect

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="text-reveal-typewriter" />
  :::
#code
```vue
<template>
  <MTextReveal effect="fade" :duration="2" :delay="0.5" :stagger="0.1" text="This text is typed out like a typewriter" />
</template>
```
::

### Slow Stagger

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="text-reveal-slow" />
  :::
#code
```vue
<template>
  <MTextReveal :stagger="0.1" text="Slow stagger effect" />
</template>
```
::

### Fast Stagger

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="text-reveal-fast" />
  :::
#code
```vue
<template>
  <MTextReveal :stagger="0.02" text="Fast stagger effect" />
</template>
```
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.textReveal` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `'text-reveal-container inline-block'` |
| `char` | `'text-reveal-char relative'` |
| `charInner` | `'inline-block'` |
| `srOnly` | `'sr-only'` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.textReveal` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `text-reveal-container inline-block` |
| `char` | `text-reveal-char relative` |
| `charInner` | `inline-block` |
| `srOnly` | `sr-only` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.textReveal` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `text-reveal-container inline-block` |
| `char` | `text-reveal-char relative` |
| `charInner` | `inline-block` |
| `srOnly` | `sr-only` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.textReveal` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `text-reveal-container inline-block` |
| `char` | `text-reveal-char relative` |
| `charInner` | `inline-block` |
| `srOnly` | `sr-only` |
