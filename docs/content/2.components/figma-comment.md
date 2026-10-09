---
title: Figma Comment
description: A compact Figma-style comment bubble that expands from a dot to reveal the full comment on click.
navigation:
  icon: i-lucide-message-circle
---

# Figma Comment

Figma Comment renders a small floating comment marker that expands into a card when opened. It measures its content height after mount (and on message/width changes) to animate smoothly between collapsed (`32x32`) and expanded states. The avatar slides from the corner into the padded content area, and the body fades in with a subtle blur. Supports controlled/uncontrolled `open` state, emits `openChange`/`update:open`, and respects `prefers-reduced-motion`. Ported from smoothui's figma-comment.

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

## Props

::field-group
  ::field{name="authorName" type="string" default="'Arjun Mehta'"}
  Comment author, shown in the attribution row.
  ::
  ::field{name="avatarUrl" type="string" default=".../arjun-mehta.webp"}
  Avatar image URL. When missing or fails to load, shows fallback initial. Defaults to the reference ImageKit portrait.
  ::
  ::field{name="avatarAlt" type="string" default="undefined"}
  Alternative text for avatar; defaults to `authorName`.
  ::
  ::field{name="message" type="string" default="What happens if we adjust...?"}
  Comment body text.
  ::
  ::field{name="timestamp" type="string" default="'Just now'"}
  Relative time shown next to author.
  ::
  ::field{name="width" type="number" default="180"}
  Open card width in pixels; also used for measurement width.
  ::
  ::field{name="open" type="boolean" default="undefined"}
  Controlled open state. Leave undefined for uncontrolled.
  ::
  ::field{name="defaultOpen" type="boolean" default="false"}
  Initial open state for uncontrolled usage.
  ::
  ::field{name="class" type="string" default="undefined"}
  Extra classes for the positioning wrapper.
  ::
  ::field{name="className" type="string" default="undefined"}
  Alias of `class` (kept for parity with reference).
  ::
::

## Events

::field-group
  ::field{name="openChange" type="(value: boolean) => void"}
  Emitted whenever `isOpen` changes (fires on mount with initial value, then on every change). Reports the actual open state after the change.
  ::
  ::field{name="update:open" type="(value: boolean) => void"}
  v-model update emitted on toggle request.
  ::
::

## Slots

::field-group
  ::field{name="default"}
  No default slot is used.
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