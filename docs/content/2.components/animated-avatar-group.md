---
title: Animated Avatar Group
description: A Nuxt UI avatar group that fans its members apart on hover, optionally overlapping them by a ratio of their size.
navigation:
  icon: i-lucide-users
---

# Animated Avatar Group

Wraps Nuxt UI's `UAvatarGroup` and adds two hover behaviours on top of it: the
avatars ease apart from under each other, and they scale up in a staggered
sequence starting from the right.

The overlap is expressed as a **ratio of the avatar's pixel size**, not as
pixels. `overlap: 0.4` on an `lg` avatar (36px) becomes `-14.4px` of negative
inline-end margin. That keeps the visual density identical across all nine
sizes ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â `overlap: 0.3` looks the same at `3xs` and at `3xl`, which is not true
if you pass pixels.

Two states change the hover behaviour, and they are not the same:

- **With overflow** (more avatars than `max`), the leading "+N" counter stays put
  while every avatar behind it scales.
- **Without overflow**, all avatars scale, counter included.

Everything is CSS custom properties plus `data-` attributes on the root, so the
animation is entirely in the stylesheet rather than in a JS loop. `hoverScale`
and `staggerDelay` are just the values of `--m-avatar-hover-scale` and
`--m-avatar-stagger`.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="animated-avatar-group-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-md flex-col gap-5">
    <div class="flex items-center justify-between rounded-2xl border border-default bg-default p-5">
      <MAnimatedAvatarGroup
        :avatars="avatars"
        :max="max"
        :size="size"
        :overlap="overlap"
        :hover-scale="1.08"
      />
      <span class="text-xs text-muted">{{ avatars.length }} people</span>
    </div>

    <div class="grid grid-cols-2 gap-3">
      <USelect
        v-model="size"
        :items="['sm', 'md', 'lg', 'xl', '2xl']"
      />
      <USelect
        v-model="max"
        :items="maxItems"
      />
    </div>

    <USlider
      v-model="overlap"
      :min="0"
      :max="0.6"
      :step="0.05"
      label="Overlap"
      class="w-full"
    />
  </div>
</template>

<script setup lang="ts">
const size = ref<'sm' | 'md' | 'lg' | 'xl' | '2xl'>('lg')
const max = ref(4)
const overlap = ref(0.35)

const avatars = [
  { src: 'https://randomuser.me/api/portraits/women/44.jpg', alt: 'Ana Ruiz' },
  { src: 'https://randomuser.me/api/portraits/men/32.jpg', alt: 'Ben Osei' },
  { src: 'https://randomuser.me/api/portraits/women/68.jpg', alt: 'Cleo Park' },
  { src: 'https://randomuser.me/api/portraits/men/75.jpg', alt: 'Dmitri Ilves' },
  { src: 'https://randomuser.me/api/portraits/women/90.jpg', alt: 'Elin Haugen' },
  { src: 'https://randomuser.me/api/portraits/men/11.jpg', alt: 'Farid Nazari' },
]

const maxItems = [
  { label: 'Show 3', value: 3 },
  { label: 'Show 4', value: 4 },
  { label: 'Show all', value: 6 },
]
</script>
```
::

Pick one of two sources for the avatar image: `src` for a real image, or `icon` /
`text` for a glyph or initials. `alt` is what `UAvatar` uses for its own
accessible label, and it is also the component's fallback key, so two avatars
with different images must have different `alt` values or they will share a slot
identity and animate as one.

## Props

::field-group
  ::field{name="avatars" type="AvatarData[]" default="[]"}
  The people to render. Each entry is passed straight to `UAvatar` ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â `src`,
    `alt`, `icon` and `text` are the useful fields. A `href` field is stripped
    and will not turn an avatar into a link; see the note below.
  ::
  ::field{name="max" type="number" default="undefined"}
  How many avatars to show before collapsing into a counter. When set to a
    positive number it wins over `maxVisible`. Setting `0` does **not** mean
    "show all" ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â it falls back to `maxVisible`, because the check is `max > 0`.
  ::
  ::field{name="maxVisible" type="number" default="4"}
  The limit used when `max` is not provided, or is `0`.
  ::
  ::field{name="size" type="AvatarGroupSize" default="'md'"}
  One of `3xs`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`. Also decides
    the pixel base used to convert `overlap` into a margin.
  ::
  ::field{name="overlap" type="number" default="undefined"}
  Fraction of the avatar size to pull each avatar under the next. `0.3` on a 36px
    avatar is `-10.8px`. Omit the prop entirely to keep Nuxt UI's own spacing ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â
    the negative margin is only applied when the prop is defined.
  ::
  ::field{name="expandOnHover" type="boolean" default="true"}
  Ease the avatars apart by 4px and scale them on hover. Set `false` for a static
    group; nothing else in the component changes.
  ::
  ::field{name="hoverScale" type="number" default="1.05"}
  Scale factor applied on hover, written to `--m-avatar-hover-scale`.
  ::
  ::field{name="staggerDelay" type="number" default="0.03"}
  Seconds between each avatar's transition delay, written to
    `--m-avatar-stagger`. Delays count from the leftmost avatar outwards, so the
    leftmost reacts first and the rightmost last.
  ::
  ::field{name="class" type="string" default="undefined"}
  Merged onto the group alongside `m-avatar-group`.
  ::
