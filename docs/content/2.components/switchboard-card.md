---
title: Switchboard Card
description: A card that flips in 3D between a front face and a back face on a driven prop.
navigation:
  icon: i-lucide-refresh-cw
---

# Switchboard Card

A card that swaps between two faces with a 3D flip. The old face rotates away on its
vertical axis and the new one rotates in, so it reads as one card turning over rather
than two cards cross-fading.

The flip is driven entirely by the `flipped` prop and the `AnimatePresence` around the
two faces; there is no click handler, no trigger and no event. Whatever the flip means
in your app, you own the control.

## Usage

Provide both faces through the `front` and `back` slots and drive `flipped` from your
own state. Both faces are wrapped in the same `UCard`, so `class` and `ui` apply to
whichever one is showing ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â give the faces matching padding if you want the flip to look
continuous.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="switchboard-card-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <MSwitchboardCard
      :flipped="flipped"
      :flip-duration="700"
      class="rounded-2xl"
    >
      <template #front>
        <div class="flex h-40 flex-col items-center justify-center gap-2 text-center">
          <UIcon
            name="i-lucide-mail-open"
            class="size-8 text-primary"
          />
          <p class="font-semibold text-highlighted">
            3 unread messages
          </p>
          <p class="text-sm text-muted">
            Front face
          </p>
        </div>
      </template>

      <template #back>
        <div class="flex h-40 flex-col items-center justify-center gap-2 text-center">
          <UIcon
            name="i-lucide-mail-check"
            class="size-8 text-success"
          />
          <p class="font-semibold text-highlighted">
            All caught up
          </p>
          <p class="text-sm text-muted">
            Back face
          </p>
        </div>
      </template>
    </MSwitchboardCard>

    <USwitch
      v-model="flipped"
      :label="flipped ? 'Showing back' : 'Showing front'"
    />
  </div>
</template>

<script setup lang="ts">
const flipped = ref(false)
</script>
```
::

## Props

::field-group
  ::field{name="flipped" type="boolean" default="false"}
  Which face is showing. Changing it plays the flip: the current face exits rotating to
  `+90deg` while the other enters from `-90deg`. `AnimatePresence mode="wait"` means the
  incoming face does not start until the outgoing one has finished, so the two faces
  are never both fully visible at once.
  ::
  ::field{name="flipDuration" type="number" default="600"}
  Milliseconds for the flip. It is divided by 1000 and handed to the spring transition
  as `duration`, so it scales the spring's settling rather than replacing it with a
  fixed-length ease ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â a very low value makes the flip look clipped.
  ::
  ::field{name="ui" type="CardProps['ui']" default="undefined"}
  Forwarded to the `UCard` wrapping whichever face is showing.
  ::
  ::field{name="class" type="string"}
  Merged onto the `UCard` of the current face. Because each face has its own card, both
  faces need the same `class` and `ui` to flip without a jump in size or padding.
  ::
::

## Slots

::field-group
  ::field{name="front"}
  The face shown while `flipped` is false. There is no default slot ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â a card with no
  `front` renders an empty card.
  ::
  ::field{name="back"}
  The face shown while `flipped` is true.
  ::
::

## Accessibility

The component applies no roles, no ARIA attributes and no keyboard behaviour. The root
div carries `perspective: 1000px`, which establishes the 3D context the flip is
measured against, and every other attribute you pass is forwarded to it ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â that is the
place to put an `id`, `aria-*` or `role` if the card needs one.

Because the flip is driven by a prop, nothing about the component tells assistive
technology that the card's content changed. If the two faces hold different
information ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â an unread count versus an all-clear, say ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â the swap is invisible to a
screen-reader user. Announce it yourself: a `role="status"` region alongside the card,
or a focus move, will do more than anything the component could add here.

There is no `prefers-reduced-motion` handling. The flip is a 3D rotation with a fade
over roughly 600ms, so if that is a problem for someone, drive the card with
`flipped` and accept an instant swap by mounting the faces yourself ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â or wrap the card
and skip it entirely for reduced-motion users.

## Performance

- Exactly one face is in the DOM at a time: the two are `v-if`/`v-else` branches inside
  `AnimatePresence mode="wait"`, and `wait` is what makes that true. Switching to
  `popLayout` would need `forwardRef`; switching to the default mode would put both
  faces in the tree mid-flip.
- The flip animates `rotateY` and `opacity` ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â no layout, no measurement. `perspective`
  lives on the outer div and never changes.
- Each face sets `backface-visibility: hidden`, which does the "one card turning over"
  work: the face rotating away is hidden before it passes 90deg instead of showing its
  mirrored back.
- `flipDuration` is a constant passed inline to the transition, so it is part of the
  vnode's props and changing it re-evaluates the transition without remounting.
- The `UCard` for each face is a separate instance, so switching faces creates and
  destroys a card subtree. Keep the two faces' markup equivalent in size to keep the
  flip from resizing.

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.switchboardCard` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `wrapper` | `relative` |
| `front` | `w-full` |
| `back` | `w-full` |
| `card` |  |
