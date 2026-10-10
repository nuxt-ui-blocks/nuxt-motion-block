---
title: Social Hover Card
description: An inline mention that opens a profile preview on hover or focus, with count-up stats and a follow button.
navigation:
  icon: i-lucide-user-round-search
---

# Social Hover Card

An inline mention that opens a profile preview: banner, avatar, bio, count-up stats and
a follow button. On a hover-capable device it opens after a delay and closes on a
shorter one; on touch and keyboard it opens immediately and stays until you dismiss it.

The card flips above the mention when there is not enough room below, and it never
opens on a hover device from a click ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â a click there is a selection, not a request.

## Usage

Pass a `profile` object and leave the trigger slot alone to render `@handle` as the
inline mention. Pass `following` to control the follow state from the parent; leave it
undefined and the card manages its own.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="social-hover-card-basic" />
  :::
#code
```vue
<template>
  <div class="w-full max-w-lg rounded-2xl border border-default p-6">
    <p class="mb-4 text-sm leading-relaxed">
      Built by
      <MSocialHoverCard
        :profile="mara"
        placement="bottom"
        @follow:change="following = $event"
      />
      and shipped alongside
      <MSocialHoverCard :profile="ilya" />
      .
    </p>

    <UBadge
      :label="following ? 'Following Mara' : 'Not following'"
      :color="following ? 'success' : 'neutral'"
      variant="subtle"
    />
  </div>
</template>

<script setup lang="ts">
const following = ref(false)

const mara = {
  id: 'mara-fjeld',
  name: 'Mara Fjeld',
  handle: 'marafjeld',
  avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
  banner: 'https://picsum.photos/seed/mara-banner/640/160',
  bio: 'Rendering engineer. Spends her weekends writing about colour science and specular surfaces.',
  url: 'https://example.com/mara',
  verified: true,
  stats: [
    { label: 'Projects', value: 128 },
    { label: 'Followers', value: 18400 },
    { label: 'Following', value: 312 },
  ],
}

const ilya = {
  id: 'ilya-brandt',
  name: 'Ilya Brandt',
  handle: 'ilyabrandt',
  avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
  bio: 'Interaction designer, motion first.',
  verified: false,
  stats: [
    { label: 'Followers', value: 2410 },
  ],
}
</script>
```
::

## Profile shape

`profile` is the only required prop and the only real interface. `avatar`, `handle`,
`id` and `name` are required; everything else is optional and its absence is handled ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â
no banner draws a gradient, no bio draws nothing, no stats draws no row.

| Key | Type | Used for |
| --- | --- | --- |
| `id` | `string` | Namespaces the card's DOM id, so two mentions of different profiles never collide |
| `name` | `string` | Display name, the avatar's `alt`, and the dialog's `aria-label` |
| `handle` | `string` | The `@handle` in the trigger, and the secondary line in the card |
| `avatar` | `string` | 48px round avatar |
| `banner` | `string` | 64px cover strip across the top; absent means a gradient |
| `bio` | `string` | Paragraph under the identity row |
| `url` | `string` | Turns the name into a link that opens in a new tab |
| `verified` | `boolean` | Check-badge icon plus an `sr-only` "Verified account" |
| `stats` | `{ label: string, value: number \| string }[]` | Stat row; numeric values count up, strings render as-is |

Stat `label` is used as the key for the count-up, so two stats in one profile must not
share a label.

## Props

::field-group
  ::field{name="profile" type="SocialProfile"}
  Required. The profile to preview ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â see the table above for every key. Changing it
  while the card is open re-renders the contents; the open state itself is not reset.
  ::
  ::field{name="openDelay" type="number" default="350"}
  Milliseconds a hover must persist before the card opens. Focus and click bypass it
  entirely and open on the spot, because those are deliberate.
  ::
  ::field{name="closeDelay" type="number" default="150"}
  Milliseconds after the pointer leaves before the card closes. The gap is what lets you
  travel from the mention to the card ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â the card's own `mouseenter` cancels it, so
  moving between the two does not dismiss anything. Set it low and the card becomes
  hard to use.
  ::
  ::field{name="placement" type="'auto' | 'bottom' | 'top'" default="'auto'"}
  Which side of the mention to open on. `auto` measures on open and flips to `top` only
  when there is less than 260px of room below *and* more room above; `bottom` and `top`
  pin the side and skip the measurement. The transform origin follows, so the card
  always scales away from the mention.
  ::
  ::field{name="following" type="boolean"}
  Controlled follow state. Defined means the button is a pure display of your state and
  `follow:change` is your cue to update it; undefined leaves the card managing its own.
  ::
  ::field{name="loading" type="boolean" default="false"}
  Renders a pulsing skeleton instead of the profile. The skeleton is `aria-hidden` and
  the card still opens and closes on the same timing, so you can show it while your own
  fetch is in flight.
  ::
  ::field{name="class" type="string"}
  Merged onto the trigger button, which is styled as a `text-primary` link with
  `underline-offset-2`. Use it for weight or size, not for the link colour itself.
  ::
