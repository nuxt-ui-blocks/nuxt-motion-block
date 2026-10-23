---
title: Social Selector
description: A row of social platform buttons with a sliding indicator and a handle link that crossfades between networks.
---

A social selector for profile footers and link pages: one button per network, a
rounded indicator that slides to the selected one, and a line underneath that
names the host and links the handle. Selecting a network swaps the link in place,
so the component is a small switcher rather than a list of destinations.

The default set is X, Bluesky and Threads, each with its own glyph. Platforms are
data, so you can replace the list entirely — an unknown `icon` falls back to a
globe.

## Usage

The component keeps its own selection unless you pass `selectedPlatform`. The
handle is rendered verbatim after an `@`.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full"}
    <component-example name="social-selector-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full items-center justify-center py-6">
    <MSocialSelector handle="nuxt" />
  </div>
</template>
```

::

Clicking a button moves the indicator and crossfades the host link. The handle
link below points at the selected platform, so the two links never disagree.

## Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="social-selector-custom" />
  :::
#code
  <PlaygroundCode name="SocialSelector" />
::

`platforms` is the whole configuration: `name` is the accessible label, `domain`
is the text shown in the sentence, `url` is where both links go and `icon`
chooses the glyph. Keep the names unique, because the selection is matched by
name.

## Props

::component-props
  ::component-prop{name="platforms" type="SocialPlatform[]"}
  Buttons to render. Defaults to X, Bluesky and Threads pointing at their home
  pages. Each entry needs `name`, `domain` and `url`; `icon` is optional.
  ::
  ::component-prop{name="handle" type="string" default="'nuxt'"}
  Handle shown under the row. It is prefixed with `@` and linked to the selected
  platform's `url`.
  ::
  ::component-prop{name="selectedPlatform" type="SocialPlatform"}
  Controlled selection. Leave it out to let the component keep its own.
  ::
  ::component-prop{name="class" type="string"}
  Extra classes for the root wrapper, which is already `mx-auto w-full max-w-2xl`
  and centred.
  ::
::

## Events

::component-events
  ::component-event{name="change" type="(platform: SocialPlatform) => void"}
  Fired when another platform is selected. The whole platform object is passed,
  not only its name.
  ::
::

## Accessibility

- Every button has an `aria-label` of the form "Select X platform" and an
  `aria-pressed` that reflects the current selection, so the group reads as a set
  of toggles rather than a row of unlabelled links.
- The sliding indicator and every inline SVG are `aria-hidden`; the network is
  named once, by the button, instead of twice.
- Both links use `target="_blank"` with `rel="noopener noreferrer"`.
- The selected state is not colour-only: `aria-pressed` carries it and the
  indicator behind the active button adds a second visual cue.
- Under `prefers-reduced-motion` the indicator jumps between positions and the
  link crossfade becomes an instant swap, so selection is never delayed by
  animation.

## Performance

- Only one element animates on selection: the indicator's `x`. The link change is
  a short opacity, blur and translate transition on the anchor itself.
- Platform buttons are plain DOM with inline SVG paths — no icon font, no network
  request and no layout measurement to find the indicator position.
- The indicator's offset is derived from the index and the fixed button size, so
  selection does not read the DOM.
- Nothing animates while the component rests: there is no autoplay, timer or hover
  tracking on the row.
