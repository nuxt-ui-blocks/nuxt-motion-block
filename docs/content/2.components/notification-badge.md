---
title: Notification Badge
description: A count badge that springs onto any element and disappears the moment the count reaches zero.
navigation:
  icon: i-lucide-bell
---

# Notification Badge

A badge that anchors itself to the top-right of whatever you put in the default
slot, and springs in and out as the count changes. It is a thin wrapper: the
badge itself is a Nuxt UI `UBadge`, and the only motion is the scale-and-fade
that `AnimatePresence` plays when the count crosses zero.

Two rules come straight from the source. `count <= 0` hides the badge entirely ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â
there is no "zero" state to render ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â and `count > max` is clamped to a `max+`
label so an unread inbox never grows past a fixed width.

The whole wrapper is a `UTooltip`, so anything you pass as `tooltip` becomes the
trigger's description on hover and on keyboard focus.

## Usage

Wrap any element ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â an icon button, an avatar, a nav link ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â and feed it `count`.
The badge is positioned absolutely, so it never reflows the element underneath.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="notification-badge-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <div class="flex items-center justify-between rounded-2xl border p-4">
      <div class="flex items-center gap-3">
        <MNotificationBadge
          :count="count"
          :tooltip="tooltip"
        >
          <UButton
            icon="i-lucide-bell"
            color="neutral"
            variant="outline"
            aria-label="Notifications"
          />
        </MNotificationBadge>
        <span class="text-sm font-medium">
          Inbox
        </span>
      </div>
      <span class="text-xs text-muted tabular-nums">
        {{ badgeLabel }}
      </span>
    </div>

    <div class="flex flex-wrap items-center gap-2">
      <UButton
        label="New message"
        icon="i-lucide-plus"
        size="sm"
        @click="count++"
      />
      <UButton
        label="Overflow"
        icon="i-lucide-chevrons-up"
        size="sm"
        variant="outline"
        color="neutral"
        @click="count = 150"
      />
      <UButton
        label="Mark all read"
        icon="i-lucide-check-check"
        size="sm"
        variant="outline"
        color="neutral"
        @click="count = 0"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const count = ref(3)

const badgeLabel = computed(() => (count.value > 99 ? '99+' : String(count.value)))

const tooltip = computed(() => {
  if (count.value === 0)
    return 'No unread messages'
  return `${count.value} unread ${count.value === 1 ? 'message' : 'messages'}`
})
</script>
```
::

## Props

::field-group
  ::field{name="count" type="number"}
  The number the badge represents. Required. At `0` or below the badge is not
  rendered at all, and the enter/exit animation does not play.
  ::
  ::field{name="tooltip" type="string" default="''"}
  Text for the `UTooltip` that wraps the whole thing, so hovering or focusing
  the anchored element describes the count in words. Defaults to empty, which
  leaves the trigger with nothing extra announced.
  ::
  ::field{name="max" type="number" default="99"}
  Upper bound for the label. Anything above it renders as `` `${max}+` ``. It
  only affects the text ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â the badge is still rendered at its full width.
  ::
  ::field{name="color" type="string" default="'error'"}
  Forwarded straight to `UBadge`'s `color`, so any Nuxt UI colour alias works
  (`error`, `success`, `info`, `primary`, or a raw hex value).
  ::
  ::field{name="badgeSize" type="'xs' | 'sm' | 'md' | 'lg' | 'xl'" default="'sm'"}
  Forwarded to `UBadge`'s `size`. The wrapper's own padding and
  `min-w-[1.25rem]` are fixed regardless, so larger sizes grow the badge but not
  the offset from the corner.
  ::
::

## Slots

::field-group
  ::field{name="default"}
  The element the badge anchors to. Rendered inside a `relative inline-flex`
  wrapper, so give it whatever size you like ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â the badge positions itself
  against that wrapper.
  ::
::

## Accessibility

The badge is plain text inside the wrapper, with no `role` and no live region
of its own. Because the wrapper is also the tooltip's trigger, that text becomes
part of the trigger's accessible name ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â a button containing this component reads
as something like "3 Notifications", and a change from 3 to 4 is silent to a
screen reader. Announce the change yourself if it matters.

No reduced-motion branch exists here. The badge is animated by a fixed spring
(`stiffness: 500, damping: 20`), and that spring runs whatever the user's
preference is. It is short and small, but it is not opt-out.

## Performance

- The badge subtree exists only while `count > 0`; `AnimatePresence` keeps it
  mounted just long enough to play the exit.
- The animation is `scale` and `opacity` only, and the badge is
  `position: absolute`, so entering never reflows the element underneath.
- No timers, no listeners, no per-frame work. The only reactive computation is
  the `displayText` clamp.

::tip
`color` is typed as `string` in the component's own props and cast to `any` on
the way into `UBadge`, so a typo is not caught by the type checker ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â it fails
silently and the badge falls back to `UBadge`'s default colour. If the badge is
the wrong colour, check the string before anything else.
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.notificationBadge` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `relative inline-flex` |
| `badge` | `absolute -top-2 -right-2 z-10` |
| `badgeContent` | `rounded-full px-1.5 min-w-[1.25rem] h-5 flex items-center justify-center` |
