---
title: Cool Mode
description: Wrap any control and every press throws a burst of emoji from the point you touched.
---

Cool Mode listens for `pointerdown` on its wrapper, works out where inside the wrapper the press landed, and spawns a handful of emoji that fly outward and fade. Each particle gets its own angle, distance, spin and lifetime, so two presses in a row never look the same.

The wrapper is a plain `div` with no role of its own — the button you put inside stays the control, keeps its focus ring and its keyboard handling. Particles are `pointer-events-none` and removed from the DOM once they finish, so a long session leaves nothing behind.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="cool-mode-example" />
  :::
#code
```vue
<template>
  <MCoolMode emoji="🎉" :particle-count="16">
    <UButton size="lg">
      Click me
    </UButton>
  </MCoolMode>
</template>
```
::

## Examples

### Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="cool-mode-custom" />
  :::
#code
  <PlaygroundCode name="CoolMode" />
::

## Props

::component-props
  ::component-prop{name="emoji" type="string" default="'🎉'"}
  Emoji thrown on each press. Any single character or glyph works.
  ::

  ::component-prop{name="particleCount" type="number" default="12"}
  How many emoji one press throws. Above roughly thirty the burst starts to read as noise.
  ::

  ::component-prop{name="disabled" type="boolean" default="false"}
  Turn the burst off without unwrapping the control. The wrapper stays, so toggling it does not remount the slot.
  ::

  ::component-prop{name="class" type="string" default="''"}
  CSS classes for the wrapper.
  ::
::

## Slots

::component-slots
  ::component-slot-row{name="default"}
  The control to decorate. It is rendered untouched, so a button here still behaves like a button.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.coolMode` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `relative inline-block`
  ::
  ::component-slot-row{name="particle"}
  `pointer-events-none absolute select-none leading-none will-change-transform`
  ::
::

## Accessibility

The burst is decoration, so every particle is `aria-hidden` and ignores the pointer. The wrapper adds no role, no `tabindex` and no key handler, which means the control inside keeps its own semantics, its focus ring and its Space/Enter activation — the effect never becomes a second, competing target.

Two groups of people are served by turning it off: with `prefers-reduced-motion` set, no particles are created at all, and `disabled` lets an app switch the burst off per surface without changing the markup. Since the burst fires on `pointerdown`, it is a pointer-only flourish: nothing about the control depends on it, and the same press still activates the button.
