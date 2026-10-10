---
title: Text Glitch New
description: Text with a glitch effect that creates a digital distortion appearance.
navigation:
  icon: i-lucide-zap
---

# Text Glitch New

The TextGlitchNew component creates text with a glitch effect that creates a digital distortion appearance. It features customizable speed, shadow effects, and hover activation options for dynamic text animations.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="text-glitch-new-example" />
  :::
#code
```vue
<template>
  <div class="flex justify-center p-8 bg-gray-900 rounded-lg">
    <MTextGlitchNew text="GLITCH" :speed="0.8" />
  </div>
</template>
```
::

## Props

::field-group
  ::field{name="text" type="string" required}
  Text to apply the glitch effect to.
  ::
  
  ::field{name="speed" type="number" default="0.5"}
  Speed of the glitch animation.
  ::
  
  ::field{name="enableShadows" type="boolean" default="true"}
  Enable colored shadow effects.
  ::
  
  ::field{name="enableOnHover" type="boolean" default="false"}
  Activate glitch effect only on hover.
  ::
  
  ::field{name="class" type="string" default="''"}
  CSS classes to apply to the text.
  ::
::

## Examples

### Basic Text Glitch

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="text-glitch-new-basic" />
  :::
#code
```vue
<template>
  <div class="flex justify-center p-8 bg-gray-900 rounded-lg">
    <MTextGlitchNew text="NEW GLITCH" />
  </div>
</template>
```
::

### Hover Activation

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="text-glitch-new-hover" />
  :::
#code
```vue
<template>
  <div class="flex justify-center p-8 bg-gray-900 rounded-lg">
    <MTextGlitchNew text="HOVER GLITCH" :enable-on-hover="true" :speed="1.2" />
  </div>
</template>
```
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.textGlitchNew` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `'text-white text-[clamp(2rem,10vw,8rem)] font-black relative mx-auto select-none cursor-pointer'` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.textGlitchNew` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `text-white text-[clamp(2rem,10vw,8rem)] font-black relative mx-auto select-none cursor-pointer` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.textGlitchNew` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `text-white text-[clamp(2rem,10vw,8rem)] font-black relative mx-auto select-none cursor-pointer` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.textGlitchNew` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `text-white text-[clamp(2rem,10vw,8rem)] font-black relative mx-auto select-none cursor-pointer` |
