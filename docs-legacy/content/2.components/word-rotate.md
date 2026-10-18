---
title: Word Rotate
description: Component that rotates through different words with smooth transitions.
navigation:
  icon: i-lucide-refresh-cw
---

# Word Rotate

The WordRotate component rotates through different words with smooth transitions. It's perfect for creating dynamic text elements that cycle through different options with engaging animations.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="word-rotate-basic" />
  :::
#code
```vue
<template>
  <MWordRotate :words="['Design', 'Develop', 'Deploy']" />
</template>
```
::

## Props

::field-group
  ::field{name="words" type="string[]" :required="true"}
  Array of words to rotate through.
  ::
  
  ::field{name="duration" type="number" default="1500"}
  Duration each word is visible in milliseconds.
  ::
  
  ::field{name="animation" type="'fade' | 'slide-up' | 'slide-down' | 'scale' | 'flip'" default="'fade'"}
  Animation style for transitions.
  ::
  
  ::field{name="loop" type="boolean" default="true"}
  Whether to loop through words.
  ::
  
  ::field{name="pauseDuration" type="number" default="300"}
  Pause duration between word transitions.
  ::
  
  ::field{name="class" type="string" default="''"}
  CSS classes to apply to the word container.
  ::
  
  ::field{name="containerClass" type="string" default="''"}
  CSS classes to apply to the container.
  ::
  
  ::field{name="startOnView" type="boolean" default="true"}
  Start animation when component enters viewport.
  ::
  
  ::field{name="once" type="boolean" default="false"}
  Animate only once.
  ::
  
  ::field{name="inViewMargin" type="string" default="'0px'"}
  Margin for in-view detection.
  ::
::

## Examples

### Basic Word Rotate

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="word-rotate-basic" />
  :::
#code
```vue
<template>
  <MWordRotate :words="['Design', 'Develop', 'Deploy']" />
</template>
```
::

### Flip Animation

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="word-rotate-flip" />
  :::
#code
```vue
<template>
  <MWordRotate 
    :words="['Create', 'Build', 'Launch']" 
    animation="flip" 
  />
</template>
```
::

### Slide Animation

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="word-rotate-slide" />
  :::
#code
```vue
<template>
  <MWordRotate 
    :words="['Imagine', 'Create', 'Innovate']" 
    animation="slide" 
  />
</template>
```
::

### Pause on Hover

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="word-rotate-pause" />
  :::
#code
```vue
<template>
  <MWordRotate 
    :words="['Explore', 'Discover', 'Learn']" 
    :pause-on-hover="true" 
  />
</template>
```
::

### Custom Styling

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="word-rotate-style" />
  :::
#code
```vue
<template>
  <MWordRotate 
    :words="['Bold', 'Creative', 'Unique']" 
    class="text-2xl font-bold text-purple-600" 
  />
</template>
```
::

### Continuous Loop

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="word-rotate-loop" />
  :::
#code
```vue
<template>
  <MWordRotate 
    :words="['Forever', 'Always', 'Continuously']" 
    :loop="true" 
  />
</template>
```
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.wordRotate` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `inline-block overflow-hidden` |
| `word` | `inline-block overflow-hidden` |
