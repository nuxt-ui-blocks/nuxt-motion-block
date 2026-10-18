---
title: Basic Toast
description: A teleported notification panel that springs in from the corner, times itself out, and can be dismissed.
navigation:
  icon: i-lucide-message-square-text
---

# Basic Toast

A toast, and not much more than one: a fixed panel in the top-right corner that
springs in, holds for `duration` milliseconds, and slides back out. Four types —
`info`, `success`, `warning`, `error` — each pick their own icon, icon colour,
border and tint, and each get a screen-reader-only label for the type.

The panel is teleported to `<body>` and wrapped in `<ClientOnly>`, so nothing it
renders exists on the server or in the SSR payload. It renders no markup at all
while hidden, which means a `v-if` on the component in your own template is
unnecessary — `isVisible` is enough.

The component owns a timer but never its own visibility: the timer calls the
same `hide()` the close button does, and `hide()` emits `close` and
`update:isVisible` rather than hiding behind your back. It also exposes
`dismiss()` on the component instance, so a template ref can close a toast that
has no close button in reach.

## Usage

Drive it with `isVisible` and `v-model:is-visible`, and give it a `message`.
Because the timer only starts on mount and whenever `isVisible` or `duration`
changes, re-triggering the same toast means flipping `isVisible` off and back
on — the example remounts it with a key so the timer restarts cleanly.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="basic-toast-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <div class="flex flex-wrap items-center gap-2">
      <UButton
        v-for="option in options"
        :key="option.type"
        :label="option.label"
        :color="option.color"
        size="sm"
        variant="outline"
        @click="show(option.type)"
      />
    </div>

    <p class="text-xs text-muted">
      Each toast lives for 3s, or until you close it.
    </p>

    <MBasicToast
      :key="run"
      :message="message"
      :type="type"
      :is-visible="isVisible"
      role="status"
      aria-live="polite"
      @update:is-visible="isVisible = $event"
    />
  </div>
</template>

<script setup lang="ts">
type ToastKind = 'success' | 'error' | 'info' | 'warning'

const options: { type: ToastKind, label: string, color: string }[] = [
  { type: 'success', label: 'Success', color: 'success' },
  { type: 'error', label: 'Error', color: 'error' },
  { type: 'info', label: 'Info', color: 'info' },
  { type: 'warning', label: 'Warning', color: 'warning' },
]

const copy: Record<ToastKind, string> = {
  success: 'Deploy finished — build 4821 is live.',
  error: 'Upload failed: the file is larger than 25 MB.',
  info: 'Three files are staged and ready to sync.',
  warning: 'Your trial ends in two days.',
}

const type = ref<ToastKind>('info')
const message = ref(copy.info)
const isVisible = ref(true)
const run = ref(0)

function show(next: ToastKind) {
  type.value = next
  message.value = copy[next]
  isVisible.value = false
  nextTick(() => {
    // Remounting restarts the internal timer, which `isVisible` flipping back to
    // true on its own would not do — the timer only starts on mount and on
    // change.
    run.value++
    isVisible.value = true
  })
}
</script>
```
::

## Props

::field-group
  ::field{name="message" type="string"}
  The body text. Required, and the only content the component renders — it has
  no slots.
  ::
  ::field{name="type" type="'success' | 'error' | 'info' | 'warning'" default="'info'"}
  Selects the icon (`circle-check`, `circle-x`, `info`, `circle-alert`), the
  matching semantic icon colour, the border/tint pair, and the screen-reader
  label. There is no free-form customisation — a fifth type is not possible
  without editing the component.
  ::
  ::field{name="duration" type="number" default="3000"}
  How long the toast stays up, in milliseconds. `0` (or any non-positive value)
  skips the timer entirely, which leaves the toast on screen until it is
  dismissed. Changing it while visible restarts the countdown.
  ::
  ::field{name="isVisible" type="boolean" default="true"}
  Watched, not read directly: the prop is mirrored into an internal ref that
  actually drives the animation. Setting it back to `false` hides the toast and
  emits `close`, exactly as the close button does.
  ::
  ::field{name="class" type="string"}
  Merged last in the panel's class list, after the type's border and tint
  classes, so it wins on conflicts. Useful for repositioning or restyling the
  panel; the fixed `top-4 right-4 z-50 w-80` classes are all in the same list
  and can be overridden here too.
  ::
::

## Events

::field-group
  ::field{name="close" type="() => void"}
  Fired whenever the toast hides, from either path: the timer expiring or the
  close button being pressed. There is no payload.
  ::
  ::field{name="update:isVisible" type="(value: boolean) => void"}
  Fired alongside `close`, always with `false`. This is what makes
  `v-model:is-visible` work, and it is the only way you learn that the toast
  timed out rather than being dismissed.
  ::
::

## Accessibility

The panel applies no `role` and no live region — it is your job to add one, and
the example does exactly that with `role="status"` and `aria-live="polite"`.
That only works because the component opts out of attribute inheritance
(`inheritAttrs: false`) and spreads `$attrs` onto the teleported panel itself;
without that, a `<ClientOnly>` root would swallow `role` and `aria-live` with no
warning. Use `role="alert"` for `type="error"` if the toast interrupts.

Two things are handled for you: the close button carries
`aria-label="Close notification"`, and each type renders a visually hidden span
naming itself ("Error", "Information", "Success", "Warning") so the icon is not
the only signal. The message text itself is the panel's text content, so it is
read in full.

Reduced motion is honoured. `useReducedMotion()` swaps the spring for a
zero-duration transition and drops the scale and slide, leaving a plain opacity
fade in and out — and a `duration: 0` exit, so the toast leaves promptly instead
of lingering.

## Performance

- The panel is teleported to `<body>` inside `<ClientOnly>`, so it contributes
  nothing to the server-rendered HTML and never triggers a hydration mismatch.
- Exactly one `setTimeout` is alive at a time. It is cleared and restarted on
  every `isVisible` or `duration` change, cleared when dismissed, and cleared
  again in `onUnmounted`.
- Enter is a 0.25s spring with `bounce: 0.1`; exit is a fixed 0.15s fade, so a
  dismissed toast never over-springs back out of the viewport.
- `scale` and `x` only — no layout properties are animated, so the toast never
  triggers reflow on the page behind it.

::tip
`defineExpose({ dismiss })` gives you a component-level close, but it fires the
same two emits as the close button, so anything listening for `close` still runs
— including the `update:isVisible` that a `v-model` binding writes back. Handing
the toast a `:key` and remounting it is the reliable way to show the *same*
message twice in a row, because the internal timer has already been spent.
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.basicToast` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `m-toast fixed top-4 right-4 z-50 flex w-80 items-center gap-3 rounded-lg border p-4 shadow-lg` |
| `iconWrapper` | `shrink-0` |
| `icon` | `h-5 w-5` |
| `srLabel` | `sr-only` |
| `message` | `flex-1 text-sm` |
| `close` | `shrink-0 cursor-pointer rounded-full p-1 transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none` |
| `closeIcon` | `h-4 w-4` |
