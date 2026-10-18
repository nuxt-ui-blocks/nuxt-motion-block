---
title: Animated File Upload
description: Nuxt UI's file upload with a drop zone that lifts on drag and file rows that stagger in from the left.
navigation:
  icon: i-lucide-upload-cloud
---

# Animated File Upload

A drop zone that responds to being hovered with files, plus file rows that slide
in one after another.

The whole effect is CSS. When a drag is over the zone, `UFileUpload` sets
`data-dragging="true"` on its drop target; the component's stylesheet reacts to
that attribute — the zone scales to 1.02 and takes the primary border colour, the
upload icon floats up 4px, and the label cross-fades to different copy.

That attribute is the only coupling between the two halves. The wrapper does not
own the drag state; it watches it with a `MutationObserver` on the drop zone
element, which `UFileUpload` exposes as `dropzoneRef`. The observer also does an
initial read on mount, so a drag already in progress when the component appears
is picked up correctly.

The label swap is the one genuinely Vue-driven part: a `<Transition mode="out-in">`
swaps between the `label` and `dragLabel` text.

Because everything else is plain `UFileUpload`, you keep the full component —
`accept`, `multiple`, `preview`, `reset`, `variant`, `highlight`, `interactive`,
`fileDelete`, and the `v-model`. All of them arrive through attribute fallthrough,
not through declared props.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="animated-file-upload-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <MAnimatedFileUpload
      v-model="files"
      multiple
      layout="list"
      accept="image/*"
      label="Drop images or click to browse"
      drag-label="Let go to add these files"
      class="w-full min-h-40"
    />

    <p class="text-xs text-muted">
      {{ files.length }} file{{ files.length === 1 ? '' : 's' }} staged. Rows slide in
      staggered and the zone lifts while files are held over it.
    </p>
  </div>
</template>

<script setup lang="ts">
const files = ref<File[]>([])
</script>
```
::

With `multiple`, the model is `File[]`. Without it, `UFileUpload` collapses the
model to a single `File | null`, so type your ref for whichever you set.

`layout="list"` is worth reaching for here: the default `grid` layout puts the
files *inside* the drop zone, where the rows compete with the lifted-and-scaled
zone for the same 1.02 transform. `list` puts them below it, which is also the
better layout once there are more than two or three files.

## Props

::field-group
  ::field{name="label" type="string" default="'Drag & drop or click to upload'"}
  Copy shown while no drag is in progress. This replaces `UFileUpload`'s own
    `label` prop, which is why the base component still renders its label wrapper
    — it sees a `label` slot rather than a `label` string.
  ::
  ::field{name="dragLabel" type="string" default="'Drop files here'"}
  Copy shown while files are held over the zone.
  ::
  ::field{name="ui" type="Record<string, any>" default="{}"}
  Forwarded to `UFileUpload`'s `ui`, with `'m-file-upload'` appended to `ui.root`
    — the hook every rule in the component's stylesheet keys off. Do not overwrite
    `ui.root` yourself, or the animation stops applying.
  ::
::

Everything else — `v-model`, `accept`, `multiple`, `preview`,
`reset`, `dropzone`, `interactive`, `icon`, `description`, `variant`, `size`,
`color`, `highlight`, `required`, `disabled`, `name`, `id`, `fileIcon`,
`fileImage`, `fileDelete`, `change` — is a `UFileUpload` prop or event and passes
straight through. See the
[UFileUpload reference](https://ui.nuxt.com/components/file-upload) for those.

## Slots

::field-group
  ::field{name="label"}
    Replaced by the component. The `label` / `dragLabel` cross-fade is
    implemented by overriding this slot, so your own `label` slot content is
    ignored.
  ::
::

Other `UFileUpload` slots are **not** forwarded. `leading`, `description`,
`actions`, `file`, `files`, `files-top`, `files-bottom`, `file-leading`,
`file-trailing`, `file-name` and `file-size` will not render, because the wrapper
only passes a single `label` template to the base component. If you need them, use
`UFileUpload` directly and copy the stylesheet, or wrap it and add
`class="m-file-upload"` yourself — the rules target `[data-slot]` children, not a
Vue component.

## Accessibility

The component adds no semantics of its own; everything rests on `UFileUpload`. The
drop zone is a `div` with `role="button"` and `tabindex="0"`, responds to
<kbd>Enter</kbd> and <kbd>Space</kbd>, and the real `<input type="file">` is
visually hidden but still form-associated — so it participates in form submission
and label/`accept` behaviour, while `tabindex="-1"` and `aria-hidden="true"` keep
it out of both the tab order and the accessibility tree. Removing a file returns
focus to the drop zone.

The `label` cross-fade is the one place worth thinking about. It is a genuine DOM
replacement inside a `role="button"` element, so a screen reader announcing the
zone mid-drag could read the new copy — which is usually the desired behaviour.
`mode="out-in"` means there is a 150ms window where the zone briefly has no text
at all, so keep both strings short enough that the swap does not read as a change
of button.

The drag feedback is **colour plus transform**: the border changes to
`--ui-primary` and the zone scales by 2%. Neither is colour-blind safe on its own,
which is why the icon also lifts — but the primary signal is still the border
colour, so do not remove the transform if you restyle the border.

Reduced motion is fully covered. Every transition and the row animation are
disabled under `prefers-reduced-motion: reduce`, and all transforms are forced to
`none`, so the drop zone changes appearance instantly rather than animating.

## Performance

- One `MutationObserver` per instance, filtered to the `data-dragging` attribute.
  It is disconnected on unmount, and it is the only long-lived JS in the
  component.
- Animations are `transform` and `opacity` only, so they run on the compositor
  without layout. The `border-color` and `background-color` transitions are the
  exception — they are cheap here because they only run while a drag is active,
  and not at all at rest.
- Row stagger uses eight `:nth-child()` rules plus an `n + 9` fallback, capped at
  320ms. Beyond nine files the remaining rows all animate together, which keeps
  the total time bounded no matter how many files were dropped.
- `animation-fill-mode: both` holds the final state, so there is no flash of
  unstyled row at the end of the animation.
- File rows are keyed by `file.name` by the base component. Dropping two files
  with the same name makes Vue reuse a row and the entrance animation can be
  skipped for the second one — a base-component behaviour, not something this
  wrapper changes.

::tip
Arbitrary attributes are forwarded with `v-bind="$attrs"`, and `UFileUpload` binds
its own `$attrs` onto the hidden `<input type="file">` — not onto the drop zone.
So an `aria-label` or a `data-*` attribute you add to `MAnimatedFileUpload` ends
up on the file input. To label the visible drop zone, use the `label` prop
instead.
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.animatedFileUpload` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `m-file-upload` |
