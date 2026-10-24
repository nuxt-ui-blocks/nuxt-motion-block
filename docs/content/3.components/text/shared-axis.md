---
title: Shared Axis
description: A rotating phrase that travels along one axis instead of blinking out and back in.
---

Material's shared-axis transition exists because a crossfade tells you *something*
changed but not *where* it came from. Moving the outgoing phrase along one axis
and bringing the next in from the other side gives the swap a direction, and the
direction is what makes a rotating headline read as one line of thought instead
of two unrelated strings.

The axis is a prop rather than three components. `x` slides horizontally, `y`
slides vertically, and `z` scales through the viewer with a little blur; the
timing, the announcement behaviour and the reduced-motion fallback are identical,
so only the resting and leaving transforms differ.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full"}
    <component-example name="shared-axis-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full items-center justify-center py-8 text-center">
    <p class="text-2xl font-semibold text-highlighted">
      <span class="text-muted">Motion built for </span>
      <MSharedAxis
        :phrases="phrases"
        axis="x"
      />
    </p>
  </div>
</template>

<script setup lang="ts">
/**
 * One axis, one line. The phrase changes direction as it leaves and arrives,
 * so the swap reads as a move rather than as a crossfade.
 */
const phrases = [
  'product tours.',
  'data dashboards.',
  'release notes.',
]
</script>
```
::

The component is `inline-block`, so it sits inside a sentence without forcing a
line break. Give it a `class` for the type scale rather than wrapping it in a
sized element: the phrases wrap as their own inline box.

## Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="shared-axis-custom" />
  :::
#code
  <PlaygroundCode name="SharedAxis" />
::

Switch the axis in the panel to compare them. `x` suits a horizontal heading,
`y` suits a line that should feel like it is being replaced in place, and `z`
suits a teaser where the incoming phrase should feel closer to the reader than
the one it replaces.

## Props

::component-props
  ::component-prop{name="phrases" type="string[]" required}
  The phrases to cycle through. One phrase disables the rotation; the component
  still renders it.
  ::
  ::component-prop{name="axis" type="'x' | 'y' | 'z'" default="'x'"}
  Direction of travel. `x` and `z` clip the root box; `y` does not, because a
  vertical slide that is clipped loses the top and bottom of the glyphs on the
  first frames.
  ::
  ::component-prop{name="interval" type="number" default="2500"}
  Milliseconds each phrase stays on screen. Values below `300` are clamped:
  faster than that the exit has not finished before the next phrase starts, and
  `mode="wait"` queues swaps until the previous one is done.
  ::
  ::component-prop{name="class" type="string"}
  Extra classes for the root element, which is the `aria-live` region.
  ::
::

## Accessibility

- The root is `aria-live="polite"` with `aria-atomic="true"`, so a screen reader
  announces the new phrase as a whole rather than the diff between the two.
- The rotation never stops for reduced motion. Changing the text is the content,
  not decoration; only the travel is removed, and both enter and exit collapse to
  a zero-duration commit.
- Because the region re-announces on every interval, this belongs on short
  marketing copy. A phrase that carries instructions should be static, or the
  reader will hear it repeated every few seconds.

## Performance

- `AnimatePresence` runs with `mode="wait"`: exactly one phrase is in the tree at
  a time, so the container never has to grow to fit two strings side by side.
- The swap animates `transform`, `opacity` and (for `z`) `filter`; layout is
  never read or written during the transition.
- The interval is a single `setInterval`, cleared on unmount and restarted when
  the phrase count or interval changes. There is no scroll listener and no
  per-phrase timer.
- The timer only starts on the client, so the server renders the first phrase
  with no scheduled work behind it.
