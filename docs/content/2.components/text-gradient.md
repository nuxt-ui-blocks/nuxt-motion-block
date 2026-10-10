---
title: Text Gradient
description: Text with animated gradient effects and various animation styles.
navigation:
  icon: i-lucide-palette
---

# Text Gradient

The TextGradient component creates text with animated gradient effects and various animation styles. It's perfect for creating eye-catching headings and text elements with dynamic color transitions.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="text-gradient-custom-colors" />
  :::
#code
```vue
<template>
  <MTextGradient text="GRADIENT" />
</template>
```
::

## Props

::field-group
  ::field{name="text" type="string" default="''"}
  Text to display with gradient.
  ::
  
  ::field{name="as" type="string" default="'span'"}
  HTML element to render as.
  ::
  
  ::field{name="colors" type="string[]" default="['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7']"}
  Array of colors for the gradient.
  ::
  
  ::field{name="direction" type="'horizontal' | 'vertical' | 'diagonal' | 'radial'" default="'horizontal'"}
  Direction of the gradient.
  ::
  
  ::field{name="animation" type="'wave' | 'pulse' | 'flow' | 'rainbow' | 'static'" default="'wave'"}
  Animation type for the gradient.
  ::
  
  ::field{name="duration" type="number" default="3"}
  Animation duration in seconds.
  ::
  
  ::field{name="speed" type="number" default="1"}
  Animation speed multiplier.
  ::
  
  ::field{name="size" type="number" default="200"}
  Size of the gradient background.
  ::
  
  ::field{name="class" type="string" default="''"}
  CSS classes to apply to the text.
  ::
  
  ::field{name="hover" type="boolean" default="false"}
  Enable hover effect.
  ::
  
  ::field{name="ariaLabel" type="string" default="''"}
  Accessibility label for the text.
  ::
  
  ::field{name="hideFromScreenReader" type="boolean" default="false"}
  Hide from screen readers.
  ::
  
  ::field{name="reduceMotion" type="boolean" default="false"}
  Reduce motion for accessibility.
  ::
::

## Examples

### Basic Text Gradient

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="text-gradient-basic" />
  :::
#code
```vue
<template>
  <MTextGradient text="BASIC GRADIENT" />
</template>
```
::

### Custom Colors

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="text-gradient-custom-colors" />
  :::
#code
```vue
<template>
  <div class="p-4">
    <MTextGradient 
      text="TEAL GRADIENT" 
      :colors="['#0d9488', '#14b8a6', '#2dd4bf']"
      animation="wave"
    />
  </div>
</template>
```
::

### Vertical Direction

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="text-gradient-vertical" />
  :::
#code
```vue
<template>
  <MTextGradient text="VERTICAL" direction="vertical" />
</template>
```
::

### Rainbow Animation

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="text-gradient-rainbow" />
  :::
#code
```vue
<template>
  <MTextGradient text="RAINBOW" animation="rainbow" :duration="2" />
</template>
```
::

### With Hover Effect

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="text-gradient-hover" />
  :::
#code
```vue
<template>
  <MTextGradient text="HOVER ME" :hover="true" />
</template>
```
::

### As Heading

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="text-gradient-heading" />
  :::
#code
```vue
<template>
  <MTextGradient text="Heading Text" as="h1" class="text-4xl" />
</template>
```
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.textGradient` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `text-gradient bg-clip-text text-transparent font-bold` |
| `srOnly` | `sr-only` |
