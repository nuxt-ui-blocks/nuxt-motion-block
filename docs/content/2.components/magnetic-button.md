---
title: Magnetic Button
description: A button that follows the pointer inside a pull radius and springs back when the pointer leaves.
navigation:
  icon: i-lucide-magnet
---

# Magnetic Button

A button that leans toward the pointer once it comes within range, then springs back
when the pointer goes. Translated from smoothui's magnetic-button.

Two implementation details are worth knowing before you reach for it. The pull radius
is real layout, not a hit-test: the wrapper takes a negative margin of `radius / 2`
and an equal padding, so the component's box is `radius / 2` larger than the button on
every side. And the offset is not a MotionValue ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â motion-v snapshots MotionValues when
it mounts, so the magnet is driven by two plain reactive numbers fed into `animate`.

This is the *button* of the pair. `Magnetic` is the generic wrapper for any element and
has its own page; reach for this one when the target is an action and you want the
shadcn-style variant matrix without hand-writing the classes.

## Usage

Drop it in place of a button. It renders its own `<button type="button">` ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â no
`UButton` underneath ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â so it has no `label` prop: put the label in the slot. Tune the
pull with `strength` and `radius`, and use `asChild` when the trigger should be a link
or another element.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="magnetic-button-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-md flex-col gap-6 py-6">
    <div class="flex min-h-32 items-center justify-center gap-4">
      <MMagneticButton :strength="strength">
        <UIcon name="i-lucide-magnet" />
        Pull me
      </MMagneticButton>
      <MMagneticButton
        variant="outline"
        size="icon"
        aria-label="Favourite"
      >
        <UIcon name="i-lucide-heart" />
      </MMagneticButton>
    </div>

    <div class="flex flex-col gap-1.5">
      <USlider
        v-model="strength"
        :min="0"
        :max="1"
        :step="0.05"
        aria-label="Magnet strength"
      />
      <span class="text-xs text-muted">
        strength = {{ strength.toFixed(2) }} ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â· radius stays at 150px
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
const strength = ref(0.3)
</script>

```
::

## Props

::field-group
  ::field{name="strength" type="number" default="0.3"}
  Portion of the in-range pointer offset the button travels, `0`ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã¢â‚¬Å“`1`. The offset is
  `distance ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â strength ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â (1 ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Â¹ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ distance / radius)`, so travel peaks at
  `strength ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â radius / 4` ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â about 11px at the defaults ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â and eases back to zero exactly
  at the edge of the radius.
  ::
  ::field{name="radius" type="number" default="150"}
  Pull radius in pixels, measured from the button's centre. Also sets the wrapper's
  negative margin and padding, so the component occupies a box `radius / 2` larger
  than the button on each side.
  ::
  ::field{name="springConfig" type="{ duration?: number, bounce?: number }" default="{ bounce: 0.1, duration: 0.4 }"}
  Passed to motion-v as a duration-and-bounce spring. This is not a stiffness/damping
  pair, so `damping` or `mass` keys are ignored; under reduced motion the spring is
  replaced by `duration: 0`.
  ::
  ::field{name="disabled" type="boolean" default="false"}
  Disables the button and switches the effect off: the offset resets to zero and the
  `mousemove` handler returns immediately.
  ::
  ::field{name="asChild" type="boolean" default="false"}
  Render the slot's single root element instead of a `<button>`, with `disabled` and
  the pointer behaviour forwarded to it. The class matrix still applies. Use this for an
  `<a>`, a Nuxt link or a router button.
  ::
  ::field{name="variant" type="'default' | 'destructive' | 'ghost' | 'link' | 'outline' | 'secondary'" default="'default'"}
  Colour treatment. The names are kept for parity with the React reference, but the
  colour stops are rewritten onto the Nuxt UI palette this module ships with, so
  `outline` and `secondary` are not shadcn greys.
  ::
  ::field{name="size" type="'default' | 'icon' | 'lg' | 'sm'" default="'default'"}
  Size matrix from the reference: `default` is `h-10 px-4 py-2`, `icon` is a square
  `h-10 w-10`, `lg` and `sm` are the two ends of the height scale.
  ::
  ::field{name="class" type="string"}
  Merged into the computed class list alongside the base, size and variant classes.
  ::
  ::field{name="className" type="string"}
  Alias of `class`, kept for parity with the React reference. Both are appended.
  ::
::

## Slots

::field-group
  ::field{name="default"}
  The button's content. With `asChild` the slot must contain exactly one element ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â it
  is rendered through reka-ui's `Primitive` and becomes the trigger itself.
  ::
::

## Accessibility

By default this is a real `<button type="button">` with `focus-visible` ring classes,
so Enter and Space activate it and the focus ring is visible. The wrapper zone is
`role="presentation"` and holds no semantics of its own. `type` is bound before
`$attrs`, so a caller-supplied `type="submit"` still wins.

The effect is gated three ways: on `(hover: hover) and (pointer: fine)`, on
`useReducedMotion()`, and on `disabled`. Touch devices and visitors who prefer reduced
motion get a static button with no magnet, and the offset is reset to zero for them.

With `asChild` the accessibility burden moves to your element ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â pass an `aria-label`
when the child is icon-only. There is no ARIA of the component's own beyond the native
button semantics.

## Performance

- `mousemove` calls `getBoundingClientRect()` on the button on every event. There is no
  `requestAnimationFrame` batching and no cached rect, so each pointer move forces a
  layout read.
- Offsets are plain refs rather than MotionValues, so every change re-renders the
  component and recomputes the `animate` target ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â cheap here, because the DOM is one
  element deep.
- The hover media query is queried once on mount, guarded for environments without
  `window.matchMedia`, and its `change` listener is removed on unmount.
- The `disabled`, reduced-motion and hover-device checks live inside the handler rather
  than on the binding, so the listener reference stays stable and the zone never
  re-binds.

::tip
`radius` is a layout value, not just a hit-test. At the default 150 the component
occupies a box 75px larger than the button on every side, which will overlap
neighbours or overflow a padded container. Leave that much room around it, or drop
`radius` and raise `strength` if you want the same travel in a smaller footprint.
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.magneticButton` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `inline-block` |
| `magnet` | `inline-block` |
| `button` |  |
