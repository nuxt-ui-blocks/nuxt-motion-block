---
title: Rich Popover
description: Nuxt UI's popover with a spring-scaled content panel and its own animated arrow.
navigation:
  icon: i-lucide-panel-top-open
---

# Rich Popover

`UPopover` with motion added to the panel. The content surface springs in from
`0.95` with a slight downward offset, and — if you ask for it — a second, arrow
shaped diamond scales in behind it a beat later so the panel appears to grow out
of the trigger.

The trigger, the anchoring, the dismissable layer and Escape handling are all
upstream. This component owns the animation and, importantly, the `#content`
slot: when you provide one, upstream's own content markup (including its
positioned arrow) is replaced, which is why the arrow you see is the component's
own and not `UPopover`'s.

`mode="hover"` swaps the underlying primitive for a hover card, which opens on
pointer intent instead of a click. Delays are forwarded, so `openDelay` and
`closeDelay` only mean anything in that mode.

## Usage

Put the trigger in the default slot and the panel in `#content` — the content
slot is what makes this component animate, and without it you get `UPopover`'s
empty surface. `#anchor` is passed through if you need to position against
something other than the trigger.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="rich-popover-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-md flex-col items-start gap-4">
    <MRichPopover arrow>
      <UButton
        label="Release notes"
        icon="i-lucide-megaphone"
        trailing-icon="i-lucide-chevron-down"
      />
      <template #content>
        <div class="w-72 space-y-4 p-4">
          <div>
            <p class="text-sm font-semibold">
              v4.2.0
            </p>
            <p class="text-xs text-muted">
              Shipped two days ago
            </p>
          </div>

          <ul class="space-y-2 text-sm">
            <li
              v-for="entry in entries"
              :key="entry"
              class="flex gap-2"
            >
              <UIcon
                name="i-lucide-check"
                class="mt-0.5 size-4 shrink-0 text-success"
              />
              <span>{{ entry }}</span>
            </li>
          </ul>

          <UButton
            label="Read the changelog"
            icon="i-lucide-arrow-up-right"
            size="sm"
            block
          />
        </div>
      </template>
    </MRichPopover>

    <p class="text-xs text-muted">
      Escape, an outside click, or the trigger itself dismisses it.
    </p>
  </div>
</template>

<script setup lang="ts">
const entries = [
  'Dock keeps magnification between sessions',
  'DockItem exposes an active prop',
  'The bezier spring now matches the reference curve',
]
</script>
```
::

## Props

::field-group
  ::field{name="mode" type="'click' | 'hover'" default="'click'"}
  Which primitive sits underneath. `click` is a popover that opens on trigger
  activation; `hover` swaps in a hover card that opens on pointer intent and
  stays open while the pointer is over the content.
  ::
  ::field{name="open" type="boolean" default="undefined"}
  Controlled open state. The prop is watched with `immediate: true` and seeds
  the internal ref, so an initially-open popover is genuinely open on the first
  paint. Setting it back to `undefined` stops it being pushed from outside and
  returns the component to managing its own state.
  ::
  ::field{name="arrow" type="boolean" default="false"}
  Draw the arrow. This does two things: it is forwarded to `UPopover` for its
  positioned arrow, and it switches on the component's own spring-animated
  diamond inside the content wrapper. Both are drawn, so leave it `false` unless
  you want the double.
  ::
  ::field{name="dismissible" type="boolean" default="true"}
  Forwarded to `UPopover`. When `false`, an outside click or Escape no longer
  closes the popover; the trigger still toggles it.
  ::
  ::field{name="openDelay" type="number" default="0"}
  Milliseconds before opening. Only meaningful with `mode="hover"` — in click
  mode the value is forwarded but nothing waits on it.
  ::
  ::field{name="closeDelay" type="number" default="0"}
  Milliseconds before closing. Same caveat: hover mode only.
  ::
  ::field{name="portal" type="string | boolean | HTMLElement" default="true"}
  Where the popover is mounted, forwarded to `UPopover`. Portalling is what lets
  the panel escape an `overflow: hidden` ancestor, which also means the panel is
  not a DOM child of your trigger.
  ::
::

## Events

::field-group
  ::field{name="update:open" type="(open: boolean) => void"}
  Emitted whenever the underlying popover's open state changes, from a trigger
  click, an outside dismissal, Escape, or a controlled `open` round-trip. This
  is what backs `v-model:open`.
  ::
::

## Slots

::field-group
  ::field{name="default"}
  The trigger. Rendered upstream with `as-child`, so give it one interactive
  element.
  ::
  ::field{name="content"}
  The panel. Only bound when you actually provide it — the template is guarded
  on `$slots.content`, so omitting it leaves `UPopover`'s own (empty) content
  surface rather than mounting an empty animated wrapper.
  ::
  ::field{name="anchor"}
  An explicit anchor, forwarded to `UPopover`'s anchor slot, for positioning the
  panel against an element other than the trigger.
  ::
::

## Accessibility

Nothing semantic is added here. The animated wrapper is a plain `motion.div`
with `will-change-transform`, so `role="dialog"`, the dismissable-layer
behaviour, Escape, and focus management are all `UPopover`'s (or Reka's) — and
they keep working, because the animation is a sibling of the real content rather
than a replacement for it. Content you put in `#content` is reachable by keyboard
and can hold real controls, which is what makes this a popover and the tooltip a
tooltip.

There is no reduced-motion branch in this component. Both springs — the panel
(`stiffness: 400, damping: 25, bounce: 0.1`) and the arrow
(`stiffness: 500, damping: 30`, delayed `0.05s`) — are hard-coded and run under
`prefers-reduced-motion` exactly as they do otherwise.

## Performance

- The panel animates `opacity`, `scale` and `y` only; the wrapper is
  `overflow-hidden` and the animated layer carries `will-change-transform`.
- Open state is held in one internal ref, so the panel's `v-if` and the arrow's
  `v-if` are driven by the same boolean and cannot disagree.
- The arrow is a 50ms-delayed sibling animation rather than a second timeline —
  two independent springs, no orchestration cost.
- Only the `#content` and `#anchor` templates are bound conditionally, so a
  popover without them mounts strictly less than one with them.

::tip
The content wrapper is `relative overflow-hidden`, and the diamond is pinned
`-top-1` with `translate-x-1/2` inside it. If your panel has heavy top padding
or a background that extends to the very top edge, the arrow is drawn over your
own content — give the panel a little top padding so the diamond has somewhere
to sit.
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.richPopover` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `relative overflow-hidden` |
| `content` | `will-change-transform` |
| `arrow` | `absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-default border-t border-l border-default will-change-transform` |
