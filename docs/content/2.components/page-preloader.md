---
title: Page Preloader
description: A teleported full-screen loading overlay with a progress bar or spinner, dismissed by an emitted event.
navigation:
  icon: i-lucide-panel-top-open
---

# Page Preloader

A full-screen loading overlay, meant for route transitions and first-load waits.
It renders `fixed inset-0 z-50` inside a `<Teleport to="body">`, so it covers
the whole viewport no matter where you put the component in your tree — including
inside a card or a dialog.

Two visual treatments: `bar` (default) shows a `UProgress` plus a percentage,
`spinner` shows a rotating `i-lucide-loader-2` icon plus the same percentage. Both
sit on a translucent card over a blurred black backdrop, and the whole overlay
cross-fades in and out over 250ms via `AnimatePresence`.

::warning
The overlay is dismissable by clicking its own backdrop, which emits
`update:loading` with `false`. If your work is not actually cancelable, decide
whether you want that escape hatch — bind `:loading` without listening to the
event if a user must not be able to dismiss it, or handle the event and cancel
the underlying work yourself.
::

## Usage

Bind `loading` to whether your operation is still running, and drive `progress`
yourself — the component renders state, it never fetches anything. `v-model:loading`
is the intended binding, so the backdrop click works out of the box.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="page-preloader-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <div class="flex items-center gap-3">
      <USwitch
        v-model="loading"
        label="Loading"
      />
      <USelect
        v-model="variant"
        :items="['bar', 'spinner']"
        class="w-28"
      />
    </div>

    <div class="flex h-24 items-center justify-center rounded-2xl border border-default bg-default text-sm text-muted">
      The overlay teleports to body, so it covers this card too. Click anywhere on
      it to dismiss — that emit is the only way out.
    </div>

    <UProgress
      :model-value="progress"
      :max="100"
      size="sm"
    />

    <MPagePreloader
      v-model:loading="loading"
      :progress="progress"
      :variant="variant"
    />
  </div>
</template>

<script setup lang="ts">
const loading = ref(false)
const variant = ref<'bar' | 'spinner'>('bar')
const progress = ref(0)

let timer: ReturnType<typeof setInterval> | undefined

watch(loading, (value) => {
  if (timer) {
    clearInterval(timer)
    timer = undefined
  }
  if (value) {
    progress.value = 0
    timer = setInterval(() => {
      progress.value = Math.min(100, progress.value + 4)
      if (progress.value >= 100) {
        loading.value = false
      }
    }, 60)
  }
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>
```
::

## Props

::field-group
  ::field{name="loading" type="boolean" default="false"}
  Whether the overlay is visible. Pair it with `v-model:loading` to receive the
  dismiss event, or bind it one-way with `:loading` if the overlay must not be
  cancelable.
  ::
  ::field{name="progress" type="number" default="0"}
  Current completion, forwarded to `UProgress` as `model-value` and rounded for
  the percentage label. The component passes no `:max`, so `UProgress` uses its
  own default of `100`. Values above `100` are not clamped — the label just reads
  e.g. `120%`.
  ::
  ::field{name="variant" type="'bar' | 'spinner'" default="'bar'"}
  `bar` renders a `UProgress`; `spinner` renders a continuously rotating
  `i-lucide-loader-2` icon instead. Both keep the percentage label, so a spinner
  run is only "determinate" in the text, not in the graphic.
  ::
::

## Events

::field-group
  ::field{name="update:loading" type="(value: boolean) => void"}
  Emitted with `false` when the backdrop itself is clicked, wired through
  `@click.self` so clicks that land on the inner card do not dismiss. There is no
  separate `dismiss` or `cancel` event — the component has no notion of an
  in-flight request to cancel.
  ::
::

## Accessibility

The overlay applies no ARIA at all: no `role`, no `aria-modal`, no `aria-label`,
and the percentage sits in a bare `<span>` with no live region. Opening it does
not move focus, so a keyboard user keeps their place in the page behind the
overlay while the visual blocks everything.

If you use it for a blocking operation, wrap it yourself:

```vue
<div
  role="alertdialog"
  aria-modal="true"
  :aria-label="`Loading, ${Math.round(progress)} percent`"
>
  <MPagePreloader v-model:loading="loading" :progress="progress" />
</div>
```

Keyboard users have no way out either: there is no `Escape` handler and nothing
inside the overlay is focusable, so `Tab` stays in the content behind it.

There is also no `prefers-reduced-motion` check — the 250ms fade and the
spinner's infinite rotation both run regardless. The spinner is the worse of the
two: an indefinitely rotating icon is the classic vestibular trigger, so prefer
`variant="bar"` if motion is a concern.

## Performance

- The overlay is teleported to `body`, so mounting it depends on no layout in
  the subtree that declared it — but scoped styles in your page are not applied
  to it either.
- `AnimatePresence` keeps the overlay mounted through its 250ms exit before
  removing it, so there is briefly one extra full-viewport element during teardown.
- `z-50` is the stacking level. A modal with a higher `z-index` renders above the
  preloader, which is usually the wrong order for a blocking overlay.
- `backdrop-blur-sm` on both the backdrop and the card is a real per-frame cost on
  low-end GPUs, for as long as the overlay is up.
- Every `progress` change re-renders the `Math.round(progress)` label, so ticking
  progress at animation rate is fine but writing it in a `requestAnimationFrame`
  loop at full display rate is wasted work.

::tip
Because the component owns no progress logic, the usual pattern is to keep the
timer in your page and let the preloader be a pure view of `loading` and
`progress`. The example above does exactly that: a `setInterval` advances
`progress`, and clearing `loading` is what stops the timer and unmounts the
overlay.
::
