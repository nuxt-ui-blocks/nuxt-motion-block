---
title: Animated Input
description: A text input whose label floats out of the field on focus or on the first character.
navigation:
  icon: i-lucide-text-cursor-input
---

# Animated Input

A text input with a floating label. The label starts centred inside the field and
translates up and down to `scale(0.85)` the moment the field takes focus or holds
a value, then returns when both are gone.

The label is painted with the same background as the input and a `z-index` of
`2`, which is what lets it cut a gap in the input's own ring rather than sitting
behind it. That is also the constraint to know about: the gap shows whatever the
page background is, so the label only reads as "cut out" on a `bg-default`
surface.

The placeholder is suppressed while the label is floating, since a placeholder
under a raised label is unreadable. Unused attributes land on the wrapper `<div>`
rather than the `<input>`, because the component sets `inheritAttrs: false` and
binds `$attrs` explicitly.

## Usage

`label` is required. Bind `v-model` when you need the value in JS, or leave it
unbound and read nothing — the input still works as a native text field. Pass an
`icon` name or fill the `icon` slot for a leading glyph.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="animated-input-basic" />
  :::
#code
```vue
<template>
  <form
    class="flex w-full max-w-sm flex-col gap-4"
    @submit.prevent="submitted = true"
  >
    <MAnimatedInput
      v-model="form.email"
      label="Work email"
      icon="i-lucide-mail"
      placeholder="you@company.com"
    />

    <MAnimatedInput
      v-model="form.workspace"
      label="Workspace"
      placeholder="Acme Inc."
      label-class-name="text-xs"
    >
      <template #icon>
        <UIcon
          name="i-lucide-sparkles"
          class="size-4 text-primary"
        />
      </template>
    </MAnimatedInput>

    <UButton
      type="submit"
      label="Create workspace"
      icon="i-lucide-arrow-right"
      icon-trailing
      class="justify-center"
    />

    <p class="text-xs text-muted">
      {{ submitted ? 'Submitted — the label float is animation-only.' : 'Labels float on focus and on a filled value.' }}
    </p>
  </form>
</template>

<script setup lang="ts">
const form = reactive({
  email: '',
  workspace: '',
})

const submitted = ref(false)
</script>
```
::

## Props

::field-group
  ::field{name="label" type="string" required}
  The visible label text, and also the input's `aria-label`, so it is the
  accessible name as well as the floating caption. There is no unlabelled mode.
  ::
  ::field{name="modelValue" type="string"}
  The current value. While this is `undefined` the component keeps its own copy
  seeded from `defaultValue`; passing a value — even once — switches it to
  controlled mode permanently, and the internal copy is no longer written to.
  ::
  ::field{name="defaultValue" type="string" default="''"}
  Seeds the uncontrolled value once, during setup. It is not watched, so changing
  it later does nothing.
  ::
  ::field{name="placeholder" type="string" default="''"}
  Shown only while the label is not floating. The component blanks it as soon as
  the label lifts, so the two never overlap.
  ::
  ::field{name="icon" type="string"}
  An Iconify name such as `i-lucide-mail`, rendered as a `size-4` glyph at
  `left-3`. Takes precedence over the `icon` slot. When either is present the
  input picks up `pl-10` so the text clears the glyph.
  ::
  ::field{name="disabled" type="boolean" default="false"}
  Disables the native input. The label keeps animating from `val`, so a disabled
  field that held a value still shows its label floated.
  ::
  ::field{name="inputClassName" type="string" default="''"}
  Extra classes for the `<input>`, merged after the component's own utilities.
  ::
  ::field{name="labelClassName" type="string" default="''"}
  Extra classes for the `<motion.label>`, merged after the component's own
  utilities. Use it to match a non-default background or to restyle the floated
  state.
  ::
::

## Events

::field-group
  ::field{name="update:modelValue" type="(value: string) => void"}
  Emitted on every `input` event with the input's current `.value`. Fires whether
  or not the component is controlled, so it works as a one-way observer too.
  ::
::

## Slots

::field-group
  ::field{name="icon"}
  A leading glyph rendered instead of the `icon` prop, inside the same
  `aria-hidden`, `pointer-events-none` wrapper. Size it yourself; the component
  does not constrain slot content.
  ::
::

## Accessibility

The `<input>` receives `:aria-label="label"`, so the label text is its
accessible name, and `useId()` gives each instance a collision-free `id` that the
visual `<label>` points at with `for`. The visible label is
`aria-hidden="true"` — it is presentation, because the name is already carried by
`aria-label` — and the icon wrapper is `aria-hidden` too, so neither is announced
twice.

The one real limitation: `inheritAttrs: false` with `$attrs` bound to the
wrapping `<div>` means **`type`, `autocomplete`, `name`, `required`, `inputmode`
and `aria-describedby` cannot reach the input**. The element is hardcoded to
`type="text"`, so an email or tel field needs `MAnimatedInput` replaced with
something that exposes `type`, and there is no slot or prop for help text or an
error message.

`prefers-reduced-motion` is read through a `matchMedia` listener that is attached
on mount and removed on unmount. Under reduce the label transform is applied as a
plain inline `transform` with a zero-duration transition, so the label still
floats — it just arrives instantly rather than sliding.

## Performance

- One `MediaQueryList` listener for the whole component, added on mount and
  removed on unmount. No `requestAnimationFrame`, no timers, no resize observers.
- Only `borderColor`, `color`, `scale` and `y` are animated. The label's movement
  is `transform`, and the input's border change is a paint, so nothing triggers
  layout during the float.
- `:initial="false"` on the label means an already-focused or already-filled field
  renders in its final position on mount instead of sliding up from centre on the
  first frame.
- The label's target transform is a computed plain object rather than a stored
  spring value, so reversing direction mid-flight re-targets from the current
  position instead of restarting.
- The label is `absolute` and `pointer-events-none`, and the input is a sibling
  rather than an ancestor, so focusing the field never re-renders the input.
- `isFloating` depends on `val` and `isFocused` only — it does not read the DOM,
  so no layout is forced to decide whether the label is up.

::tip
The floated label reads as cut out because it is painted with the input's own
`bg-default` at `z-index: 2`. On any other surface the input's ring shows through
the gap. Give the wrapper the same background, or pass the same background into
`label-class-name`, or the label will look like it is sitting on top of the border
rather than in it.
::
