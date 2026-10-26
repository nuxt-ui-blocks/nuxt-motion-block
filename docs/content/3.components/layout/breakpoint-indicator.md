---
title: Breakpoint Indicator
description: A development badge that names the active Tailwind breakpoint and shows the live viewport size.
---

A small status badge for the corner of a development build. It reads the viewport,
finds the last breakpoint whose `min` is at or below the current width, and shows
that name next to a `width × height` readout. The name rolls when it changes; the
numbers update instantly.

The optional ruler turns the wait for the next breakpoint into a bar: it fills
across the gap between the current breakpoint and the next one, with the remaining
pixels beside it. At the widest breakpoint it sits full, since there is nowhere
left to go.

Visibility is toggled with `Ctrl`/`Cmd` + `hotkey` and remembered in
`localStorage`. The badge is a development tool, so gate it at the call site —
`enabled` defaults to `true` rather than guessing from the build mode, because the
module can be rendered in a docs site, a playground and a preview build that all
report the same environment.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="breakpoint-indicator-basic" />
  :::
#code
```vue
<template>
  <div class="relative flex h-40 w-full items-center justify-center rounded-lg border border-dashed border-default">
    <p class="max-w-xs text-center text-sm text-muted">
      Resize the window, or press Ctrl/Cmd + B to hide the badge.
    </p>

    <MBreakpointIndicator
      :fixed="false"
      position="bottom-right"
      show-ruler
    />
  </div>
</template>
```
::

`fixed` is `true` by default, which pins the badge to `position: fixed` in the
chosen corner. The example turns it off so the badge travels with the preview box;
in an app, leave it on and drop the component once near the root.

## Customize

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full"}
    <component-example name="breakpoint-indicator-custom" />
  :::
#code
  <PlaygroundCode name="BreakpointIndicator" />
::

`breakpoints` is sorted by `min` before use, so the array does not have to be in
order. Anything below the first entry reports as `base`. The list replaces the
default `sm` through `2xl` set entirely; the component does not read Tailwind's
configuration, so keep the two in step by hand if you change the theme.

## Props

::component-props
  ::component-prop{name="breakpoints" type="Breakpoint[]" default="sm, md, lg, xl, 2xl"}
  The widths to compare against. Each entry is `{ min, name }`; `min` is in
  pixels. Sorted internally, and the list is not merged with the defaults.
  ::
  ::component-prop{name="enabled" type="boolean" default="true"}
  Renders the badge at all. Set it to `false` — or guard the component with your
  own environment check — to keep it out of production.
  ::
  ::component-prop{name="visible" type="boolean"}
  Controlled visibility. Leave it out to let the hotkey drive it and remember the
  choice in `localStorage` under a namespaced key.
  ::
  ::component-prop{name="fixed" type="boolean" default="true"}
  Pins the badge to the viewport. With `false` it is `absolute`, so the nearest
  positioned ancestor decides where it lands.
  ::
  ::component-prop{name="position" type="'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'" default="'bottom-left'"}
  The corner used by `fixed` or `absolute` positioning.
  ::
  ::component-prop{name="hotkey" type="string" default="'b'"}
  The character pressed with `Ctrl` or `Cmd` to toggle visibility. A single key is
  expected; it is compared case-insensitively.
  ::
  ::component-prop{name="showSize" type="boolean" default="true"}
  Shows the live viewport readout, e.g. `1280×800`.
  ::
  ::component-prop{name="showRuler" type="boolean" default="false"}
  Shows the bar between the active and next breakpoints, plus the pixels left
  before the next one.
  ::
  ::component-prop{name="class" type="string"}
  Extra classes for the badge.
  ::
::

## Events

::component-events
  ::component-event{name="update:visible" type="(visible: boolean) => void"}
  Fires when the hotkey toggles the badge, whether or not visibility is
  controlled. The component also writes the new value to `localStorage` while it
  owns the state.
  ::
::

## Accessibility

- The badge is `role="status"` with `aria-live="polite"` and an `aria-label` that
  spells out the active breakpoint and both viewport dimensions. A breakpoint
  change is announced without moving focus.
- The ruler and its remaining-pixels label are `aria-hidden`. They repeat a
  secondary, visual detail; the essential state is already in the label.
- The badge is not a button. The only interaction is the global hotkey, which is
  discoverable from the `title` attribute; a visitor who does not know the
  shortcut cannot dismiss it by pointer. That is a real limitation of a
  non-interactive status element, not a hidden control.
- The `title` names `Ctrl/Cmd + <hotkey>`, and the label stays correct whether the
  badge is controlled or writing its own visibility.
- Under `prefers-reduced-motion` the breakpoint name keeps its hidden `initial`
  state but swaps with a zero-duration transition, so the text changes instantly
  instead of rolling.

## Performance

- One `useWindowSize` subscription tracks the viewport; no `ResizeObserver` runs
  against `documentElement` and no animation frame is scheduled per resize.
- Breakpoint lookup sorts a copy of the list and walks it once per width change.
  It is a handful of comparisons, not a media-query listener per breakpoint.
- Only the breakpoint label animates, and only on `opacity` and `transform`. The
  size readout and the ruler width update as plain text and a percentage.
- The badge renders nothing during SSR and until the first client mount, which
  avoids a hydration mismatch from a viewport width the server cannot know.
- One global `keydown` listener is attached through VueUse and removed on unmount.
  There is no polling and no timer.

::warning
This is a development affordance, not product UI. Leave `enabled` on in a
playground and set it to `false` — or omit the component — in the production
build. The built-in breakpoints mirror Tailwind's defaults; if you customize the
theme, pass the same `min` values here.
::
