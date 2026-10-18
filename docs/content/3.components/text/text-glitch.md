---
title: Text Glitch
description: Glitch effect for text elements.
---

The TextGlitch component creates a glitch effect for text elements. It's perfect for creating eye-catching headings and animated text effects with a digital distortion style.

The effect is built from stacked copies of the same string: one crisp main layer, plus one coloured layer per intensity step that flickers, clips and offsets horizontally, and an optional set of scan lines that sweep the block while the glitch is active. A `trigger` prop decides whether that churn is bound to hover, a repeating interval, the viewport, or your own code.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="text-glitch-basic" />
  :::
#code
```vue
<template>
  <div class="flex flex-col items-center space-y-10 p-10">
    <div class="text-center max-w-3xl">
      <h2 class="text-3xl font-bold text-highlighted mb-4">
        Glitch Effect
      </h2>
      <p class="text-muted text-lg mb-8">
        Add cyberpunk-style glitch effects to your text for a futuristic aesthetic
      </p>
    </div>

    <div class="flex justify-center">
      <MTextGlitch
        text="CYBERPUNK"
        class="text-6xl font-black"
      />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
      <UCard class="text-center hover:shadow-xl transition-shadow">
        <UIcon
          name="i-lucide-zap"
          class="w-10 h-10 text-primary mx-auto mb-4"
        />
        <h3 class="font-bold text-xl mb-2">
          High Energy
        </h3>
        <p class="text-muted">
          Dynamic visual effects
        </p>
      </UCard>

      <UCard class="text-center hover:shadow-xl transition-shadow">
        <UIcon
          name="i-lucide-sparkles"
          class="w-10 h-10 text-purple-500 mx-auto mb-4"
        />
        <h3 class="font-bold text-xl mb-2">
          Futuristic
        </h3>
        <p class="text-muted">
          Modern design aesthetic
        </p>
      </UCard>

      <UCard class="text-center hover:shadow-xl transition-shadow">
        <UIcon
          name="i-lucide-eye"
          class="w-10 h-10 text-green-500 mx-auto mb-4"
        />
        <h3 class="font-bold text-xl mb-2">
          Attention Grabbing
        </h3>
        <p class="text-muted">
          Stand out from the crowd
        </p>
      </UCard>
    </div>

    <div class="mt-8">
      <UButton
        color="primary"
        variant="solid"
        size="lg"
      >
        <UIcon
          name="i-lucide-play"
          class="w-5 h-5 mr-2"
        />
        Try Glitch Effect
      </UButton>
    </div>
  </div>
</template>
```
::

## Examples

### Trigger on hover

With the default `trigger="hover"` the glitch plays only while the pointer is over the text — useful for a logo or a link that stays calm until someone engages with it.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="text-glitch-hover" />
  :::
#code
```vue
<template>
  <div class="flex flex-col items-center gap-4 p-8">
    <MTextGlitch
      text="HOVER ME"
      trigger="hover"
      intensity="high"
      :speed="400"
      class="text-5xl font-black"
    />
    <p class="text-sm text-muted">
      The glitch runs only while the pointer is over the text.
    </p>
  </div>
</template>
```
::

### Loop automatically

`trigger="auto"` fires the glitch on a repeating timer. `interval` is the gap between glitches and `duration` how long each one lasts, both in seconds.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="text-glitch-auto" />
  :::
#code
```vue
<template>
  <div class="flex flex-col items-center gap-4 p-8">
    <MTextGlitch
      text="AUTO GLITCH"
      trigger="auto"
      :interval="2"
      :duration="1"
      class="text-5xl font-black"
    />
    <p class="text-sm text-muted">
      Glitches for one second, every two seconds.
    </p>
  </div>
</template>
```
::

### Custom colours and scan lines

`colors` supplies one colour per glitch layer, cycled in order. `show-scan-lines` toggles the horizontal sweep that renders on top of the layers while the glitch is active.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="text-glitch-custom-colors" />
  :::
#code
```vue
<template>
  <div class="flex flex-col items-center gap-4 p-8">
    <MTextGlitch
      text="NEON"
      :colors="['#22d3ee', '#a855f7', '#f472b6']"
      intensity="high"
      :show-scan-lines="false"
      class="text-5xl font-black"
    />
    <p class="text-sm text-muted">
      Custom layer colours with the scan lines switched off.
    </p>
  </div>
</template>
```
::

### Trigger it yourself

