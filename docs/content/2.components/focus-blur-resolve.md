---
title: Focus Blur Resolve
description: Text that arrives out of focus and resolves to sharp, on mount or on scroll.
navigation:
  icon: i-lucide-focus
---

# Focus Blur Resolve

A string starts blurred, lifted and transparent, then resolves into focus. It is
a rack-focus effect for type: the lens finds the subject after a moment rather
than the subject simply being there.

The motion is deliberately small. Blur dominates (`14px` at the start), opacity
carries the arrival, and the transform is a `12px` rise with a `1.01` scale —
enough to read as depth, not enough to read as a slide. The cubic-bezier
`(0.22, 1, 0.36, 1)` is fast out and very slow in, which is what makes it land
rather than arrive.

Useful for a headline under a hero, a section title, or any short statement that
should feel considered rather than dumped on the page.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="focus-blur-resolve-basic" />
  :::
#code
```vue
<template>
  <MFocusBlurResolve
    class="text-3xl font-bold"
    text="Focus. Blur. Resolve."
  />
</template>
```
::

## Resolve on scroll

With `triggerOnView` the resolve waits until the element has actually been on
screen. The animate target stays pinned to the hidden state while it is off
screen, and flips once the observer fires — so the text is never resolved while
nobody is looking at it, and is never invisible when they arrive.

The observer uses `once`, so a single element resolves a single time. To
replay, remount it: `:key` on a changing value is enough.

## Props

::field-group
  ::field{name="text" type="string" required}
  The string to resolve. It is a plain string rather than a slot so the component
  can put a single `aria-label` on the wrapper while marking the animated copy
  `aria-hidden`.
  ::

  ::field{name="delay" type="number" default="0"}
  Milliseconds to wait before the resolve begins. Pair it with a `:key` or a
  `v-for` to stagger several headlines into a sequence.
  ::

  ::field{name="triggerOnView" type="boolean" default="false"}
  Wait until the element scrolls into view before resolving. Ignored under
  reduced motion, which always resolves immediately — see below.
  ::

  ::field{name="class" type="string"}
  Classes for the wrapper element. This is the element that carries the
  `aria-label`, so give it the size and colour you want; the animated copy
  inherits both.
  ::
::

## Accessibility

The wrapper carries `aria-label="<text>"` and the animated copy inside it is
`aria-hidden="true"`. That split is the reason `text` is a string and not a
slot: with the whole string announced by the wrapper and the per-character
spans exposed as well, screen readers would read the text twice, character by
character.

Under `prefers-reduced-motion` the component does not skip the animation. It
runs it with `duration: 0`. Dropping the animation entirely leaves the hidden
styles stranded on the element — motion-v treats "nothing to animate" as "write
nothing", so the `blur(14px)` and `opacity: 0` from the initial render would
never be replaced and the text would stay invisible. A zero-length transition
still commits the resolved values, within one frame and with no interpolation
worth watching.

For the same reason, the server and the client always agree on the same initial
state. `useReducedMotion()` is always `false` on the server, so deriving the
initial state from the preference would bake hidden styles into the HTML for
everyone and then leave a reduced-motion visitor staring at invisible text.

## Examples

### Resolve on scroll

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="focus-blur-resolve-on-scroll" />
  :::
#code
```vue
<template>
  <div class="max-w-md text-center">
    <MFocusBlurResolve
      class="text-3xl font-bold"
      text="Resolves when seen"
      trigger-on-view
    />
    <p class="mt-3 text-sm text-muted">
      Scroll this block out of view and back: the resolve runs once per mount,
      so the second pass replays it.
    </p>
  </div>
</template>
```
::

### Staggered delay

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="focus-blur-resolve-stagger" />
  :::
#code
```vue
<template>
  <div class="flex flex-col items-center gap-4">
    <MFocusBlurResolve
      class="text-2xl font-semibold"
      text="No delay"
    />
    <MFocusBlurResolve
      class="text-2xl font-semibold"
      :delay="180"
      text="180ms delay"
    />
    <MFocusBlurResolve
      class="text-2xl font-semibold"
      :delay="360"
      text="360ms delay"
    />
  </div>
</template>
```
::

## Notes

- The wrapper is `display: inline-block`. It wraps text inline; it does not
  become a block-level container on its own.
- `triggerOnView` observes with `once`, so it resolves one time. There is no
  replay prop — remount with a changing `:key`.
- `class` lands on the wrapper, not on the animated copy. Font size, weight and
  colour set here are inherited by the copy, which is what you want; layout
  classes are not, because the copy is a single inline span.
- The component does not declare `will-change`. Motion-v sets and clears that
  itself for whatever it animates, and a `will-change` from the template only
  competes with that write.