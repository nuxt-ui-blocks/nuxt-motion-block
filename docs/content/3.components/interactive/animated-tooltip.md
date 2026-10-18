---
title: Animated Tooltip
description: Nuxt UI's tooltip with a spring-driven entrance that scales in from the side it opens on.
---

Nuxt UI's `UTooltip` with its fade replaced by a spring-driven entrance.
Positioning, portalling, delay and focus behaviour still come from the
underlying tooltip; the only thing this component adds is the motion — a spring
that scales the content up from `0.95` and settles it as it appears.

The direction of that entrance is derived from `content.side`. A tooltip opening
below its trigger starts offset four pixels *upward* and grows into place; one
opening above starts offset downward. The sign is inverted so the content always
arrives from the side it is about to occupy, whichever side that is.

Text and keyboard shortcuts still work exactly as they do upstream, including
the `kbds` shortcut row. The `content` slot replaces both when you need richer
markup.

## Usage

Put a single focusable trigger in the default slot and describe it with `text`
or `kbds`; use the `content` slot when the tooltip needs more than a line.
Tune the feel with `springStiffness` and `springDamping` — the defaults are
snappier and bouncier than Nuxt UI's own fade.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="animated-tooltip-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-lg flex-col items-center gap-6">
    <div class="flex flex-wrap items-center justify-center gap-3">
      <MAnimatedTooltip
        text="Copied to clipboard"
        :delay-duration="200"
      >
        <UButton
          icon="i-lucide-copy"
          label="Copy link"
          color="neutral"
          variant="outline"
        />
      </MAnimatedTooltip>

      <MAnimatedTooltip
        text="Save this build"
        :kbds="['⌘', 'S']"
      >
        <UButton
          icon="i-lucide-save"
          label="Save"
          color="neutral"
          variant="outline"
        />
      </MAnimatedTooltip>

      <MAnimatedTooltip
        :delay-duration="200"
        :disabled="disabled"
      >
        <UButton
          icon="i-lucide-rocket"
          label="Deploy"
        />
        <template #content>
          <div class="max-w-56 space-y-1">
            <p class="font-medium text-white">
              Deploy to production
            </p>
            <p class="text-white/70">
              Builds on the edge, then swaps traffic once the health check passes.
            </p>
          </div>
        </template>
      </MAnimatedTooltip>
    </div>

    <USwitch
      v-model="disabled"
      label="Disable the deploy tooltip"
    />
  </div>
</template>

<script setup lang="ts">
const disabled = ref(false)
</script>
```
::


## Placement

Tooltips open below their trigger by default. Pass `content.side` to place them
elsewhere — the bubble still animates in from whichever edge it lands on, and
`arrow` adds the pointer.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="animated-tooltip-placement" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-lg flex-col items-center gap-6">
    <div class="grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
      <MAnimatedTooltip
        v-for="side in sides"
        :key="side"
        :text="`Opens on the ${side}`"
        :content="{ side, sideOffset: 8, collisionPadding: 8 }"
        :delay-duration="150"
        arrow
      >
        <UButton
          :label="side"
          color="neutral"
          variant="outline"
          class="w-full justify-center capitalize"
        />
      </MAnimatedTooltip>
    </div>

    <p class="text-xs text-dimmed">
      The entrance is offset from the side it opens on, so the bubble always scales in from the edge it appears beside.
    </p>
  </div>
</template>

<script setup lang="ts">
const sides = ['top', 'right', 'bottom', 'left'] as const
</script>
```
::


## Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="animated-tooltip-custom" />
  :::
#code
  <PlaygroundCode name="AnimatedTooltip" />
::

## Props

