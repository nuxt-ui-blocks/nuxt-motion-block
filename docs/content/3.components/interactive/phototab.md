---
title: Phototab
description: Photo tabs with a pill that follows the pointer and a tab bar that slides in on hover.
---

Tabs where the panel is a photograph rather than a paragraph. A small icon bar
sits at the bottom edge; on desktop it waits just outside the frame and slides up
when the pointer or the keyboard reaches the component, so the image gets the
whole square until you ask for navigation.

Hovering a tab grows a pill behind it, measured from the real trigger rectangle,
so it matches the icon spacing instead of guessing a width. The selected tab
keeps a solid surface underneath, which means the current panel is readable at a
glance even when the pill is elsewhere.

## Usage

Each tab needs a name, an image and an optional icon. Names double as the alt
text and as the slug for the generated tab ids, so keep them unique.

::code-preview
---
label: Preview
---

  :::div{class="flex justify-center w-full"}
    <component-example name="phototab-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full justify-center py-6">
    <MPhototab
      default-tab="Coast"
      :height="420"
      :tabs="tabs"
    />
  </div>
</template>

<script setup lang="ts">
const tabs = [
  { name: 'Mountains', icon: 'i-lucide-mountain', image: 'https://picsum.photos/seed/mountains/800/800' },
  { name: 'Coast', icon: 'i-lucide-waves', image: 'https://picsum.photos/seed/coast/800/800' },
  { name: 'Forest', icon: 'i-lucide-trees', image: 'https://picsum.photos/seed/forest/800/800' },
  { name: 'City', icon: 'i-lucide-building-2', image: 'https://picsum.photos/seed/city/800/800' },
]
</script>
```

::

The component is square by design: `height` sets the box, and the aspect ratio
derives the width, so a row of tabs never changes the layout when you switch
panels.

## Customize

::code-preview
---
label: Preview
---

  :::div{class="w-full"}
    <component-example name="phototab-custom" />
  :::
#code
  <PlaygroundCode name="Phototab" />
::

## Props

::component-props
  ::component-prop{name="tabs" type="PhototabTab[]"}
  Tabs to display. Each entry takes `name`, `image` and an optional `icon`
  (Iconify name).
  ::
  ::component-prop{name="defaultTab" type="string"}
  Name of the tab selected on mount. Defaults to the first tab.
  ::
  ::component-prop{name="height" type="number" default="400"}
  Height in pixels. The width follows from the square aspect ratio.
  ::
  ::component-prop{name="tabListClassName" type="string"}
  Extra classes for the tab bar.
  ::
  ::component-prop{name="tabTriggerClassName" type="string"}
  Extra classes for each tab trigger.
  ::
  ::component-prop{name="imageClassName" type="string"}
  Extra classes for the image.
  ::
  ::component-prop{name="class" type="string"}
  Extra classes for the root.
  ::
::

## Accessibility

- The bar is a `role="tablist"` with `aria-label`, each trigger is a `role="tab"`,
  and each panel is a `role="tabpanel"` linked back with `aria-labelledby`.
- Tab ids are slugged from the names, so a multi-word label such as `Tab 1` still
  produces an `aria-controls` that resolves to a real element.
- Triggers use roving `tabindex`: only the active tab is in the tab order, and
  Left/Right wrap around while Home/End jump to the ends. Selection follows focus.
- The visible content of a trigger is an icon, so each one carries an `aria-label`
  and a visually hidden name.
- The bar slides in on hover, but also on `:focus-within`, so keyboard users are
  never left with an off-screen control.
- Images use the tab name as alt text, and the selected panel is the only one
  displayed.
- Focus is a two-pixel ring offset from the trigger, independent of the active
  surface colour.

## Performance

- Images load lazily and only the selected panel is displayed; the others stay in
  the DOM but are not painted.
- The hover pill measures two rectangles on pointer enter, then animates offsets
  and size with a spring. Nothing is measured during the animation or on scroll.
- Tabs are keyed by their slug, so switching panels does not remount the tab bar.
- The component has no timers, no observers and no animation loop of its own.
- Under `prefers-reduced-motion` the pill is skipped entirely and the bar moves
  without a transition.