`trigger="manual"` hands control to you: grab a template ref and call its exposed `trigger()` (or `start()` / `stop()`). With `auto-start` the first glitch fires on mount and the button replays it.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="text-glitch-manual" />
  :::
#code
```vue
<template>
  <div class="flex flex-col items-center gap-4 p-8">
    <MTextGlitch
      ref="glitch"
      text="MANUAL"
      trigger="manual"
      intensity="extreme"
      :duration="1"
      auto-start
      class="text-5xl font-black"
    />
    <UButton
      color="primary"
      variant="subtle"
      @click="glitch?.trigger()"
    >
      Trigger glitch
    </UButton>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const glitch = ref()
</script>
```
::

## Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="text-glitch-custom" />
  :::
#code
  <PlaygroundCode name="TextGlitch" />
::

## Props

::component-props
  ::component-prop{name="text" type="string" default="''"}
  Text to glitch.
  ::

  ::component-prop{name="trigger" type="'hover' | 'auto' | 'inView' | 'manual'" default="'hover'"}
  How to trigger the glitch effect.
  ::

  ::component-prop{name="intensity" type="'low' | 'medium' | 'high' | 'extreme' | number" default="'medium'"}
  Intensity of the glitch effect. Controls how many coloured layers are stacked and how far each one is allowed to travel; a number between `1` and `10` maps onto the named steps.
  ::

  ::component-prop{name="duration" type="number" default="2"}
  Duration of glitch effect in seconds.
  ::

  ::component-prop{name="interval" type="number" default="3"}
  Interval between auto glitches in seconds.
  ::

  ::component-prop{name="speed" type="number" default="500"}
  Animation speed in milliseconds. Lower values make each layer's flicker cycle faster.
  ::

  ::component-prop{name="colors" type="string[]" default="['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff']"}
  Colors for glitch layers, cycled one per layer.
  ::

  ::component-prop{name="showScanLines" type="boolean" default="true"}
  Show scan lines effect.
  ::

  ::component-prop{name="autoStart" type="boolean" default="false"}
  Automatically start glitch effect. Fires a single glitch on mount, which is most useful alongside `trigger="manual"`.
  ::

  ::component-prop{name="class" type="string" default="''"}
  CSS classes to apply to the container.
  ::

  ::component-prop{name="ui" type="object" default="undefined"}
  Per-slot classes merged over the theme defaults. See [UI](#ui).
  ::
::

## Events

::component-events
  ::component-event{name="glitchStart" type="() => void"}
  Emitted when a glitch begins, whether from hover, the auto interval or a manual trigger.
  ::
  ::component-event{name="glitchEnd" type="() => void"}
  Emitted when the glitch stops — on `mouseleave` for hover, or after `duration` for every other trigger.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.textGlitch` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `text-glitch-container relative inline-block select-none`
  ::
  ::component-slot-row{name="main"}
  `text-glitch-main relative z-10`
  ::
  ::component-slot-row{name="layer"}
  `text-glitch-layer absolute top-0 left-0 w-full h-full pointer-events-none`
  ::
  ::component-slot-row{name="scanLines"}
  `absolute inset-0 pointer-events-none`
  ::
  ::component-slot-row{name="scanLine"}
  `absolute bg-(--ui-bg-inverted)/20 h-px left-0 right-0`
  ::
::

## Accessibility

The string is rendered once in the main layer and again in every coloured layer, and those layers are not hidden from assistive technology. A screen reader can therefore announce the same text more than once. Where the glitch is decorative, render the words once in an element you control and treat the effect as ornament; where they are meaningful, keep the glitch off the only copy of the text.

There is no `prefers-reduced-motion` handling: the flicker, offsets and scan lines run regardless. For a reader who has asked for reduced motion, supply a static string instead of a `trigger` that plays on its own.

The container is `select-none` and `pointer-events-none` on the decorative layers, so the effect never interferes with selecting or clicking the real text beneath it.

## Performance

- Each glitch layer is a duplicate text node, so the DOM holds `layers + 1` copies of the string. At `intensity="extreme"` that is six layers plus the main text; keep the effect on short strings.
- The layers animate `opacity`, `x`, `y` and `scaleX` only, all of which the browser can run on the compositor.
- `trigger="auto"` and `trigger="inView"` each own a `setInterval`, cleared in `onUnmounted`; there is one interval per instance, not one per layer.
- Nothing is scheduled after the glitch ends: each trigger sets a single timeout for `duration`, and hover interrupts on `mouseleave`.
