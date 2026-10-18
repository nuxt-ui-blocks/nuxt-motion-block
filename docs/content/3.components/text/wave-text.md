---
title: Wave Text
description: Characters that ripple through a string in sequence, travelling wave and all.
---

Every character of a string rides the same vertical loop, offset by a delay
proportional to its position. The result is a wave travelling through the words
rather than a line of text bouncing as one object.

The whole effect lives in that per-character delay. Set `staggerDelay` to `0`
and the characters move in lockstep — a legitimate look, but a different one, and
worth knowing that it is the delay doing the work rather than some per-character
easing.

Useful for a hero line, a nav brand, or a short call to action that should feel
alive without moving the page.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="wave-text-basic" />
  :::
#code
```vue
<template>
  <MWaveText
    class="text-3xl font-bold"
    text="Wave on"
  />
</template>
```
::

## Examples

### Amplitude

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="wave-text-amplitude" />
  :::
#code
```vue
<template>
  <div class="flex flex-col items-center gap-4">
    <MWaveText
      class="text-2xl font-semibold"
      :amplitude="4"
      text="Subtle"
    />
    <MWaveText
      class="text-2xl font-semibold"
      text="Default"
    />
    <MWaveText
      class="text-2xl font-semibold"
      :amplitude="16"
      text="Exaggerated"
    />
  </div>
</template>
```
::

`amplitude` is the peak vertical travel in px. It does not scale with font size,
so the same value reads as a nudge on a large heading and a departure on a small
label.

## Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="wave-text-custom" />
  :::
#code
  <PlaygroundCode name="WaveText" />
::

## Props

::component-props
  ::component-prop{name="text" type="string" required}
  The string to animate. Split into one span per character, spaces included.
  ::

  ::component-prop{name="amplitude" type="number" default="8"}
  Peak vertical travel in px, in each direction. The upward travel is the full
  amplitude; the downward dip is half of it.
  ::

  ::component-prop{name="duration" type="number" default="1.2"}
  Seconds for one full rise-and-fall cycle. Below about `0.8` the loop stops
  being readable as a loop.
  ::

  ::component-prop{name="staggerDelay" type="number" default="0.05"}
  Seconds of delay added per character — the difference between a wave and a
  unison bounce. Raise it for a slower, more legible travel across longer
  strings; at `0.05` a twenty-character string takes a full second to traverse.
  ::

  ::component-prop{name="class" type="string"}
  Classes for the root span, which is also the element that carries the
  `aria-label`. Font size, weight and colour set here are inherited by every
  character span.
  ::
::

## Accessibility

The root span carries `aria-label="<text>"` and every character span inside it
is `aria-hidden="true"`. Without that split a screen reader would walk the
string one letter at a time, which is unusable at any speed.

Under `prefers-reduced-motion` every character holds `y: 0` — not a frozen
mid-wave offset, but the rest position. A freeze would leave some characters
visibly high and others low with no way to tell that was accidental.

The component always renders one tree and swaps only the animation target. The
server cannot know the visitor's motion preference, so branching the template
on it would bake one tree into the SSR HTML and hand a reduced-motion client
markup that disagrees with it. The first client render matches the server
exactly and settles one tick later.

## Performance

- Each character animates `y` only, which is a `transform`, so the loop runs on
  the compositor and never triggers layout or paint.
- The loop is infinite (`repeat: Infinity`) and the same keyframe transition is
  handed to every character, so a long string means one transformed span per
  character, all looping in lockstep. Keep it to a short line.
- There is no scroll or resize listener; the only per-frame work is the
  transform the browser already has on the compositor.
- Under reduced motion the state collapses to a static `y: 0` rather than a
  paused animation, so nothing keeps ticking once the preference is known.

## The loop

Each character runs a five-stop keyframe: `0`, up by `amplitude`, back to `0`,
down by half the amplitude, and `0` again — with the stops mapped to `0`,
`0.25`, `0.5`, `0.75` and `1`. The asymmetric dip is what keeps it from reading
as a bounce; a symmetric one looks like a jump.

The ease is `(0.37, 0, 0.63, 1)`, which is symmetric ease-in-out. Anything
front-loaded makes the wave look like it is being pushed rather than flowing,
and a spring here would never settle, which is the wrong shape for a loop that
is meant to be infinite.

Spaces become a non-breaking space so word gaps survive the split into spans.
The component splits `text` into characters itself, so it needs a string — a
slot would hand back VNodes that cannot be split.

## Notes

- Amplitude is in px and does not scale with font size. A `16px` amplitude on a
  `text-5xl` heading is a nudge; on a `text-sm` label it is a departure. Scale
  `amplitude` with the type if you use this at more than one size.
- `staggerDelay` accumulates, so a long string with a large delay can leave the
  last character waiting seconds before it moves. Keep `delay × length` under
  roughly a second and a half.
- Each character span is `display: inline-block`, which gives it a transformable
  box. That means the string will not wrap mid-word any differently than plain
  text, but very tight tracking will show seams between the spans.
- The loop is infinite and `linear`-eased; there is no prop to make it run a
  fixed number of times. If you need a one-shot reveal, that is a different
  component.
