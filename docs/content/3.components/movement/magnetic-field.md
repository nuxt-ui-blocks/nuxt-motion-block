---
title: Magnetic Field
description: A group of elements that each lean toward the pointer, with a loop that stops when they settle.
---

Magnets are a small effect that is easy to get wrong. Animating a whole group
makes the pointer feel like it is dragging a box. Giving each element its own
spring makes the group feel like a field, because the elements arrive at slightly
different times.

Mark any descendant with `data-magnetic` and it participates. Nothing else in the
subtree is measured. `radius` is where the pull begins, `strength` is the peak
displacement as a fraction of the distance, and the falloff is squared - so an
element barely moves at the edge of the radius and moves most when the pointer is
directly over it.

The loop stops once the pointer has left and every element has settled. On a page
with several fields, a permanent `requestAnimationFrame` is a permanent battery
cost for an effect that is only interesting while the pointer is moving.

## Usage

Put the elements in the default slot and mark each one. The wrapper is the
coordinate space; the elements keep their own markup, focus rings and semantics.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="magnetic-field-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full items-center justify-center">
    <MMagneticField class="flex flex-wrap justify-center gap-3 p-10">
      <button
        v-for="tag in tags"
        :key="tag"
        type="button"
        data-magnetic
        class="rounded-full border border-default bg-default px-4 py-2 text-sm text-default shadow-sm"
      >
        {{ tag }}
      </button>
    </MMagneticField>
  </div>
</template>

<script setup lang="ts">
/**
 * Every chip gets its own spring, so sweeping the cursor across the row leaves a
 * wake instead of moving the group as one block.
 */
const tags = ['Nuxt', 'Vue', 'Motion', 'Tailwind', 'TypeScript']
</script>
```
::

## Customize

The three modes differ by feel rather than by description, so the example puts
two of them side by side: one gathers, the other scatters. `orbit` adds a
tangential shove on top of the radial pull, so elements circle the pointer
instead of collapsing onto it.

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="magnetic-field-custom" />
  :::
#code
```vue
<template>
  <div class="grid w-full max-w-lg gap-4 sm:grid-cols-2">
    <div
      v-for="panel in panels"
      :key="panel.mode"
      class="rounded-xl border border-default bg-default p-4"
    >
      <p class="mb-3 text-xs font-medium text-highlighted">
        {{ panel.title }}
      </p>
      <MMagneticField
        :mode="panel.mode"
        :radius="140"
        rotate
        class="flex flex-wrap gap-2"
      >
        <span
          v-for="cell in 4"
          :key="cell"
          data-magnetic
          class="flex size-10 items-center justify-center rounded-lg bg-elevated text-xs text-muted"
        >{{ cell }}</span>
      </MMagneticField>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * The two modes side by side, because the difference between them is a feeling
 * rather than a description: one gathers, the other scatters.
 */
const panels = [
  { mode: 'attract', title: 'Attract' },
  { mode: 'repel', title: 'Repel' },
] as const
</script>
```
::

## Props

::component-props
  ::component-prop{name="mode" type="'attract' | 'repel' | 'orbit'" default="'attract'"}
  `attract` pulls elements toward the pointer, `repel` pushes them away by the
  same magnitude, and `orbit` combines a radial pull with a tangential shove so
  they circle instead of collapsing.
  ::
  ::component-prop{name="radius" type="number" default="160"}
  Distance in pixels at which an element starts to feel the pointer. Beyond it the
  offset is exactly zero, so the field has a hard boundary rather than a long,
  imperceptible tail.
  ::
  ::component-prop{name="strength" type="number" default="0.35"}
  Peak displacement as a fraction of the distance to the pointer. At `0.35` an
  element directly under the pointer moves about a third of the way toward it;
  the falloff reduces that everywhere else.
  ::
  ::component-prop{name="stiffness" type="number" default="180"}
  Spring stiffness for each element's own motion. Higher is snappier and less
  legible as a wake.
  ::
  ::component-prop{name="damping" type="number" default="18"}
  Spring damping. Lower values overshoot, which reads as elastic rather than
  magnetic.
  ::
  ::component-prop{name="rotate" type="boolean" default="false"}
  Turn each element toward the pointer, up to 18 degrees. Capped so text inside a
  chip is never turned far enough to be awkward to read.
  ::
  ::component-prop{name="paused" type="boolean" default="false"}
  Stop the field without unmounting it or tearing down the listener wiring. Useful
  in a playground where the effect should freeze on demand.
  ::
  ::component-prop{name="class" type="string" default="''"}
  Merged onto the wrapper. Put the layout here - `flex`, `grid`, `gap`.
  ::
::

## UI

This component's theme exposes the slot below. Override it per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.magneticField` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  The wrapper. It is `relative` and nothing else, because every position on
  screen belongs to the layout you put inside it.
  ::
::

## Accessibility

- The field is decoration. It adds no role, no tab stop and no label, and the
  elements inside keep their own semantics - a `data-magnetic` button is still a
  button with its own accessible name.
- Under `prefers-reduced-motion: reduce` the field is inert and every element
  stays at rest. Nothing about the content depends on the movement.
- It is also inert when the device reports no hover and a coarse pointer, so a
  phone does not get a control that jitters under a finger.
- Touch pointer moves are ignored even inside a capable window, so scrolling with
  a finger across a field does not shove the chips around.
- Rotation is capped at 18 degrees, which keeps a label readable at full pull.
- `paused` is a real stop rather than a visual trick: it clears every transform
  and stops the loop, so it is safe to leave in a page with a "reduce effects"
  preference of its own.

## Performance

- One `requestAnimationFrame` loop serves the whole field. There is no timer or
  loop per element.
- The loop stops when the pointer has left the field and every participant is
  within the rest threshold - position and velocity - so nothing is scheduled
  while the field is at rest.
- Displacement is written straight to `element.style.transform`. There are no
  Motion values and no reactive state per frame, so the component never
  re-renders while the pointer moves.
- `will-change: transform` is set once for each participant when it joins the
  field and removed when it leaves or the field unmounts, rather than being
  re-applied on every pointer move.
- The participant list is kept in sync by a `MutationObserver`, so adding or
  removing a `data-magnetic` child needs no re-registration from the parent.
- At rest the transform is cleared to an empty string rather than left at
  `translate3d(0, 0, 0)`, so the element's computed style matches its resting
  layout instead of carrying an identity transform that later code has to
  override.
- Delta time is clamped, so returning to a backgrounded tab does not launch every
  element across the screen in one step.
