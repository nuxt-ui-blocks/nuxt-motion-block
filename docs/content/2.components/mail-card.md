---
title: Mail Card
description: A mail-list card that expands its body on click with a height animation and a rotating chevron.
navigation:
  icon: i-lucide-mail
---

# Mail Card

A list row that reads as mail: sender title, a truncated preview line, and a chevron
that rotates as the card opens. Clicking anywhere in the header toggles the body, which
expands from `height: 0` to `auto` on a spring and collapses again on the way out.

With no slot content the expanded body shows `preview` in full ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â which is the usual
use, a mail list where the truncated line becomes the whole message on open. Pass the
default slot when you have real content to reveal.

## Usage

Drive the open state yourself: pass `expanded` for the initial value and listen for
`update:expanded` to know what the card did.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="mail-card-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <MMailCard
      title="Q3 infrastructure invoice"
      preview="Your usage for July came in 12% under forecast. The itemised breakdown is attached, and the credit for the two idle replicas has been applied."
      :expanded="expanded"
      @update:expanded="onToggle"
    >
      <div class="space-y-3 text-sm">
        <p class="text-muted">
          Your usage for July came in 12% under forecast. The itemised breakdown is
          attached, and the credit for the two idle replicas has been applied to
          this invoice.
        </p>
        <div class="grid grid-cols-2 gap-2">
          <div class="rounded-lg bg-default p-3">
            <p class="text-xs text-muted">
              Compute
            </p>
            <p class="text-base font-semibold text-highlighted">
              $412.80
            </p>
          </div>
          <div class="rounded-lg bg-default p-3">
            <p class="text-xs text-muted">
              Storage
            </p>
            <p class="text-base font-semibold text-highlighted">
              $96.14
            </p>
          </div>
        </div>
      </div>
    </MMailCard>

    <span class="text-xs text-muted">
      {{ expanded ? 'Expanded by the card' : 'Collapsed' }}
    </span>
  </div>
</template>

<script setup lang="ts">
const expanded = ref(false)

function onToggle(value: boolean) {
  expanded.value = value
}
</script>
```
::

## Props

::field-group
  ::field{name="title" type="string"}
  Required. Rendered as the card's `h3` heading.
  ::
  ::field{name="preview" type="string" default="''"}
  Shown truncated on one line while the card is closed, and in full as the expanded
  body when no default slot is provided. Because an empty preview also means no
  collapsed line at all, this is what decides whether the card reads as a one-liner or
  a two-line message.
  ::
  ::field{name="expanded" type="boolean" default="false"}
  The card's opening state. It is read once, when the component is set up, into an
  internal ref ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â changing the prop afterwards does not move the card. Treat it as an
  initial value and use `update:expanded` to follow what the user does.
  ::
  ::field{name="ui" type="CardProps['ui']" default="undefined"}
  Forwarded to the underlying `UCard`, so padding and slot classes are yours to
  retarget.
  ::
  ::field{name="class" type="string"}
  Merged onto the `UCard` root.
  ::
::

## Events

::field-group
  ::field{name="update:expanded" type="(value: boolean) => void"}
  Fired after the internal state has flipped, with the new value. The component keeps
  its own state either way ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â this event reports the toggle, it does not control it, so
  treat `expanded` as an initial value rather than a controlled prop.
  ::
::

## Slots

::field-group
  ::field{name="default"}
  The expanded body, rendered inside the animated `overflow-hidden` wrapper. Falls back
  to a `text-muted` paragraph containing `preview`.
  ::
::

## Accessibility

The component applies no ARIA roles or attributes of its own, and its keyboard story
needs your attention. The header is a `div` with a click handler and
`cursor-pointer` ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â it is not a `button`, carries no `tabindex`, and does not respond to
Enter or Space. The chevron is a plain inline `svg` with no label, and the only text
alternative the collapsed state offers is the truncated `preview`.

If this card is going to open for keyboard users, put a real control in the default
slot area and drive `expanded` yourself, or pass the toggle through `ui` ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â the
component gives you nothing to hang an `aria-expanded` on. The wrapping `UCard` is
otherwise plain, so heading order stays yours to manage.

There is no `prefers-reduced-motion` handling. The body animates `height` from `0` to
`auto` on a spring and the chevron rotates 180ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â°; if the motion is a problem, drive the
open state yourself and skip the click handler's animation by rendering the body
statically.

## Performance

- The body is wrapped in `AnimatePresence` with a `v-if`, so the expand and collapse
  are enter/exit transitions rather than a height watcher. Closing animates before the
  node is removed.
- Both faces run on springs ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â `stiffness: 300, damping: 30` for the body, `300 / 25`
  for the chevron's rotation ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â so there is no duration to tune and no timer to clear.
- Animating `height: 0` to `auto` measures the content once per open, which is the
  unavoidable cost of this effect; the measured value is then driven by transform-free
  layout animation.
- The card renders a single heading, at most one preview paragraph, one chevron and the
  slot body. Nothing is duplicated for the animation, so opening does not double the
  content in the DOM.

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.mailCard` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `''` |
| `header` | `'flex items-start justify-between cursor-pointer'` |
| `headerContent` | `'flex-1 min-w-0'` |
| `title` | `'text-lg font-semibold text-highlighted'` |
| `preview` | `'text-sm text-muted mt-1 truncate'` |
| `chevron` | `'ml-2 flex-shrink-0 text-muted'` |
| `chevronIcon` | `'w-5 h-5'` |
| `body` | `'overflow-hidden'` |
| `bodyInner` | `'pt-4'` |
| `bodyText` | `'text-muted'` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.mailCard` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` |  |
| `header` | `flex items-start justify-between cursor-pointer` |
| `headerContent` | `flex-1 min-w-0` |
| `title` | `text-lg font-semibold text-highlighted` |
| `preview` | `text-sm text-muted mt-1 truncate` |
| `chevron` | `ml-2 flex-shrink-0 text-muted` |
| `chevronIcon` | `w-5 h-5` |
| `body` | `overflow-hidden` |
| `bodyInner` | `pt-4` |
| `bodyText` | `text-muted` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.mailCard` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` |  |
| `header` | `flex items-start justify-between cursor-pointer` |
| `headerContent` | `flex-1 min-w-0` |
| `title` | `text-lg font-semibold text-highlighted` |
| `preview` | `text-sm text-muted mt-1 truncate` |
| `chevron` | `ml-2 flex-shrink-0 text-muted` |
| `chevronIcon` | `w-5 h-5` |
| `body` | `overflow-hidden` |
| `bodyInner` | `pt-4` |
| `bodyText` | `text-muted` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.mailCard` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` |  |
| `header` | `flex items-start justify-between cursor-pointer` |
| `headerContent` | `flex-1 min-w-0` |
| `title` | `text-lg font-semibold text-highlighted` |
| `preview` | `text-sm text-muted mt-1 truncate` |
| `chevron` | `ml-2 flex-shrink-0 text-muted` |
| `chevronIcon` | `w-5 h-5` |
| `body` | `overflow-hidden` |
| `bodyInner` | `pt-4` |
| `bodyText` | `text-muted` |
