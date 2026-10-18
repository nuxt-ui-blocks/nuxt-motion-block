---
title: Basic Toast
description: A declarative wrapper over Nuxt UI's useToast() that drives motion toasts with a single component.
---

`MBasicToast` is a thin, declarative wrapper over Nuxt UI's [`useToast()`](https://ui.nuxt.com/composables/use-toast) composable. It renders no markup of its own: mounting it adds a toast to the shared toast store, and a single app-level [`MToaster`](/components/interactive/basic-toast#toaster) renders that store with motion.

That means one toast store for the whole app. A toast declared with `<MBasicToast>` and one pushed with `useToast().add()` land in the same queue and dismiss the same way — `MBasicToast` just gives you a props-and-events API instead of imperative calls.

The wrapper owns nothing: it adds on mount (when `isVisible` is `true`), updates the live toast when `message`, `type`, or `duration` change, and removes it when `isVisible` flips to `false`. Anything that ends the toast elsewhere — the auto-dismiss timer, or a swipe in the toaster — is reported back through `close` and `update:isVisible`.

## Usage

Drive it with `isVisible` and `v-model:is-visible`, and give it a `message`.
Re-showing the same toast means flipping `isVisible` off and back on; the
component adds a fresh entry each time, so the timer starts over.

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
      :message="message"
      :type="type"
      :is-visible="isVisible"
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

function show(next: ToastKind) {
  type.value = next
  message.value = copy[next]
  isVisible.value = false
  // Flipping the flag back to true in the same tick would be swallowed by the
  // watcher; letting the `false` settle first re-adds the toast with a fresh
  // timer.
  nextTick(() => {
    isVisible.value = true
  })
}
</script>
```
::

## Customize

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="basic-toast-custom" />
  :::
#code
  <PlaygroundCode name="BasicToast" />
::

## Toaster

`MToaster` renders every toast in the shared `useToast()` store — whether it was
added by `MBasicToast` or by calling `useToast().add()` yourself. It stacks them
in a corner, springs each one in and fades it out with motion-v instead of the
stock CSS keyframes, and owns every dismissal timer.

Mount a single `MToaster` high in your app. This documentation mounts one in the
header, so the example below only needs to push toasts.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="basic-toast-toaster" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <div class="flex flex-wrap items-center gap-2">
      <UButton
        v-for="option in options"
        :key="option.color"
        :label="option.label"
        :color="option.color"
        size="sm"
        variant="outline"
        @click="push(option)"
      />
    </div>

    <p class="text-xs text-muted">
      Toasts stack in the corner, spring in and fade out with motion-v, and dismiss
      themselves after 5s — hover the stack to pause the timers. The toaster is
      mounted once for the whole documentation app, so this example only pushes
      toasts.
    </p>
  </div>
</template>

<script setup lang="ts">
type ToastColor = 'success' | 'error' | 'info' | 'warning'

const options: { color: ToastColor, label: string, title: string, description: string }[] = [
  { color: 'success', label: 'Success', title: 'Deploy finished', description: 'Build 4821 is live.' },
  { color: 'error', label: 'Error', title: 'Upload failed', description: 'The file is larger than 25 MB.' },
  { color: 'info', label: 'Info', title: 'Three files staged', description: 'Ready to sync.' },
  { color: 'warning', label: 'Warning', title: 'Trial ending', description: 'Your trial ends in two days.' },
]

const toast = useToast()

function push(option: { color: ToastColor, title: string, description: string }) {
  toast.add({ title: option.title, description: option.description, color: option.color })
}
</script>
```
::

::component-props
  ::component-prop{name="position" type="'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'" default="'top-right'"}
  Which corner the stack is anchored to. `center` values centre the column
  horizontally; `bottom` values stack upward.
  ::
  ::component-prop{name="duration" type="number" default="5000"}
  Default lifetime in milliseconds for toasts that do not set their own
  `duration`. Hovering the stack pauses every timer until the pointer leaves.
  ::
  ::component-prop{name="close" type="boolean" default="true"}
  Show a dismiss button on each toast. A toast can still opt out individually
  with `close: false` on `toast.add()`.
  ::
  ::component-prop{name="label" type="string" default="'Notifications'"}
  `aria-label` for the `role="region"` viewport.
  ::
  ::component-prop{name="class" type="string"}
  Merged onto the fixed viewport, so it wins over the theme's positioning.
  ::
::

::note
`MToaster` needs `useToast()` from Nuxt UI, which `UApp` provides. Because `UApp`
already mounts Nuxt UI's own `UToaster`, mount only one of them — this
documentation hides the stock toaster so the motion one is the sole renderer.
::

## Props

::component-props
  ::component-prop{name="message" type="string"}
  The body text. Required. It becomes the toast's `title` in the shared store, so
  it is the only content the toast renders — the component has no slots.
  ::
  ::component-prop{name="type" type="'success' | 'error' | 'info' | 'warning'" default="'info'"}
  Sets the toast colour, which the toaster maps to an icon (`circle-check`,
  `circle-x`, `info`, `circle-alert`) and the matching semantic tint. There is no
  free-form customisation — a fifth type is not possible without editing the
  component.
  ::
  ::component-prop{name="duration" type="number" default="3000"}
  Forwarded to the toast as its lifetime in milliseconds. `0` (or any
  non-positive value) skips the timer entirely, leaving the toast on screen until
  it is dismissed. Changing it while visible updates the live toast.
  ::
  ::component-prop{name="isVisible" type="boolean" default="true"}
  Controls whether the toast is present in the store. When it becomes `true` the
  component adds a toast; when it becomes `false` the component removes it and
  emits `close`. Pair it with `v-model:is-visible`.
  ::
::

## Events

::component-events
  ::component-event{name="close" type="() => void"}
  Fired whenever the toast goes away, from any path: `isVisible` turning false,
  the auto-dismiss timer expiring, or the toast being dismissed in the toaster.
  There is no payload.
  ::
  ::component-event{name="update:isVisible" type="(value: boolean) => void"}
  Fired alongside `close`, always with `false`. This is what makes
  `v-model:is-visible` work, and it is how you learn that the toast timed out
  rather than being dismissed on purpose.
  ::
::

## Accessibility

The wrapper renders no DOM, so there is nothing to annotate on the component
itself. The toaster that renders the toast supplies the semantics: each toast is
a live region with `role="status"` and `aria-live="polite"`, or `role="alert"`
with `aria-live="assertive"` for `type="error"`, and the message text is the
toast's text content, so it is read in full.

Reduced motion is honoured by the toaster: `useReducedMotion()` swaps the spring
for a zero-duration transition and drops the scale and slide, leaving a plain
opacity fade in and out.

## Performance

- The component renders no markup, so it adds nothing to the DOM and never
  triggers a hydration mismatch.
- It holds no timers. Every dismissal timer lives in `MToaster`, which keeps at
  most one `setTimeout` per visible toast and clears them all on unmount.
- While visible, prop changes are pushed with a single `update()` call rather
  than remove-and-re-add, so the toast never flickers.

::tip
`defineExpose({ dismiss })` gives you a component-level close, but it fires the
same two emits as the timer, so anything listening for `close` still runs —
including the `update:isVisible` that a `v-model` binding writes back. To show
the *same* message twice in a row, flip `isVisible` off and let it settle before
turning it back on; the example pairs the two writes with `nextTick`.
::
