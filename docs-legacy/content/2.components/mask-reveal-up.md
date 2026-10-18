---
title: Mask Reveal Up
description: Headline lines that rise out of their own masks, one line at a time.
navigation:
  icon: i-lucide-rows-3
---

# Mask Reveal Up

The string is split on newlines. Each line lives inside its own
`overflow: hidden` wrapper and starts `30px` below that wrapper, `6px` out of
focus and fully transparent. Because the line travels `30px` while the mask is
only as tall as the line, it enters through the bottom edge of the mask rather
than fading in place. Line *i* starts `90ms` after line *i - 1`.

The mask is doing most of the hiding here. At word or character granularity the
blur alone is enough — see [Blur Out Up](/components/blur-out-up) and
[Soft Blur In](/components/soft-blur-in). Here the travel distance is five times
the blur radius, so the blur only softens the leading edge as it crosses; the
wrapper is what actually clips.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="mask-reveal-up-basic" />
  :::
#code
```vue
<template>
  <div class="text-center text-3xl font-bold">
    <MMaskRevealUp
      :text="'Every line rises\nout of its own mask'"
    />
  </div>
</template>
```
::

## How the timing works

Line *i* waits `delay + i × stagger` milliseconds, then animates for `760ms`.

The run is slower than the unmasked components because the line spends most of
its time travelling *through* the mask. A faster run clips the blur into a hard
edge — the softness is only readable while the line is still partially occluded.

At the `90ms` default a four-line headline finishes in about `1.03s`, and the
stagger is wide enough that the reader's eye is led down the block rather than
having the whole thing land at once.

The ease is `(0.22, 1, 0.36, 1)`, shared with
[Soft Blur In](/components/soft-blur-in) and
[Blur Out Up](/components/blur-out-up).

## It is display-aware

Unlike the per-word components, the root span here sets **`display: block`
explicitly**. Every element in the tree is a block box: the root, each mask
wrapper, and the animated line inside it.

That means `max-width`, `text-center` and `width` on `class` all behave the way
you would expect, and the component owns its own layout rather than deferring to
its parent's inline formatting context. It also means the line breaks are exactly
where you put them — the component never re-wraps, because it splits on `\n` and
never on spaces.

## Lines come from newlines, not wrapping

`text` is split on `\n`. Because a Vue attribute string does not interpret escape
sequences, `text="Line one\nLine two"` passes a literal backslash-n, so pass the
string bound and let the JS literal do the work:

```vue
<MMaskRevealUp :text="'Line one\nLine two'" />
```

That is the reason the `lines` prop exists. Anything multi-line is more readable
as an array than as a string containing embedded newlines:

```vue
<MMaskRevealUp
  :lines="['Lines can also', 'be passed in', 'as an array']"
  text="Lines can also be passed in as an array"
/>
```

`lines` takes precedence over `text` when both are supplied, but `text` is still
required. That is deliberate: `text` is the source of the accessible label, so
requiring it guarantees the label is never empty even if `lines` is what actually
renders.

A line that wraps because it is wider than its container will have its second
visual line clipped by the mask, since the mask is one line-box tall. Keep lines
short, or widen the container.

## Props

::field-group
  ::field{name="text" type="string" required}
  The text to reveal. Split on `\n` unless `lines` is supplied. Also the source of
  the `aria-label`, which is why it is required even when `lines` is used.
  ::

  ::field{name="lines" type="string[]"}
  Supply the lines directly. Takes precedence over `text`.
  ::

  ::field{name="stagger" type="number" default="90"}
  Milliseconds added per line. `0` reveals every line at once.
  ::

  ::field{name="delay" type="number" default="0"}
  Milliseconds to wait before the first line starts.
  ::

  ::field{name="triggerOnView" type="boolean" default="false"}
  Wait until the element scrolls into view before playing. Ignored under reduced
  motion.
  ::

  ::field{name="class" type="string"}
  Classes for the root span. Type styles set here are inherited by every line.
  ::
::

## Accessibility

The root span carries an `aria-label` built by joining the resolved lines with a
single space. A screen reader would otherwise pause between the block-level line
wrappers, so the label restores the sentence the newlines were standing in for.
Each animated line is `aria-hidden="true"`.

Under `prefers-reduced-motion` the reveal runs with `duration: 0` rather than
being skipped. motion-v treats "nothing to animate" as "write nothing", so
skipping it would strand every line at `blur(6px)`, `opacity: 0`, `y: 30px`
permanently. Collapsing the duration lands them at rest within a frame.

The same reasoning governs the server render: the hidden state *is* the `initial`
state on the server too. The server cannot know the visitor's motion preference,
and `initial` is only read when the visual element is created — so a client that
wanted the reduced-motion starting state could never clear the attributes the
server had already written, and the two trees would disagree. Suppressing the
transition instead keeps one identical tree.

## Examples

### Lines as an array

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="mask-reveal-up-lines" />
  :::
#code
```vue
<template>
  <MMaskRevealUp
    class="text-center text-3xl font-bold"
    :lines="['Lines can also', 'be passed in', 'as an array']"
    text="Lines can also be passed in as an array"
  />
</template>
```
::

### Reveal on scroll

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="mask-reveal-up-on-scroll" />
  :::
#code
```vue
<template>
  <div class="text-center">
    <MMaskRevealUp
      class="text-3xl font-bold"
      :stagger="60"
      :text="'Masked reveal\non scroll'"
      trigger-on-view
    />
    <p class="mt-3 text-sm text-muted">
      60ms between lines, once the block is on screen.
    </p>
  </div>
</template>
```
::

## Notes

- The component plays once. `triggerOnView` observes with `once`, and there is no
  replay prop — remount with a changing `:key` to run it again.
- The hidden and shown state objects are defined at module level on purpose.
  motion-v compares `initial` against `animate` by reference, so a fresh literal
  on every render would make it believe every line re-animates on each update.
- Keys are line indexes. Reordering `lines` reuses the existing elements in place.
- `overflow: hidden` is on the mask wrapper, not on the animated line, so the line
  is free to travel past the wrapper's edges without dragging a scroll container
  into the document.