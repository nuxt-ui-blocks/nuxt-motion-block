---
title: Inline Testimonials
description: Quotes that live inside the sentence that cites them, opened from the name.
---

A testimonial wall is a volume argument: look how many people said something. A
name inside the sentence that cites them is a different claim, and a much smaller
one - this person said this, and here is where. The price is density: one card at
a time, anchored to the word, never a grid.

The prose stays one string with `{{id}}` tokens. Each token becomes an inline
button carrying the person's face, or their initials when there is no photo, so
the paragraph keeps its rhythm instead of breaking into a list of quotes.

The card is positioned from live measurements rather than from a tooltip library:
it is clamped inside the paragraph and flips above the word when the viewport
runs out of room below.

## Usage

Write the claim, then mark the people in it. A token with no matching testimonial
renders as nothing rather than as literal braces, so check the ids if the prose
comes from a CMS.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="inline-testimonials-basic" />
  :::
#code
```vue
<template>
  <div class="w-full max-w-xl">
    <MInlineTestimonials
      :text="text"
      :testimonials="testimonials"
    />
  </div>
</template>

<script setup lang="ts">
/**
 * The names are the citation. Hovering, tapping or tabbing to one opens the
 * quote in place, so the claim and its evidence are never two screens apart.
 */
const text = 'The migration shipped on a Friday, which nobody wanted. {{maya}} rewrote the scheduler over two nights and {{theo}} caught the timezone bug that would have doubled every billing cycle. We have not had a missed run since.'

const testimonials = [
  {
    id: 'maya',
    name: 'Maya Okafor',
    role: 'Staff engineer, Platform',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 5,
    quote: 'The scariest part was not the migration itself, it was that nobody could tell me what still depended on the old scheduler. Writing that inventory first is what made the cutover boring.',
  },
  {
    id: 'theo',
    name: 'Theo Lindqvist',
    role: 'Backend engineer',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 4,
    quote: 'I only found the offset bug because a fixture used a negative UTC offset. Every production record looked perfect, which is exactly why it would have shipped.',
  },
]
</script>
```
::

## Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="inline-testimonials-custom" />
  :::
#code
  <PlaygroundCode name="InlineTestimonials" />
::

## Props

::component-props
  ::component-prop{name="text" type="string"}
  Required. The prose, with a `{{id}}` token for each testimonial. Anything that
  is not a token is rendered as plain text.
  ::
  ::component-prop{name="testimonials" type="InlineTestimonial[]"}
  Required. `{ id, name, role, quote, avatar?, rating? }`. `id` is what the tokens
  match; `avatar` falls back to initials, which is what most real data has.
  ::
  ::component-prop{name="avatarSize" type="number" default="22"}
  Diameter of the face or initials chip, in pixels. Its font size is derived at
  40% of the diameter, so the initials stay centred as it changes.
  ::
  ::component-prop{name="openId" type="string | null"}
  Controlled open card. Leave undefined to let the component own it.
  ::
  ::component-prop{name="class" type="string" default="''"}
  Merged onto the wrapper. It is `relative`, because the card is absolutely
  positioned against it.
  ::
::

## Events

::component-events
  ::component-event{name="update:openId" payload="[id: string | null]"}
  A card opened or closed, by hover, focus, click, Escape or an outside pointer.
  Emitted whether or not `openId` is bound.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.inlineTestimonials` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  The positioned wrapper.
  ::
  ::component-slot-row{name="text"}
  The paragraph. It owns `text-pretty`; the tokens are inline-flex children, so
  the line breaking still treats them as words.
  ::
  ::component-slot-row{name="cardWrapper"}
  The absolutely positioned shell. `pt-2` or `pb-2` is added in the template to
  bridge the gap between the word and the card.
  ::
  ::component-slot-row{name="trigger"}
  One cited name. It keeps the paragraph's size and colour, and only gains a
  hairline rule under the name.
  ::
  ::component-slot-row{name="avatar"}
  The face. Its ring turns `ring-primary` while its card is open.
  ::
  ::component-slot-row{name="initials"}
  The fallback chip, with its font size derived from `avatarSize`.
  ::
  ::component-slot-row{name="name"}
  The name inside the trigger. `leading-none` keeps the rule tight under the text
  instead of at the bottom of the line box.
  ::
  ::component-slot-row{name="card"}
  The floating card: surface, border, shadow.
  ::
  ::component-slot-row{name="cardHead"}
  The avatar, name and role row at the top of the card.
  ::
  ::component-slot-row{name="cardName"}
  The full name in the card, which may be longer than the cited word.
  ::
  ::component-slot-row{name="cardRole"}
  The role line, truncated rather than wrapped.
  ::
  ::component-slot-row{name="quote"}
  The `<blockquote>` itself.
  ::
  ::component-slot-row{name="rating"}
  The star row, which carries `role="img"` and the text alternative.
  ::
  ::component-slot-row{name="star"}
  One star. Filled stars use the warning colour; the rest stay muted.
  ::
::

## Accessibility

- Each name is a real `<button type="button">` inside the paragraph, with
  `aria-expanded` and `aria-controls` pointing at its card, so the state is
  announced rather than being inferred from a floating box.
- Keyboard focus opens the card only when the trigger matches `:focus-visible`.
  A mouse click also focuses the button, and opening there would fight the click
  that follows it.
- Escape closes the open card and returns focus to the name that opened it, so
  the reader is not dropped back at the top of the paragraph.
- The rating row is `role="img"` with `aria-label="Rated 4 out of 5"`, and the
  stars are `aria-hidden`. Five glyphs read nothing on their own.
- The avatar has `alt=""`, because the name is directly beside it; announcing the
  person twice is noise. The initials chip is `aria-hidden` for the same reason.
- The card is a `<blockquote>`, so the quote is marked up as a quotation instead
  of as a paragraph in a box.
- Hover only applies to a mouse pointer. Touch taps toggle the card, so a phone
  is not left with a control that cannot be opened.
- Closing is delayed by 140 ms so the pointer can cross the gap into the card,
  and the card's own padding forms the bridge. Without both, the card would
  vanish as soon as the name was left.
- Under `prefers-reduced-motion: reduce` the card appears instantly; only its
  4 px entrance offset is removed, not its content.

## Performance

- Only the open card is in the DOM. There is no hidden card per testimonial
  waiting to be revealed.
- Position is measured once per open, then only on resize and scroll - never per
  frame. The scroll listener is registered in the capture phase so a nested
  scroll container also repositions the card.
- The prose is split by a single regex pass over the string, not by walking the
  rendered DOM, so a long paragraph costs one pass.
- Document listeners are added once on mount and removed on unmount, with the
  close timer cleared so a fast unmount cannot close a card that no longer
  exists.
- No positioning library: a 288 px card, an 8 px edge padding, an 8 px gap and a
  single flip check are all arithmetic on one measured rect.
