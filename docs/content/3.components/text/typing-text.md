---
title: Typing Text
description: Typing effect for text content.
---

The TypingText component creates a typing effect for text content. It's perfect for creating dynamic text entrances that simulate typing on a keyboard.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="typing-text-basic" />
  :::
#code
```vue
<template>
  <div class="flex flex-col items-center space-y-6 p-6">
    <div class="text-center">
      <h2 class="text-2xl font-bold text-highlighted mb-2">
        Welcome to Our Platform
      </h2>
      <MTypingText
        text="Discover amazing features and boost your productivity"
        class="text-lg text-muted"
      />
    </div>

    <div class="bg-default rounded-lg shadow-md p-4 max-w-md w-full">
      <div class="flex items-center space-x-3 mb-3">
        <div class="w-3 h-3 bg-red-500 rounded-full" />
        <div class="w-3 h-3 bg-yellow-500 rounded-full" />
        <div class="w-3 h-3 bg-green-500 rounded-full" />
      </div>
      <div class="space-y-2">
        <div class="h-4 bg-accented rounded w-3/4" />
        <div class="h-4 bg-accented rounded w-full" />
        <div class="h-4 bg-accented rounded w-5/6" />
      </div>
    </div>
  </div>
</template>
```
::

## Examples

### Cycling through phrases

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="typing-text-cycling" />
  :::
#code
```vue
<template>
  <div class="p-4">
    <MTypingText
      :texts="['First Text', 'Second Text', 'Third Text']"
      :loop="true"
      class="text-xl font-bold text-[#0d9488]"
    />
  </div>
</template>
```
::

With `texts` filled, `loop` keeps the component cycling: each phrase types out,
holds for `pauseDuration`, clears, and the next one starts. Without `loop`, the
component types the first entry and stops.

### Command-line cursor

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="typing-text-cursor" />
  :::
#code
```vue
<template>
  <div class="flex flex-col items-center gap-4 p-8">
    <MTypingText
      text="npm run deploy --production"
      class="font-mono text-lg text-default"
      :speed="70"
      cursor="▊"
      cursor-class="text-primary"
      @complete="completed = true"
    />
    <p class="text-sm text-muted">
      {{ completed ? 'Deploy finished — the complete event fired.' : 'Typing a deploy command at 70ms per character…' }}
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const completed = ref(false)
</script>
```
::

`cursor` swaps the character and `cursorClass` tints it, while the `complete`
event fires each time the string finishes — the same point at which
`onComplete` is called.

### Blur-in headline

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="typing-text-preset" />
  :::
#code
```vue
<template>
  <div class="flex flex-col items-center gap-4 p-8 text-center">
    <h3 class="text-2xl font-bold text-highlighted">
      <MTypingText
        text="Meet the new release"
        animation="blurInUp"
        :delay="400"
        :speed="80"
        :show-cursor="false"
      />
    </h3>
    <p class="max-w-sm text-sm text-muted">
      The `blurInUp` preset arrives from below through a 10px blur, starting
      400ms after mount. With the cursor hidden the line reads as a headline
      rather than as input.
    </p>
  </div>
</template>
```
::

The `animation` preset chooses the container's entrance — `opacity`, and
optionally `blur`, `y`/`x` or `scale` — while the typing itself is independent
of it. Hiding the cursor with `showCursor` is what separates a headline from a
command line.

## Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="typing-text-custom" />
  :::
#code
  <PlaygroundCode name="TypingText" />
::

## Props

::component-props
  ::component-prop{name="text" type="string" default="''"}
  Text to type.
  ::
  
  ::component-prop{name="texts" type="string[]" default="undefined"}
  Array of texts to cycle through.
  ::
  
  ::component-prop{name="speed" type="number" default="100"}
  Typing speed in milliseconds.
  ::
  
  ::component-prop{name="delay" type="number" default="0"}
  Delay before starting animation.
  ::
  
  ::component-prop{name="showCursor" type="boolean" default="true"}
  Whether to show cursor.
  ::
  
  ::component-prop{name="cursor" type="string" default="'|'"}
  Cursor character.
  ::
  
  ::component-prop{name="cursorClass" type="string" default="''"}
  CSS classes for cursor.
  ::
  
  ::component-prop{name="loop" type="boolean" default="false"}
  Whether to loop through texts. Requires more than one entry in `texts`.
  ::
  
  ::component-prop{name="pauseDuration" type="number" default="2000"}
  Pause duration between loops.
  ::
  
  ::component-prop{name="class" type="string" default="''"}
  CSS classes to apply to the container.
  ::
  
  ::component-prop{name="onComplete" type="function" default="undefined"}
  Callback when typing completes. Fires at the same point as the `complete`
  event.
  ::
  
  ::component-prop{name="startOnView" type="boolean" default="true"}
  Start animation when component enters viewport.
  ::
  
  ::component-prop{name="once" type="boolean" default="false"}
  Animate only once.
  ::
  
  ::component-prop{name="animation" type="string" default="'fadeIn'"}
  Animation preset to use: `fadeIn`, `blurIn`, `blurInUp`, `blurInDown`,
  `slideUp`, `slideDown`, `slideLeft`, `slideRight`, `scaleUp` or `scaleDown`.
  ::
  
  ::component-prop{name="inViewMargin" type="string" default="'0px'"}
  Margin for in-view detection.
  ::
  
  ::component-prop{name="ui" type="object" default="undefined"}
  Per-slot classes merged over the theme defaults. See [UI](#ui).
  ::
::

## Events

::component-events
  ::component-event{name="complete" type="() => void"}
  Emitted each time the current string finishes typing — once per phrase when
  cycling, and before every `pauseDuration` gap in a loop.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.typingText` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `typing-text-container whitespace-pre-wrap`
  ::
  ::component-slot-row{name="text"}
  `inline-flex items-center`
  ::
  ::component-slot-row{name="cursor"}
  `typing-cursor inline-block ms-1 font-normal select-none w-px`
  ::
::

## Accessibility

The typed text lives in a plain `span` inside the motion container. There is no
`aria-live` region, so assistive technology reads whatever characters are in the
DOM when it queries — mid-type that is a prefix, and after typing it is the full
string. For a heading whose finished content matters, keep the final string
available as real text somewhere on the page rather than relying on the typing
animation to have finished.

`startOnView` (on by default) only defers *when* typing begins, using
`useElementVisibility` with `inViewMargin` — it changes nothing about what is
announced. The `animation` preset likewise affects only the container's entrance.

There is no reduced-motion handling: the typing cadence, the per-character reveal
and the cursor blink all run the same under `prefers-reduced-motion`.

## Performance

- Typing is a `setTimeout` chain — one scheduled callback at a time at `speed`
  milliseconds, each tick writing one longer string into a text node. It is timer
  work, not frame work; between ticks the component does nothing.
- The container entrance animates `opacity` and, depending on the preset, `filter`
  or `x`/`y`/`scale` over a fixed `0.6s`, all compositor-friendly except the blur
  presets. The cursor is one more `Motion` span running a single infinite opacity
  keyframe — the only continuous animation.
- Node count is constant — container, text span and cursor — no matter how long
  the string gets; the growing text is one text node.
- `startOnView` keeps `useElementVisibility` subscribed until unmount; `once` is
  enforced by a state flag rather than by disconnecting the observer.
- All pending timeouts are cleared on unmount, and loop restarts reuse the same
  slot rather than stacking timers.
