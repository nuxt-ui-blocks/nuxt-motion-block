---
title: Tilt Card
description: A card that rotates toward the pointer, with an optional glare and depth-based parallax for nested layers.
---

A surface with a small amount of depth. The pointer position sets a rotation on
two axes, capped by `maxTilt`, and the card scales up slightly while it is held.
Because the rotation is driven by the pointer rather than a fixed animation, the
card settles wherever the cursor leaves it.

The effect is deliberately narrow: only the wrapper rotates, so text stays
readable and anything inside keeps its own layout and semantics. Keyboard focus
on a control inside produces a fixed, gentler tilt, which means the state is not
hover-only.

## Usage

Wrap the content in the card and give it a surface of your own. The component
adds `relative` and the transform; the border, padding and background belong to
the content.

::code-preview
---
label: Preview
---

  :::div{class="w-full"}
    <component-example name="tilt-card-basic" />
  :::
#code
```vue
<template>
  <div class="flex min-h-[360px] w-full items-center justify-center p-6">
    <MTiltCard class="w-72 rounded-2xl border border-default bg-elevated p-6 shadow-lg">
      <div class="flex flex-col gap-5">
        <span class="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
          <UIcon
            class="size-5"
            name="i-lucide-layers"
          />
        </span>

        <div>
          <p class="text-base font-semibold text-highlighted">
            Depth on demand
          </p>
          <p class="mt-1 text-sm text-muted">
            Move the pointer across the surface and the card leans with it. Tab
            to the button to see the focus tilt.
          </p>
        </div>

        <UButton
          class="w-fit"
          color="neutral"
          label="View project"
          size="sm"
          variant="outline"
        />
      </div>
    </MTiltCard>
  </div>
</template>
```

::

The card does not add a tab stop of its own. If the surface needs to be
reachable, put a real link or button inside it, as the example does.

## Customize

Turn on `parallax` and mark descendants with `data-tilt-depth` from `0` to `1`.
A layer at `0.9` travels almost the full range while `0.15` barely moves, which
is enough to separate a photo, its gradient and a caption without any extra
markup.

::code-preview
---
label: Preview
---

  :::div{class="w-full"}
    <component-example name="tilt-card-custom" />
  :::
#code
  <PlaygroundCode name="TiltCard" />
::

The glare is a single absolutely positioned layer with a radial gradient whose
centre follows the pointer. It never lights up on devices without a fine hover
pointer, and the pointer handlers return early there, so a phone does not tilt
or show a highlight it cannot control.

## Props

::component-props
  ::component-prop{name="maxTilt" type="number" default="12"}
  Maximum rotation in degrees at the edge of the card. The centre is always flat.
  ::
  ::component-prop{name="scale" type="number" default="1.03"}
  Scale applied while the pointer is over the card.
  ::
  ::component-prop{name="perspective" type="number" default="900"}
  CSS perspective in pixels. Smaller values make the rotation look stronger.
  ::
  ::component-prop{name="glare" type="boolean" default="true"}
  Render the glare highlight.
  ::
  ::component-prop{name="glareOpacity" type="number" default="0.25"}
  Peak opacity of the glare, between 0 and 1.
  ::
  ::component-prop{name="parallax" type="boolean" default="false"}
  Move descendants marked with `data-tilt-depth` as the pointer moves.
  ::
  ::component-prop{name="class" type="string"}
  Extra classes for the card surface.
  ::
::

## Accessibility

- The card is a plain `div` and adds no role, no tab stop and no focus trap, so
  links and buttons inside keep their native semantics.
- A control inside the card produces a fixed tilt on `focusin`, and the tilt
  resets on `focusout`, so keyboard users get the same emphasis as pointer users.
- The glare is `aria-hidden`; it is decoration and never carries information.
- Pointer handlers return early on touch devices and under
  `prefers-reduced-motion`, so the card stays flat rather than tilting from a tap.
- Rotation is capped at `maxTilt` on both axes, which keeps text upright enough
  to read at every pointer position.

## Performance

- Pointer movement writes CSS custom properties on one element and, when
  parallax is on, a transform on each marked layer. No Vue state changes, so
  moving the pointer never re-renders the card.
- The rotation is a single composited `transform` with a 200 ms CSS transition;
  nothing is measured on every frame.
- The pointer is measured once per event with one `getBoundingClientRect()`.
- There is no animation frame loop and no timer in the component.
- The glare adds one `background-image` layer and stays at zero opacity when the
  device has no fine pointer, so it never paints a highlight on touch.
