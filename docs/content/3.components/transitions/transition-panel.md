---
title: Transition Panel
description: Animates between keyed content with enter, center and exit variants.
---

A panel that animates its content between states. Give each piece of content a
key and an index; the panel animates the one leaving out and the one arriving in
while pushing the rest of the layout to make room.

::note
The panel renders its own `<AnimatePresence :initial="false" mode="popLayout">`,
so content does not animate on first paint — only on a change of
`activeIndex`.
::

## Usage

`activeIndex` selects which child is in view. Everything else is your own
content, keyed and switched on the same value.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="transition-panel-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <MTransitionPanel
      :active-index="active"
      :variants="variants"
      :transition="{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }"
      class="overflow-hidden rounded-2xl"
    >
      <div
        :key="active"
        class="flex h-40 flex-col items-center justify-center gap-1 p-6 text-center"
        :class="panels[active].tone"
      >
        <span class="text-xs font-medium uppercase tracking-widest opacity-70">
          {{ panels[active].eyebrow }}
        </span>
        <span class="text-lg font-semibold text-white">
          {{ panels[active].title }}
        </span>
      </div>
    </MTransitionPanel>

    <div class="grid grid-cols-3 gap-2">
      <UButton
        v-for="(panel, index) in panels"
        :key="panel.title"
        :label="String(index + 1)"
        :variant="index === active ? 'solid' : 'outline'"
        class="justify-center"
        @click="active = index"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const active = ref(1)

const panels = [
  { eyebrow: 'Queued', title: 'Waiting on CI', tone: 'bg-primary' },
  { eyebrow: 'Running', title: 'Building bundle', tone: 'bg-amber-600' },
  { eyebrow: 'Done', title: 'Deployed to prod', tone: 'bg-emerald-600' },
]

// The panel is keyed on `activeIndex` internally, so the slot only has to supply
// the content for the index currently on screen.
const variants = {
  enter: { opacity: 0, y: 24, rotateX: -12 },
  center: { opacity: 1, y: 0, rotateX: 0 },
  exit: { opacity: 0, y: -24, rotateX: 12 },
}
</script>
```
::

The default slot holds a single child: the content for the index currently on
screen. The panel keys that child on `activeIndex` internally, so the slot only
has to supply the current content — it does not key or switch children itself.

## Examples

### Directional exit

Pass a `custom` value and read it from a function-valued `exit` variant to send
the outgoing item in a direction. `custom` from the `AnimatePresence` reaches
the *exiting* child, so the variant can decide where the piece leaves — here,
`direction` is `-1` or `1` and the item slides out on that side.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="transition-panel-directional" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <MTransitionPanel
      :active-index="active"
      :custom="direction"
      :variants="variants"
      :transition="{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }"
      class="overflow-hidden rounded-2xl"
    >
      <div
        :key="active"
        class="flex h-40 flex-col items-center justify-center gap-1 p-6 text-center"
        :class="steps[active].tone"
      >
        <span class="text-xs font-medium uppercase tracking-widest text-white/70">
          {{ steps[active].eyebrow }}
        </span>
        <span class="text-lg font-semibold text-white">
          {{ steps[active].title }}
        </span>
      </div>
    </MTransitionPanel>

    <div class="flex items-center justify-between">
      <UButton
        label="Back"
        icon="i-lucide-arrow-left"
        variant="outline"
        :disabled="active === 0"
        @click="go(-1)"
      />
      <span class="text-xs text-muted">{{ active + 1 }} / {{ steps.length }}</span>
      <UButton
        label="Next"
        trailing-icon="i-lucide-arrow-right"
        :disabled="active === steps.length - 1"
        @click="go(1)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const active = ref(1)
const direction = ref(1)

// `custom` reaches the exiting child, so only `exit` can vary with direction:
// the outgoing panel leaves opposite the way the visitor is moving, while the
// arriving panel always enters from the same side.
const variants = {
  enter: { opacity: 0, x: 48 },
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir * -48 }),
}

const steps = [
  { eyebrow: 'Step one', title: 'Connect your account', tone: 'bg-primary' },
  { eyebrow: 'Step two', title: 'Invite your team', tone: 'bg-amber-600' },
  { eyebrow: 'Step three', title: 'Ship your first change', tone: 'bg-emerald-600' },
]

function go(step: number) {
  direction.value = step
  active.value = Math.min(Math.max(active.value + step, 0), steps.length - 1)
}
</script>
```
::

## Customize

Adjust the active index and replay live in the playground below. `custom` is not
a control here because its shape is yours to define; see the directional exit
example.

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="transition-panel-custom" />
  :::
#code
  <PlaygroundCode name="TransitionPanel" />
::

## Props

::component-props
  ::component-prop{name="activeIndex" type="number"}
  The index of the child currently in view. Changing it is what plays the
  transition.
  ::
  ::component-prop{name="variants" type="Variants"}
  The `enter`, `center` and `exit` variants applied to the active child. `enter`
  and `center` are resolved as-is; `exit` may be a function that receives
  `custom`.
  ::
  ::component-prop{name="transition" type="Transition"}
  The motion-v transition applied to the variant change.
  ::
  ::component-prop{name="custom" type="any"}
  A value passed to the `AnimatePresence` and read by a function-valued `exit`
  variant. Use it to vary the exit by direction or by any other state.
  ::
  ::component-prop{name="class" type="string"}
  Merged onto the root.
  ::
  ::component-prop{name="ui" type="object" default="undefined"}
  Per-slot classes for the theme. Only the `root` slot is defined; see
  [UI](#ui).
  ::
::

## Slots

::component-slots
  ::component-slot-row{name="default"}
  The content for the index currently on screen. The panel keys it internally.
  ::
::

## UI

This component's theme exposes the slot below. Override it per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.transitionPanel` in `app.config.ts`.

::component-slots
  ::component-slot-row{name="root"}
  `relative`
  ::
::

## Accessibility

The panel animates layout, so it can move content that has focus. Keep focus on
the control that changed the step, or move it deliberately after the
transition — `popLayout` keeps the leaving item in flow until it is finished, so
the tab order does not jump mid-animation.

Under `prefers-reduced-motion` motion-v skips the animation and the change
applies immediately.

## Performance

- `mode="popLayout"` takes the leaving child out of flow, so the arriving child
  can animate into place without the container collapsing.
- `:initial="false"` on the `AnimatePresence` means the first child does not
  animate on mount — only a change of `activeIndex` plays a transition.
- Variants resolve per child; keeping `enter` and `center` as plain objects
  (and only `exit` as a function of `custom`) avoids resolving functions
  repeatedly for the arriving child.
