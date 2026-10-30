---
title: Particles
description: A drifting field of dots that scatters away from the pointer.
---

Particles draws a cloud of dots on a canvas and nudges them away from the pointer as it moves through the field. Each dot is pushed from its home position, then eased back once the pointer leaves, so the field heals itself instead of staying disturbed.

Dots can also drift on their own with `vx` and `vy`, wrapping around the edges to keep the field evenly filled. Drawing pauses while the component is scrolled out of view, and the field holds still when the visitor has asked for reduced motion.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="particles-example" />
  :::
#code
```vue
<template>
  <div class="relative h-64 w-full overflow-hidden rounded-xl border border-default bg-default">
    <MParticles
      class="absolute inset-0"
      :quantity="120"
      :size="0.8"
      :staticity="40"
      :ease="60"
    />
    <div class="relative z-10 flex h-full flex-col items-center justify-center gap-2 text-center">
      <h3 class="text-2xl font-bold text-highlighted">
        Particles
      </h3>
      <p class="max-w-xs text-sm text-muted">
        Move your pointer across the field and the dots scatter
      </p>
    </div>
  </div>
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
    <component-example name="particles-custom" />
  :::
#code
  <PlaygroundCode name="Particles" />
::

## Props

::component-props
  ::component-prop{name="quantity" type="number" default="100"}
  How many dots to draw. The field is reseeded whenever this changes.
  ::

  ::component-prop{name="color" type="string" default="'var(--ui-primary)'"}
  Colour of every dot. Any CSS colour works.
  ::

  ::component-prop{name="size" type="number" default="0.4"}
  Base radius of a dot, in pixels. Each dot is drawn somewhere between this and 2.4 times it, so the field reads as uneven.
  ::

  ::component-prop{name="staticity" type="number" default="50"}
  How far the pointer reaches, inverted: a higher value means a shorter reach and a calmer field. `0` ignores the pointer entirely.
  ::

  ::component-prop{name="ease" type="number" default="50"}
  How fast a pushed dot settles home, and how hard it is pushed. `0` never settles, `100` snaps back immediately.
  ::

  ::component-prop{name="vx" type="number" default="0"}
  Horizontal drift of every dot, in pixels per frame.
  ::

  ::component-prop{name="vy" type="number" default="0"}
  Vertical drift of every dot, in pixels per frame.
  ::

  ::component-prop{name="refresh" type="boolean" default="false"}
  Flip this to reseed the field with fresh random positions.
  ::

  ::component-prop{name="class" type="string" default="''"}
  CSS classes to apply to the container. The container fills its parent, so give the parent a height.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.particles` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `relative h-full w-full overflow-hidden`
  ::
  ::component-slot-row{name="canvas"}
  `pointer-events-none absolute inset-0 h-full w-full`
  ::
::
