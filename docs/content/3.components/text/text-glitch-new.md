---
title: Text Glitch New
description: Text with a glitch effect that creates a digital distortion appearance.
---

The TextGlitchNew component creates text with a glitch effect that creates a digital distortion appearance. It features customizable speed, shadow effects, and hover activation options for dynamic text animations.

The distortion comes from two pseudo-element copies of the string — one tinted red, one cyan — drawn behind the real text and clipped by a looping `clip-path` animation. `speed` scales the two animation durations, `enable-shadows` toggles the coloured offsets, and `enableOnHover` holds the whole thing still until the pointer arrives.

## Usage

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
  <div class="flex justify-center p-8 bg-accented rounded-lg">
    <MTextGlitchNew text="NEW GLITCH" />
  </div>
</template>

<script setup>
// This component will be registered globally in the documentation app
</script>
```
::

## Examples

### Glitch headline

`speed` scales both clip animations, so a larger value reads as a slower, heavier flicker. Pair it with a `class` to size the string for a hero.

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="text-glitch-new-example" />
  :::
#code
```vue
<template>
  <div class="flex justify-center p-8 bg-accented rounded-lg">
    <MTextGlitchNew
      text="GLITCH"
      :speed="0.8"
      class="text-6xl"
    />
  </div>
</template>
```
::

### Glitch on hover

Set `enable-on-hover` to keep the text still until the pointer arrives, which is what you want for a link or a button label that should not move on its own.

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
  <div class="flex flex-col items-center gap-3 p-8 bg-accented rounded-lg">
    <MTextGlitchNew
      text="HOVER"
      enable-on-hover
    />
    <p class="text-sm text-muted">
      The glitch only plays while the pointer is over the text.
    </p>
  </div>
</template>
```
::

### Without colour shadows

The red and cyan offsets are the `enable-shadows` prop. Turn them off for a plain geometric clip, which is calmer on small type and on coloured backgrounds.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="text-glitch-new-shadows" />
  :::
#code
```vue
<template>
  <div class="flex flex-col items-center gap-3 p-8 bg-accented rounded-lg">
    <MTextGlitchNew
      text="NO SHADOW"
      :enable-shadows="false"
      :speed="0.4"
    />
    <p class="text-sm text-muted">
      With the red and cyan shadows switched off.
    </p>
  </div>
</template>
```
::

## Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="text-glitch-new-custom" />
  :::
#code
  <PlaygroundCode name="TextGlitchNew" />
::

## Props

::component-props
  ::component-prop{name="text" type="string" required}
  Text to apply the glitch effect to.
  ::

  ::component-prop{name="speed" type="number" default="0.5"}
  Speed of the glitch animation. Scales the two clip-animation durations; larger is slower.
  ::

  ::component-prop{name="enableShadows" type="boolean" default="true"}
  Enable colored shadow effects.
  ::

  ::component-prop{name="enableOnHover" type="boolean" default="false"}
  Activate glitch effect only on hover.
  ::

  ::component-prop{name="class" type="string" default="''"}
  CSS classes to apply to the text.
  ::

  ::component-prop{name="ui" type="object" default="undefined"}
  Per-slot classes merged over the theme defaults. See [UI](#ui).
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.textGlitchNew` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `text-white text-[clamp(2rem,10vw,8rem)] font-black relative mx-auto select-none cursor-pointer`
  ::
::

## Accessibility

The string lives once in the element's text content; the red and cyan copies are pseudo-elements, so assistive technology reads the text a single time. Under `enable-on-hover` the effect is purely visual and adds no focusable target — if the text is also a link, the hover that reveals the glitch is a convenience, not the only way to reach it.

There is no `prefers-reduced-motion` handling: the clip animation loops regardless. When the user has asked for reduced motion, prefer a static string and enable the glitch only deliberately.

The root is `select-none`, so text selection is suppressed; keep it off strings users may want to copy.

## Performance

- The two shadow copies are `::before`/`::after` pseudo-elements driven by CSS `@keyframes`, so no JavaScript runs per frame and there is nothing to clean up on unmount.
- The animation changes `clip-path` and `text-shadow`, which are painted rather than composited — the cost scales with the glyph area, so keep it on short strings.
- `speed` is written to CSS custom properties (`--after-animation`, `--before-animation`); changing it re-renders the inline style but creates no new elements.
