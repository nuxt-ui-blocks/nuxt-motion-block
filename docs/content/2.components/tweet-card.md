---
title: Tweet Card
description: A social post card with avatar, handle, timestamp and like and repost counts that lifts on hover.
navigation:
  icon: i-lucide-message-circle
---

# Tweet Card

A social post card: avatar, display name, handle, optional timestamp, the post text, and
like and repost counts. The whole card lifts and scales on hover, and it is driven
entirely by props — there is nothing to wire up and no state to hold.

Every prop is optional, which means an empty card renders rather than throwing. If you
want a post to read as a post, `author`, `handle`, `content` and `avatar` are the four
that matter; the rest fill in.

## Usage

Pass the post's fields as props. `time` only renders when it is a non-empty string, so
an undated post simply has no timestamp rather than a blank one.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="tweet-card-basic" />
  :::
#code
```vue
<template>
  <div class="w-full max-w-md">
    <MTweetCard
      avatar="https://randomuser.me/api/portraits/men/11.jpg"
      author="Devon Achebe"
      handle="devon"
      time="2h"
      :likes="1842"
      :retweets="316"
      content="Spent the afternoon removing a backdrop-filter from a card. The layout shift I was chasing was never the blur — it was the repaint the blur forced on every scroll frame."
    />
  </div>
</template>
```
::

## Props

::field-group
  ::field{name="author" type="string" default="''"}
  Display name, truncated to one line. Also the avatar's `alt`, which is what a screen
  reader reads for the person in the post.
  ::
  ::field{name="handle" type="string" default="''"}
  Secondary line next to the name, truncated to fit.
  ::
  ::field{name="content" type="string" default="''"}
  The post body. Rendered as a paragraph with relaxed leading; it wraps rather than
  clamping, and line breaks in the string are preserved as ordinary whitespace.
  ::
  ::field{name="avatar" type="string" default="''"}
  Avatar source, rendered at `md` by `UAvatar`. With no source the avatar falls back to
  its initial or placeholder.
  ::
  ::field{name="time" type="string" default="''"}
  Timestamp, pushed to the end of the name row. The whole element is omitted when this
  is empty, so an undated post has no trailing gap.
  ::
  ::field{name="likes" type="number" default="0"}
  Like count, rendered next to a heart icon. Rendered as written — a value over 1000
  shows as `1000`, not `1K`.
  ::
  ::field{name="retweets" type="number" default="0"}
  Repost count, rendered next to a repeat icon. Formatted the same way as `likes`.
  ::
::

## Accessibility

The component adds no roles, no ARIA attributes and no keyboard behaviour. The counts
are not interactive: the heart and repeat icons are decorative glyphs beside plain
numbers, and there is no button behind either one. If likes should be tappable, the
component does not offer a way in — build that row yourself.

The avatar is a `UAvatar` whose `alt` is the display name, so the author is announced
once. The name and handle are truncated with CSS, which means a long name is
present in the DOM and reachable by assistive technology even though it is visually
cut off. The timestamp is text, not a `<time>` element, so it carries no machine-readable
date — put one in if it matters.

The hover lift is pointer-only and there is no `prefers-reduced-motion` handling. It is
a scale to `1.02` with a `y: -4` lift on a spring, which is mild but not gated; if you
need the guarantee, the component gives you no prop for it, so style around it or
replace the root.

## Performance

- The lift is a single `whileHover` on the root `motion.div` — one transform on one
  element, with no per-frame Vue state. Nothing re-renders while hovering.
- `will-change-transform` is set on the root, so the browser promotes it before the
  first hover rather than on the first frame of one.
- The card has no slots, no reactive state, no timers, no listeners and no observers.
  It renders one `UAvatar`, one icon-bearing row per count and a paragraph.
- The spring is fixed at `stiffness: 300, damping: 20` with no duration, so it settles
  on physics rather than a clock — there is nothing to cancel or clean up on unmount.
- The counts are interpolated into the template as text, so changing `likes` is a text
  patch on an existing node rather than a component re-render.