---
title: Safari
description: A browser window frame with traffic lights and an address bar.
---

Safari is a chrome-only frame: three window controls, an address bar and a content area, with the page inside left entirely to the default slot.

It is the counterpart to the phone mocks — use it when the thing you are showing is a desktop layout and the point is that it lives in a browser.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="safari-example" />
  :::
#code
```vue
<template>
  <div class="flex w-full items-center justify-center py-6">
    <MSafari class="w-full max-w-xl">
      <div class="flex h-56 flex-col items-center justify-center gap-2 bg-gradient-to-b from-default to-elevated p-6 text-center">
        <p class="text-lg font-semibold text-highlighted">
          nuxt.com
        </p>
      </div>
    </MSafari>
  </div>
</template>
```
::

## Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="safari-custom" />
  :::
#code
  <PlaygroundCode name="Safari" />
::

## Props

::component-props
  ::component-prop{name="url" type="string" default="'nuxt.com'"}
  Text shown in the address bar. It is truncated with an ellipsis when it does not fit.
  ::

  ::component-prop{name="class" type="string" default="''"}
  CSS classes for the frame. The frame has no width of its own, so set one here or from a parent.
  ::
::

## Slots

::component-slots
  ::component-slot-row{name="default"}
  Page content. It sits under the chrome with no padding of its own.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.safari` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `mx-auto overflow-hidden rounded-xl border border-default bg-elevated shadow-xl`
  ::
  ::component-slot-row{name="bar"}
  `flex items-center gap-1.5 border-b border-default px-4 py-3`
  ::
  ::component-slot-row{name="light"}
  `size-3 rounded-full`
  ::
  ::component-slot-row{name="address"}
  `ml-3 flex-1 truncate rounded-md bg-default px-3 py-1 text-xs text-muted`
  ::
  ::component-slot-row{name="content"}
  `bg-background`
  ::
::

## Accessibility

The traffic lights are empty, unlabelled spans, so they are invisible to assistive technology. The address bar is a plain `span` rather than an input: it reads as text and cannot be focused or edited, which is the honest model for a picture of a browser.
