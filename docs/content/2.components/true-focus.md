---
title: True Focus
description: Text focus effect with animated borders and blur transitions.
navigation:
  icon: i-lucide-eye
---

# True Focus

The TrueFocus component creates a text focus effect with animated borders and blur transitions. It highlights individual words with customizable borders, glow effects, and animation timing.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="true-focus-example" />
  :::
#code
```vue
<template>
  <div class="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
    <h3 class="text-lg font-bold mb-4 text-gray-900 dark:text-white">True Focus</h3>
    <MTrueFocus
      sentence="True Focus"
      :manual-mode="false"
      :blur-amount="5"
      border-color="red"
      :animation-duration="2"
      :pause-between-animations="1"
    />
  </div>
</template>
```
::

## Props

::field-group
  ::field{name="sentence" type="string" default="'True Focus'"}
  The sentence to display with focus effects.
  ::
  
  ::field{name="manualMode" type="boolean" default="false"}
  Whether to control focus manually or automatically.
  ::
  
  ::field{name="blurAmount" type="number" default="5"}
  Amount of blur to apply to unfocused words.
  ::
  
  ::field{name="borderColor" type="string" default="'green'"}
  Color of the focus border.
  ::
  
  ::field{name="glowColor" type="string" default="'rgba(0, 255, 0, 0.6)'"}
  Color of the glow effect.
  ::
  
  ::field{name="animationDuration" type="number" default="0.5"}
  Duration of the focus animation in seconds.
  ::
  
  ::field{name="pauseBetweenAnimations" type="number" default="1"}
  Pause between automatic animations in seconds.
  ::
::

## Examples

### Basic True Focus

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="true-focus-basic" />
  :::
#code
```vue
<template>
  <div class="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
    <h3 class="text-lg font-bold mb-4 text-gray-900 dark:text-white">Basic True Focus</h3>
    <MTrueFocus
      sentence="Focus Text"
      :manual-mode="true"
      :blur-amount="3"
    />
  </div>
</template>
```
::

### Custom True Focus

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="true-focus-custom" />
  :::
#code
```vue
<template>
  <div class="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
    <h3 class="text-lg font-bold mb-4 text-gray-900 dark:text-white">Custom True Focus</h3>
    <MTrueFocus
      sentence="Custom Focus Effect"
      :manual-mode="false"
      :blur-amount="8"
      border-color="blue"
      glow-color="rgba(0, 0, 255, 0.6)"
      :animation-duration="1.5"
      :pause-between-animations="2"
    />
  </div>
</template>
```
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.trueFocus` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `'relative flex gap-4 justify-center items-center flex-wrap'` |
| `word` | `'relative text-[3rem] font-black cursor-pointer'` |
| `focus` | `'absolute top-0 left-0 pointer-events-none box-border border-0'` |
| `corner` | `'absolute w-4 h-4 border-[3px] rounded-[3px]'` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.trueFocus` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `relative flex gap-4 justify-center items-center flex-wrap` |
| `word` | `relative text-[3rem] font-black cursor-pointer` |
| `focus` | `absolute top-0 left-0 pointer-events-none box-border border-0` |
| `corner` | `absolute w-4 h-4 border-[3px] rounded-[3px]` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.trueFocus` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `relative flex gap-4 justify-center items-center flex-wrap` |
| `word` | `relative text-[3rem] font-black cursor-pointer` |
| `focus` | `absolute top-0 left-0 pointer-events-none box-border border-0` |
| `corner` | `absolute w-4 h-4 border-[3px] rounded-[3px]` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.trueFocus` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `relative flex gap-4 justify-center items-center flex-wrap` |
| `word` | `relative text-[3rem] font-black cursor-pointer` |
| `focus` | `absolute top-0 left-0 pointer-events-none box-border border-0` |
| `corner` | `absolute w-4 h-4 border-[3px] rounded-[3px]` |