::component-props
  ::component-prop{name="text" type="string"}
  The plain-text label. Rendered inside a `data-slot="text"` span with the
  upstream tooltip theme classes, unless the `content` slot overrides it.
  ::
  ::component-prop{name="kbds" type="KbdProps['value'][] | KbdProps[]"}
  Keyboard hints rendered as a `UKbd` row after the text. Entries may be plain
  strings or full `KbdProps` objects, exactly as upstream; the row only appears
  when the array is non-empty.
  ::
  ::component-prop{name="content" type="{ side?, sideOffset?, collisionPadding?, [key: string]: any }" default="{ side: 'bottom', sideOffset: 8, collisionPadding: 8 }"}
  Positioning options, forwarded to `UTooltip`'s `content`. Two things depend on
  it: collision padding is why the bubble never touches the trigger's edge, and
  `side` decides which way the entrance is offset from. Defaults to a bottom
  bubble 8px away with 8px of collision padding.
  ::
  ::component-prop{name="arrow" type="boolean | object" default="false"}
  Forwarded to `UTooltip`, so the arrow is the upstream one — it renders inside
  the content surface alongside the motion wrapper rather than being animated by
  this component.
  ::
  ::component-prop{name="delayDuration" type="number" default="700"}
  Milliseconds to wait after hover or focus before the tooltip appears. The
  upstream default is deliberately long; anything below roughly 200ms starts to
  feel twitchy.
  ::
  ::component-prop{name="disabled" type="boolean" default="false"}
  Turns the tooltip off entirely, without removing the trigger.
  ::
  ::component-prop{name="open" type="boolean" default="undefined"}
  Controlled open state. `update:open` fires when it changes, so
  `v-model:open` works. Leave it `undefined` for the uncontrolled hover/focus
  behaviour.
  ::
  ::component-prop{name="defaultOpen" type="number | boolean" default="undefined"}
  Uncontrolled initial open state, forwarded to `UTooltip`.
  ::
  ::component-prop{name="portal" type="string | boolean | HTMLElement" default="true"}
  Where the bubble is mounted. Keep it `true` unless you need the tooltip to be
  clipped to an ancestor's stacking context.
  ::
  ::component-prop{name="ui" type="Record<string, any>" default="undefined"}
  The upstream tooltip theme overrides, forwarded untouched. The `text` and
  `kbds` sub-slots read `ui.text` / `ui.kbds` from here when rendering their
  fallbacks.
  ::
  ::component-prop{name="springStiffness" type="number" default="500"}
  Spring stiffness for the enter. Higher is faster and more abrupt.
  ::
  ::component-prop{name="springDamping" type="number" default="20"}
  Spring damping for the enter. The default ratio against `springStiffness`
  gives a small, tight overshoot.
  ::
::

## Events

::component-events
  ::component-event{name="update:open" type="(value: boolean) => void"}
  Re-emitted from the underlying tooltip's own `update:open`, so hover, focus,
  Escape and a controlled `open` all report back through one event.
  ::
::

## Slots

::component-slots
  ::component-slot-row{name="default"}
  The trigger. It is rendered with `as-child` upstream, so a single focusable
  element is what you want — a bare `<span>` will not receive focus and the
  tooltip will be keyboard-unreachable.
  ::
  ::component-slot-row{name="content"}
  Replaces the whole content surface, including the built-in `text` and `kbds`
  spans. This is where rich markup goes; there is no scoped slot data beyond
  what upstream passes through.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.animatedTooltip` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  ::
  ::component-slot-row{name="content"}
  `will-change-transform`
  ::
::

## Accessibility

The component adds no ARIA of its own — the animated wrapper is a plain
`motion.div` carrying `will-change-transform` and nothing else. Everything
semantic is upstream: the bubble is a `tooltip`, the trigger is linked to it
with `aria-describedby`, and it opens on hover *and* on keyboard focus with
Escape to dismiss.

Attribute inheritance is off and `$attrs` is forwarded to `UTooltip`, which in
turn forwards anything it does not declare onto the trigger. So `aria-label`,
`data-*` and `id` land on your trigger element — and so do the upstream props
this component does not re-declare: `disableHoverableContent`,
`disableClosingTrigger`, `ignoreNonKeyboardFocus` and `reference` all pass
through as ordinary attributes.

A tooltip is not a popover: it is not dismissable by clicking inside it and its
content is not reachable by keyboard. If the content needs to be clickable or
tabbable, use `MRichPopover` instead.

Reduced motion is honoured. `useReducedMotion()` reduces the entrance to a bare
opacity fade and replaces the spring with a zero-duration transition, so the
tooltip appears without the scale or the 4px offset.

## Performance

- `scale`, `x`, `y` and `opacity` only — the entrance never touches a layout
  property, so showing a tooltip costs no reflow.
- The 4px offset is baked into the initial state rather than animated as a
  separate step, so the scale and the slide resolve on one spring curve.
- Dismissing hands back to Nuxt UI: the bubble unmounts at once instead of
  springing out, so a tooltip you move away from never lingers under the cursor.
- `will-change-transform` is set permanently on the wrapper. That is one
  promoted layer per open tooltip and it is released when the bubble unmounts.
- No timers and no listeners of its own; delay, dismissal and positioning are
  entirely upstream.

::tip
Because this component always hands `UTooltip` a `#content` template, upstream's
"no text, no `kbds`, no content slot ⇒ disable the tooltip" check is always
satisfied. A tooltip with a bare trigger and nothing else still opens — as an
empty bubble. Always give it `text`, `kbds` or the `content` slot.
::