::

## Events

::field-group
  ::field{name="follow:change" type="(following: boolean) => void"}
  Fired when the follow button is pressed, with the state it is moving to. In
  uncontrolled mode the card applies the change itself and the event is a notification;
  in controlled mode nothing changes until you pass the new `following` back down.
  ::
::

## Slots

::field-group
  ::field{name="trigger"}
  The inline mention. Falls back to `@<profile.handle>`. Whatever you render stays a
  `<button>` ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â the click, focus and keyboard behaviour are wired to that element.
  ::
::

## Accessibility

The trigger is a real `<button>` with `aria-haspopup="dialog"` and an `aria-expanded`
that tracks the open state. The card itself carries
`role="dialog"` with an `aria-label` of "<name> profile preview" ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â but *only* when it
was opened by focus or click. A hover-opened card deliberately stays out of the
accessibility tree, because a card that appears because the mouse happened to be there
is not something a screen-reader user asked for. The `id` on the card is namespaced
from `profile.id`; note the trigger does not reference it with `aria-controls`.

Keyboard: focus opens the card immediately; `Escape` closes it and returns focus to the
trigger, with a guard so that returning focus does not immediately reopen it. `focusout`
closes it whenever focus leaves the wrapper, which includes tabbing into the follow
button or the profile link and back out. On a hover-capable device the click handler
returns early, so clicking the mention selects the text instead of toggling the card.

The follow button carries `aria-pressed`, so its state is announced rather than only
looked at, and its label cross-fades between "Follow" and "Following". The verified
badge is an icon plus an `sr-only` "Verified account", because the badge alone carries
no text. The avatar's `alt` is the display name; the banner is decorative and gets
`alt=""`.

`prefers-reduced-motion` removes the card's scale and opacity transitions and the
follow-label cross-fade, and the stats skip the count-up entirely ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â the final numbers
are written straight in instead.

## Performance

- All numeric stats count up from zero on a **single** `requestAnimationFrame` loop,
  not one per stat. It is cancelled when the card closes and on unmount, and restarted
  from zero each time the card opens.
- Open and close are two `setTimeout`s that cancel each other, cleared on every state
  change and on unmount. There is no polling and no observer.
- Hover intent is gated on `(hover: hover) and (pointer: fine)`, so touch devices never
  arm a hover timer or attach the pointer handlers' work at all.
- The frame timestamp can predate the `performance.now()` captured at the start of the
  count-up, so progress is clamped to `0..1` before it is eased ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â otherwise the first
  frame can render a negative count.
- `motion.div layout` wraps only the follow button, so the label cross-fade is measured
  on that button alone rather than on the whole card.
