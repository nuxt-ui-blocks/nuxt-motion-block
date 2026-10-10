---
title: Clip Corners Button
description: A button whose four corner triangles spring inward on hover, reading as the corners being clipped away.
navigation:
  icon: i-lucide-crop
---

# Clip Corners Button

Four triangles sit just inside the corners of a `UButton` and spring diagonally toward
its centre on hover, so the button reads as if its corners were being clipped away by
the surface behind it.

That reading is the whole trick, and it is why the triangles are painted rather than
erased: nothing is removed from the button, four pieces of the *surrounding* colour are
drawn on top. The default `triangleColor` is `var(--ui-background)`, which is not a
Nuxt UI v4 token ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â on a stock setup it resolves to nothing and the polygons fall back to
the inherited SVG fill, black. Set it to the surface the button sits on
(`var(--ui-bg)`, `--ui-bg-muted`, a card colour) and the effect lands.

## Usage

Pass `label` and the usual `UButton` props, then set `triangle-color` to whatever is
behind the button. On a plain page background that is `var(--ui-bg)`; inside a card,
match the card.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="clip-corners-button-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-md flex-col items-center gap-6 py-6">
    <div class="flex flex-wrap items-center justify-center gap-4">
      <MClipCornersButton
        label="Deploy"
        color="primary"
        triangle-color="var(--ui-bg)"
      />
      <MClipCornersButton
        label="Destroy"
        color="error"
        variant="soft"
        triangle-color="var(--ui-bg)"
      />
      <MClipCornersButton
        label="Docs"
        color="neutral"
        variant="outline"
        triangle-color="var(--ui-bg)"
        trailing-icon="i-lucide-arrow-up-right"
      />
    </div>

    <p class="max-w-xs text-center text-xs text-muted">
      Four triangles sit a few pixels inside the button box and spring diagonally toward the centre
      on hover, reading as the corners being clipped away. They are painted in the colour of the
      surface behind the button, which is why <code>triangle-color</code> is set here rather than
      left at its default.
    </p>
  </div>
</template>

```
::

## Props

::field-group
  ::field{name="triangleColor" type="string" default="'var(--ui-background)'"}
  Fill for all four triangles ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â a colour, a gradient or any CSS `fill` value. It has to
  match the surface behind the button, because that is what makes the corners look
  clipped. The default is not a Nuxt UI v4 token; prefer `var(--ui-bg)` or
  `var(--ui-bg-muted)`.
  ::
  ::field{name="triangleSize" type="number" default="8"}
  Width and height of each triangle's SVG, in pixels. It also sets the travel distance:
  each triangle springs `round(size / 2)` pixels inward, so a bigger triangle both
  covers more corner and moves further.
  ::
  ::field{name="triangleInset" type="number" default="4"}
  Distance from the button box to the triangle, in pixels. At the default the triangles
  sit inside the button rather than flush with its edge, which is what keeps them clear
  of a border radius.
  ::
::

## Slots

::field-group
  ::field{name="default"}
  The button's content. Rendered inside the inner `UButton`; falls back to the `label`
  attribute like any `UButton`.
  ::
::

## Accessibility

The button is a real `UButton`, so it is a `<button type="button">` with keyboard
activation and Nuxt UI's focus ring. The four triangles are absolutely positioned
`div`s containing a one-polygon SVG with no role and no text, so assistive technology
has nothing to read ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â the component does not mark them `aria-hidden`, it simply has
nothing to expose.

Focus does not trigger the clip: it is `mouseenter` / `mouseleave` on the wrapper, and
the wrapper only reacts on a device matching `(hover: hover) and (pointer: fine)`. A
keyboard user gets the focus ring and nothing else. Under `prefers-reduced-motion` the
spring is replaced by `duration: 0` and the animate target is an empty object, so the
triangles snap to their resting position and never move.

## Performance

- Four `motion.div`s animate only `x` and `y`, so the effect is transform-only. Each
  holds a fixed-size SVG, so the clip itself never triggers layout.
- Every triangle is `pointer-events-none`, which keeps them out of the hit-test path
  and out of the focus order.
- Hover is gated on a hover-capable pointer, so on touch the `mouseenter` branch is
  never taken and nothing animates.
- The two media queries are registered in `onMounted` with inline handlers and are
  never removed, so each mounted instance leaves two `change` listeners on the
  document after it unmounts. Cheap per instance, but it does not scale to hundreds.

::tip
`triangleSize` and `triangleInset` work against each other. At the defaults the
triangles are 8px sitting 4px inside the button, so the visible cut is small. For a
decisive clip raise both together ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â `triangle-size="14" triangle-inset="0"` ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â and check
the result against your button's border radius, since a heavily rounded button has no
corner left to clip.
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.clipCornersButton` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `'relative inline-block'` |
| `corner` | `'absolute pointer-events-none z-20'` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.clipCornersButton` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `relative inline-block` |
| `corner` | `absolute pointer-events-none z-20` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.clipCornersButton` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `relative inline-block` |
| `corner` | `absolute pointer-events-none z-20` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.clipCornersButton` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `relative inline-block` |
| `corner` | `absolute pointer-events-none z-20` |
