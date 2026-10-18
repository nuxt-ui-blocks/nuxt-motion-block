---
title: Animated Stepper
description: A stepper whose content panel slides horizontally in the direction of travel.
---

`UStepper` with the content panel animated. When the step changes, the outgoing
panel exits and the incoming one enters with a 20px horizontal offset — to the
right when moving forward, to the left when moving back — on a
`{ stiffness: 300, damping: 25 }` spring, cross-faded over the top of each other.

The direction is not guessed at render time. A `flush: 'sync'` watcher on
`modelValue` records the sign of the change *before* the new value reaches the
DOM, which is why stepping backwards enters from the left rather than briefly
sliding in from the right and correcting.

Everything above the panel is Reka UI's stepper, untouched: the progress header,
the icons, the separators, the titles and descriptions, and the roving arrow-key
focus. What the component adds is the transition inside `#content`.

## Usage

`items` is required. Set `modelValue` to the **index** of the active step, not a
key — `UStepper` matches on index here because the component renumbers each item
with `value: i`. Supply `content` per item for the default body text, or override
an individual step with a `step-0`-style slot.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="animated-stepper-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-lg flex-col gap-6">
    <MAnimatedStepper
      v-model="step"
      :items="steps"
    />

    <div class="flex items-center justify-between gap-3">
      <UButton
        label="Back"
        variant="outline"
        color="neutral"
        :disabled="step === 0"
        @click="step = Math.max(0, step - 1)"
      />
      <UButton
        :label="step === steps.length - 1 ? 'Finish' : 'Continue'"
        @click="step = Math.min(steps.length - 1, step + 1)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const step = ref(0)

const steps = [
  {
    title: 'Account',
    description: 'Email and password',
    icon: 'i-lucide-user',
    content: 'Create the account your team will sign in with. Password rules are checked as you type.',
  },
  {
    title: 'Workspace',
    description: 'Name and region',
    icon: 'i-lucide-building',
    content: 'Pick a region close to your users. You can move a workspace later without downtime.',
  },
  {
    title: 'Invite',
    description: 'Bring teammates in',
    icon: 'i-lucide-users',
    content: 'Invite teammates by email. Invites expire after seven days.',
  },
]
</script>
```
::


## Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="animated-stepper-custom" />
  :::
#code
  <PlaygroundCode name="AnimatedStepper" />
::

## Props

::component-props
  ::component-prop{name="items" type="StepItem[]" required}
  Each entry accepts `title`, `description`, `icon` (an Iconify name) and
  `content` (the default panel text). `label` is accepted as an alias for
  `title`. `disabled` disables that step's trigger. The array is renumbered with
  `value: i` before it reaches `UStepper`, which is what lets `v-model` be an
  index.
  ::
  ::component-prop{name="modelValue" type="number" default="0"}
  The **index** of the active step. Forwarded to `UStepper` unchanged, so keep it
  inside `0..items.length - 1`. This component clamps its own copy for the
  animation and slot name, but the raw value still reaches `UStepper`, and an
  out-of-range index leaves it with no current item.
  ::
  ::component-prop{name="defaultValue" type="number"}
  Forwarded to `UStepper`, but it will not set the starting step: `modelValue`
  defaults to `0`, so `modelValue ?? defaultValue` resolves to `0` before
  `defaultValue` is ever consulted. Bind `:model-value` for anything but step 0.
  ::
  ::component-prop{name="ui" type="Record<string, any>"}
  Forwarded to `UStepper`, and merged by it into every slot's `class` alongside
  `UStepper`'s own `ui` prop. Use it to restyle the header, triggers, indicators
  and content region.
  ::
::

Every other `UStepper` prop and listener — `orientation`, `color`, `class`,
`:linear="false"`, `@next`, `@prev` — reaches `UStepper` through `$attrs`, since
the component sets `inheritAttrs: false` and binds them explicitly.

## Events

::component-events
  ::component-event{name="update:modelValue" type="(value: number) => void"}
  Emitted when `UStepper` selects a different step, with the new **index**. A
  non-numeric payload falls back to the current `modelValue` rather than writing
  `NaN`, so a malformed `UStepper` event cannot break the stepper's own state.
  Powers `v-model`.
  ::
::

## Slots

::component-slots
  ::component-slot-row{name="step-N" type="{ index }"}
  One slot per step, named after the **index**: `step-0`, `step-1`, `step-2`. The
  resolved step's `content` is the fallback, so these slots are optional and only
  the steps you want to customise need one. The slot is resolved against this
  component's clamped index, so it stays correct even if `modelValue` is briefly
  out of range.
  ::
::

Named slots of `UStepper` — `title`, `description`, `trigger`, `indicator`,
`separator`, `wrapper` — are **not** forwarded. Only `#content` is supplied,
because that is the slot being replaced. Use each item's `title`, `description`
and `icon` fields for the header instead.

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.animatedStepper` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  ::
::

## Accessibility

The component adds no ARIA and removes none: all of it is Reka UI's
`StepperRoot`. The root carries `role="group"` and `aria-label="progress"`,
together with a visually hidden `role="status"` region announcing the current
step. Each step trigger is a real button with `aria-current="step"` on the active
one, and the title and description are wired to it with `aria-labelledby` and
`aria-describedby`. Arrow keys, Home and End move between triggers.

Two things to know. First, `UStepper` defaults `linear` to `true`, so a future
step cannot be jumped to — pass `:linear="false"` to change that. Second, the
animation is transform-and-opacity only and adds no focusable elements, so
nothing about the motion reaches assistive technology; the hidden `role="status"`
region is what reports the change.

`prefers-reduced-motion` is honoured through `useReducedMotion()`, gated behind
an `onMounted` flag so the server-rendered and first client frame agree and
hydration does not warn. Under reduce the panel still cross-fades, but with no
horizontal offset and a zero-duration transition.

## Performance

- One `motion.div` per panel, inside a single `AnimatePresence mode="wait"`, so
  the outgoing panel finishes exiting before the incoming one is mounted — at
  most two nodes exist during a transition.
- The panel is keyed by index, so a `v-model` write that resolves to the same step
  mounts nothing at all.
- Movement is `x` and `opacity`, both of which are compositor-only. Nothing in the
  transition reads layout, so no reflow is forced per frame.
- `SPRING` and `REDUCED_TRANSITION` are module-level constants, so no transition
  object is allocated per render.
- The direction watcher uses `flush: 'sync'`, which runs before the component
  re-renders. That is what lets the offset be correct on the very first animated
  frame; the cost is one synchronous watcher call per `modelValue` write.
- `stepperItems` is a computed, so the renumbered array is rebuilt only when
  `items` changes identity.
- No timers, no observers, and no `requestAnimationFrame`.

::tip
`UStepper` exposes `next()`, `prev()`, `hasNext` and `hasPrev` through
`defineExpose`, and nothing in its own template calls them — they exist purely
for imperative control. `MAnimatedStepper` wraps it in a plain `<div>` and does
not re-expose them, so a template ref on `MAnimatedStepper` gives you that
`<div>` and `next()` is not reachable. Drive the step with `v-model`, as in the
example above.
::

