---
title: Checkbox
description: A checkbox whose tick is drawn along its stroke when it is checked.
navigation:
  icon: i-lucide-square-check-big
---

# Checkbox

A checkbox with a drawn-in tick. The box pops through a `1 ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ 1.15 ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ 1` scale
when it is checked, and the tick draws itself along its stroke by animating
`pathLength` from `0` to `1`.

It is a controlled component with three props and no styling API of its own: the
checked state is always `bg-primary` with a white tick. Wrap it in a fieldset
with a legend if a group of them needs a name ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â the component renders a bare
`<label>` and no group semantics.

## Usage

Bind `v-model` to a boolean and pass a `label`. `drawDuration` controls how long
the tick takes to draw; it does not affect the box.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="checkbox-basic" />
  :::
#code
```vue
<template>
  <fieldset class="flex w-full max-w-md flex-col gap-4 rounded-xl border border-default p-5">
    <legend class="px-1 text-xs font-medium uppercase tracking-widest text-dimmed">
      Notifications
    </legend>

    <MCheckbox
      v-for="channel in channels"
      :key="channel.key"
      v-model="enabled[channel.key]"
      :label="channel.label"
      :draw-duration="channel.drawDuration"
    />

    <p class="border-t border-default pt-3 text-xs text-muted">
      {{ enabledCount }} of {{ channels.length }} channels enabled
    </p>
  </fieldset>
</template>

<script setup lang="ts">
const channels = [
  { key: 'product', label: 'Product updates', drawDuration: 0.3 },
  { key: 'security', label: 'Security alerts', drawDuration: 0.3 },
  { key: 'digest', label: 'Weekly digest', drawDuration: 0.7 },
]

const enabled = reactive<Record<string, boolean>>({
  product: true,
  security: true,
  digest: false,
})

const enabledCount = computed(() => Object.values(enabled).filter(Boolean).length)
</script>
```
::

## Props

::field-group
  ::field{name="modelValue" type="boolean" default="false"}
  Whether the box is checked. The component is fully controlled ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â it renders
  `:checked` straight onto the native input and never keeps its own copy, so
  this must be bound for the checkbox to respond at all.
  ::
  ::field{name="label" type="string" default="''"}
  Text shown beside the box. Also the input's accessible name, because the input
  sits inside the wrapping `<label>`. When empty, nothing renders next to the box
  and the checkbox has no accessible name.
  ::
  ::field{name="drawDuration" type="number" default="0.3"}
  Seconds the tick takes to draw itself along its stroke. Applies to the tick
  only ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â the box's scale pop is a fixed `0.25s` and is not configurable.
  ::
::

## Events

::field-group
  ::field{name="update:modelValue" type="(value: boolean) => void"}
  Emitted from the native input's `change` event with its new `checked` state.
  Makes `v-model` work.
  ::
::

## Accessibility

The semantics come from a real `<input type="checkbox">`, which is `sr-only`
inside the wrapping `<label>`. That gives native click-to-toggle on the label,
Space to toggle from the keyboard, and the label text as the accessible name.

The painted box is a plain `div` with no ARIA at all, so it adds nothing to the
accessibility tree ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â it is purely visual, and the checkbox is announced once.

Two gaps worth knowing about. The input is `sr-only`, so the browser's focus ring
lands on a clipped one-pixel element and **no visible focus indicator is
rendered** ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â add your own `:focus-within` ring on the label if you ship this
form to keyboard users. And there is no `disabled` prop, so a checkbox in a
locked state has to be replaced rather than disabled.

`prefers-reduced-motion` is not read. Set `draw-duration="0"` to suppress the
tick draw; the box's scale keyframes still run.

## Performance

- Two animated elements per checkbox: the box `motion.div` and the tick
  `motion.path`. No timers, no listeners, no per-frame JavaScript.
- The box animates `scale` only, on `0.25s` ease-out. Because the target is the
  keyframe array `[1, 1.15, 1]`, it replays on every unchecked ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ checked
  transition and collapses to a static `1` while unchecked.
- The tick animates `pathLength`, which is a stroke-dash draw: no layout and no
  repaint of the surrounding box, only of the tick's own path.
- The tick's `stroke` is hardcoded to white and the checked fill to
  `bg-primary`, so there is no theme hook for the colours ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â restyle through
  `bg-primary` overrides or wrap the component.
- The SVG is a fixed `0 0 24 24` viewBox rendered at `14px`, so it costs the same
  at every font size.

::tip
`drawDuration` only paces the tick's stroke. The box pop is a hardcoded `250ms`,
so setting `drawDuration` to `0.7` does not slow the checkbox down ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â it makes the
tick finish long after the box has already landed.
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.checkbox` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `'inline-flex cursor-pointer select-none items-center gap-2'` |
| `checkbox` | `'inline-flex'` |
| `label` | `'text-sm'` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.checkbox` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `inline-flex cursor-pointer select-none items-center gap-2` |
| `checkbox` | `inline-flex` |
| `label` | `text-sm` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.checkbox` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `inline-flex cursor-pointer select-none items-center gap-2` |
| `checkbox` | `inline-flex` |
| `label` | `text-sm` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.checkbox` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `inline-flex cursor-pointer select-none items-center gap-2` |
| `checkbox` | `inline-flex` |
| `label` | `text-sm` |
