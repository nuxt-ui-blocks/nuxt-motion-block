---
title: Shape-shift dialog
description: A modal dialog that morphs from its trigger using shared layout animations.
navigation:
  icon: i-lucide-layout-template
---

# Shape-shift dialog

A morphing dialog built on Nuxt UI's `UModal` with Framer Motion-style layout animations. When triggered, the dialog content can morph from the trigger element position/size using `layoutId`, creating a smooth transition effect.

## Usage

Use `MMorphingDialogTrigger` as the element that triggers the dialog, and provide the dialog content via the `content` slot. By default, `layoutId` is enabled, causing the dialog to morph from the trigger. You can control the dialog state with `v-model:open`.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="morphing-dialog-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-md justify-center">
    <div class="flex flex-col items-center gap-6">
      <MMorphingDialog layout-id>
        <MMorphingDialogTrigger class="rounded-lg bg-primary px-4 py-2 text-primary-foreground">
          Open Dialog
        </MMorphingDialogTrigger>
        <template #content>
          <div class="flex flex-col gap-4 p-6">
            <h3 class="text-lg font-semibold">Shape-shift dialog</h3>
            <p class="text-sm text-muted">This dialog morphs from its trigger with a smooth layout animation.</p>
            <div class="flex justify-end">
              <UButton label="Close" @click="() => {}" />
            </div>
          </div>
        </template>
      </MMorphingDialog>
    </div>
  </div>
</template>
```
::

## Props

::field-group
  ::field{name="open" type="boolean" default="undefined"}
  Controlled open state. Use with `v-model:open`.
  ::
  ::field{name="defaultOpen" type="boolean" default="false"}
  Initial open state when uncontrolled.
  ::
  ::field{name="layoutId" type="boolean" default="true"}
  Whether to enable layout morphing from trigger. When true, the dialog content uses `layoutId` based on the component's unique ID.
  ::
  ::field{name="title" type="string" default="undefined"}
  Title passed to underlying UModal.
  ::
  ::field{name="description" type="string" default="undefined"}
  Description passed to underlying UModal.
  ::
  ::field{name="content" type="object" default="undefined"}
  Content configuration passed to UModal.
  ::
  ::field{name="overlay" type="boolean" default="true"}
  Whether to show the overlay.
  ::
  ::field{name="scrollable" type="boolean" default="false"}
  Whether the dialog is scrollable.
  ::
  ::field{name="fullscreen" type="boolean" default="false"}
  Whether the dialog is fullscreen.
  ::
  ::field{name="portal" type="string | boolean" default="true"}
  Whether to render in portal.
  ::
  ::field{name="dismissible" type="boolean" default="true"}
  Whether the dialog can be dismissed.
  ::
  ::field{name="closeIcon" type="string" default="undefined"}
  Close icon name.
  ::
  ::field{name="unmountOnHide" type="boolean" default="undefined"}
  Whether to unmount on hide.
  ::
  ::field{name="modal" type="boolean" default="true"}
  Whether to trap focus.
  ::
  ::field{name="class" type="string" default="undefined"}
  Additional classes applied to the dialog.
  ::
  ::field{name="ui" type="Record<string, any>" default="() => ({})"}
  Custom UI config for UModal.
  ::
  ::field{name="scale" type="number" default="0.95"}
  Scale value for non-layoutId mode (when layoutId is false).
  ::
  ::field{name="variants" type="Variants" default="() => ({})"}
  Custom motion variants for content animations.
  ::
  ::field{name="transition" type="Transition" default="default tween"}
  Custom transition config. Default: `{ type: 'tween', ease: [0.22, 1, 0.36, 1], duration: 0.4 }`
  ::
::

## Events

::field-group
  ::field{name="update:open" type="(open: boolean) => void"}
  Emitted when open state changes.
  ::
  ::field{name="enter" type="() => void"}
  Emitted when dialog enters.
  ::
  ::field{name="after:enter" type="() => void"}
  Emitted after dialog enters.
  ::
  ::field{name="leave" type="() => void"}
  Emitted when dialog leaves.
  ::
  ::field{name="after:leave" type="() => void"}
  Emitted after dialog leaves.
  ::
  ::field{name="close:prevent" type="() => void"}
  Emitted when close is prevented.
  ::
::

## Slots

::field-group
  ::field{name="default"}
  Content rendered in the dialog. Also passed as content slot context.
  ::
  ::field{name="content" type="(props: { close: () => void }) => void"}
  Slot for custom content rendering with close function.
  ::
  ::field{name="header" type="(props: { close: () => void }) => void"}
  Custom header slot.
  ::
  ::field{name="title"}
  Custom title slot.
  ::
  ::field{name="description"}
  Custom description slot.
  ::
  ::field{name="actions"}
  Actions slot.
  ::
  ::field{name="body" type="(props: { close: () => void }) => void"}
  Body slot.
  ::
  ::field{name="footer" type="(props: { close: () => void }) => void"}
  Footer slot.
  ::
::

## Accessibility

Built on Nuxt UI's `UModal`, the morphing dialog inherits proper ARIA semantics (`role="dialog"`, `aria-modal`, focus trapping), keyboard navigation (Escape to close, Tab for focus management), and screen reader support. When `modal` is true, focus is trapped and background content is inert. The animated content and trigger include proper focus-visible styles. The `AnimatePresence` wrapper ensures proper exit animations.

## Performance

- Uses `layoutId` for shared layout animations between trigger and content, minimizing DOM reflows during morph transition.
- `AnimatePresence` handles enter/exit with smooth transitions using tween easing `[0.22, 1, 0.36, 1]` (default 400ms).
- When `layoutId` is enabled, scale animations are omitted in favor of layout animations; when disabled, content scales from `scale` prop (default 0.95) on enter/exit.
- Only opacity and scale are animated (transform properties) for optimal performance.
- Unique ID is generated with `useId()` to ensure layoutId uniqueness across multiple instances.

::tip
The morphing effect works best when the trigger and dialog content have similar visual structure (same border radius, similar padding). This creates a more seamless transition.
::
