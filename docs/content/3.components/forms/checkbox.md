---
title: Checkbox
description: A checkbox whose tick is drawn along its stroke when it is checked.
---

A checkbox with a drawn-in tick. The box pops through a `1 → 1.15 → 1` scale
when it is checked, and the tick draws itself along its stroke by animating
`pathLength` from `0` to `1`.

It is a controlled component with three props and no colour or size options of
its own: it renders Nuxt UI's `UCheckbox` at a fixed `xl` size and lays a
drawn-in white tick over the top. Wrap it in a fieldset with a legend if a group
of them needs a name — the component renders a bare `<label>` and no group
semantics.

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


## Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="checkbox-custom" />
  :::
#code
  <PlaygroundCode name="Checkbox" />
::

## Props

::component-props
  ::component-prop{name="modelValue" type="boolean" default="false"}
  Whether the box is checked. The component is fully controlled — it forwards
  the value to Nuxt UI's `UCheckbox` and never keeps its own copy, so this must
  be bound for the checkbox to respond at all.
  ::
  ::component-prop{name="label" type="string" default="''"}
  Text shown beside the box. It also labels the control, because the whole thing
  is wrapped in a `<label>`. When empty, nothing renders next to the box.
  ::
  ::component-prop{name="drawDuration" type="number" default="0.3"}
  Seconds the tick takes to draw itself along its stroke. Applies to the tick
  only — the box's scale pop is a fixed `0.25s` and is not configurable.
  ::
::

## Events

::component-events
  ::component-event{name="update:modelValue" type="(value: boolean) => void"}
  Emitted from the native input's `change` event with its new `checked` state.
  Makes `v-model` work.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.checkbox` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `inline-flex cursor-pointer select-none items-center gap-2`
  ::
  ::component-slot-row{name="checkbox"}
  `relative inline-flex [&_[data-slot=icon]]:opacity-0`
  ::
  ::component-slot-row{name="label"}
  `text-sm`
  ::
::

## Accessibility

The control renders Nuxt UI's `UCheckbox` (which exposes `role="checkbox"` and
`aria-checked`) inside a wrapping `<label>`. That gives click-to-toggle, keyboard
navigation, and the label text as the accessible name.

The built-in motion is purely decorative animation (the box scale pop and the
SVG tick draw). `prefers-reduced-motion` is not read by this component. Set
`draw-duration="0"` to suppress the tick draw; the box's scale keyframes still
run. Also note: `UCheckbox` provides its own focus styles, so no custom
`:focus-within` ring is required to meet keyboard visibility in most UIs.

There is no `disabled` prop on this wrapper. To disable, pass a disabled checkbox
via Nuxt UI directly or prevent events in your app.

## Performance

- Two animated elements per checkbox: the box `motion.div` and the tick
  `motion.path`. No timers, no listeners, no per-frame JavaScript.
- The box animates `scale` only, on `0.25s` ease-out. Because the target is the
  keyframe array `[1, 1.15, 1]`, it replays on every unchecked → checked
  transition and collapses to a static `1` while unchecked.
- The tick animates `pathLength`, which is a stroke-dash draw: no layout and no
  repaint of the surrounding box, only of the tick's own path.
- The tick uses `stroke="currentColor"` (`text-inverted`) and sits over Nuxt UI's
  checked `bg-primary` indicator. There is no theme hook for those colours —
  restyle through `bg-primary`/`text-inverted` overrides or wrap the component.
- The SVG is a fixed `0 0 24 24` viewBox rendered at `14px`, so it costs the same
  at every font size.

::tip
`drawDuration` only paces the tick's stroke. The box pop is a hardcoded `250ms`,
so setting `drawDuration` to `0.7` does not slow the checkbox down — it makes the
tick finish long after the box has already landed.
::

