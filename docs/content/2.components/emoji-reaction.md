---
title: Emoji Reaction
description: A controlled reaction bar with animated counters, a hover picker, and a particle burst on every reaction.
navigation:
  icon: i-lucide-smile
---

# Emoji Reaction

A reaction bar for a post: a row of pill buttons, each holding an emoji and a
count, plus an optional popover of extra emojis. The count is an odometer — it
rolls up or down in the direction of the change — and selecting a reaction pops
the emoji and throws a small burst of particles out of it.

The component is fully controlled and mutates nothing. It renders the
`reactions` array you hand it and emits `react`; you own the array, the counts
and the `reacted` flags. Nothing is persisted for you and no default state is
inferred.

That contract shows up most clearly in the picker. A picked emoji that already
exists in the bar toggles that reaction, so the exclusivity rule still applies;
one that does not exist is reported as new — and the payload for that case is
the emoji string itself, used as an id.

## Usage

Hold the reactions in a `ref` and rewrite it in the `react` handler. Because the
component emits exclusivity for you, the handler can simply clear every other
flag whenever any reaction is turned on.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="emoji-reaction-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-lg flex-col gap-4">
    <div class="rounded-2xl border p-4">
      <p class="text-sm font-medium">
        Ship the new onboarding flow?
      </p>
      <div class="mt-3">
        <MEmojiReaction
          :reactions="reactions"
          show-picker
          @react="onReact"
        />
      </div>
    </div>

    <p class="text-xs text-muted">
      One reaction at a time — {{ reactedLabel }}
    </p>
  </div>
</template>

<script setup lang="ts">
type Reaction = {
  count: number
  emoji: string
  id: string
  label: string
  reacted: boolean
}

const reactions = ref<Reaction[]>([
  { count: 12, emoji: '👍', id: 'thumbs-up', label: 'Thumbs up', reacted: false },
  { count: 4, emoji: '🎉', id: 'party-popper', label: 'Party popper', reacted: false },
  { count: 9, emoji: '🚀', id: 'rocket', label: 'Rocket', reacted: true },
])

const reactedLabel = computed(() => {
  const active = reactions.value.find(item => item.reacted)
  return active ? active.label : 'nothing selected yet'
})

