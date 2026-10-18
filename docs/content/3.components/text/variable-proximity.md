---
title: Variable Proximity
description: Text effect that responds to mouse proximity with variable font properties.
---

The VariableProximity component creates a text effect that responds to mouse proximity with variable font properties. It requires a font with variable axes (like Inter) to work properly.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="variable-proximity-basic" />
  :::
#code
```vue
<template>
  <div class="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-xl max-w-2xl mx-auto">
    <div class="text-center mb-8">
      <h3 class="text-2xl font-bold mb-3 text-highlighted">
        Proximity Effect
      </h3>
      <p class="text-muted">
        Interactive text that responds to cursor proximity for engaging user experiences
      </p>
    </div>

    <link
      rel="stylesheet"
      href="https://rsms.me/inter/inter.css"
    >
    <div
      class="relative p-8 bg-default rounded-lg shadow"
      style="font-family: 'Inter var', 'Inter', sans-serif;"
    >
      <MVariableProximity
        label="Hover Over Me"
        class="text-4xl font-bold text-center"
        :radius="100"
      />

      <div class="mt-6 text-center">
        <p class="text-muted text-sm">
          Move your cursor around the text to see the proximity effect in action
        </p>
      </div>
    </div>

    <div class="mt-6 flex justify-center">
      <UButton
        color="primary"
        variant="solid"
      >
        <UIcon
          name="i-lucide-mouse-pointer"
          class="w-4 h-4 mr-2"
        />
        Try It Yourself
      </UButton>
    </div>
  </div>
</template>
```
::

## Examples

### Wide weight range

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="variable-proximity-example" />
  :::
#code
```vue
<template>
  <div class="p-6 bg-elevated rounded-lg">
    <h3 class="text-lg font-bold mb-4 text-highlighted">
      Variable Proximity
    </h3>
    <link
      rel="stylesheet"
      href="https://rsms.me/inter/inter.css"
    >
    <div
      class="relative"
      style="font-family: 'Inter var', 'Inter', sans-serif;"
    >
      <MVariableProximity
        label="Hover me! Nuxt Motion Block"
        class="text-4xl"
        from-font-variation-settings="'wght' 400, 'opsz' 9"
        to-font-variation-settings="'wght' 1000, 'opsz' 40"
        :radius="120"
        falloff="linear"
      />
    </div>
  </div>
</template>
```
::

The two `fontVariationSettings` strings are the endpoints: characters sit at the
`from` values and animate toward the `to` values as the pointer nears them, then
spring back to `from` on leave. `radius` decides how much of the line the pointer
influences at once — the component interpolates linearly from `0` at the pointer
to `1` at the radius edge.

### Whole-card hover area

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="variable-proximity-card" />
  :::
#code
```vue
<template>
  <div
    ref="cardRef"
    class="mx-6 max-w-xl rounded-xl border border-default bg-elevated p-8"
    style="font-family: 'Inter var', 'Inter', sans-serif;"
  >
    <link
      rel="stylesheet"
      href="https://rsms.me/inter/inter.css"
    >
    <p class="mb-6 text-sm text-muted">
      The pointer is tracked across the whole card, not just the headline —
      the ref is passed through `containerRef`.
    </p>
    <MVariableProximity
      label="Design is a conversation"
      :container-ref="cardRef"
      class="text-3xl font-semibold text-highlighted"
      :radius="180"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const cardRef = ref<HTMLElement | null>(null)
</script>
```
::

By default the pointer is tracked on the component's own root — a box that
hugs the text. Pass `containerRef` to move the listening to a larger ancestor,
so the effect starts responding before the cursor reaches the words.

## Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="variable-proximity-custom" />
  :::
#code
  <PlaygroundCode name="VariableProximity" />
::

## Props

::component-props
  ::component-prop{name="label" type="string" required}
  The text to display with proximity effects.
  ::
  
  ::component-prop{name="class" type="string" default="''"}
  CSS classes to apply to each character.
  ::
  
  ::component-prop{name="fromFontVariationSettings" type="string" default="'wght' 400, 'opsz' 9"}
  Starting font variation settings.
  ::
  
  ::component-prop{name="toFontVariationSettings" type="string" default="'wght' 1000, 'opsz' 40"}
  Ending font variation settings.
  ::
  
  ::component-prop{name="containerRef" type="object" default="null"}
  Element — or Vue ref — whose bounds define the pointer-tracking area. Falls
  back to the component's own root when unset.
  ::
  
  ::component-prop{name="radius" type="number" default="100"}
  Radius of the proximity effect in pixels. Read on every pointer move, so it is
  safe to change reactively.
  ::
  
  ::component-prop{name="falloff" type="string" default="'linear'"}
  Type of falloff: 'linear', 'exponential', or 'gaussian'.
  ::
  
  ::component-prop{name="ui" type="object" default="undefined"}
  Per-slot classes merged over the theme defaults. See [UI](#ui).
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.variableProximity` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `relative inline-block`
  ::
  ::component-slot-row{name="char"}
  ::
::

## Accessibility

Each character is a plain `span` and the label is read once, in order, with no
live region and no per-character announcement. Spaces render as non-breaking
spaces, so word gaps survive the per-character split.

The effect is pointer-only: it listens to `mousemove` and `mouseleave` on the
container, with no keyboard or touch equivalent, and there is no reduced-motion
handling — the spring-back on leave runs either way. That is fine as decoration,
as long as the resting state (`fromFontVariationSettings`, `wght` 400 by
default) is legible on its own, which is how the component ships.

## Performance

- Every `mousemove` on the container measures the container and then **every
  character** with `getBoundingClientRect`, computes a distance, and calls
  motion-v's `animate()` on that character — cost is linear in character count per
  pointer event. Keep labels short, or widen `radius` and accept that fewer moves
  are needed.
- Each per-character animation writes two custom properties (`--vp-wght`,
  `--vp-opsz`) over `0.25s`; the spans carry
  `will-change: font-variation-settings, transform` so the browser can promote
  them. `mouseleave` sweeps every character back to the `from` values once, over
  `0.35s`.
- There are no scroll, resize or `requestAnimationFrame` hooks: listeners are two
  plain events attached after mount and removed on unmount.
- The `from`/`to` settings are regex-parsed once at setup; `radius` is read live
  from props on each move.

## Notes

- The label is split per character — `label.split('')` — with each character in
  its own `span`, so node count equals label length.
- `fromFontVariationSettings` and `toFontVariationSettings` are parsed once when
  the component is set up. Changing them later does not re-parse; remount with a
  changing `:key` to switch axes.
- The effect needs a font that actually exposes `wght` and `opsz` axes. On a
  static font the pointer still animates the custom properties, but nothing
  visible changes.
