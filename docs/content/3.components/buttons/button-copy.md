---
title: Button Copy
description: A copy button that swaps its icon and its label for a checkmark once the clipboard write is done.
---

A `UButton` that copies a string to the clipboard and flips both its leading icon
and its label for `copiedDuration` milliseconds. The icon rotates in from `-90deg`
at half scale while the label slides up from below, and both revert when the timer
expires.

Three things shape how it works. The click is bound internally on the inner
`UButton` with `inheritAttrs` turned off, so a `@click` you pass still fires — it
is forwarded through `$attrs` onto the same underlying button rather than replacing
the copy. The label after copying is the literal string `Copied!`: the default slot
is consulted only for the *uncopied* state. And the confirmation is optimistic — the
component awaits `copy(text)` for its side effect and throws the return value away,
so `copied` flips to `true` on every click, including one the browser refused to
write.

## Usage

Give `text` the value to copy. Leave the slot out and the button labels itself with
that same string; pass a slot when you want a different label, and use the
`copy-icon` / `copied-icon` slots to replace the two glyphs. Every other prop —
`label`, `icon`, `color`, `variant`, `size`, `loading`, `disabled` — is forwarded to
the inner `UButton`.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="button-copy-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <div class="flex flex-col gap-2">
      <span class="text-sm font-medium text-highlighted">
        Install command
      </span>
      <div class="flex items-center justify-between gap-3 rounded-xl border border-default px-4 py-3">
        <code class="font-mono text-xs text-muted">npx nuxi module add nuxt-motion-block</code>
        <MButtonCopy
          text="npx nuxi module add nuxt-motion-block"
          size="sm"
          variant="soft"
        >
          Copy
        </MButtonCopy>
      </div>
    </div>

    <div class="flex flex-col gap-2">
      <span class="text-sm font-medium text-highlighted">
        Package name — no slot, so <code>text</code> becomes the label
      </span>
      <div class="flex items-center justify-between gap-3 rounded-xl border border-default px-4 py-3">
        <code class="font-mono text-xs text-muted">nuxt-motion-block</code>
        <MButtonCopy
          text="nuxt-motion-block"
          :copied-duration="5000"
          size="sm"
          variant="soft"
        />
      </div>
    </div>
  </div>
</template>
```
::


## Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="button-copy-custom" />
  :::
#code
  <PlaygroundCode name="ButtonCopy" />
::

## Props

::component-props
  ::component-prop{name="text" type="string" required}
  The string written to the clipboard. Doubles as the button label when no default
  slot is supplied, because the slot falls back to it.
  ::
  ::component-prop{name="copiedDuration" type="number" default="2000"}
  How long the copied state holds, in milliseconds. A second click during the window
  clears the pending timer and restarts it, so repeated clicks extend the state
  instead of stacking timers.
  ::
::

## Slots

::component-slots
  ::component-slot-row{name="default"}
  The button label, shown only in the uncopied state. Falls back to `text`.
  ::
  ::component-slot-row{name="copy-icon"}
  Replaces the copy glyph in the leading slot. Wrapped in a `motion.span`, so the
  content animates as one piece.
  ::
  ::component-slot-row{name="copied-icon"}
  Replaces the check glyph. Also wrapped in a `motion.span`, and tinted
  `text-green-400` by the wrapper rather than by your content.
  ::
  ::component-slot-row{name="trailing"}
  Forwarded to the inner `UButton`'s `trailing` slot. The `#trailing` template is
  declared with `v-if="$slots.trailing"`, so the button renders no trailing element
  at all when the slot is absent.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.buttonCopy` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  ::
  ::component-slot-row{name="copyIcon"}
  `inline-flex`
  ::
  ::component-slot-row{name="copyIconSvg"}
  `w-4 h-4`
  ::
  ::component-slot-row{name="copiedIcon"}
  `inline-flex text-green-400`
  ::
  ::component-slot-row{name="copiedIconSvg"}
  `w-4 h-4`
  ::
  ::component-slot-row{name="copiedLabel"}
  `text-green-400`
  ::
::

## Accessibility

The root is a real `UButton`, so the control is a `<button type="button">` with a
visible focus ring and full keyboard activation. The component contributes no ARIA of
its own: the confirmation is visual only — the label text changes and turns green,
but nothing is announced. If the copy result matters to a screen-reader user, pair the
button with your own `aria-live="polite"` region.

The write itself goes through VueUse's `useClipboard`, which prefers
`navigator.clipboard.writeText` and falls back to a hidden textarea with
`execCommand('copy')`. Both paths need a secure context to be reliable, and because
the result is discarded the button cannot tell you when neither worked — a
click without a clipboard permission still shows the checkmark.

Reduced motion is not consulted: both swap animations run on their fixed 0.15s /
0.2s timings for every visitor.

## Performance

- One `setTimeout` per copy. A click while the copied state is showing clears the
  previous timer before starting a new one, so the timer count never grows past one.
- Every animation is `opacity`, `scale` or `rotate` on two wrapper spans — no layout
  properties, no reflow.
- `copied` is the only reactive input besides `text`, so a state change re-renders the
  button and re-evaluates both `AnimatePresence` trees.
- The timer is not cleared on unmount. A button removed mid-confirmation leaves a
  pending timeout that fires against a discarded component — harmless, but it holds
  the closure for the remainder of `copiedDuration`.

::tip
Both swaps are wrapped in `<AnimatePresence mode="wait">`, but motion-v does not
implement that mode, so treat each swap as a crossfade between two mounted elements
rather than a strictly sequential one. The defaults happen to overlap gracefully —
copy glyph to checkmark is a similar silhouette in the same box — but if you swap in
your own pair, pick two that blend.
::

