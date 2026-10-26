---
title: Gravity Letters
description: Text that breaks into letters, falls under gravity and springs back into place.
---

Most hover effects move the whole word. This one gives every letter its own
weight: on trigger the glyphs are released one after another, fall with a small
horizontal push, bounce off the floor and the side walls, then spring back into
the line when the pointer leaves.

The physics is a small fixed-step simulation rather than a set of keyframes, so
`gravity`, `bounce` and `friction` describe the material instead of a duration.
That is also why the letters can be caught mid-fall and called home from
wherever they are.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full"}
    <component-example name="gravity-letters-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full items-center justify-center py-10">
    <MGravityLetters
      class="w-full max-w-lg text-center text-4xl font-bold text-highlighted"
      text="Hover the headline and the letters fall"
    />
  </div>
</template>
```

::

Hover the line to drop the letters and move away to call them back. The default
trigger is `hover`, so a static headline needs no extra wiring.

## Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="gravity-letters-custom" />
  :::
#code
  <PlaygroundCode name="GravityLetters" />
::

`trigger="click"` turns the line into a toggle that stays down until pressed
again, and `trigger="inView"` drops once when the block scrolls into view. With
`trigger="manual"` nothing is bound; drive the fall through
`v-model:collapsed`.

## Props

::component-props
  ::component-prop{name="text" type="string" required}
  The text to break apart. Split with `Array.from`, so surrogate pairs stay
  whole.
  ::
  ::component-prop{name="trigger" type="'hover' | 'click' | 'inView' | 'manual'" default="'hover'"}
  What releases the letters. `hover` and `click` also add keyboard focus and the
  matching handlers.
  ::
  ::component-prop{name="collapsed" type="boolean"}
  Controlled falling state. Leave it out to let the component keep its own.
  ::
  ::component-prop{name="gravity" type="number" default="1200"}
  Downward acceleration in pixels per second squared. Higher values make the
  drop read as heavier rather than faster.
  ::
  ::component-prop{name="bounce" type="number" default="0.35"}
  Restitution after the floor and wall collisions. `0` stops dead; values near
  `1` keep almost all the energy.
  ::
  ::component-prop{name="friction" type="number" default="0.4"}
  Share of the horizontal velocity and spin removed on each floor hit, so the
  letters eventually settle instead of skating forever.
  ::
  ::component-prop{name="spread" type="number" default="140"}
  Maximum horizontal launch speed, randomised per letter. Keep it under the
  container width or the first bounce is the wall rather than the floor.
  ::
  ::component-prop{name="stagger" type="number" default="40"}
  Milliseconds between two letters being released. It is what makes the line
  fall as a wave instead of as a block.
  ::
  ::component-prop{name="class" type="string"}
  Extra classes for the container. The component already sets `min-h-24`,
  `overflow-hidden` and `select-none`.
  ::
::

## Events

::component-events
  ::component-event{name="update:collapsed" type="(collapsed: boolean) => void"}
  Fired whenever the letters start falling or start reforming, including from
  the built-in hover, click and in-view triggers. Use it with `collapsed` to
  mirror the state somewhere else on the page.
  ::
::

## Accessibility

- The readable text is rendered once in an `sr-only` node. Both the measuring
  copy and the animated letters are `aria-hidden`, so a screen reader never
  hears the string split into characters or repeated.
- `trigger="click"` gives the container `role="button"`, `aria-pressed` and
  `tabindex="0"`, and Enter or Space toggles it. The hover trigger mirrors its
  behaviour on focus and blur, so the effect is reachable from the keyboard.
- `trigger="inView"` uses an intersection threshold of `40%` and disconnects
  after the first drop; a line that keeps re-falling on every scroll would be
  motion the reader did not ask for.
- Under `prefers-reduced-motion` a CSS media query swaps the letters for the
  plain string and removes the fall. The physics loop never starts, the reserved
  `min-h-24` collapses, and the line keeps its natural spacing. The swap is done
  in CSS rather than by branching the template, so server and client markup stay
  identical.

## Performance

- One `requestAnimationFrame` loop drives every letter. It is cancelled as soon
  as all of them settle, so a resting headline costs nothing per frame.
- Each frame writes only `transform` on the animated spans. Origins come from
  one measurement of an invisible copy, refreshed by a `ResizeObserver` when the
  container changes width.
- The loop runs outside Vue's reactivity: the physics lives in plain arrays and
  elements are written directly, so a drop does not re-render the container.
- The reduced-motion guard sits in the state watcher, so a visitor with the
  preference never starts the loop or allocates a frame callback. The single
  measuring pass still runs, which keeps the resting position correct if the
  preference changes while the page is open.
