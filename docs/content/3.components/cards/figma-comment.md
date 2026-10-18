---
title: Figma Comment
description: A compact Figma-style comment bubble that expands from a dot to reveal the full comment on click.
---

Figma Comment renders a small floating comment marker that expands into a card when opened. It measures its content height after mount (and on message/width changes) to animate smoothly between collapsed (`32x32`) and expanded states. The avatar slides from the corner into the padded content area, and the body fades in with a subtle blur. Supports controlled/uncontrolled `open` state, emits `openChange`/`update:open`, and respects `prefers-reduced-motion`.

## Usage

Place the component near a canvas element and pass author/message details. Click the marker to toggle; clicking outside closes it when open. If you want to control state externally, bind `v-model:open`.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="figma-comment-basic" />
  :::
#code
```vue
<template>
  <div class="flex h-40 w-full items-center justify-center">
    <MFigmaComment
      author-name="Arjun Mehta"
      avatar-url="https://randomuser.me/api/portraits/men/11.jpg"
      message="What happens if we adjust this to handle light and dark mode?"
      timestamp="2 min ago"
    />
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
    <component-example name="figma-comment-custom" />
  :::
#code
  <PlaygroundCode name="FigmaComment" />
::

## Props

::component-props
  ::component-prop{name="authorName" type="string" default="'Arjun Mehta'"}
  Comment author, shown in the attribution row.
  ::
  ::component-prop{name="avatarUrl" type="string" default="'https://randomuser.me/api/portraits/men/11.jpg'"}
  Avatar image URL. Defaults to a portrait; when absent or failing to load, `avatarIcon` is shown instead.
  ::
  ::component-prop{name="avatarIcon" type="string" default="'i-lucide-user-round'"}
  Nuxt UI icon shown in the avatar slot when `avatarUrl` is missing or fails to load.
  ::
  ::component-prop{name="avatarAlt" type="string" default="undefined"}
  Alternative text for avatar; defaults to `authorName`.
  ::
  ::component-prop{name="message" type="string" default="What happens if we adjust...?"}
  Comment body text.
  ::
  ::component-prop{name="timestamp" type="string" default="'Just now'"}
  Relative time shown next to author.
  ::
  ::component-prop{name="width" type="number" default="180"}
  Open card width in pixels; also used for measurement width.
  ::
  ::component-prop{name="open" type="boolean" default="undefined"}
  Controlled open state. Leave undefined for uncontrolled.
  ::
  ::component-prop{name="defaultOpen" type="boolean" default="false"}
  Initial open state for uncontrolled usage.
  ::
  ::component-prop{name="class" type="string" default="undefined"}
  Extra classes for the positioning wrapper.
  ::
  ::component-prop{name="className" type="string" default="undefined"}
  Alias of `class` (kept for parity with reference).
  ::
::

## Events

::component-events
  ::component-event{name="openChange" type="(value: boolean) => void"}
  Emitted whenever `isOpen` changes (fires on mount with initial value, then on every change). Reports the actual open state after the change.
  ::
  ::component-event{name="update:open" type="(value: boolean) => void"}
  v-model update emitted on toggle request.
  ::
::

## Slots

::component-slots
  ::component-slot-row{name="default"}
  No default slot is used.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.figmaComment` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `relative`
  ::
  ::component-slot-row{name="card"}
  `absolute bottom-0 left-0 cursor-pointer overflow-hidden rounded-2xl rounded-bl-none bg-default shadow-[0px_0px_0.5px_0px_rgb(0_0_0/0.18),0px_3px_8px_0px_rgb(0_0_0/0.1),0px_1px_3px_0px_rgb(0_0_0/0.1)] outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-default`
  ::
  ::component-slot-row{name="avatar"}
  `absolute z-10`
  ::
  ::component-slot-row{name="avatarImage"}
  `size-6 rounded-full object-cover`
  ::
  ::component-slot-row{name="avatarFallback"}
  `flex size-6 items-center justify-center rounded-full bg-muted text-[10px] leading-none font-semibold text-inverted`
  ::
  ::component-slot-row{name="measure"}
  `pointer-events-none absolute`
  ::
  ::component-slot-row{name="measureInner"}
  `flex flex-col items-start gap-0.5 py-3 pr-4 pl-11`
  ::
  ::component-slot-row{name="meta"}
  `flex items-start gap-0.5`
  ::
  ::component-slot-row{name="author"}
  `text-[11px] leading-4 font-semibold text-highlighted`
  ::
  ::component-slot-row{name="timestamp"}
  `text-[11px] leading-4 font-medium text-muted`
  ::
  ::component-slot-row{name="message"}
  `text-left text-[11px] leading-4 font-medium text-highlighted`
  ::
  ::component-slot-row{name="content"}
  `absolute inset-0 flex flex-col items-start gap-0.5 py-3 pr-4 pl-11`
  ::
::

## Accessibility

The animated card container is rendered as a `role="button"` with `tabindex="0"`, `:aria-expanded="isOpen"`, and `:aria-label="toggleLabel"` (e.g. "Show/Hide comment from ..."). Keyboard toggles on `Enter` and `Space` (with `preventDefault`). A click-outside handler closes when open. Avatar has `alt` text or is replaced by a decorative initial span (`aria-hidden="true"`). The measurement element is `aria-hidden="true"`. Focus is not programmatically moved on open/close. No `prefers-reduced-motion` removes focus ring semantics; reduced motion replaces animations with static positions/sizes.

## Performance

- Measures content height via a hidden `measureEl` (first child `scrollHeight`) on mount with two timeouts (100ms, 500ms) and also on `message`/`width` changes (`nextTick` then measure) to ensure layout is stable.
- Animations driven by `motion-v`: card size animates between `{height,width}` (closed 32×32, open `contentHeight`×`width`), avatar offset animates `left/top`, content animates `opacity` + `filter: blur(...)` with delayed blur/opacity on enter.
- Spring transitions: card uses `stiffness:550,damping:45,mass:0.7`, avatar uses `stiffness:300,damping:25`, content uses custom `ease: [0.22,1,0.36,1]` for blur/opacity.
- `useClickOutside` attached to root wrapper; click handler lives on wrapper (not directly on motion node) to ensure reliable event binding.
- Avatar fallback: `avatarFailed` ref set on image error; also checks `img.complete && naturalWidth===0` on mount/URL change. No timers beyond measurement timeouts.
- `shouldReduceMotion` replaces all animations with static styles/zero-duration transitions and simplifies content enter to plain opacity.

::tip
If the message is very long, the open height matches `scrollHeight` automatically. Keep `width` reasonable (default 180) to avoid overly wide bubbles in tight layouts.
::