- The card is `v-if`'d inside `AnimatePresence`, so it is not in the DOM while closed.
  Its images are only fetched once it first opens, unless the browser speculates
  otherwise ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â expect a small delay on that first open.

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.socialHoverCard` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `'relative inline-block'` |
| `trigger` | `'rounded font-medium text-primary text-sm underline-offset-2 hover:underline'` |
| `card` | `'absolute left-1/2 z-30 w-80 -translate-x-1/2 overflow-hidden rounded-2xl border border-default bg-default shadow-xl'` |
| `loading` | `'animate-pulse p-4'` |
| `loadingBanner` | `'h-16 rounded-lg bg-muted'` |
| `loadingBody` | `'mt-3 flex items-center gap-3'` |
| `loadingAvatar` | `'size-12 rounded-full bg-muted'` |
| `loadingText` | `'flex-1 space-y-2'` |
| `loadingLineWide` | `'h-3 w-2/3 rounded bg-muted'` |
| `loadingLineNarrow` | `'h-3 w-1/3 rounded bg-muted'` |
| `loadingLineFull` | `'mt-4 h-3 w-full rounded bg-muted'` |
| `loadingLineShort` | `'mt-2 h-3 w-4/5 rounded bg-muted'` |
| `banner` | `'h-16 w-full object-cover'` |
| `bannerFallback` | `'h-16 w-full bg-gradient-to-r from-primary/40 to-primary/10'` |
| `body` | `'p-4'` |
| `header` | `'flex items-start justify-between gap-3'` |
| `identity` | `'flex items-center gap-3'` |
| `avatar` | `'size-12 shrink-0 rounded-full border-2 border-default object-cover'` |
| `info` | `'min-w-0'` |
| `nameRow` | `'flex items-center gap-1'` |
| `nameLink` | `'truncate font-semibold text-highlighted text-sm hover:underline'` |
| `name` | `'truncate font-semibold text-highlighted text-sm'` |
| `verifiedIcon` | `'size-4 shrink-0 text-primary'` |
| `verifiedLabel` | `'sr-only'` |
| `handle` | `'truncate text-muted text-xs'` |
| `action` | `'shrink-0'` |
| `followButton` | `'rounded-full'` |
| `followLabel` | `'inline-block'` |
| `bio` | `'mt-3 text-highlighted/80 text-sm leading-relaxed'` |
| `stats` | `'mt-4 flex items-center gap-4'` |
| `stat` | `'flex flex-col'` |
| `statValue` | `'font-semibold text-highlighted text-sm'` |
| `statLabel` | `'text-muted text-xs'` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.socialHoverCard` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `relative inline-block` |
| `trigger` | `rounded font-medium text-primary text-sm underline-offset-2 hover:underline` |
| `card` | `absolute left-1/2 z-30 w-80 -translate-x-1/2 overflow-hidden rounded-2xl border border-default bg-default shadow-xl` |
| `loading` | `animate-pulse p-4` |
| `loadingBanner` | `h-16 rounded-lg bg-muted` |
| `loadingBody` | `mt-3 flex items-center gap-3` |
| `loadingAvatar` | `size-12 rounded-full bg-muted` |
| `loadingText` | `flex-1 space-y-2` |
| `loadingLineWide` | `h-3 w-2/3 rounded bg-muted` |
| `loadingLineNarrow` | `h-3 w-1/3 rounded bg-muted` |
| `loadingLineFull` | `mt-4 h-3 w-full rounded bg-muted` |
| `loadingLineShort` | `mt-2 h-3 w-4/5 rounded bg-muted` |
| `banner` | `h-16 w-full object-cover` |
| `bannerFallback` | `h-16 w-full bg-gradient-to-r from-primary/40 to-primary/10` |
| `body` | `p-4` |
| `header` | `flex items-start justify-between gap-3` |
| `identity` | `flex items-center gap-3` |
| `avatar` | `size-12 shrink-0 rounded-full border-2 border-default object-cover` |
| `info` | `min-w-0` |
| `nameRow` | `flex items-center gap-1` |
| `nameLink` | `truncate font-semibold text-highlighted text-sm hover:underline` |
| `name` | `truncate font-semibold text-highlighted text-sm` |
| `verifiedIcon` | `size-4 shrink-0 text-primary` |
| `verifiedLabel` | `sr-only` |
| `handle` | `truncate text-muted text-xs` |
| `action` | `shrink-0` |
| `followButton` | `rounded-full` |
| `followLabel` | `inline-block` |
| `bio` | `mt-3 text-highlighted/80 text-sm leading-relaxed` |
| `stats` | `mt-4 flex items-center gap-4` |
| `stat` | `flex flex-col` |
| `statValue` | `font-semibold text-highlighted text-sm` |
| `statLabel` | `text-muted text-xs` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.socialHoverCard` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `relative inline-block` |
| `trigger` | `rounded font-medium text-primary text-sm underline-offset-2 hover:underline` |
| `card` | `absolute left-1/2 z-30 w-80 -translate-x-1/2 overflow-hidden rounded-2xl border border-default bg-default shadow-xl` |
| `loading` | `animate-pulse p-4` |
| `loadingBanner` | `h-16 rounded-lg bg-muted` |
| `loadingBody` | `mt-3 flex items-center gap-3` |
| `loadingAvatar` | `size-12 rounded-full bg-muted` |
| `loadingText` | `flex-1 space-y-2` |
| `loadingLineWide` | `h-3 w-2/3 rounded bg-muted` |
| `loadingLineNarrow` | `h-3 w-1/3 rounded bg-muted` |
| `loadingLineFull` | `mt-4 h-3 w-full rounded bg-muted` |
| `loadingLineShort` | `mt-2 h-3 w-4/5 rounded bg-muted` |
| `banner` | `h-16 w-full object-cover` |
| `bannerFallback` | `h-16 w-full bg-gradient-to-r from-primary/40 to-primary/10` |
| `body` | `p-4` |
| `header` | `flex items-start justify-between gap-3` |
| `identity` | `flex items-center gap-3` |
| `avatar` | `size-12 shrink-0 rounded-full border-2 border-default object-cover` |
| `info` | `min-w-0` |
| `nameRow` | `flex items-center gap-1` |
| `nameLink` | `truncate font-semibold text-highlighted text-sm hover:underline` |
| `name` | `truncate font-semibold text-highlighted text-sm` |
| `verifiedIcon` | `size-4 shrink-0 text-primary` |
| `verifiedLabel` | `sr-only` |
| `handle` | `truncate text-muted text-xs` |
| `action` | `shrink-0` |
| `followButton` | `rounded-full` |
| `followLabel` | `inline-block` |
| `bio` | `mt-3 text-highlighted/80 text-sm leading-relaxed` |
| `stats` | `mt-4 flex items-center gap-4` |
| `stat` | `flex flex-col` |
| `statValue` | `font-semibold text-highlighted text-sm` |
| `statLabel` | `text-muted text-xs` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.socialHoverCard` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `relative inline-block` |
| `trigger` | `rounded font-medium text-primary text-sm underline-offset-2 hover:underline` |
| `card` | `absolute left-1/2 z-30 w-80 -translate-x-1/2 overflow-hidden rounded-2xl border border-default bg-default shadow-xl` |
| `loading` | `animate-pulse p-4` |
| `loadingBanner` | `h-16 rounded-lg bg-muted` |
| `loadingBody` | `mt-3 flex items-center gap-3` |
| `loadingAvatar` | `size-12 rounded-full bg-muted` |
| `loadingText` | `flex-1 space-y-2` |
| `loadingLineWide` | `h-3 w-2/3 rounded bg-muted` |
| `loadingLineNarrow` | `h-3 w-1/3 rounded bg-muted` |
| `loadingLineFull` | `mt-4 h-3 w-full rounded bg-muted` |
| `loadingLineShort` | `mt-2 h-3 w-4/5 rounded bg-muted` |
| `banner` | `h-16 w-full object-cover` |
| `bannerFallback` | `h-16 w-full bg-gradient-to-r from-primary/40 to-primary/10` |
| `body` | `p-4` |
| `header` | `flex items-start justify-between gap-3` |
| `identity` | `flex items-center gap-3` |
| `avatar` | `size-12 shrink-0 rounded-full border-2 border-default object-cover` |
| `info` | `min-w-0` |
| `nameRow` | `flex items-center gap-1` |
| `nameLink` | `truncate font-semibold text-highlighted text-sm hover:underline` |
| `name` | `truncate font-semibold text-highlighted text-sm` |
| `verifiedIcon` | `size-4 shrink-0 text-primary` |
| `verifiedLabel` | `sr-only` |
| `handle` | `truncate text-muted text-xs` |
| `action` | `shrink-0` |
| `followButton` | `rounded-full` |
| `followLabel` | `inline-block` |
| `bio` | `mt-3 text-highlighted/80 text-sm leading-relaxed` |
| `stats` | `mt-4 flex items-center gap-4` |
| `stat` | `flex flex-col` |
| `statValue` | `font-semibold text-highlighted text-sm` |
| `statLabel` | `text-muted text-xs` |
