---
title: Morph Surface
description: A dock that grows into the composer it opens, instead of summoning one somewhere else.
---

A dock that opens a dialog is two objects: the thing you pressed and the thing
that appeared somewhere else, leaving the eye to re-find the content. A surface
that grows out of the dock removes that step - the pill widens into the panel,
the orb slides into the header, and the editor is exactly where the trigger was.

The morph is a `layout` animation rather than a width and height tween. Motion
measures both states and interpolates the box, so the radius, the padding and the
children all move as one object instead of three properties racing each other.

The root reserves the open panel's 360 × 200 footprint, which means opening grows
upward instead of pushing the rest of the page down. A composer that shoves the
conversation down as you focus it is worse than a modal that covers it.

## Usage

`submit` carries the trimmed text and the surface closes itself, so the parent
only has to decide what to do with the value.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="morph-surface-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full flex-col items-center gap-3">
    <MMorphSurface @submit="onSubmit" />

    <p class="h-4 text-xs text-muted">
      {{ last === '' ? 'Click the dock, then press ⌘↵ or Ctrl↵.' : `Sent: ${last}` }}
    </p>
  </div>
</template>

<script setup lang="ts">
const last = ref('')

function onSubmit(value: string) {
  last.value = value
}
</script>
```
::

## Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="morph-surface-custom" />
  :::
#code
  <PlaygroundCode name="MorphSurface" />
::

## Props

::component-props
  ::component-prop{name="label" type="string" default="'Ask AI'"}
  The collapsed dock's text, and the trigger button's accessible name.
  ::
  ::component-prop{name="heading" type="string" default="'AI Input'"}
  The panel header, next to the orb. It names the surface the dock became.
  ::
  ::component-prop{name="placeholder" type="string" default="'Ask me anything…'"}
  Placeholder text, and the textarea's accessible name. Write it as a label
  rather than an example, because assistive technology reads it as one.
  ::
  ::component-prop{name="submitLabel" type="string" default="'Send'"}
  The submit button's text.
  ::
  ::component-prop{name="defaultOpen" type="boolean" default="false"}
  Start open. Ignored once `open` is bound.
  ::
  ::component-prop{name="open" type="boolean"}
  Controlled open state. Leave undefined to let the component own it, and pair it
  with `update:open` to drive it from outside.
  ::
  ::component-prop{name="class" type="string" default="''"}
  Merged onto the wrapper that reserves the footprint.
  ::
::

## Events

::component-events
  ::component-event{name="submit" payload="[value: string]"}
  The composer submitted with non-whitespace text. The draft is cleared and the
  surface closes before this is emitted, so the handler can be slow without
  leaving an empty panel open.
  ::
  ::component-event{name="update:open" payload="[open: boolean]"}
  The surface opened or closed, by trigger, Escape, submit or an outside click.
  Emitted whether or not `open` is bound.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.morphSurface` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  Reserves 360 × 200 and bottom-aligns the surface, so the panel grows upward.
  ::
  ::component-slot-row{name="surface"}
  The one element that exists in both states. It carries the `layout` animation
  and the border radius.
  ::
  ::component-slot-row{name="dock"}
  The collapsed row: orb, trigger, 44 px tall.
  ::
  ::component-slot-row{name="orb"}
  The dot that means "assistant". Used twice - in the dock and in the header - so
  the two states share one visual anchor.
  ::
  ::component-slot-row{name="trigger"}
  The dock's button. It is unstyled beyond typography so the whole dock reads as
  the target.
  ::
  ::component-slot-row{name="panel"}
  The open form, at the reserved 360 × 200.
  ::
  ::component-slot-row{name="header"}
  Heading on the left, shortcut hint on the right.
  ::
  ::component-slot-row{name="title"}
  The heading and its orb.
  ::
  ::component-slot-row{name="hint"}
  The wrapper around the two `<kbd>` glyphs. `aria-hidden`, because "⌘ Enter" out
  of context is noise in a screen reader.
  ::
  ::component-slot-row{name="kbd"}
  One key cap. `font-sans` keeps the glyphs from falling back to a monospace face
  that renders ⌘ badly.
  ::
  ::component-slot-row{name="textarea"}
  The editor. It is the flexible row in the panel, so it absorbs whatever height
  the header and actions leave.
  ::
  ::component-slot-row{name="actions"}
  The "Esc to close" line and the submit button.
  ::
  ::component-slot-row{name="count"}
  The footer's left-hand text, `tabular-nums` so it does not jitter if you put a
  character count there.
  ::
::

## Accessibility

- The collapsed dock is a real `<button type="button">`, so the surface is
  reachable by Tab and announced as a button rather than as a decorated `<div>`.
- The panel is a `<form>`, so the submit control is a real submit button and
  Enter in the textarea inserts a newline instead of firing a half-written
  message.
- Opening moves focus into the textarea on the next tick. Escape closes and
  returns focus to the dock, so a keyboard user is never left on an element that
  no longer exists.
- ⌘↵ and Ctrl↵ submit. The shortcut is printed in the header so it is
  discoverable, and the hint is `aria-hidden` because two key glyphs read
  poorly; assistive technology users still get the working shortcut and the
  submit button.
- The textarea takes its accessible name from `placeholder`. Pass a
  label-shaped string, or override the `textarea` slot with a labelled element.
- The submit button is disabled until the draft has non-whitespace content, so
  the disabled state always means "nothing to send" rather than "not allowed".
- An outside click closes the surface, listened for in the capture phase, so it
  still collapses when the click lands on an element that stops propagation.
  Focus is not pulled back to the dock in that case: the user clicked something
  else on purpose.
- Under `prefers-reduced-motion: reduce` `layout` is switched off and the radius
  transition drops to zero duration, so the surface swaps between the two sizes
  instantly.

## Performance

- One `layout` animation per open and close, measured once per state. There is no
  width/height keyframe pair to keep in sync with the theme.
- The panel is `v-if`-ed, so the closed dock does not keep a form, a textarea and
  an actions row in the DOM.
- The document `pointerdown` listener is registered once on mount and removed on
  unmount. No listener churn per open.
- The footprint is fixed by the theme instead of measured from the panel, so
  opening never forces a layout read of the page.
- The radius is animated alongside `layout` because both are read from the same
  measurement pass; nothing else animates during the morph.