function onReact(id: string, reacted: boolean) {
  reactions.value = reactions.value.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        count: Math.max(0, item.count + (reacted ? 1 : -1)),
        reacted,
      }
    }
    return { ...item, reacted: false }
  })
}
</script>
```
::

## What `react` reports

One event, five situations. In every case the component emits and waits — it
never changes `reactions` itself.

| You did this | The component emits |
| --- | --- |
| Clicked an un-reacted pill | `react(id, true)` |
| Clicked an already-reacted pill | `react(id, false)` |
| Turned one on while another is on, `allowMultiple: false` | `react(otherId, false)` for each other active reaction, then `react(id, true)` |
| Picked an emoji already in the bar, not yet reacted | `react(id, true)` — matched against `id` *or* `emoji` |
| Picked an emoji already in the bar, already reacted | nothing |
| Picked an emoji that is not in the bar | `react(emoji, true)` — the emoji string is the payload |

## Props

::field-group
  ::field{name="reactions" type="EmojiReactionItem[]"}
  Required, and the only source of truth. Each item is
  `{ id, emoji, label }` plus an optional `count` (defaults to `0`) and an
  optional `reacted` (defaults to `false`). `id` must be unique within the
  array; `label` is what the button's accessible name is built from.
  ::
  ::field{name="allowMultiple" type="boolean" default="false"}
  When `false` — the default — reacting to one item emits `react(otherId, false)`
  for every other item currently marked `reacted`, so your handler only has to
  handle one toggle.
  ::
  ::field{name="burst" type="boolean" default="true"}
  Fire the particle burst when a reaction is selected. Also gated on reduced
  motion, so `false` is not needed for that.
  ::
  ::field{name="burstCount" type="number" default="10"}
  How many particles to throw. They are spread evenly around a circle with a
  small angular jitter, at a randomised distance of 22–40px, sized 3–6px.
  ::
  ::field{name="showPicker" type="boolean" default="false"}
  Render the trailing trigger that opens the extra-emoji popover. Without it the
  bar is just the pills you passed in and `pickerEmojis` is inert.
  ::
  ::field{name="pickerEmojis" type="string[]" default="['🎉', '🔥', '😍', '👀', '🚀', '💯']"}
  The emojis offered by the picker. Each is looked up against your `reactions`
  by both `id` and `emoji`, so an emoji that is already a pill in the bar
  toggles it instead of adding a duplicate. New ones arrive at you as
  `react(emoji, true)`.
  ::
  ::field{name="size" type="'sm' | 'md' | 'lg'" default="'md'"}
  Scales the pills, the emoji glyph, the counter and the trigger together
  (`sm` 28px tall, `md` 36px, `lg` 44px).
  ::
  ::field{name="defaultPickerOpen" type="boolean" default="false"}
  Start with the picker open. Mostly useful for docs and screenshots — it is
  initial state, so the component still closes it on Escape, an outside click or
  Tab as usual.
  ::
  ::field{name="class" type="string"}
  Merged onto the outer `role="group"` row, after the built-in
  `flex flex-wrap items-center gap-2`.
  ::
::

## Events

::field-group
  ::field{name="react" type="(id: string, reacted: boolean) => void"}
  Fired when a reaction should change. The first argument is the `id` from your
  `reactions` array — or the raw emoji string when the picker proposes one that
  is not in the array yet. The second is the state it should move to. See the
  table above for the exact emissions, including the exclusivity emits that
  precede the one you asked for.
  ::
::

## Accessibility

The bar is a `role="group"` labelled "Reactions". Each pill is a real `<button>`
carrying `aria-pressed` and an `aria-label` of the form "Party popper, 4
reactions" — singular when the count is 1, so the label tracks your count
rather than being a static string.

The picker is a proper menu. The trigger has `aria-haspopup="menu"`,
`aria-expanded`, and `aria-controls` pointing at a `useId()`-generated id on the
menu; the menu itself is `role="menu"` with `role="menuitem"` children and a
roving `tabindex`. Keyboard: ArrowUp or ArrowDown on the trigger opens it and
moves focus to the first item, arrows move and wrap within the menu, Escape
closes and returns focus to the trigger, and Tab closes without stealing focus
back. A pointer press outside closes it too. Hover also opens the picker, but
only on devices that report `(hover: hover) and (pointer: fine)`, and hovering
never moves focus.

Reduced motion is honoured throughout: the press-scale, the emoji pop, the
particle burst, the menu scale-in and the digit roll all swap to opacity-only or
drop out entirely under `prefers-reduced-motion`.

## Performance

- Burst particles come from a seeded linear congruential generator, not
  `Math.random()`, so a given seed always throws the same shape — the effect is
  reproducible and free of a global RNG call.
- The burst layer is unmounted on a `550ms` timer, not on the ring's animation
  completing. motion-v re-runs `animateUpdates` on every re-render and resolves
  immediately when the target has not changed, so an `onAnimationComplete`
  unmount would tear the burst down before it was ever painted.
- The emoji pop is animated imperatively on the element that already exists,
  rather than by remounting it behind a changing `key`.
- Counters use `AnimatePresence` with `mode="popLayout"` and a fixed
  `1.15em` overflow window, so a rolling number never widens the pill.
- The two `document` listeners (`pointerdown`, `keydown`) are added when the
  picker opens and removed when it closes or the component unmounts — they are
  not permanent.
- Nothing animates a layout property; the press, pop, burst and roll are all
  `transform` and `opacity`.

::tip
The roll direction is derived by watching the `id:count` pairs of your array, so
it works on the very first render only as a flat "up" — the previous counts map
is empty and the direction defaults to `1`. If your initial state already has a
high count and the first change is a decrement, the digits will still roll up.
::
