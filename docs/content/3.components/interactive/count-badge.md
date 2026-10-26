---
title: Count Badge
description: A notification badge that anchors to a corner, counting, marking presence or just pulsing.
---

One badge, three jobs. In `count` mode it shows a number and swaps digits with a
short vertical roll, capping at `max` with a trailing plus. In `status` mode it
becomes a presence dot whose colour carries online, away, busy or offline. In
`dot` mode it is a bare marker, optionally with a ping ring.

All three share the same anchor logic: the badge is absolutely positioned
against a relative wrapper, so it hugs whichever corner you choose without
affecting the child's layout. The count only mounts when it has something to
say, which keeps an empty inbox free of a stray zero.

## Usage

Wrap the thing being annotated and pick a variant. Counts above `max` render as
`99+` by default; `showZero` keeps a zero visible when the difference between
"none" and "not loaded" matters.

::code-preview
---
label: Preview
---

  :::div{class="flex justify-center w-full"}
    <component-example name="count-badge-basic" />
  :::
#code
```vue
<template>
  <div class="flex flex-wrap items-center justify-center gap-8 py-8">
    <MCountBadge
      :count="8"
      variant="count"
    >
      <span class="grid size-12 place-items-center rounded-full bg-elevated ring-1 ring-default">
        <UIcon
          class="size-5 text-muted"
          name="i-lucide-bell"
        />
      </span>
    </MCountBadge>

    <MCountBadge
      :count="128"
      :max="99"
      variant="count"
    >
      <span class="grid size-12 place-items-center rounded-full bg-elevated ring-1 ring-default">
        <UIcon
          class="size-5 text-muted"
          name="i-lucide-inbox"
        />
      </span>
    </MCountBadge>

    <MCountBadge
      status="online"
      variant="status"
    >
      <span class="grid size-12 place-items-center rounded-full bg-elevated ring-1 ring-default">
        <UIcon
          class="size-5 text-muted"
          name="i-lucide-user"
        />
      </span>
    </MCountBadge>

    <MCountBadge
      ping
      variant="dot"
    >
      <span class="grid size-12 place-items-center rounded-full bg-elevated ring-1 ring-default">
        <UIcon
          class="size-5 text-muted"
          name="i-lucide-radio"
        />
      </span>
    </MCountBadge>
  </div>
</template>
```

::

With no slot the badge renders beside a small spacer, which is handy when the
anchor lives elsewhere in the layout.

## Customize

::code-preview
---
label: Preview
---

  :::div{class="w-full"}
    <component-example name="count-badge-custom" />
  :::
#code
  <PlaygroundCode name="CountBadge" />
::

## Props

::component-props
  ::component-prop{name="variant" type="'dot' | 'count' | 'status'" default="'dot'"}
  What the badge shows.
  ::
  ::component-prop{name="count" type="number" default="0"}
  Value displayed in the `count` variant.
  ::
  ::component-prop{name="max" type="number" default="99"}
  Value at which the badge switches to `max+`.
  ::
  ::component-prop{name="status" type="'online' | 'offline' | 'busy' | 'away'" default="'online'"}
  Presence state used by the `status` variant.
  ::
  ::component-prop{name="position" type="'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'" default="'top-right'"}
  Corner the badge is anchored to.
  ::
  ::component-prop{name="showZero" type="boolean" default="false"}
  Show the count badge when the value is zero.
  ::
  ::component-prop{name="ping" type="boolean" default="false"}
  Render an extra ping ring behind the badge.
  ::
  ::component-prop{name="class" type="string"}
  Extra classes for the badge itself.
  ::
::

## Slots

::component-slots
  ::component-slot-row{name="default"}
  The element the badge annotates. It keeps its own layout and events.
  ::
::

## Accessibility

- The `dot` variant is `aria-hidden`; it is a decorative marker with no text
  equivalent.
- The `status` variant carries visually hidden text with the status name, so
  presence is never conveyed by colour alone.
- The `count` variant renders the number as real text, which screen readers
  announce in place.
- The ping ring is `aria-hidden` and stops under `prefers-reduced-motion`.
- The badge itself is not focusable and never steals a click from the child.

## Performance

- The badge mounts only when it is visible; an empty count removes the node
  instead of hiding it.
- A changing count swaps one keyed span inside an overflow-hidden box, so only
  the digits animate.
- The pop-in and digit roll are CSS animations; under `prefers-reduced-motion`
  they switch off and the number updates instantly.
- The ping is a CSS animation, and no JavaScript timers run in the component.
- Position and size come from static classes, so there is no measurement in the
  render path.