::

## Slots

::field-group
  ::field{name="default" type="{ avatar: AvatarData, index: number }"}
  Rendered **inside** each `UAvatar`, so it becomes the avatar's fallback
    content rather than replacing the avatar itself. Omit it and `UAvatar`
    applies its own `icon` / `text` / initial handling from the `avatars` entry.
  ::
::

## Accessibility

The root is a `role="group"` with `aria-label="Avatar group"` by default, which
is a poor label on its own ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â pass `aria-label="Reviewers"` (or any string) and it
replaces the default. Avatars are not links here, so the group is a static image
list, not an interactive widget; nothing is focusable and there is no keyboard
interaction to support.

The visuals are hover-only and the whole effect is gated behind
`@media (hover: hover) and (pointer: fine)`, so touch devices never see the fan
out ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â they get the overlapped layout permanently. That is a deliberate choice,
not a bug, but it means the two presentations differ enough that you should not
rely on the expanded spacing to convey meaning.

`prefers-reduced-motion: reduce` removes the transition entirely and forces
`scale: 1`, so hover does nothing. The avatars still overlap and the group is
still readable ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â the information is never carried by the animation alone.

The overflow "+N" counter is rendered by `UAvatarGroup` and inherits its own
labelling; since the visible avatars are truncated, `aria-label` on the group is
worth writing explicitly to say how many are in total.

## Performance

- There is no JavaScript animation. The component writes four CSS custom
  properties and flips three `data-` attributes; the browser handles the rest.
  Re-rendering is O(1) in the number of avatars.
- The transition list is only `margin-inline-end` and `scale`, both
  compositor-friendly or cheap layout properties, over 250ms with a slightly
  bouncy `cubic-bezier(0.34, 1.56, 0.64, 1)`.
- Stagger is implemented with ten `:nth-last-child()` rules plus an
  `:nth-last-child(n + 11)` fallback, all capped at ten steps. Past eleven
  avatars every remaining delay is identical, which is deliberate ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â a per-item
  delay for fifty avatars would keep the last one animating for seconds.
- `--m-avatar-overflow-delay` is computed as `visibleCount * staggerDelay` so
  the counter's delay matches the end of the stagger chain. Recomputing it is
  the only value that depends on the avatar count.
- Animating `margin` is not free ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â it relayouts on every frame of the transition.
  It is scoped to a handful of avatars and never applies above
  `nth-last-child(n + 11)`, so the cost stays bounded.

::tip
Because overlap is a ratio of `size`, the same value looks consistent across
sizes ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â but it is clamped by nothing. `overlap: 0.9` on a `3xs` (16px) avatar
pulls it 14.4px under its neighbour, which is nearly all of it. Keep the value
under about `0.6` unless you are deliberately masking the avatars.
::

::tip
Two ordering details of the underlying `UAvatarGroup` are worth knowing. Its root
is `flex-row-reverse` and it renders the avatar array reversed, so the **first**
entry in `avatars` appears **leftmost** and the `+N` counter sits at the right
end. And it already applies its own negative margin per size (`-me-0.5` up to
`-me-2`); the component's `data-overlap` rule is more specific, so setting
`overlap` replaces that default rather than adding to it.
::

::warning
`ui` is declared as a prop but never forwarded to `UAvatarGroup` or `UAvatar`, so
it currently does nothing. To theme the internals, put the `ui` object on your
own `UAvatarGroup` or use the class on the root, or wrap the component and style
the `[data-slot="base"]` children directly ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â that is the slot the component's own
stylesheet targets.
::

::warning
`href` on an avatar entry is removed before the props reach `UAvatar`, so avatar
links are not supported. If you need linked avatars, put the link inside your
default slot content ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â but note that content renders *inside* the avatar, so the
anchor will be nested within the image element rather than replacing it.
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.animatedAvatarGroup` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `'m-avatar-group'` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.animatedAvatarGroup` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `m-avatar-group` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.animatedAvatarGroup` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `m-avatar-group` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.animatedAvatarGroup` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `m-avatar-group` |
